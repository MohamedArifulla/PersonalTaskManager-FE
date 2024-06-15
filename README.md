# Task Management Application

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
cd task-management-app

Install Dependencies
Use npm  to install the project dependencies.

Using npm:
npm install

Set Up Environment Variables
Create a .env file in the root of the project and add your environment variables. For example:
VITE_API_URL=http://localhost:3000/api
VITE_AUTH_TOKEN=your-auth-token

Running the Development Server
Start the development server to run the application locally.

Using npm:
npm run dev

Open your web browser and go to http://localhost:3000 to see the application running.

Project Structure
Here's an overview of the project's structure:

svelte-app/
├── .svelte-kit/          # SvelteKit generated files
├── node_modules/         # Node.js modules
├── src/
│   ├── lib/
│   ├── routes/
│   │   ├── about/
│   │   │   └── +page.svelte
│   │   ├── login/
│   │   │   └── +page.svelte
│   │   ├── register/
│   │   │   └── +page.svelte
│   │   ├── tasks/
│   │   │   ├── category/
│   │   │   │   └── [category]/+page.svelte
│   │   │   ├── [id].svelte
│   │   │   ├── +page.svelte
│   │   │   └── +layout.svelte
│   │   └── +page.svelte
│   ├── components/
│   │   ├── CategoryFilter.svelte
│   │   ├── Footer.svelte
│   │   ├── Header.svelte
│   │   ├── SortTasks.svelte
│   │   ├── TaskCard.svelte
│   │   ├── TaskForm.svelte
│   │   └── UserProfile.svelte
│   ├── stores/
│   │   ├── taskStore.js
│   │   └── userStore.js
│   ├── app.css
│   └── app.html
├── package.json
└── README.md


Features

Task Management: Create, edit, delete tasks.
Status Filter: Filter tasks by their status (Pending, In Progress, Completed).
Sorting: Sort tasks based on different criteria.
Lazy Loading: Load components lazily to improve performance.
Error Handling: Gracefully handle errors and display appropriate messages.

Available Scripts
In the project directory, you can run:

npm run dev 
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

npm run build 
Builds the app for production to the build folder.
It correctly bundles Svelte in production mode and optimizes the build for the best performance.

npm run preview 
Locally preview the production build.


Fork the Project
Create your Feature Branch (git checkout -b feature/YourFeature)
Commit your Changes (git commit -m 'Add some feature')
Push to the Branch (git push origin feature/YourFeature)
Open a Pull Request


Contact
Mohamed Arifulla - arifulla1996@gmail.com

Project Link: https://github.com/MohamedArifulla/PersonalTaskManager-FE

