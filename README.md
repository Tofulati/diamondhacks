# Medignos

Medignos offers immediate, cost-effective healthcare support to those who need it most. Get instant symptom analysis and guidance through text or images, with detailed diagnoses—no appointment needed.

## Inspiration
We want to help people in under-represented communities to gain access to more cost-efficient and readily accessible healthcare assistance. 

## What it does
There are already applications that allow you to connect with doctors and health physicians, however, all of them require you to schedule meetings with these professionals. Medignos addresses this issue by allowing you to interact with a "healthcare-backed" dataset, which would allow you to learn more about your symptoms and health issues at your fingertips. You can ask the model to give you a quick diagnosis of your health condition, or upload an image to assist the model. With this information, the model will give you a detailed walk-through of how to address this issue and what the next steps would be. Although it may not be as good as a trained physician, it allows you to give immediate responses when time doesn't permit scheduling meetings. Moreover, once you are done with your chat, you can save it to show physicians and doctors, who can elaborate on your symptoms and give you a better idea of your diagnosis.

## How we built it
This project was built using React as the front-end of the project (as a phone emulator), and a back-end utilizing Python flask. Using React as the front-end framework, we created various components integrated with the screen UI to emulate a phone screen for a user to interact with. Within this UI, the user can add text and upload images to send to the back-end model. As for the back-end, we built our model around the Gemini API, fine-tuned on receiving healthcare information from healthcare datasets. After the user sends in a message and/or image, it is sent to the model for processing. In addition to this, we developed a machine learning model to detect health conditions (skin diseases, for hackathon time constraints) for the user to add additional information about this condition. Finally, taking all of the information it received, the model would generate a response that is in tune with healthcare diagnosis and walks through the steps the user should take. 

## Challenges we ran into
We had issues with the API integration within the chat and training the model. For the API integration, since it was our first time utilizing APIs to create a front-to-end chatbot, we had issues with getting the porting and posting information to work. In addition, there were issues with async processes, which interfered with other API retrieval processes. As for training the model, it was also our first time training a machine learning model (from scratch and references) on a large data set for image classification. We watched multiple YouTube videos and coding demonstrations to try to address the issues that we encountered (correct model architecture, memory/CPU issues, training/prediction errors). However, we eventually overcame these issues by continuously researching and debugging our steps. 

## Accomplishments that we're proud of
We were able to create a fully working chatbot that was connected to a working API and machine learning model to address text and image inputs. After hours of debugging and trying to create integrations from front to back of the application and training the model fully, we were able to get the entire project to work fresh. 

## What we learned
Since, for most of us, it was our first Hackathon and integration of a full-stack project from scratch under a time constraint, it was definitely a challenge. However, throughout the time we were working on the project and workshops, we learned a great deal about software development and the process that came along with it. 

## What's next for Medignos
Whilst Medignos's current capabilities are on simple datasets and internet-based responses, we plan on integrating a larger and stronger model that is more in tune with addressing healthcare issues. We plan on introducing features such as adding medical records within the chatbot to allow your experience with the bot to be smoother, as it can create diagnoses that follow pre-existing conditions. In addition, we plan on introducing a live chat with doctors and physicians, building off of applications that already exist (face-to-face healthcare apps). In addition, we also hope to integrate an authentication system and sync with patient healthcare organizations to create a more streamlined experience for patients when they require healthcare assistance.

> Retrieved from DevPost: https://devpost.com/software/medignos

## Goals
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
  - [x] Save text files for later use
  - [x] Functional UI
    - [x] Text box
    - [x] Input image to chat
    - [x] Readable text bubble/responses
    - [x] Button functionality
  - [ ] Push application (front and back) into working webpage (constrained to time)

Additional Goals:
- [ ] Create login page (w/ auth0)
- [ ] Integrate database to save user info
- [ ] Expand model classification
  - [ ] Look at other medical issues
- [ ] Develop into working mobile application

## Running the application (locally):
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

## References:
- [https://www.kaggle.com/datasets/dhivyeshrk/diseases-and-symptoms-dataset](https://www.kaggle.com/datasets/pacificrm/skindiseasedataset) (dataset)
- ChatGPT / Gemini AI (assistance with coding and API for backend)


> Albert, Andrei, Angel, Domonick (@ UCSD DiamondHacks 2025)
