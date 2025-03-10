Sammeln von ArbeitsbereichsinformationenHere is a README file for your project:

# Stocky - Inventory Management & Barcode Scanner

Stocky is an inventory management and barcode scanner application developed with React, TypeScript, and Vite. This application allows users to scan, add, edit, and manage items.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Technologies](#technologies)
- [Authors](#authors)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/EvgenyEysner/frontend.git
   cd frontend
   ```
2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a .env file in the root directory and add the required environment variables:
   ```env
   VITE_BACKEND_URL=http://127.0.0.1:8000
   ```

## Usage

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```plaintext
├── public/
│   ├── assets/
│   ├── favicon.ico
│   ├── logo192x192.png
│   ├── logo256x256.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── store/
│   ├── UI/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .dockerignore
├── .editorconfig
├── .env
├── .eslintrc.cjs
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Available Scripts

In the project directory, you can run the following scripts:

### `npm run dev`

Starts the development server.

### `npm run build`

Builds the application for production.

### `npm run preview`

Previews the production build.

### `npm run lint`

Runs ESLint to check for code issues.

## Environment Variables

The application uses environment variables defined in a .env file in the root directory. Example:

```env
VITE_BACKEND_URL=http://127.0.0.1:8000
```

## Technologies

- React
- Vite
- Zustand (State Management)
- Tailwind CSS
- Material-UI
- React Router
- Vite PWA Plugin
