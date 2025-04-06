# Medignos

View DevPost: https://devpost.com/software/medignos

Your health chat bot. Want to learn more about symptoms that you have? Want an immediate diagnosis? Medignos helps with that.

Goals:
- [x] Chat service
  - [x] Describe issue to bot
    - [x] Get response
      - [x] Gemini? Health model?
    - [x] Walk through diagnosis process
    - [x] Steps for addressing the issue
      - [x] Give resources
      - [x] Potential solutions
  - [x] Send in images for diagnosis
    - [ ] Create ml model (in progress, but time constrained)
    - [ ] Model classifies data
      - [ ] Skin disease classification
    - [x] Send information to frontend

Additional Goals:
- [ ] Create login page (w/ auth0)
- [ ] Integrate database to save user info
- [ ] Expand model classification
  - [ ] Look at other medical issues
- [ ] Develop into working mobile application

Running the application (locally):
1. Clone the repo
```
    $git clone https://github.com/Tofulati/medignos.git
```
2. Go into project repo
```
    $cd ~/medignos/frontend
```
3. Install dependencies
```
    $(sudo) npm install
```
4. Run the program
```
    $(sudo) npm run dev
```
5. Run the backend server
```
    # In a seperate terminal
    $cd ~/medignos/backend
    $(sudo) python app.py
```
6. Open npm link and ask!

References:
- [https://www.kaggle.com/datasets/dhivyeshrk/diseases-and-symptoms-dataset](https://www.kaggle.com/datasets/pacificrm/skindiseasedataset) (dataset)
- ChatGPT / Gemini AI (assistance with coding and API for backend)


> Albert, Andrei, Angel, Domonick (UCSD DiamondHacks 2025)
