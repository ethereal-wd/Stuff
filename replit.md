# Transaction Tracker Application

## Overview

This is a full-stack web application built with React and Express that displays cryptocurrency transaction history. The application features a modern UI using shadcn/ui components and is configured for PostgreSQL database integration using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with ESBuild for production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js 20 with Express.js
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API structure (routes prefixed with `/api`)
- **Development**: tsx for TypeScript execution in development

### Data Storage
- **Database**: PostgreSQL 16 (configured but not yet implemented)
- **ORM**: Drizzle ORM with drizzle-kit for migrations
- **Connection**: Neon Database serverless driver
- **Current Storage**: In-memory storage implementation (MemStorage class)

## Key Components

### Database Schema
- **Users Table**: Basic user authentication schema with username/password
- **Schema Location**: `shared/schema.ts` for shared types between client and server

### Storage Interface
- **IStorage Interface**: Defines CRUD operations for user management
- **Current Implementation**: Memory-based storage for development
- **Methods**: `getUser()`, `getUserByUsername()`, `createUser()`

### Frontend Pages
- **Transaction History**: Main page displaying cryptocurrency transaction data
- **404 Not Found**: Error page for invalid routes

### UI Components
- **shadcn/ui Library**: Complete set of accessible UI components
- **Custom Components**: Transaction table with filtering and search capabilities
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Routes**: Express server handles requests with `/api` prefix
3. **Storage Layer**: Storage interface abstracts data persistence
4. **Response Format**: JSON responses with proper error handling
5. **State Updates**: React Query manages cache invalidation and updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **date-fns**: Date manipulation utilities

### UI Dependencies
- **@radix-ui/***: Primitive components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant styling

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **drizzle-kit**: Database migration tool

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `npm run db:push`

### Environment Configuration
- **Development**: Uses tsx with hot reload on port 5000
- **Production**: Runs bundled Node.js application
- **Database**: Requires `DATABASE_URL` environment variable

### Replit Configuration
- **Modules**: nodejs-20, web, postgresql-16
- **Deployment**: Autoscale with build and start commands
- **Port Mapping**: Internal port 5000 mapped to external port 80

## Changelog

- June 25, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.