# TOM Builder Excel - Quick Start (5 Minutes)

## Step 1: Create the Workbook
1. Open Excel
2. Save as **TOM_Builder.xlsm** (Excel Macro-Enabled Workbook)

## Step 2: Import the VBA Code
1. Press **Alt+F11** (opens VBA Editor)
2. Click **Insert > Module**
3. Open `TOM_Builder_VBA.bas` in Notepad
4. Copy ALL the code and paste it into the module
5. Press **Ctrl+S** to save
6. Close the VBA Editor (Alt+Q)

## Step 3: Run the Setup
1. Press **Alt+F8** (opens Macro dialog)
2. Select **SetupWorkbook** and click **Run**
3. Wait for "Workbook setup complete!" message

**That's it! Your TOM Builder is ready.**

---

## How to Use

### Fill Out Your TOM
- Click each sheet tab (1_Department, 2_Purpose, etc.)
- Fill in the fields - dropdowns are pre-configured
- Required fields marked with *

### Check Your Progress
- Go to **Dashboard** sheet
- See RAG status (Red/Amber/Green) for each section
- Total score shown at bottom

### Export Your TOM
1. Press **Alt+F8**
2. Run **ExportToMarkdown**
3. Choose save location
4. Get a professional markdown document

---

## Key Macros (Alt+F8)

| Macro | What it does |
|-------|--------------|
| `SetupWorkbook` | Creates all sheets (run once) |
| `RefreshDashboard` | Recalculates scores |
| `ValidateAllData` | Shows missing required fields |
| `ExportToMarkdown` | Saves TOM as .md file |

---

## SharePoint Tips

1. **Save directly to SharePoint** - File > Save As > SharePoint location
2. **Enable editing** - When opening from SharePoint, click "Edit Workbook"
3. **Macros may need enabling** - Accept the security prompt
4. **Version history** - SharePoint auto-tracks all versions

---

## Troubleshooting

**"Macros disabled" warning?**
- Click "Enable Content" in the yellow bar
- Or: File > Options > Trust Center > Trust Center Settings > Enable all macros

**Scores not updating?**
- Press Ctrl+Alt+F9 to force recalculation
- Or run RefreshDashboard macro

**Can't see dropdown lists?**
- Make sure you ran SetupWorkbook first
- Check that _Lookups sheet exists (it's hidden)

---

## Section Targets for GREEN Status

| Section | Target |
|---------|--------|
| Department | Name filled |
| Purpose | Statement filled |
| Services | 3+ services |
| Stakeholders | 3+ stakeholders |
| Value Chain | All 3 parts (inputs, activities, outputs) |
| SLAs | 2+ SLAs |
| KPIs | 3+ KPIs |
| RACI | 3+ entries |
| Governance | 1+ forum + escalation path |
| Dependencies | 2+ dependencies |
| Risks | 2+ risks |
| Opportunities | 2+ opportunities |
