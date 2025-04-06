from google import genai

client = genai.Client(api_key="AIzaSyAn7yKdoFJeKaRyzHM7CWS1xCmTn2J1AfU")

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
    history.append(f"Assistant: {response.text}")

    return response.text
