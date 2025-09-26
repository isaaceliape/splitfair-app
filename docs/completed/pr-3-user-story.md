# User Story: Update websocket-extensions Dependency

## User Story

**As a** project maintainer,  
**I want** to update websocket-extensions from version 0.1.3 to 0.1.4,  
**so that** I can fix the ReDoS vulnerability in the header parser and ensure secure WebSocket connections.

## Acceptance Criteria

### Functional Requirements

- [x] websocket-extensions updated to 0.1.4
- [x] WebSocket functionality preserved
- [x] No performance degradation

### Non-Functional Requirements

- [x] ReDoS vulnerability CVE-2020-7662 fixed
- [x] License changed to Apache 2.0

## Technical Details

### Security Fix

- Removed ReDoS vulnerability in Sec-WebSocket-Extensions header parser
- License updated from MIT to Apache 2.0

## Definition of Done

- [x] Security vulnerability resolved
- [x] WebSocket connections work securely
