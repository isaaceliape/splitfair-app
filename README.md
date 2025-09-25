# Splitfair

![Splitfair Logo](https://github.com/isaaceliape/splitfair-pwa/blob/master/public/icon-144x144.png?raw=true)

A Progressive Web App (PWA) for splitting bills and expenses fairly between multiple people. Built with Vue.js 3 and modern web technologies.

## Features

- **Bill Splitting**: Easily split expenses between multiple people
- **Real-time Calculations**: Instant calculations as you input amounts
- **PWA Support**: Installable on mobile devices
- **Responsive Design**: Works on desktop and mobile
- **Number Pad Interface**: Touch-friendly input interface
- **Share Results**: Share split results with others

## Tech Stack

- **Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vue CLI
- **Runtime**: Bun
- **Styling**: CSS with CSS Variables
- **State Management**: Vuex 4
- **Canvas**: Konva.js for shareable results
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
bun run serve
```

### Building for Production

```bash
# Build for production
bun run build
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

```bash
# Build and deploy (custom deployment script)
bun run deploy
```

## Project Structure

```
splitfair-pwa/
├── public/                 # Static assets
│   ├── index.html         # Main HTML file
│   ├── manifest.json      # PWA manifest
│   └── icons/             # App icons
├── src/
│   ├── components/        # Vue components
│   │   ├── App.vue       # Main app component
│   │   ├── NumberPad.vue # Number input component
│   │   └── ...
│   ├── store/            # Vuex store
│   ├── styles/           # Global styles
│   └── main.js           # App entry point
├── .eslintrc.json        # ESLint configuration
├── .prettierrc          # Prettier configuration
├── vue.config.js        # Vue CLI configuration
└── package.json         # Dependencies and scripts
```

## Configuration

See [Vue CLI Configuration Reference](https://cli.vuejs.org/config/) for advanced configuration options.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `bun run lint` and `bun run format` to ensure code quality
5. Test your changes
6. Submit a pull request

## License

This project is licensed under the MIT License.
