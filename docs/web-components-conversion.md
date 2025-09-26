# Web Components Conversion Documentation

## Overview

This document outlines the conversion of Vue.js components to native Web Components in the Splitfair PWA project. The goal was to replace Vue.js with vanilla JavaScript Web Components while preserving all styles and functionality.

## Components Converted

### 1. AboutSection Component

- **Original**: `src/components/AboutSection.vue`
- **Converted**: `src/components/AboutSection.js`
- **Web Component Tag**: `<about-section>`
- **Features**:
  - Toggle overlay on click
  - Shadow DOM for style encapsulation
  - Emits custom event `is-menu-open`

### 2. DownloadAppSection Component

- **Original**: `src/components/DownloadAppSection.vue`
- **Converted**: `src/components/DownloadAppSection.js`
- **Web Component Tag**: `<download-app-section>`
- **Features**:
  - Desktop/Mobile download links overlay
  - Responsive behavior
  - Shadow DOM styling

### 3. NumberPad Component

- **Original**: `src/components/NumberPad.vue`
- **Converted**: `src/components/NumberPad.js`
- **Web Component Tag**: `<number-pad>`
- **Features**:
  - Numeric keypad with backspace and enter
  - Touch/click and keyboard support
  - Visual feedback on button press
  - Emits `tapped-button` events

### 4. ShareCanvas Component

- **Original**: `src/components/ShareCanvas.vue`
- **Converted**: `src/components/ShareCanvas.js`
- **Web Component Tag**: `<share-canvas>`
- **Features**:
  - Canvas drawing using Konva.js
  - Accepts props via attributes (first-person, second-person, currency)
  - Renders shareable split calculation visualization

### 5. App Component

- **Original**: `src/components/App.vue`
- **Converted**: `src/components/App.js`
- **Web Component Tag**: `<app-component>`
- **Features**:
  - Main application logic
  - Salary and expense input handling
  - Calculation engine for split percentages
  - Integration with global store
  - Responsive results display

### 6. Application Component

- **Original**: `src/Application.vue`
- **Converted**: `src/Application.js`
- **Web Component Tag**: `<splitfair-application>`
- **Features**:
  - Root application component
  - Media query handling for desktop/mobile
  - Menu state management
  - Child component orchestration

## State Management

### Global Store

- **File**: `src/store/globalStore.js`
- **Replaces**: Vuex store
- **Features**:
  - Simple object-based state management
  - Mutations for updating first/second person data
  - Currency and percentage tracking
  - Reset functionality

## Key Implementation Details

### Shadow DOM

- All components use Shadow DOM for style encapsulation
- CSS custom properties (variables) defined in `:host`
- Preserves scoped styling from Vue components

### Event Handling

- Custom events replace Vue's `$emit`
- Event listeners attached in `connectedCallback`
- Proper cleanup in `disconnectedCallback` where needed

### Reactivity

- Manual re-rendering via `render()` method
- State changes trigger DOM updates
- No automatic reactivity like Vue

### Props/Attributes

- Component properties passed as HTML attributes
- JSON parsing for complex objects (e.g., person data)
- `attributeChangedCallback` for dynamic updates

### Lifecycle

- `connectedCallback` for initialization
- `render()` method for DOM updates
- Event listener management

## File Structure Changes

```
src/
├── components/
│   ├── AboutSection.js (converted from .vue)
│   ├── DownloadAppSection.js (converted from .vue)
│   ├── NumberPad.js (converted from .vue)
│   ├── ShareCanvas.js (converted from .vue)
│   └── App.js (converted from .vue)
├── Application.js (converted from .vue)
├── main.js (updated for Web Components)
└── store/
    └── globalStore.js (replaces Vuex)
```

## Dependencies

- **Konva.js**: Retained for canvas drawing in ShareCanvas
- **No Vue.js**: Completely removed
- **Native Web Components**: Uses browser native APIs

## Browser Support

- Modern browsers with Web Components support
- Shadow DOM v1
- Custom Elements v1
- ES6+ JavaScript features

## Build and Development

- **Linting**: ESLint configured for JavaScript
- **Formatting**: Prettier for code consistency
- **Build**: Uses existing Vue CLI setup (may need adaptation)
- **Serve**: Standard web server for static files

## Known Limitations

1. **Reactivity**: Manual re-rendering vs Vue's automatic reactivity
2. **Touch Events**: Simplified to click events (original used vue2-touch-events)
3. **Performance**: May require optimization for complex updates
4. **Browser Compatibility**: Requires modern browser support

## Future Improvements

1. Implement a lightweight reactivity system
2. Add proper touch event handling
3. Optimize rendering performance
4. Add unit tests for Web Components
5. Consider using a Web Components library for enhanced features

## Migration Notes

- All original functionality preserved
- Styles maintained through Shadow DOM
- Event system adapted to Custom Events
- State management simplified from Vuex to plain object
- Component communication via events and attributes
