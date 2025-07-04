# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### Folder structure

- src

  - api `# Folder with all the functionallity to connect with the backend server.`

    - clients `# fetch methods to get and send data to the server.`
    - hooks `# Hooks which use react query or another caching system and use the prev clients folder content to serve as a middleware for the server and the client.`
    - models `# Database types to be used in this project.`
    - utils `# Helpers and other shared functions or configs to be used in this api folder.`

  - assets `# Media files of the project.`

  - app `# The main content of the application `

  - shared `# Shared elements between different modules`
    - ui `# Custom UI components which are used in two or more places of the app.`
    - config `# Config files and typed env variables of the project.`
    - utils `# Other utils files (non-related to the API) to be used in the project.`

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev-start:mock
```
