# TOM Builder Excel - Quick Start

## Setup (3 Minutes)

### Step 1: Create the File
1. Open Excel
2. Save as **TOM_Builder.xlsm** (Macro-Enabled Workbook)

### Step 2: Import the Code
1. Press **Alt+F11** (VBA Editor)
2. Click **Insert > Module**
3. Copy ALL code from `TOM_Builder_VBA.bas` and paste
4. Press **Ctrl+S** to save
5. Close VBA Editor (**Alt+Q**)

### Step 3: Run Setup
1. Press **Alt+F8**
2. Select **SetupTOMBuilder**
3. Click **Run**
4. Done! All sheets created with styling.

---

## Features

| Feature | Description |
|---------|-------------|
| No gridlines | Clean, professional look |
| Color-coded headers | Blue theme throughout |
| Dropdown lists | All categorical fields pre-configured |
| Auto-scoring | Dashboard calculates completeness |
| RAG status | Red/Amber/Green for each section |
| Conditional formatting | Status cells change color |
| Helper text | Guidance on every sheet |
| Markdown export | Generate TOM document |

---

## How to Use

1. **Start with 1_Department** - Enter your team info
2. **Work through each sheet** - Follow the step numbers
3. **Check Dashboard** - See your progress
4. **Export when ready** - Run `ExportToMarkdown`

---

## Available Macros (Alt+F8)

| Macro | What It Does |
|-------|--------------|
| `SetupTOMBuilder` | Creates all sheets (run once) |
| `RefreshDashboard` | Recalculates scores |
| `ExportToMarkdown` | Saves TOM as .md file |

---

## Section Scoring

| Section | Weight | GREEN When |
|---------|--------|------------|
| Department | 10% | Name filled |
| Purpose | 10% | Statement + Vision or Mission |
| Services | 10% | 3+ services |
| Stakeholders | 10% | 3+ stakeholders |
| Value Chain | 15% | All 3 parts filled |
| SLAs | 10% | 2+ SLAs |
| KPIs | 10% | 3+ KPIs |
| RACI | 10% | 3+ entries |
| Governance | 5% | Forum + Escalation path |
| Dependencies | 5% | 2+ dependencies |
| Risks | 5% | 2+ risks |
| Opportunities | 5% | 2+ opportunities |

---

## SharePoint Deployment

1. Save .xlsm to SharePoint document library
2. Share the library with your team
3. Each person downloads a copy to fill out
4. Completed TOMs can be stored back in SharePoint

**Note:** Macros run locally - SharePoint just stores the file.

---

## Troubleshooting

**Macros disabled?**
- Click "Enable Content" in the yellow security bar
- Or: File > Options > Trust Center > Enable Macros

**Dropdowns not working?**
- Make sure you ran SetupTOMBuilder first
- The _Lookups sheet must exist (it's hidden)

**Scores not updating?**
- Press **Ctrl+Alt+F9** to force recalculation
- Or run **RefreshDashboard** macro
