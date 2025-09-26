# User Story: Remove Vue.js from Splitfair PWA

## User Story

**As a** developer maintaining the Splitfair PWA project,  
**I want** to remove Vue.js as a dependency,  
**so that** I can reduce bundle size, eliminate framework overhead, and have more control over the application's architecture.

## Acceptance Criteria

### Functional Requirements

- [ ] All Vue components successfully converted to native Web Components
- [ ] Application functionality remains identical to Vue version
- [ ] All user interactions work as expected
- [ ] Responsive design and styling preserved
- [ ] State management working without Vuex

### Non-Functional Requirements

- [ ] Bundle size reduced by removing Vue.js dependency
- [ ] No performance regression in load times or runtime
- [ ] Code maintainability improved or maintained
- [ ] Browser compatibility preserved (modern browsers)
- [ ] Development experience remains productive

## Technical Details

### Current State

- Application built with Vue.js 2/3
- Components using Vue SFC (Single File Components)
- State management via Vuex
- Vue Router for navigation (if applicable)
- Vue CLI for build tooling

### Target State

- Pure vanilla JavaScript with Web Components
- Shadow DOM for component encapsulation
- Custom Elements for component registration
- Lightweight state management solution
- Native browser APIs for all functionality

### Migration Components

1. **AboutSection.vue** → `AboutSection.js` (Web Component)
2. **DownloadAppSection.vue** → `DownloadAppSection.js` (Web Component)
3. **NumberPad.vue** → `NumberPad.js` (Web Component)
4. **ShareCanvas.vue** → `ShareCanvas.js` (Web Component)
5. **App.vue** → `App.js` (Web Component)
6. **Application.vue** → `Application.js` (Web Component)

### Key Conversions Required

- **Template** → Shadow DOM innerHTML
- **Script Setup** → Class-based Web Component
- **Vue Reactivity** → Manual re-rendering
- **Vue Events** → Custom Events
- **Vuex Store** → Global JavaScript object
- **Vue Directives** → Native DOM manipulation

### Dependencies to Remove

- [ ] vue
- [ ] vuex
- [ ] @vue/cli-service
- [ ] vue-template-compiler (if Vue 2)
- [ ] vue2-touch-events (replaced with native events)

### Dependencies to Keep

- [ ] Konva.js (for canvas drawing)
- [ ] ESLint (code quality)
- [ ] Prettier (code formatting)

## Implementation Plan

### Phase 1: Component Conversion

1. Convert each Vue component to Web Component class
2. Implement Shadow DOM for style encapsulation
3. Replace Vue reactivity with manual state management
4. Convert Vue events to Custom Events

### Phase 2: State Management

1. Replace Vuex with simple global store object
2. Update all state mutations to plain JavaScript functions
3. Ensure state persistence across component re-renders

### Phase 3: Application Bootstrap

1. Remove Vue app initialization
2. Register Web Components
3. Update main.js to use native DOM APIs
4. Add global CSS variables for theming

### Phase 4: Testing and Optimization

1. Test all user flows
2. Verify responsive behavior
3. Optimize bundle size
4. Update build configuration

## Risks and Mitigations

### High Risk

- **Risk**: Loss of functionality during conversion
  - **Mitigation**: Comprehensive testing of each component, gradual rollout
- **Risk**: Performance issues with manual reactivity
  - **Mitigation**: Implement efficient re-rendering, consider virtual DOM alternative

### Medium Risk

- **Risk**: Browser compatibility issues
  - **Mitigation**: Use polyfills for older browsers, document requirements
- **Risk**: Increased complexity in state management
  - **Mitigation**: Keep state logic simple, add comprehensive tests

### Low Risk

- **Risk**: Developer learning curve for Web Components
  - **Mitigation**: Provide documentation and examples
- **Risk**: Build tool compatibility
  - **Mitigation**: Test build process thoroughly, update configurations

## Definition of Done

- [ ] Vue.js completely removed from package.json
- [ ] All components converted to Web Components
- [ ] Application runs without Vue.js
- [ ] All original features working
- [ ] Bundle size reduced
- [ ] Performance benchmarks meet or exceed Vue version
- [ ] Documentation updated
- [ ] Team trained on new architecture

## Success Metrics

- Bundle size reduction: Target 30-50% reduction
- Load time improvement: Target 10-20% faster
- Development experience: Maintain or improve DX
- Code maintainability: Improve or maintain

## Related Documentation

- [Web Components Conversion](./web-components-conversion.md)
- [Bun Migration](./migrate-to-bun-user-story.md)
- [Project README](../README.md)
- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
