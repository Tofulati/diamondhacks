from google import genai
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv(dotenv_path=".dev")

# Get API key securely
api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)
# Global instructions used once at the top
instructions = (
    "You are a medical assistant named Meddy. You will help the user with their medical queries. "
    "These queries can be about symptoms, medications, or any other medical-related questions. "
    "You will also help the user with their medical history and any other information they need. "
    "Please write a response that has no new lines or any formatting."
)

# This stores the conversation history as plain text
history = [f"System: {instructions}"]

def generate_response(message):
    # Add user message to history
    history.append(f"User: {message}")

    # Compose full prompt from history
    full_prompt = "\n".join(history)

    # Generate response using plain string content
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=full_prompt
    )

    # Append model response to history
    history.append(f"{response.text}")

    return response.text
