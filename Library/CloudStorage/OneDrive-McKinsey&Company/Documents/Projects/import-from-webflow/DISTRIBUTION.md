# Distribution Guide

**How to share this Material Design 3 design system with consuming projects.**

## Distribution Methods

### Method 1: Git Submodule (Recommended)

**Best for**: Projects that want to stay in sync with design system updates and have access to the full repository.

#### Setup in Consuming Project

```bash
# Add this repository as a submodule
git submodule add https://github.com/mwyuwono/m3-guidelines.git design-system

# Initialize submodules (for font files)
cd design-system
git submodule update --init --recursive
cd ..

# Commit the submodule reference
git add .gitmodules design-system
git commit -m "Add m3-guidelines design system as submodule"
```

#### Usage in Consuming Project

**Option A: CSS File (Easiest)**

```html
<!-- Load tokens as CSS custom properties -->
<link rel="stylesheet" href="design-system/tokens/material3.web.css">
```

The CSS file contains all tokens as CSS custom properties:
```css
:root {
  --md-sys-color-primary: #6750a4;
  --md-sys-color-on-primary: #ffffff;
  /* ... all tokens ... */
}
```

**Option B: JavaScript**

```javascript
// Load tokens JSON
const tokens = await import('./design-system/tokens/material3.web.json');

// Apply tokens to CSS custom properties
const root = document.documentElement;
tokens.tokens.forEach(token => {
  const cssVar = `--${token.id.replace(/\./g, '-')}`;
  root.style.setProperty(cssVar, token.value);
});
```

**Advantages**:
- Easy to update: `git submodule update --remote`
- Full access to guidelines, examples, and preview pages
- Version controlled
- Can customize tokens in consuming project

**Disadvantages**:
- Requires git submodule knowledge
- Team members need to run `git submodule update --init --recursive`

---

### Method 2: npm Package (Recommended for Node.js Projects)

**Best for**: Node.js/webpack projects that want to import tokens and guidelines programmatically.

#### Publishing as npm Package

1. **Update `package.json`** to include distribution files:

```json
{
  "name": "@your-org/m3-guidelines",
  "version": "1.0.0",
  "main": "dist/index.js",
  "files": [
    "tokens/material3.web.json",
    "tokens/material3.web.md",
    "guidelines/**/*",
    "examples/**/*",
    "INTEGRATION.md",
    "LLM_CONTEXT.md"
  ]
}
```

2. **Create distribution script** (`scripts/dist.js`):

```javascript
// Copy essential files to dist/ directory
// Exclude: vendor/, preview/, node_modules/, build files
```

3. **Publish**:

```bash
npm publish
```

#### Usage in Consuming Project

```bash
npm install @your-org/m3-guidelines
```

```javascript
// Import tokens
import tokens from '@your-org/m3-guidelines/tokens/material3.web.json';

// Use tokens
const primaryColor = tokens.tokens.find(t => t.id === 'md.sys.color.primary').value;
```

**Advantages**:
- Standard package management
- Easy versioning and updates
- Works with bundlers (webpack, vite, etc.)
- Can be private (npm private packages)

**Disadvantages**:
- Requires npm account and publishing setup
- Consuming projects need Node.js/npm

---

### Method 3: Distribution Package (ZIP/Tarball)

**Best for**: Projects that want a one-time copy or don't use git/npm.

#### Create Distribution Package

Create a script or manual process to package essential files:

**Essential Files for Distribution**:
```
m3-guidelines-dist/
├── tokens/
│   ├── material3.web.json      # Token values (REQUIRED)
│   ├── material3.web.css       # CSS custom properties (RECOMMENDED)
│   ├── material3.web.md        # Human-readable tokens
│   └── custom.example.json     # Customization template
├── guidelines/                  # Implementation guidelines (REQUIRED)
│   ├── components/
│   ├── layout.md
│   ├── density.md
│   └── accessibility.md
├── examples/                    # Code examples (RECOMMENDED)
│   └── *.html
├── INTEGRATION.md              # Integration guidelines (REQUIRED)
├── LLM_CONTEXT.md             # LLM consumption guide (RECOMMENDED)
└── README.md                   # Quick start guide
```

**Optional Files**:
- `preview/` - Visual reference (helpful but not required)
- `vendor/brandon-grotesque/` - Font files (if using custom fonts)

#### Distribution Script Example

```bash
#!/bin/bash
# create-dist.sh

mkdir -p dist/m3-guidelines
cp -r tokens/material3.web.json dist/m3-guidelines/tokens/
cp -r tokens/material3.web.md dist/m3-guidelines/tokens/
cp -r tokens/custom.example.json dist/m3-guidelines/tokens/
cp -r guidelines dist/m3-guidelines/
cp -r examples dist/m3-guidelines/
cp INTEGRATION.md dist/m3-guidelines/
cp LLM_CONTEXT.md dist/m3-guidelines/
cp README.md dist/m3-guidelines/

# Create tarball
cd dist
tar -czf m3-guidelines-v1.0.0.tar.gz m3-guidelines/
```

#### Usage in Consuming Project

1. Download/extract the distribution package
2. Copy files to project (e.g., `design-system/` directory)
3. Reference files as needed

**Advantages**:
- Simple, no dependencies
- Works with any project type
- Can be hosted anywhere (CDN, internal server)

**Disadvantages**:
- Manual updates required
- No automatic version tracking
- Larger file size (includes all files)

---

### Method 4: Direct GitHub Reference

**Best for**: Quick reference, documentation, or LLM consumption.

#### Usage

Reference the GitHub repository directly:

```markdown
Design System: https://github.com/mwyuwono/m3-guidelines

Key Files:
- Tokens: tokens/material3.web.json
- Guidelines: guidelines/components/
- Examples: examples/
```

**For LLM Consumption**:
- Point LLM coding assistants to the repository
- They can read files directly from GitHub
- Use `LLM_CONTEXT.md` as the guide

**Advantages**:
- No installation needed
- Always up-to-date (if using main branch)
- Easy to reference in documentation

**Disadvantages**:
- Requires internet access
- Can't customize tokens easily
- No local files for offline use

---

## Essential Files for Consuming Projects

### Required Files

1. **`tokens/material3.web.json`** - Token values (primary data source)
2. **`guidelines/`** - Implementation guidelines for components
3. **`INTEGRATION.md`** - Integration guidelines and best practices

### Recommended Files

4. **`examples/`** - Code examples for component structure
5. **`LLM_CONTEXT.md`** - LLM consumption guide
6. **`tokens/custom.example.json`** - Customization template

### Optional Files

7. **`preview/`** - Visual reference pages (helpful for developers)
8. **`vendor/brandon-grotesque/`** - Font files (if using custom fonts)

---

## Setup Instructions for Consuming Projects

### Step 1: Add Design System

Choose your distribution method (submodule, npm, or copy files).

### Step 2: Load Tokens

**Option A: CSS File (Easiest - Recommended)**

```html
<!-- Load tokens as CSS custom properties -->
<link rel="stylesheet" href="design-system/tokens/material3.web.css">
```

The CSS file is generated automatically and contains all tokens as CSS custom properties. Use tokens in your CSS:

```css
.my-component {
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  padding: var(--md-sys-spacing-md);
  border-radius: var(--md-sys-shape-corner-medium);
}
```

**Option B: JavaScript**

```javascript
import tokens from './design-system/tokens/material3.web.json';

// Apply tokens to CSS custom properties
const root = document.documentElement;
tokens.tokens.forEach(token => {
  const cssVar = `--${token.id.replace(/\./g, '-')}`;
  root.style.setProperty(cssVar, token.value);
});
```

**Option C: Build-time** (webpack/vite):

```javascript
// webpack.config.js or vite.config.js
// Import tokens/material3.web.json and generate CSS at build time
```

### Step 3: Customize Tokens (Optional)

1. Copy `tokens/custom.example.json` to `tokens/custom.json`
2. Edit token values
3. Run `npm run build` (if using full repo) or regenerate CSS

### Step 4: Implement Components

1. Read `guidelines/components/[component].md` for structure
2. Reference `examples/[component].html` for HTML structure
3. Use tokens via CSS custom properties: `var(--md-sys-color-primary)`
4. Follow `INTEGRATION.md` guidelines (modularity, no !important, etc.)

### Step 5: Load Fonts (If Using Custom Fonts)

If using Brandon Grotesque or other custom fonts:

```css
@font-face {
  font-family: 'brandon-grotesque';
  src: url('./design-system/vendor/brandon-grotesque/BrandonGrotesque-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
```

---

## Version Management

### Git Submodule

```bash
# Update to latest
git submodule update --remote design-system

# Pin to specific version/tag
cd design-system
git checkout v1.0.0
cd ..
git add design-system
git commit -m "Pin design system to v1.0.0"
```

### npm Package

```bash
# Update to latest
npm update @your-org/m3-guidelines

# Pin to specific version
npm install @your-org/m3-guidelines@1.0.0
```

### Distribution Package

- Include version in filename: `m3-guidelines-v1.0.0.tar.gz`
- Document version in consuming project
- Manual update process

---

## Customization in Consuming Projects

### Option 1: Fork and Customize

1. Fork this repository
2. Edit `tokens/custom.json` in your fork
3. Use your fork as the submodule/package source

### Option 2: Override in Consuming Project

1. Copy `tokens/custom.json` to consuming project
2. Build tokens in consuming project (requires Node.js setup)
3. Use your custom tokens

### Option 3: CSS Overrides (Not Recommended)

Override CSS custom properties in consuming project:

```css
:root {
  --md-sys-color-primary: #your-color;
}
```

**Note**: This violates integration guidelines. Prefer token customization via `custom.json`.

---

## Best Practices for Distribution

1. **Version Tagging**: Tag releases in git for version tracking
2. **Changelog**: Maintain CHANGELOG.md for version history
3. **Documentation**: Keep README.md and INTEGRATION.md up-to-date
4. **Testing**: Test distribution package before sharing
5. **Minimal Distribution**: Only include essential files in distribution packages

---

## Quick Reference

**For Git Submodule**:
```bash
git submodule add https://github.com/mwyuwono/m3-guidelines.git design-system
```

**For npm**:
```bash
npm install @your-org/m3-guidelines
```

**For Direct Reference**:
- Repository: https://github.com/mwyuwono/m3-guidelines
- Key file: `tokens/material3.web.json`
- Guidelines: `guidelines/components/`

---

**Questions?** See `INTEGRATION.md` for integration guidelines and `LLM_CONTEXT.md` for LLM consumption patterns.

