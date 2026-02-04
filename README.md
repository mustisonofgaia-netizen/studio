# AdventureNav | Interactive World Map

An immersive, high-performance interactive world map built with Next.js, Framer Motion, and GenAI.

## Features

- **Interactive Map**: Smooth panning and zooming with clamped boundaries.
- **Glassmorphism UI**: Ultra-thin, frosted glass panels with modern vector icons.
- **AI-Powered**: Dynamic landmark descriptions generated via Google Gemini.
- **Smooth Motion**: Custom spring transitions and parallax tilt effects on markers.

## Local Development

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd <project-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Google AI API key:
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Components**: ShadCN UI
- **Animation**: Framer Motion
- **AI Stack**: Firebase Genkit + Google AI Plugin
- **Navigation**: Lucide React Icons
