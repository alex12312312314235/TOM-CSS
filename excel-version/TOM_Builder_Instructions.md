# TOM Builder - Excel/VBA Version

## Quick Setup Guide

### Step 1: Create the Workbook
1. Open Excel
2. Save as **"TOM_Builder.xlsm"** (macro-enabled workbook)

### Step 2: Create These Sheets (in order)
1. **Dashboard** - Overview and scores
2. **1_Department** - Basic info
3. **2_Purpose** - Purpose, vision, mission
4. **3_Services** - Service catalogue
5. **4_Stakeholders** - Who you work with
6. **5_ValueChain** - Inputs, activities, outputs
7. **6_SLAs** - Service level agreements
8. **7_KPIs** - Key performance indicators
9. **8_RACI** - Responsibility matrix
10. **9_Governance** - Forums and decisions
11. **10_Dependencies** - External dependencies
12. **11_Risks** - Risks and pain points
13. **12_Opportunities** - Improvement ideas
14. **_Lookups** - Data validation lists (hidden)

### Step 3: Import the VBA Code
1. Press **Alt+F11** to open VBA Editor
2. Insert > Module
3. Copy/paste the code from `TOM_Builder_VBA.bas`
4. Close VBA Editor

### Step 4: Set Up Each Sheet
Follow the detailed layout instructions below.

---

## Sheet Layouts

### Dashboard Sheet
| Row | A | B | C | D | E |
|-----|---|---|---|---|---|
| 1 | **TOM BUILDER DASHBOARD** | | | | |
| 2 | Department: | =IF('1_Department'!B2="","[Not Set]",'1_Department'!B2) | | Last Updated: | =NOW() |
| 4 | **Section** | **Status** | **Score** | **Target** | **Notes** |
| 5 | 1. Department Info | =GetRAG("Department") | =GetScore("Department") | 10% | |
| 6 | 2. Purpose Statement | =GetRAG("Purpose") | =GetScore("Purpose") | 10% | |
| 7 | 3. Service Catalogue | =GetRAG("Services") | =GetScore("Services") | 10% | |
| 8 | 4. Stakeholders | =GetRAG("Stakeholders") | =GetScore("Stakeholders") | 10% | |
| 9 | 5. Value Chain | =GetRAG("ValueChain") | =GetScore("ValueChain") | 15% | |
| 10 | 6. SLAs | =GetRAG("SLAs") | =GetScore("SLAs") | 10% | |
| 11 | 7. KPIs | =GetRAG("KPIs") | =GetScore("KPIs") | 10% | |
| 12 | 8. RACI Matrix | =GetRAG("RACI") | =GetScore("RACI") | 10% | |
| 13 | 9. Governance | =GetRAG("Governance") | =GetScore("Governance") | 5% | |
| 14 | 10. Dependencies | =GetRAG("Dependencies") | =GetScore("Dependencies") | 5% | |
| 15 | 11. Risks | =GetRAG("Risks") | =GetScore("Risks") | 5% | |
| 16 | 12. Opportunities | =GetRAG("Opportunities") | =GetScore("Opportunities") | 5% | |
| 18 | **TOTAL SCORE** | | =SUM(C5:C16) | 100% | |
| 20 | **Recommendations:** | | | | |
| 21 | =GetRecommendations() | | | | |

**Conditional Formatting for RAG:**
- Select B5:B16
- Red fill if cell = "RED"
- Yellow fill if cell = "AMBER"
- Green fill if cell = "GREEN"

---

### 1_Department Sheet
| Row | A | B |
|-----|---|---|
| 1 | **DEPARTMENT INFORMATION** | |
| 2 | Department Name* | [Enter name] |
| 3 | Division/Business Unit | [Enter division] |
| 4 | Team Size (Headcount) | [Enter number] |
| 6 | *Required field | |

---

### 2_Purpose Sheet
| Row | A | B |
|-----|---|---|
| 1 | **PURPOSE STATEMENT** | |
| 2 | Purpose Statement* | [Multi-line text] |
| 3 | (Why does your team exist?) | |
| 5 | Vision | [Multi-line text] |
| 6 | (Where are you headed?) | |
| 8 | Mission | [Multi-line text] |
| 9 | (How will you get there?) | |
| 11 | *Required field | |

**Note:** Make row heights taller (e.g., 60pt) for multi-line cells. Enable "Wrap Text".

---

### 3_Services Sheet
| Row | A | B | C | D |
|-----|---|---|---|---|
| 1 | **SERVICE CATALOGUE** | Target: 3+ services | | |
| 2 | Service Name* | Description | Type* | Frequency |
| 3 | [Service 1] | [Description] | [Dropdown] | [Dropdown] |
| 4 | [Service 2] | | | |
| ... | (rows 3-12 for up to 10 services) | | | |

**Data Validation:**
- Column C (Type): Core, Support, Strategic
- Column D (Frequency): Daily, Weekly, Monthly, Quarterly, On-demand

---

### 4_Stakeholders Sheet
| Row | A | B | C | D |
|-----|---|---|---|---|
| 1 | **STAKEHOLDERS** | Target: 3+ stakeholders | | |
| 2 | Name/Team* | Role/Position | Relationship Type* | What They Expect From You |
| 3 | [Stakeholder 1] | | [Dropdown] | |
| ... | (rows 3-12 for up to 10 stakeholders) | | | |

**Data Validation:**
- Column C: Internal Customer, External Customer, Partner, Supplier, Leadership

---

### 5_ValueChain Sheet
| Row | A | B | C |
|-----|---|---|---|
| 1 | **VALUE CHAIN** | | |
| 3 | **INPUTS** (What you receive) | | |
| 4 | What You Receive | From Where | How Often |
| 5 | [Input 1] | | |
| ... | (rows 5-9) | | |
| 11 | **ACTIVITIES** (What you do) | | |
| 12 | Activity Name | Description | Owner | Criticality |
| 13 | [Activity 1] | | | [Dropdown] |
| ... | (rows 13-17) | | | |
| 19 | **OUTPUTS** (What you deliver) | | |
| 20 | What You Deliver | Who Receives It | Quality Standard |
| 21 | [Output 1] | | |
| ... | (rows 21-25) | | |

**Data Validation:**
- Criticality column: High, Medium, Low

---

### 6_SLAs Sheet
| Row | A | B | C | D |
|-----|---|---|---|---|
| 1 | **SERVICE LEVEL AGREEMENTS** | Target: 2+ SLAs | | |
| 2 | Service/Activity* | Metric (What You're Measuring)* | Target/Commitment* | How You'll Measure It |
| 3 | [SLA 1] | | | |
| ... | (rows 3-12) | | | |

---

### 7_KPIs Sheet
| Row | A | B | C | D | E | F |
|-----|---|---|---|---|---|---|
| 1 | **KEY PERFORMANCE INDICATORS** | Target: 3+ KPIs | | | | |
| 2 | KPI Name* | Description | Target* | Frequency | Owner | Category* |
| 3 | [KPI 1] | | | [Dropdown] | | [Dropdown] |
| ... | (rows 3-12) | | | | | |

**Data Validation:**
- Frequency: Daily, Weekly, Monthly, Quarterly
- Category: Quality, Speed, Cost, Customer Satisfaction, Compliance

---

### 8_RACI Sheet
| Row | A | B | C | D | E |
|-----|---|---|---|---|---|
| 1 | **RACI MATRIX** | Target: 3+ entries | | | |
| 2 | Activity/Process* | Responsible (Does the work) | Accountable* (Approves - ONE person) | Consulted (Input needed) | Informed (Told after) |
| 3 | [Activity 1] | | | | |
| ... | (rows 3-12) | | | | |

---

### 9_Governance Sheet
| Row | A | B | C | D | E |
|-----|---|---|---|---|---|
| 1 | **GOVERNANCE & DECISION-MAKING** | | | | |
| 3 | **FORUMS** | | | | |
| 4 | Meeting Name | Purpose | Frequency | Participants | What Gets Decided |
| 5 | [Forum 1] | | [Dropdown] | | |
| ... | (rows 5-9) | | | | |
| 11 | **ESCALATION & DECISIONS** | | | | |
| 12 | Escalation Path: | [Multi-line] | | | |
| 14 | Decision Rights: | [Multi-line] | | | |

**Data Validation:**
- Frequency: Daily, Weekly, Monthly, Quarterly

---

### 10_Dependencies Sheet
| Row | A | B | C | D |
|-----|---|---|---|---|
| 1 | **DEPENDENCIES** | Target: 2+ dependencies | | |
| 2 | Depends On* | Type* | Criticality | Impact if Unavailable |
| 3 | [Dependency 1] | [Dropdown] | [Dropdown] | |
| ... | (rows 3-12) | | | |

**Data Validation:**
- Type: System, Team, Process, Data, External
- Criticality: High, Medium, Low

---

### 11_Risks Sheet
| Row | A | B | C | D | E |
|-----|---|---|---|---|---|
| 1 | **RISKS & PAIN POINTS** | Target: 2+ risks | | | |
| 2 | Risk Description* | Type* | Likelihood | Impact | Mitigation |
| 3 | [Risk 1] | [Dropdown] | [Dropdown] | [Dropdown] | |
| ... | (rows 3-12) | | | | |

**Data Validation:**
- Type: Operational, Financial, Compliance, Reputational, Strategic
- Likelihood: High, Medium, Low
- Impact: High, Medium, Low

---

### 12_Opportunities Sheet
| Row | A | B | C | D | E |
|-----|---|---|---|---|---|
| 1 | **OPPORTUNITIES & IMPROVEMENTS** | Target: 2+ opportunities | | | |
| 2 | Opportunity Description* | Type* | Effort | Impact | Timeframe |
| 3 | [Opportunity 1] | [Dropdown] | [Dropdown] | [Dropdown] | |
| ... | (rows 3-12) | | | | |

**Data Validation:**
- Type: Efficiency, Quality, Growth, Innovation, Cost Reduction
- Effort: High, Medium, Low
- Impact: High, Medium, Low

---

### _Lookups Sheet (Hidden)
This sheet contains all dropdown lists. Create named ranges for each:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| ServiceType | StakeholderRel | Frequency | Criticality | RiskType | KPICategory | DependencyType |
| Core | Internal Customer | Daily | High | Operational | Quality | System |
| Support | External Customer | Weekly | Medium | Financial | Speed | Team |
| Strategic | Partner | Monthly | Low | Compliance | Cost | Process |
| | Supplier | Quarterly | | Reputational | Customer Satisfaction | Data |
| | Leadership | On-demand | | Strategic | Compliance | External |

| H | I |
|---|---|
| OpportunityType | LikelihoodImpact |
| Efficiency | High |
| Quality | Medium |
| Growth | Low |
| Innovation | |
| Cost Reduction | |

---

## Buttons to Add

On the Dashboard sheet, add these buttons (Insert > Button):
1. **Refresh Scores** - Assign macro: `RefreshDashboard`
2. **Export to Markdown** - Assign macro: `ExportToMarkdown`
3. **Validate Data** - Assign macro: `ValidateAllData`

---

## Tips for SharePoint

1. **Save to SharePoint** - Save the .xlsm file directly to a SharePoint document library
2. **Check-in/Check-out** - Use Excel's check-out feature to prevent conflicts
3. **Version History** - SharePoint automatically tracks versions
4. **Sharing** - Share the library folder with your team
5. **Workflow** - Use SharePoint's built-in approval workflows if needed

---

## Troubleshooting

**"Macros are disabled"**
- Go to File > Options > Trust Center > Trust Center Settings
- Enable macros for this workbook

**Formulas not calculating**
- Press Ctrl+Alt+F9 to force recalculation
- Or run the RefreshDashboard macro

**Data validation not showing**
- Make sure the _Lookups sheet exists
- Check that named ranges are defined correctly
