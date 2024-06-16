# Personal Task Manager

This is a Task Management application built with Svelte and SvelteKit. It allows users to manage tasks, filter them by status, and sort them. The application supports lazy loading for components and handles errors gracefully.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.x or later)
- npm (v6.x or later) 
- A code editor like VS Code

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Clone the Repository

git clone git@github.com:MohamedArifulla/PersonalTaskManager-FE.git

Install Dependencies
Use npm to install the project dependencies.

Using npm:
npm install

Running the Development Server
Start the development server to run the application locally.

Using npm:
npm run dev

Open your web browser and go to http://localhost:5173/ to see the application running.

Features

Task Management: Create, edit, delete tasks.
Status Filter: Filter tasks by their status (Pending, In Progress, Completed).
Sorting: Sort tasks based on different criteria.
Lazy Loading: Load components lazily to improve performance.
Error Handling: Gracefully handle errors and display appropriate messages.

Backend Setup
To set up the backend server, follow these steps:

GitHub URL for Backend - https://github.com/MohamedArifulla/PersonalTaskManager-BE

Clone the backend repository:
git clone git@github.com:MohamedArifulla/PersonalTaskManager-BE.git

Install dependencies and start the server:
npm install
npm run start
Server will be running on port 3000

Additional Scripts

Development Mode:
npm run dev 
Runs the app in the development mode.
Runs the app in development mode. Open http://localhost:5173/ to view it in the browser

Build for Production:
npm run build 
Builds the app for production. It correctly bundles Svelte in production mode and optimizes the build for the best performance

Preview Production Build:
npm run preview 
Locally preview the production build.

Contact:
Mohamed Arifulla A
Project Link: https://github.com/MohamedArifulla/PersonalTaskManager-FE

Deployed Application Link: https://personal-task-manager-fe.vercel.app/