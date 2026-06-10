import io
import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pypdf
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load local environment parameters from a .env file if it exists
load_dotenv()

app = FastAPI(title="EduAI Core Backend Engine")

# Enable CORS for frontend local development context
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global in-memory cache to hold processed text lines from your uploaded PDFs
KNOWLEDGE_BASE = []

# ==========================================================================
# SECURED API KEY INITIALIZATION USING ENVIRONMENT VARIABLES
# ==========================================================================
# Read the key securely from the operating system environment or a root .env file
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

try:
    if GEMINI_API_KEY:
        # Initialize the client explicitly with the loaded secure key string
        client = genai.Client(api_key=GEMINI_API_KEY)
        print("🚀 Gemini Client initialized successfully via secure environment!")
    else:
        print("⚠️ Warning: GEMINI_API_KEY not found in environment variables. Falling back to lazy configuration.")
        client = None
except Exception as init_err:
    print(f"❌ Failed to initialize Gemini Client: {str(init_err)}")
    client = None

# Core data validation schemas
class ChatQuery(BaseModel):
    question: str
    mode: str 
    subject: str
    chapter: Optional[str] = ""
    topic: Optional[str] = ""

class OptionItem(BaseModel):
    key: str
    text: str

class ExamQuestion(BaseModel):
    id: int
    question: str
    image: Optional[str] = None
    options: List[OptionItem]
    correctAnswer: str
    explanation: str

# Existing Exam Repository Fallback
CURRICULUM_EXAM_BANK = {
    "Physics": [
        {
            "id": 1,
            "question": "In the circuit diagram shown, three resistors $R_1 = 2\\Omega$, $R_2 = 4\\Omega$, and $R_3 = 4\\Omega$ are connected in parallel. Calculate the total equivalent resistance ($R_{total}$) of the combination.",
            "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
            "options": [
                {"key": "A", "text": "$1.0\\ \\Omega$"},
                {"key": "B", "text": "$2.0\\ \\Omega$"},
                {"key": "C", "text": "$0.5\\ \\Omega$"},
                {"key": "D", "text": "$4.0\\ \\Omega$"}
            ],
            "correctAnswer": "A",
            "explanation": "Using the parallel resistance formula: $\\frac{1}{R_{total}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3} = \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{4} = \\frac{4}{4} = 1$. Therefore, $R_{total} = 1\\Omega$."
        }
    ]
}

# ==========================================================================
# PDF INGESTION & TEXT EXTRACTION ENGINE
# ==========================================================================
@app.post("/upload-pdf")
async def upload_pdf_document(file: UploadFile = File(...)):
    global KNOWLEDGE_BASE
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Invalid extension type. System only accepts official PDF documentation.")
    try:
        pdf_bytes = await file.read()
        pdf_file = io.BytesIO(pdf_bytes)
        reader = pypdf.PdfReader(pdf_file)
        extracted_chunks = []
        for page_num, page in enumerate(reader.pages):
            text = page.extract_text()
            if text and text.strip():
                paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
                for chunk in paragraphs:
                    extracted_chunks.append({"page": page_num + 1, "text": chunk})
        KNOWLEDGE_BASE = extracted_chunks
        return {"status": "success", "filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==========================================================================
# LIVE RAG CHAT ROUTER: GEMINI LIVE GENERATION INTERACTION
# ==========================================================================
@app.post("/ask")
async def handle_chat_query(payload: ChatQuery):
    global KNOWLEDGE_BASE, client
    
    # Attempt lazy re-initialization if environment was updated after hot-reload
    if client is None:
        current_key = os.getenv("GEMINI_API_KEY")
        if current_key:
            try:
                client = genai.Client(api_key=current_key)
            except Exception:
                client = None

    # Catch uninitialized client states gracefully before calling Gemini
    if client is None:
        return {
            "answer": "⚠️ **Backend Status:** The AI Client is currently offline because the API key string is invalid, unconfigured, or missing from your `.env` configuration template."
        }

    user_prompt = payload.question.lower()
    found_context = ""
    
    if KNOWLEDGE_BASE:
        matching_chunks = []
        keywords = [word for word in user_prompt.split() if len(word) > 3]
        for chunk in KNOWLEDGE_BASE:
            if any(kw in chunk["text"].lower() for kw in keywords):
                matching_chunks.append(chunk["text"])
        if matching_chunks:
            found_context = "\n".join(matching_chunks[:4])[:2500]

    system_instruction = (
        "You are an expert, encouraging AI private tutor specialized in the Egyptian national educational curriculum.\n"
        f"Your goal is to assist students studying {payload.subject}.\n"
        "CRITICAL RULES:\n"
        "1. When formatting math formulas or calculations, ALWAYS wrap them in clean LaTeX markup using single dollars for inline (e.g., $E=mc^2$).\n"
        "2. If the user asks in Arabic, respond in clear, polite Arabic. Otherwise, stick to English."
    )

    llm_prompt = f"Student interaction mode selected: {payload.mode}.\n"
    if found_context:
        llm_prompt += f"--- TEXTBOOK REFERENCED CONTEXT ---\n{found_context}\n-------------\n\n"
    llm_prompt += f"Student Question: \"{payload.question}\"\n\nResponse:"

    try:
        # Fire generation request inside a protected runtime try block
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=llm_prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.3,
            ),
        )
        return {"answer": response.text}
        
    except Exception as e:
        # If Gemini rejects the execution parameters, return the message cleanly so the UI stays stable
        return {
            "answer": f"❌ **Gemini API Error:** The AI server responded with an error during generation. Details: {str(e)}"
        }

@app.get("/exam/questions")
async def get_exam_questions(subject: str):
    return CURRICULUM_EXAM_BANK.get(subject, CURRICULUM_EXAM_BANK["Physics"])