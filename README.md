# AI Chat Interface

A modern, responsive chat interface built with React, TypeScript, and Vite, featuring a clean UI powered by shadcn/ui components.

## Features

- Real-time chat interface
- Light/Dark mode support
- Responsive design for all screen sizes
- Modern UI with smooth animations
- Markdown support in messages
- Code syntax highlighting
- File upload support
- Fast and optimized performance with Vite

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API
- **Routing**: React Router v6
- **Icons**: Lucide Icons
- **Animation**: Framer Motion
- **Code Highlighting**: react-syntax-highlighter
- **Markdown Support**: react-markdown with rehype and remark plugins

## Chat Customization

The chat interface provides several customization options to tailor the responses to your preferences:

- **Reply Tone**: Adjusts the tone of the AI's responses to the predefined chatbot questions (e.g., Professional, Casual, Friendly, Technical)
- **Reply Style**: Controls the structure of AI-generated content, affecting both SEO-optimized and ChatGPT responses (e.g., Concise, Detailed, Step-by-step, Bullet points)
- **Response Length**: Manages the verbosity of AI-generated content for both SEO and ChatGPT responses (Short, Medium, Long)

Note: Reply Tone only affects the AI's responses to the predefined chatbot questions, while Reply Style and Response Length impact the generated content for both SEO and ChatGPT responses.

## Prerequisites

- Node.js 16+ (LTS recommended)
- npm or yarn package manager

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/frank1738/AI-Chat-Interface.git
   cd ai-chat-interface
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   The application will be available at `http://localhost:5173`

## Project Structure

### Architecture Overview

```
[Architectural Diagram Placeholder]
(Will be replaced with a visual representation of the system architecture)
```

### Directory Structure

```
src/
├── components/      # Reusable UI components
├── contexts/       # React context providers
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and configurations
├── pages/          # Page components
├── services/       # Agent service integrations
└── types/          # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Vite](https://vitejs.dev/) for the amazing build tooling
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) for the beautiful icons
