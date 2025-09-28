# Chain Exam

Welcome to **Chain Exam**, a project developed during the **BSA Hackathon 2025**.  

The goal of this project is to leverage the **Sui blockchain** to build a decentralized exam submission and grading system for universities.  

---

##  Features

- **Exam submission**: Students can securely submit exams as digital assets on Sui.  
- **Access control rights system**: Students and Correctors have a small set of functions they have the right to call  
-  **Role management**: Admins, students, and correctors each receive capability objects (`Cap`) that define their permissions.  
-  **End-to-end workflow**: From exam upload, anonymization, grading, to student feedback distribution.  
-  **Different Languages**: Python backend, Sui Move smart contracts, and a React/TypeScript frontend.  

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



