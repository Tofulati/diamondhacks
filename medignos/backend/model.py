from google import genai

client = genai.Client(api_key="AIzaSyAn7yKdoFJeKaRyzHM7CWS1xCmTn2J1AfU")

response = client.models.generate_content(
    model="gemini-2.0-flash", contents="Explain how AI works in a few words"
)
print(response.text)