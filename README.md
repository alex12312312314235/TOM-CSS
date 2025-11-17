# TOM Builder Wizard

A user-friendly, guided wizard tool for building Target Operating Models (TOMs) for CSS (Culinary Shared Services).

## What is This?

The TOM Builder Wizard helps teams define their Target Operating Model in a simple, step-by-step way. It's designed for people who don't necessarily understand what a TOM is, but need to create one.

The tool guides you through 12 essential steps, provides helpful explanations and examples at every stage, and outputs a complete, standardized TOM document.

## Features

### 🎯 12-Step Guided Wizard

1. **Department Information** - Basic team details
2. **Purpose Statement** - Why your team exists
3. **Service Catalogue** - What you deliver
4. **Stakeholders** - Who you work with
5. **Value Chain** - How work flows (Inputs → Activities → Outputs)
6. **SLAs** - Service commitments
7. **KPIs** - Performance metrics
8. **RACI Matrix** - Who does what
9. **Governance** - Decision-making forums
10. **Dependencies** - What you rely on
11. **Risks & Pain Points** - Current problems
12. **Opportunities** - Improvement ideas
13. **Summary & Export** - Diagnostic and export

### ✨ User-Friendly Design

- **No jargon** - Plain language explanations
- **Visual aids** - Simple ASCII graphics for each concept
- **Tooltips** - Contextual help on every field
- **Examples** - Clear guidance on what to enter
- **Auto-save** - Your progress is saved automatically

### 📊 Built-in Diagnostics

- **Completeness Score** - See how much of your TOM is filled in
- **RAG Status** - Red/Amber/Green indicators for each section
- **Missing Items** - Clear list of what's incomplete
- **Recommendations** - Smart suggestions for next steps

### 📥 Multiple Export Formats

- **JSON** - Machine-readable format with full schema compliance
- **Markdown** - Human-readable documentation
- **Clipboard** - Copy markdown directly for easy sharing

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Building for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## How to Use

1. **Start the wizard** - Open the app in your browser
2. **Fill in each step** - Work through the 12 steps at your own pace
3. **Skip optional fields** - Only required fields must be completed
4. **Navigate freely** - Use Back/Next buttons to move between steps
5. **Review diagnostics** - Check completeness on the final summary page
6. **Export your TOM** - Download JSON or Markdown when ready

### Your Data is Safe

- All data is saved to your browser's local storage automatically
- Nothing is sent to any server
- You can clear data anytime using "Start Over"
- Export your work regularly as backup

## Project Structure

```
TOM-CSS/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── WizardSteps/   # All 13 wizard step components
│   │   └── shared/        # Reusable UI components
│   ├── utils/
│   │   ├── schema.json    # TOM JSON schema
│   │   ├── diagnostics.js # Completeness & RAG logic
│   │   ├── validators.js  # Form validation
│   │   └── exporters.js   # Export functionality
│   ├── App.jsx            # Main wizard container
│   ├── main.jsx           # React entry point
│   └── index.css          # Tailwind styles
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library

## Design Principles

1. **Simplicity First** - No complex terminology or consultant-speak
2. **Progressive Disclosure** - Information revealed when needed
3. **Visual Learning** - Graphics help explain concepts
4. **Forgiving UX** - Easy navigation, auto-save, undo-friendly
5. **Teach While Building** - Users learn TOM concepts implicitly

## Schema Compliance

All exported TOMs comply with the canonical TOM schema defined in `src/utils/schema.json`. This ensures:

- Consistent structure across all TOMs
- Validation of required fields
- Standardized data types
- Easy integration with other systems

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

## Troubleshooting

### Issue: Data disappeared after closing browser

**Solution:** Export your TOM regularly. Local storage can be cleared by browser settings or incognito mode.

### Issue: Can't see changes after editing code

**Solution:** The dev server uses HMR (Hot Module Replacement). If changes don't appear, hard refresh (Ctrl+Shift+R).

### Issue: npm install fails

**Solution:** Ensure you're using Node.js v16 or higher. Check with `node --version`.

## Customization

### Change Colors

Edit `tailwind.config.js` to modify the color scheme:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors here
      }
    }
  }
}
```

### Add/Remove Steps

1. Create new step component in `src/components/WizardSteps/`
2. Import and add to `App.jsx` switch statement
3. Update `TOTAL_STEPS` constant
4. Add field to `tomData` state

### Modify Schema

Edit `src/utils/schema.json` to change validation rules or add new fields.

## Contributing

This is an internal CSS tool. For improvements or bug fixes:

1. Make changes in a feature branch
2. Test thoroughly
3. Create a pull request with clear description

## License

Internal use only - Culinary Shared Services

## Support

For questions or issues, contact the CSS Systems team.

---

**Built with ❤️ for Culinary Shared Services**
