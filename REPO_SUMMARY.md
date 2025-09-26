# Summary of the "Splitfair" Repository

## 1. Project Name and Purpose

- **Name:** Splitfair
- **Purpose:** The "Splitfair" application is a tool designed for splitting expenses or costs fairly among individuals. The name itself, along with components like `ShareCanvas.vue` (for visualizing the split) and `Numberpad.vue` (for input), strongly suggests its function is to calculate and display how shared costs should be divided. The presence of `manifest.json` and various icon sizes also indicates it's designed as a Progressive Web App (PWA).

## 2. Core Technologies

- **Frontend Framework:** Vue.js (specifically version 3.4.21).
- **State Management:** Vuex (version 4.1.0), used for managing application-wide state such as user inputs and calculation results (e.g., in `src/store/AppStore.js`).
- **Canvas Interaction:** Konva (version 6.0.0), a 2D canvas library, likely used for the `ShareCanvas.vue` component to create a visual and potentially interactive representation of the expense split.
- **Build & Development Tooling:** Vue CLI (version 5.0.8), used for project scaffolding, running the development server, building the application, and managing configurations.
- **Code Linting:** ESLint (version 8.57.0) with the Airbnb configuration (`@vue/eslint-config-airbnb`), ensuring code quality and consistency.
- **Other Libraries:** `vue-range-slider` and `vue2-touch-events` are also listed, suggesting UI elements for range selection and specific touch event handling.

## 3. Project Structure

- **`public/`:** Contains static assets like `index.html` (the main page), `favicon.ico`, PWA icons (`icon-*.png`), and `manifest.json`. These files are copied directly to the build output.
- **`src/`:** The main application source code directory.
  - **`assets/`:** Stores static assets (images, logos) that are imported into components and processed by Webpack.
  - **`components/`:** Contains reusable Vue components. Key components include:
    - `App.vue`: The core UI for inputting names, salaries, expenses, and displaying results. It handles calculation logic and interacts with the Vuex store.
    - `Numberpad.vue`: For numerical input.
    - `ShareCanvas.vue`: For displaying the split results visually using Konva.
    - `AboutSection.vue` & `DownloadAppSection.vue`: Likely for informational content and PWA-related prompts.
  - **`store/`:** Houses Vuex store modules, with `AppStore.js` defining the application's state management logic.
  - **`styles/`:** Contains CSS files, including `variables.css` for global styling definitions.
- **Key Files:**
  - `src/main.js`: Initializes the Vue app, registers the Vuex store, and mounts the root component.
  - `src/Application.vue`: The root Vue component that wraps `components/App.vue` and other top-level sections.
  - `package.json`: Lists dependencies, scripts for development, build, and deployment.
  - `vue.config.js`: Configuration for Vue CLI.

## 4. Development Workflow

- **Setup:**
  1.  Install dependencies: `npm install` (downloads packages listed in `package.json`).
- **Running the App Locally:**
  1.  Start development server: `npm run serve` (uses `vue-cli-service serve` for hot-reloading).
- **Code Quality:**
  1.  Lint files: `npm run lint` (uses `eslint .` to check for style and errors).
  2.  Fix lint issues: `npm run lint:fix` (uses `eslint . --fix`).

## 5. Build and Deployment

- **Production Build:**
  1.  Command: `npm run build` (uses `vue-cli-service build`).
  2.  Output: Generates optimized static files (HTML, CSS, JS) in the `docs/` directory.
- **Deployment Process:**
  1.  The `deploy` script in `package.json` is: `"deploy": "npx vue-cli-service build && rsync -av ./docs/* ../splitsmart-deploy/"`.
  2.  This script first builds the application.
  3.  Then, it uses `rsync` (a file synchronization utility) to copy the contents of the `docs/` directory to a target directory named `splitsmart-deploy/`, located one level above the project root.
  4.  **Likely Method:** The `splitsmart-deploy/` directory is probably a staging area for deployment, potentially another Git repository (e.g., for GitHub Pages) or a folder directly served by a web server. After running the script, further steps might involve committing and pushing changes if `splitsmart-deploy/` is a Git repo.

## 6. Overall Impression

The "Splitfair" repository appears to be a well-structured Vue.js application, likely a Progressive Web App (PWA), designed for fairly splitting expenses. It utilizes standard Vue ecosystem tools (Vue CLI, Vuex) and follows common project organization patterns. The inclusion of Konva for canvas interactions suggests an emphasis on a user-friendly and visual way to present the expense split. The development, build, and deployment processes are clearly defined through npm scripts, indicating a streamlined workflow. The use of ESLint with Airbnb's configuration points to a focus on code quality.
