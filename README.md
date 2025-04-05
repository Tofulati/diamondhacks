# Medignos

Your health chat bot. Want to learn more about symptoms that you have? Want an immediate diagnosis? Medignos helps with that.

Goals:
- [ ] Chat service
  - [ ] Describe issue to bot
    - [ ] Get response
      - [ ] Gemini? Health model?
    - [ ] Walk through diagnosis process
    - [ ] Steps for addressing the issue
      - [ ] Give resources
      - [ ] Potential solutions
  - [ ] Send in images for diagnosis
    - [ ] Create ml model
    - [ ] Model classifies data
      - [ ] Skin disease classification
    - [ ] Send information to frontend

Additional Goals:
- [ ] Create login page (w/ auth0)
- [ ] Integrate database to save user info
- [ ] Expand model classification
  - [ ] Look at other medical issues
- [ ] Develop into working mobile application
- [ ] Integrate health model into giving responses

Running the application (locally):
1. Clone the repo
```
    git clone https://github.com/Tofulati/diamondhacks.git
```
2. Go into project repo
```
    cd ~/diamondhacks/frontend
```
3. Install dependencies
```
    (sudo) npm install
```
4. Run the program
```
    (sudo) npm run dev
```

References:
- https://www.kaggle.com/datasets/dhivyeshrk/diseases-and-symptoms-dataset (dataset)
- ChatGPT / Gemini AI (assistance with coding)


> Albert, Andrei, Angel, Domonick (UCSD DiamondHacks 2025)