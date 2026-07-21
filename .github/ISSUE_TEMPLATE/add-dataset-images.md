---
name: Enhancement - Add Dataset Preview Images
about: Add visual preview images/thumbnails to the dataset discovery website
title: 'Enhancement: Add dataset preview images/thumbnails to discovery website'
labels: 'enhancement, good first issue, help wanted, ui/ux'
---

## 📸 Enhancement Request: Add Dataset Preview Images

### Description
The thermal imaging dataset discovery website currently lacks visual preview images or sample thumbnails for each dataset. Adding representative images would significantly improve user experience and help researchers quickly identify datasets relevant to their work.

### Proposed Enhancement
Add sample thermal images or representative thumbnails for each of the 9 datasets featured on the discovery page:

**Medical Breast Thermography:**
- [ ] DMR-IR Breast Thermography
- [ ] Breast Thermography - Mendeley
- [ ] Breast Thermography - Rodriguez-Guerrero

**Human Pose & Body Thermal:**
- [ ] OpenThermalPose
- [ ] IPHPDT
- [ ] LWIRPOSE

**Specialized Applications:**
- [ ] Face-Oral Temperature Data
- [ ] POP Thermal Dataset
- [ ] Thermal Human Detection - Kaggle

### Implementation Suggestions

**Option 1: Sample Images**
- Add 1-3 representative thermal images per dataset
- Display in a gallery/carousel within each dataset card
- Respect dataset licenses and attribution requirements

**Option 2: Placeholder Visualizations**
- Create stylized thermal heatmap placeholders
- Use thermal color gradients (blue → green → yellow → red)
- Add overlay text indicating dataset category

**Option 3: Screenshot Approach**
- Screenshot examples from dataset publications/papers
- Include proper citations and attribution
- Link to original sources

### Technical Considerations

1. **File Location:** Store images in `/website/assets/datasets/` or similar
2. **Image Format:** WebP or optimized PNG for best performance
3. **Responsive Design:** Ensure images scale properly on mobile/tablet
4. **Accessibility:** Add alt text describing each thermal image
5. **Licensing:** Only use images with appropriate permissions/licenses

### Example HTML Structure

```html
<div class="dataset-preview">
    <img src="assets/datasets/dmr-ir-sample.webp" 
         alt="Sample breast thermography image from DMR-IR dataset showing thermal patterns"
         loading="lazy">
</div>
```

### Why This Matters

- **Visual Recognition:** Researchers can quickly assess if a dataset matches their needs
- **Engagement:** Visual content makes the page more engaging and professional
- **Understanding:** Sample images help users understand thermal imaging characteristics
- **Differentiation:** Images help distinguish between medical vs. pose vs. specialized datasets

### Contribution Guidelines

This is a **great first contribution** for anyone interested in:
- Open source contribution
- Medical imaging / computer vision
- Web development
- Data visualization

**Before contributing:**
1. Check dataset licenses for image usage rights
2. Ensure images are appropriately anonymized (if from medical datasets)
3. Optimize images for web (compress, resize)
4. Test responsive behavior on mobile devices

### Related Files
- Main page: `/website/index.html`
- Setup guide: `/GITHUB_PAGES_SETUP.md`

### Labels
`enhancement`, `good first issue`, `help wanted`, `ui/ux`, `documentation`

---

**Note:** The website was last updated in July 2026. Contributors should verify dataset links and availability before adding images.

**Questions?** Feel free to comment on this issue or reach out to the maintainers!
