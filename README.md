# Bank Simulation

This is a simple bank simulation project that allows users to create accounts, make transactions, and view their transaction history.

The project is divided into two parts: a server and a client. The server is responsible for handling user authentication, managing user accounts, and processing transactions. The client is responsible for displaying the user interface and interacting with the server.

The project uses MongoDB for storing user data and transaction history. Passport is used for user authentication, and Cors is used to allow cross-origin requests from the client.

The project also uses React for the front-end and Tailwind CSS for styling. Motion One is used for animating the movement of the user's balance.

## Setup

1. Clone the repository
2. Install the dependencies in both the server and client folders
3. Create a `.env` file based on the `.env_template` file
4. Run the server

## Running the server

```bash
npm run dev
```

## Running the client

```bash
npm run dev
```

## Technologies

### Back-end

- Node.js
- Express
- MongoDB
- Passport
- Cors

### Front-end

- React
- Tailwind CSS
- Motion One

## folder structure

```
.
├── client
│   ├── src
│   │   ├── pages
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LogIn.jsx
│   │   │   └── css
│   │   │       └── main.css
│   │   ├── Router.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── server
│   ├── app.js
│   ├── domain
│   │   ├── models
│   │   │   ├── movementsModel.js
│   │   │   └── usersModel.js
│   │   └── routes
│   │       ├── mainRouter.js
│   │       ├── movementsRouter.js
│   │       └── userRoutes.js
│   ├── infrastructure
│   │   ├── database
│   │   │   ├── mongoDB.js
│   │   │   └── mongoDB.js
│   │   ├── middlewares
│   │   │   ├── errorHandling.js
│   │   │   ├── rateLimit.js
│   │   │   └── sessionManager.js
│   │   └── server
│   │       └── server.js
│   ├── package.json
│   └── README.md
├── .env_template
├── README.md
└── package.json
```
