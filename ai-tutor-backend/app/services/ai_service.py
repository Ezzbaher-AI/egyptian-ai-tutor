import os
import requests
from typing import List, Dict

# Fetch key from environment configuration variables safely
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def get_ai_response(chat_history: List[Dict[str, str]], retrieved_context: str, mode: str, subject: str) -> str:
    """
    Formulates a system persona and feeds historical chat tracking memory alongside 
    local RAG curriculum vector blocks directly into OpenRouter's compilation matrix.
    """
    
    # 1. ESTABLISH THE STRONGEST POSSIBLE GROUNDING SYSTEM INSTRUCTION MATRIX
    base_instruction = (
        f"You are the master AI Teaching Tutor, an expert educator specializing in the official Egyptian national curriculum "
        f"for {subject}. Your student is currently interacting with you via the focused study mode: '{mode.upper()}'.\n\n"
        f"CRITICAL GROUNDING RULES:\n"
        f"1. Below are authentic excerpts extracted directly from the student's uploaded official textbooks, revision sheets, or past exams.\n"
        f"2. You must heavily prioritize and base your core answers, definitions, and equations strictly on these excerpts.\n"
        f"3. Do not invent out-of-scope calculations or cite unrelated international curricula unless specifically requested. Follow the structural methodology of the Egyptian syllabus.\n"
        f"4. Maintain a supportive, clear, peer-like tone, but ensure total academic precision.\n\n"
        f"--- START OFFICIAL TEXTBOOK EXCERPTS ---\n"
        f"{retrieved_context}\n"
        f"--- END OFFICIAL TEXTBOOK EXCERPTS ---"
    )

    # 2. CONSTRUCT THE ENTIRE COMPREHENSIVE CONVERSATIONAL PAYLOAD
    # Place the base instruction rule box right at index 0 as the system prompt anchor
    messages_payload = [
        {"role": "system", "content": base_instruction}
    ]
    
    # Append every single prior conversational back-and-forth interaction stored in memory
    for message in chat_history:
        messages_payload.append({
            "role": message["role"],
            "content": message["content"]
        })

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        # Optional headers required by OpenRouter for ranking attribution
        "HTTP-Referer": "http://localhost:3000", 
        "X-Title": "Egyptian AI EdTech Core"
    }

    payload = {
        "model": "google/gemini-2.5-flash",
        "messages": messages_payload,
        "temperature": 0.3, # Kept low to enforce strict adherence to textbook context maps
        "max_tokens": 1200
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions", 
            headers=headers, 
            json=payload,
            timeout=30 # Prevent long-hanging API responses from blocking thread loops
        )
        
        if response.status_code != 200:
            print(f"OpenRouter returned non-200 status: {response.status_code} - {response.text}")
            return "System Diagnostic Notice: Core AI routing modules returned an invalid connection flag."
            
        response_data = response.json()
        
        if 'choices' in response_data and len(response_data['choices']) > 0:
            return response_data['choices'][0]['message']['content']
        else:
            print(f"Unexpected OpenRouter payload shape: {response_data}")
            return "System Diagnostic Notice: Response payload parsing fault."
            
    except Exception as e:
        print(f"OpenRouter Gateway Connection Crash: {str(e)}")
        return "System Diagnostic Notice: I encountered a disruption communicating with my core AI generation modules."