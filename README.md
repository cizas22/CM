# Vite React Project

This is a Vite-based React project template with TypeScript. It includes scripts for development, building, linting, and running tests.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Development](#development)
    - [Building](#building)
    - [Linting](#linting)
    - [Preview](#preview)
    - [Testing](#testing)

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed on your machine before proceeding.

1. Clone this repository:

   ```bash
   git clone https://github.com/cizas22/CM.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CM
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

### Development

To run the development server, use the following command:

```bash
npm run dev
```

This will start the Vite development server, and you can access your application at `http://localhost:5173`.

### Building

To build the project, execute the following command:

```bash
npm run build
```

This script will transpile TypeScript files using `tsc` and then bundle the application with Vite.

### Linting

Lint your TypeScript and TypeScript React files using the following command:

```bash
npm run lint
```

Linting is done using ESLint, and you can customize the linting rules in the `.eslintrc` file.

### Preview

To preview the production build locally, use the following command:

```bash
npm run preview
```

This will serve the production build of your application.

### Testing

Run tests using the following command:

```bash
npm test
```

This project uses `vitest` for testing. You can add your test cases in the `tests` directory.

Feel free to customize the scripts and configuration files according to your project requirements. Happy coding!
