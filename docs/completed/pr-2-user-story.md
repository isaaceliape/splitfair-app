# User Story: Update acorn Dependency

## User Story

**As a** project maintainer,  
**I want** to update acorn from version 6.3.0 to 6.4.1,  
**so that** I can fix security issues in the JavaScript parser and improve parsing reliability.

## Acceptance Criteria

### Functional Requirements

- [x] acorn updated to 6.4.1
- [x] JavaScript parsing works correctly
- [x] Build process unaffected

### Non-Functional Requirements

- [x] Surrogate pair validation improved
- [x] Parser security enhanced

## Technical Details

### Improvements

- More rigorous checking of surrogate pairs in regexp validator
- Parser reliability fixes

## Definition of Done

- [x] Dependency updated
- [x] Code parsing functions correctly
