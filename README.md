# Chain Exam

Welcome to **Chain Exam**, a project developed during the **BSA x SUI Hackathon 2025**.  

The goal of this project is to leverage the **Sui blockchain** to build a decentralized exam submission and grading system for universities.  

Demo video:
[Demo](https://youtu.be/F3ViuZZCFQo)

---

##  Features

- **Exam submission**: Students can securely submit exams as digital assets on Sui.  
- **Access control rights system**: Students and Correctors have a small set of functions they have the right to call  
-  **Role management**: Admins, students, and correctors each receive capability objects (`Cap`) that define their permissions.  
-  **End-to-end workflow**: From exam upload, anonymization, grading, to student feedback distribution.  
-  **Different Languages**: Python backend, Sui Move smart contracts, and a React/TypeScript frontend.  

---
## Screenshots

### Home page
![Home page screenshot](homepage.png)

### Corrector point of view
![Corrector point of view](corrector_pov.png)

### Admin point of view
![Admin point of view](admin_pov.png)
![Admin point of view 2](admin_pov2.png)

### Student point of view after receiving feedbacks
![Student point of view](student_pov.png)

---

## Quick Start

### 1. Backend (Python)

First you need to go in [`Chain_Exam/backend`]

Then run the Python backend with the OCR model:

-**cd backend**

-**pip install -r requirements.txt**

-**python backend.py**

## 2. Smart Contract (Move)

The Move smart contract is the **core of the project** (the hackathon theme was to build on Sui).

Location: [`move/sources/ChainExam.move`](move/sources/ChainExam.move)  
You have to publish the Smart Contract and the wallet used for publishing will be assigned the admin role.
To run tests:

-**cd move**

-**sui move test**

## 3. React Frontend

The React/TypeScript frontend is where most of the UI lives.
Pages are in: src/UI/pages

What we need to do to start the app:
-**pnpm install**

-**pnpm dev**

Or if you use yarn:
-**yarn install**

-**yarn dev**

## 4. REMINDER

To be able to use the full functionalities, the user needs to change the ADMIN address in the ChainExam.move file to put their own admin address.

Then, change also the values (like package ID) in the constants.ts file located at [`src/UX`].

Also add an API_KEY.txt at the folder [`backend`] to be able to use the ML algorithm for OCR.



