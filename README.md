# Splitfair

![Splitfair Logo](https://github.com/isaaceliape/splitfair-pwa/blob/master/public/icon-144x144.png?raw=true)

A Progressive Web App (PWA) for splitting bills and expenses fairly between multiple people. Built with native Web Components and modern web technologies.

## Features

- **Bill Splitting**: Easily split expenses between multiple people
- **Real-time Calculations**: Instant calculations as you input amounts
- **PWA Support**: Installable on mobile devices
- **Responsive Design**: Works on desktop and mobile
- **Number Pad Interface**: Touch-friendly input interface
- **Share Results**: Share split results with others

## Tech Stack

- **Framework**: Native Web Components
- **Build Tool**: Vite
- **Runtime**: Bun
- **Styling**: CSS with CSS Variables and Shadow DOM
- **State Management**: Global JavaScript Store
- **Canvas**: Konva.js for shareable results
- **PWA**: Vite PWA Plugin
- **Linting**: ESLint with Prettier integration

## Project Setup

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start development server with hot reload
bun run dev
```

### Building for Production

```bash
# For Web Components, static files are served directly
# No build step required - files are ready to serve
bun run preview
```

### Code Quality

```bash
# Lint and fix code issues
bun run lint

# Format code with Prettier
bun run format

# Check code formatting
bun run format:check
```

### Deployment

The application is automatically deployed to GitHub Pages on every push to the main branch using GitHub Actions.

**Live URL**: https://isaaceliape.github.io/splitfair-pwa/

**Deployment Process**:

- Automatic deployment triggered by pushes to `main` branch
- Manual deployment available via GitHub Actions workflow dispatch
- Build process includes linting, formatting checks, and PWA generation

### Preview Production Build

```bash
# Preview the application as it would be served in production
bun run preview
```

## Project Structure

```
splitfair-pwa/
├── public/                 # Static assets
│   ├── index.html         # Main HTML file
│   ├── manifest.json      # PWA manifest
│   └── icons/             # App icons
├── src/
│   ├── components/        # Web Components
│   │   ├── AboutSection.js    # About section component
│   │   ├── App.js            # Main app component
│   │   ├── NumberPad.js      # Number input component
│   │   ├── ShareCanvas.js    # Canvas sharing component
│   │   └── ...
│   ├── store/            # Global state management
│   │   └── globalStore.js    # Global store (replaces Vuex)
│   ├── styles/           # Global styles
│   └── main.js           # App entry point
├── docs/                 # Documentation
│   ├── modernize-build-stack-epic.md
│   ├── web-components-conversion.md
│   └── ...
├── .eslintrc.json        # ESLint configuration
├── .prettierrc          # Prettier configuration
├── vite.config.js       # Vite configuration
├── bun.lockb            # Bun lockfile
└── package.json         # Dependencies and scripts
```

## Configuration

- **Vite**: See `vite.config.js` for build configuration
- **ESLint**: See `.eslintrc.json` for linting rules
- **Prettier**: See `.prettierrc` for code formatting
- **PWA**: Configured via Vite PWA plugin
- **Web Components**: Custom elements are registered in their respective `.js` files
- **State Management**: Global store configured in `src/store/globalStore.js`

## Bun Features

This project leverages Bun's capabilities:

- **Fast Installation**: `bun install` is significantly faster than npm
- **Hot Reload**: `bun run dev` provides instant updates during development
- **Native TypeScript**: Direct execution of TypeScript files
- **Built-in Tools**: Uses `bunx` for running CLI tools without installation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `bun run lint` and `bun run format` to ensure code quality
5. Test your changes in the browser
6. Submit a pull request

### Development Workflow

```bash
# Install dependencies (fast with Bun)
bun install

# Start development with hot reload
bun run dev

# Run linting and formatting
bun run lint:fix
bun run format

# Preview production build
bun run preview
```

## License

This project is licensed under the MIT License.
