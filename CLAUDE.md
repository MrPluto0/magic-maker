# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Vue 3 + TypeScript project using Vite and pnpm as the package manager.

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build production bundle
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint for code quality checks
- `pnpm lint-fix` - Auto-fix ESLint issues where possible

## Architecture Overview

### Core Application Structure

The project is a video/audio editing and AI content generation platform called "MagicMaker" with three main functional areas:

1. **Editor** (`/editor`) - Timeline-based video/audio editing interface
2. **Whiteboard** (`/whiteboard`) - Drawing canvas using Excalidraw
3. **Home** (`/`) - Landing page and project management

### Key Architectural Components

#### State Management (Pinia Stores)
- `projectState.ts` - Central project data, save/load operations, video export
- `trackState.ts` - Timeline tracks and media clip management
- `playerState.ts` - Video player controls and playback state
- `resourceState.ts` - Generated AI content (text, images, audio, video)
- `drawState.ts` - Whiteboard/drawing canvas state
- `userState.ts` - Authentication and user data

#### Media Processing Classes
- `CanvasPlayer.ts` - Real-time canvas rendering and audio playback
- `AudioTrack.ts`, `VideoTrack.ts`, `ImageTrack.ts`, `TextTrack.ts` - Media track types
- Uses `@webav/av-cliper` for video processing and `@webav/av-canvas` for rendering

#### Plugin System
- `installIcon.ts` - Icon components registration
- `installRouter.ts` - Vue Router setup
- `installPiniaPlugin.ts` - State persistence
- `installExcalidraw.ts` - Drawing whiteboard integration

### Technology Stack

- **Frontend**: Vue 3 + Composition API, TypeScript, Vite
- **UI Framework**: Element Plus with custom components
- **State**: Pinia with persistence
- **Styling**: Less + Tailwind CSS
- **Media Processing**: WebAV library (@webav/av-cliper)
- **Drawing**: Excalidraw integration via Veaury (React-in-Vue)
- **Package Manager**: pnpm with workspace configuration

### File Organization

- `src/pages/` - Main page components
- `src/components/` - Reusable UI components organized by feature
- `src/stores/` - Pinia state management
- `src/class/` - Core media processing classes
- `src/types/` - TypeScript type definitions
- `src/api/` - Backend API clients
- `src/utils/` - Utility functions for file handling, canvas operations

### Development Notes

- Uses unplugin auto-imports for Vue APIs and custom types
- Media processing leverages Web APIs (Canvas, AudioContext, File System Access)
- Supports real-time preview with frame-based timeline (30 FPS)
- Export functionality combines multiple media tracks into MP4 with watermark