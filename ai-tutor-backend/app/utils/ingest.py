import os
import pdfplumber
import chromadb
from chromadb.utils import embedding_functions

# 1. INITIALIZE LOCAL EMBEDDING MODEL FRAMEWORK
# We use a highly efficient local transformer model to avoid paying OpenAI for text vectorizations.
embedding_function = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

# 2. INTIALIZE CHROMADB PERSISTENT STORAGE INSTANCE
DB_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "db_storage")
chroma_client = chromadb.PersistentClient(path=DB_DIR)

# Get or create the unified collection holding all curriculum data fragments
collection = chroma_client.get_or_create_collection(
    name="egyptian_curriculum_vectors",
    embedding_function=embedding_function
)

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extracts raw text strings cleanly from any uploaded PDF file layout."""
    full_text = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text.append(text)
    return "\n".join(full_text)

def chunk_text(text: str, chunk_size: int = 600, overlap: int = 100) -> list:
    """Slices massive textbook text lengths into cohesive paragraphs with overlapping windows."""
    chunks = []
    words = text.split()
    
    # Process moving sliding windows based on custom boundaries
    i = 0
    while i < len(words):
        chunk_words = words[i:i + chunk_size]
        chunks.append(" ".join(chunk_words))
        i += (chunk_size - overlap)
        
    return chunks

def ingest_curriculum_file(file_path: str, grade: str, subject: str, doc_type: str, chapter: str = "", topic: str = ""):
    """
    Parses a single source asset file and indexes it into ChromaDB with comprehensive metadata tags.
    doc_type options: 'textbook', 'note', 'exam'
    """
    if not os.path.exists(file_path):
        print(f"Ingestion Alert: File target not located at {file_path}")
        return

    print(f"Starting Processing Loop for: {os.path.basename(file_path)}...")
    raw_text = extract_text_from_pdf(file_path)
    text_chunks = chunk_text(raw_text)

    documents = []
    metadatas = []
    ids = []

    filename = os.path.basename(file_path)

    for index, chunk in enumerate(text_chunks):
        chunk_id = f"{grade}_{subject}_{doc_type}_{filename}_chunk_{index}"
        
        # Build strict filtering metadata objects
        metadata = {
            "grade": grade,
            "subject": subject,
            "doc_type": doc_type,
            "chapter": chapter,
            "topic": topic,
            "source_file": filename
        }

        documents.append(chunk)
        metadatas.append(metadata)
        ids.append(chunk_id)

    # Insert batch packets straight into our vector collection database
    if documents:
        collection.add(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )
        print(f"Successfully vectorized and indexed {len(documents)} chunks from {filename} into database.")