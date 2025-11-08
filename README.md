# Decision Maker


## Tech Stack

- **TypeScript**
- **Vite**
- **Vanilla JavaScript**
- **CSS3**

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd decisionmaker
```

2. Install dependencies:
```bash
pnpm install
```

### Development

Start the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

### Build

Create a production build:
```bash
pnpm build
```

The built files will be in the `dist` directory.

### Preview

Preview the production build:
```bash
pnpm preview
```

## Usage

1. Enter your first option in the "Option 1" field
2. Enter your second option in the "Option 2" field
3. Click "Choose" to get a random selection
4. Use "Choose again" to get a new random selection
5. Use "Clear" to reset the form and start over

## Project Structure

```
decisionmaker/
├── index.html          # Main HTML file
├── package.json        # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── src/
│   ├── main.ts        # Main application logic
│   ├── style.css      # Application styles
│   └── i18n/
│       ├── i18n.ts    # Internationalization logic
│       ├── en.json    # English translations
│       └── es.json    # Spanish translations
└── public/
    └── vite.svg       # Vite logo
```

## Internationalization

The app automatically detects your browser's language preference and displays content in English or Spanish accordingly. The i18n system is extensible and can support additional languages by adding new translation files.


