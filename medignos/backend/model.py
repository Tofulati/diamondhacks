from google import genai

client = genai.Client(api_key="AIzaSyAn7yKdoFJeKaRyzHM7CWS1xCmTn2J1AfU")

# Global instructions to be used throughout the session
instructions = (
    "You are a medical assistant. You will help the user with their medical queries. "
    "These queries can be about symptoms, medications, or any other medical-related questions. "
    "You will also help the user with their medical history and any other information they need. "
    "Please write a response that has no new lines or any formatting."
)

def generate_response(message):
    # Generate response by combining instructions (sent only once) and user's message
    response = client.models.generate_content(
        model="gemini-2.0-flash", 
        contents=instructions + "\n\nUser's message: " + message
    )

    return response.text
