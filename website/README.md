# Thermal Imaging Data Discovery Website

A Vue.js-based web application for discovering and exploring open-source thermal imaging datasets.

## Overview

This website serves as a central hub for researchers and developers to discover available thermal imaging datasets, with a focus on:
- Breast cancer detection datasets
- Body segmentation datasets
- Medical thermal imaging applications

## Features (Planned)

- Browse available thermal imaging datasets
- Filter datasets by application (breast cancer, body segmentation, etc.)
- View dataset metadata and specifications
- Access download links and documentation
- Search functionality
- Dataset comparison tools

## Technology Stack

- **Frontend Framework:** Vue.js 3.x
- **Styling:** CSS3
- **Build Tool:** Vite (recommended) or Vue CLI

## Project Structure

```
website/
├── public/           # Static assets (favicon, images, etc.)
├── src/
│   ├── components/   # Reusable Vue components
│   ├── views/        # Page components
│   ├── assets/       # Images, styles, fonts
│   ├── App.vue       # Root component
│   └── main.js       # Application entry point
├── index.html        # HTML entry point
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
cd website
npm install
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Development Roadmap

- [ ] Set up Vue.js project structure
- [ ] Design homepage and dataset listing pages
- [ ] Create dataset detail view component
- [ ] Implement search and filter functionality
- [ ] Add dataset metadata schema
- [ ] Integrate dataset information
- [ ] Deploy to GitHub Pages

## Contributing

Contributions are welcome! Please ensure your code follows Vue.js best practices.

## License

TBD
