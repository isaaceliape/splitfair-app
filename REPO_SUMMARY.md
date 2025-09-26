# Summary of the "Splitfair" Repository

## 1. Project Name and Purpose

- **Name:** Splitfair
- **Purpose:** The "Splitfair" application is a tool designed for splitting expenses or costs fairly among individuals. The name itself, along with components like `ShareCanvas.js` (for visualizing the split) and `NumberPad.js` (for input), strongly suggests its function is to calculate and display how shared costs should be divided. The presence of `manifest.json` and various icon sizes also indicates it's designed as a Progressive Web App (PWA).

## 2. Core Technologies

- **Frontend Framework:** Web Components (native browser APIs).
- **State Management:** Custom global store (replaces Vuex), used for managing application-wide state such as user inputs and calculation results (e.g., in `src/store/globalStore.js`).
- **Canvas Interaction:** Konva (version 6.0.0), a 2D canvas library, used for the `ShareCanvas.js` component to create a visual and potentially interactive representation of the expense split.
- **Build & Development Tooling:** Vite (version 5.4.2), used for fast development server, building the application, and managing configurations.
- **Code Linting:** ESLint (version 8.57.0) with Prettier integration, ensuring code quality and consistency.

## 3. Project Structure

- **`public/`:** Contains static assets like `index.html` (the main page), `favicon.ico`, PWA icons (`icon-*.png`), and `manifest.json`. These files are copied directly to the build output.
- **`src/`:** The main application source code directory.
  - **`assets/`:** Stores static assets (images, logos) that are imported into components.
  - **`components/`:** Contains reusable Web Components. Key components include:
    - `App.js`: The core UI for inputting names, salaries, expenses, and displaying results. It handles calculation logic and interacts with the global store.
    - `NumberPad.js`: For numerical input.
    - `ShareCanvas.js`: For displaying the split results visually using Konva.
    - `AboutSection.js` & `DownloadAppSection.js`: For informational content and PWA-related prompts.
  - **`store/`:** Houses the global store, with `globalStore.js` defining the application's state management logic.
  - **`styles/`:** Contains CSS files, including `variables.css` for global styling definitions.
- **Key Files:**
  - `src/main.js`: Initializes the Web Components and mounts the application.
  - `src/Application.js`: The root Web Component that wraps `components/App.js` and other top-level sections.
  - `package.json`: Lists dependencies, scripts for development, build, and deployment.
  - `vite.config.js`: Configuration for Vite.

## 4. Development Workflow

- **Setup:**
  1.  Install dependencies: `bun install` (downloads packages listed in `package.json`).
- **Running the App Locally:**
  1.  Start development server: `bun run dev` (uses Vite for hot-reloading).
- **Code Quality:**
  1.  Lint files: `bun run lint` (uses `eslint` to check for style and errors).
  2.  Fix lint issues: `bun run lint:fix` (uses `eslint --fix`).

## 5. Build and Deployment

- **Production Build:**
  1.  Command: `bun run build` (uses Vite build).
  2.  Output: Generates optimized static files (HTML, CSS, JS) in the `docs/` directory.
- **Deployment Process:**
  1.  The application is deployed to GitHub Pages from the `docs/` folder on the master branch.

## 6. Overall Impression

The "Splitfair" repository appears to be a well-structured Web Components application, likely a Progressive Web App (PWA), designed for fairly splitting expenses. It utilizes modern web standards with Vite for tooling and follows common project organization patterns. The inclusion of Konva for canvas interactions suggests an emphasis on a user-friendly and visual way to present the expense split. The development, build, and deployment processes are clearly defined through scripts, indicating a streamlined workflow. The use of ESLint with Prettier integration points to a focus on code quality.
