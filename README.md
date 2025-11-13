# Getting Started with Thermal Imaging

This repository hosts resources for thermal imaging analysis, focusing on medical applications such as breast cancer detection and body segmentation.

## Project Overview

This project consists of two main components:

### 1. Data Discovery Website
A Vue.js-based web application for discovering and exploring open-source thermal imaging datasets.

**Purpose:**
- Showcase available thermal imaging datasets
- Focus on breast cancer detection datasets
- Include other body segmentation datasets
- Provide dataset metadata and access information

**Technology Stack:**
- HTML5
- CSS3
- Vue.js

### 2. Thermal Imaging PyPI Package
A Python package for breast cancer detection using thermal imaging data.

**Purpose:**
- Provide tools for working with thermal imaging datasets
- Implement breast cancer detection algorithms
- Support deep neural network (DNN) models (in development)
- Offer preprocessing and analysis utilities

**Technology Stack:**
- Python 3.x
- Deep Learning frameworks (TBD)
- Image processing libraries

## Repository Structure

```
.
├── website/                      # Data discovery website
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/           # Vue components
│   │   ├── assets/               # Images, styles, etc.
│   │   └── views/                # Page views
│   └── README.md                 # Website documentation
│
├── thermal-imaging-package/      # PyPI package
│   ├── src/
│   │   └── thermal_imaging/      # Main package code
│   ├── tests/                    # Unit tests
│   ├── docs/                     # Documentation
│   └── README.md                 # Package documentation
│
└── README.md                     # This file
```

## Getting Started

### Website
Navigate to the `website/` directory for instructions on running the data discovery website locally.

### Python Package
Navigate to the `thermal-imaging-package/` directory for instructions on installing and using the thermal imaging analysis package.

## Development Status

🚧 **This project is in early development stage**

- [ ] Website: Initial structure created
- [ ] Python Package: Initial structure created
- [ ] Dataset integration: Pending
- [ ] DNN models: Under consideration

## Contributing

Contributions are welcome! Please read the contributing guidelines in each component's directory.

## License

TBD

## Contact

For questions or collaborations, please open an issue in this repository.
