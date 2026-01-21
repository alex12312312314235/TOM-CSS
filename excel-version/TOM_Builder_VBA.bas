' =============================================================================
' TOM BUILDER - VBA MODULE
' =============================================================================
' Copy this entire code into a new module in your Excel workbook
' Press Alt+F11 > Insert > Module > Paste this code
' =============================================================================

Option Explicit

' Section weights (must sum to 100)
Private Const WEIGHT_DEPARTMENT As Double = 10
Private Const WEIGHT_PURPOSE As Double = 10
Private Const WEIGHT_SERVICES As Double = 10
Private Const WEIGHT_STAKEHOLDERS As Double = 10
Private Const WEIGHT_VALUECHAIN As Double = 15
Private Const WEIGHT_SLAS As Double = 10
Private Const WEIGHT_KPIS As Double = 10
Private Const WEIGHT_RACI As Double = 10
Private Const WEIGHT_GOVERNANCE As Double = 5
Private Const WEIGHT_DEPENDENCIES As Double = 5
Private Const WEIGHT_RISKS As Double = 5
Private Const WEIGHT_OPPORTUNITIES As Double = 5

' Targets for array sections
Private Const TARGET_SERVICES As Integer = 3
Private Const TARGET_STAKEHOLDERS As Integer = 3
Private Const TARGET_SLAS As Integer = 2
Private Const TARGET_KPIS As Integer = 3
Private Const TARGET_RACI As Integer = 3
Private Const TARGET_DEPENDENCIES As Integer = 2
Private Const TARGET_RISKS As Integer = 2
Private Const TARGET_OPPORTUNITIES As Integer = 2

' =============================================================================
' PUBLIC FUNCTIONS - Called from worksheet formulas
' =============================================================================

' Get RAG status for a section
' Usage: =GetRAG("Department")
Public Function GetRAG(sectionName As String) As String
    On Error Resume Next

    Select Case LCase(sectionName)
        Case "department"
            GetRAG = GetDepartmentRAG()
        Case "purpose"
            GetRAG = GetPurposeRAG()
        Case "services"
            GetRAG = GetArrayRAG("3_Services", 3, TARGET_SERVICES)
        Case "stakeholders"
            GetRAG = GetArrayRAG("4_Stakeholders", 3, TARGET_STAKEHOLDERS)
        Case "valuechain"
            GetRAG = GetValueChainRAG()
        Case "slas"
            GetRAG = GetArrayRAG("6_SLAs", 3, TARGET_SLAS)
        Case "kpis"
            GetRAG = GetArrayRAG("7_KPIs", 3, TARGET_KPIS)
        Case "raci"
            GetRAG = GetArrayRAG("8_RACI", 3, TARGET_RACI)
        Case "governance"
            GetRAG = GetGovernanceRAG()
        Case "dependencies"
            GetRAG = GetArrayRAG("10_Dependencies", 3, TARGET_DEPENDENCIES)
        Case "risks"
            GetRAG = GetArrayRAG("11_Risks", 3, TARGET_RISKS)
        Case "opportunities"
            GetRAG = GetArrayRAG("12_Opportunities", 3, TARGET_OPPORTUNITIES)
        Case Else
            GetRAG = "ERROR"
    End Select
End Function

' Get score for a section (as percentage points)
' Usage: =GetScore("Department")
Public Function GetScore(sectionName As String) As Double
    On Error Resume Next

    Dim rag As String
    Dim weight As Double

    ' Get the weight for this section
    Select Case LCase(sectionName)
        Case "department": weight = WEIGHT_DEPARTMENT
        Case "purpose": weight = WEIGHT_PURPOSE
        Case "services": weight = WEIGHT_SERVICES
        Case "stakeholders": weight = WEIGHT_STAKEHOLDERS
        Case "valuechain": weight = WEIGHT_VALUECHAIN
        Case "slas": weight = WEIGHT_SLAS
        Case "kpis": weight = WEIGHT_KPIS
        Case "raci": weight = WEIGHT_RACI
        Case "governance": weight = WEIGHT_GOVERNANCE
        Case "dependencies": weight = WEIGHT_DEPENDENCIES
        Case "risks": weight = WEIGHT_RISKS
        Case "opportunities": weight = WEIGHT_OPPORTUNITIES
        Case Else: weight = 0
    End Select

    ' Get RAG and convert to score
    rag = GetRAG(sectionName)

    Select Case rag
        Case "GREEN"
            GetScore = weight
        Case "AMBER"
            GetScore = weight * 0.5
        Case "RED"
            GetScore = 0
        Case Else
            GetScore = 0
    End Select
End Function

' Get recommendations based on current state
' Usage: =GetRecommendations()
Public Function GetRecommendations() As String
    On Error Resume Next

    Dim totalScore As Double
    Dim recs As String
    Dim recCount As Integer

    ' Calculate total score
    totalScore = GetScore("Department") + GetScore("Purpose") + _
                 GetScore("Services") + GetScore("Stakeholders") + _
                 GetScore("ValueChain") + GetScore("SLAs") + _
                 GetScore("KPIs") + GetScore("RACI") + _
                 GetScore("Governance") + GetScore("Dependencies") + _
                 GetScore("Risks") + GetScore("Opportunities")

    recs = ""
    recCount = 0

    ' Priority recommendations based on RED sections
    If GetRAG("Department") = "RED" Then
        recs = recs & "- Enter your Department Name (required)" & vbNewLine
        recCount = recCount + 1
    End If

    If GetRAG("Purpose") = "RED" Then
        recs = recs & "- Add your Purpose Statement (required)" & vbNewLine
        recCount = recCount + 1
    End If

    If GetRAG("Services") = "RED" Then
        recs = recs & "- Define at least one service in your catalogue" & vbNewLine
        recCount = recCount + 1
    End If

    If GetRAG("ValueChain") = "RED" Or GetRAG("ValueChain") = "AMBER" Then
        recs = recs & "- Complete your Value Chain (inputs, activities, outputs)" & vbNewLine
        recCount = recCount + 1
    End If

    ' AMBER recommendations
    If GetRAG("Services") = "AMBER" And recCount < 5 Then
        recs = recs & "- Add more services (target: 3+)" & vbNewLine
        recCount = recCount + 1
    End If

    If GetRAG("Stakeholders") = "AMBER" And recCount < 5 Then
        recs = recs & "- Add more stakeholders (target: 3+)" & vbNewLine
        recCount = recCount + 1
    End If

    If GetRAG("KPIs") = "AMBER" And recCount < 5 Then
        recs = recs & "- Define more KPIs (target: 3+)" & vbNewLine
        recCount = recCount + 1
    End If

    ' Score-based recommendations
    If totalScore < 30 And recCount < 5 Then
        recs = recs & "- Focus on completing core sections first" & vbNewLine
    ElseIf totalScore >= 30 And totalScore < 60 And recCount < 5 Then
        recs = recs & "- Good progress! Add SLAs and KPIs to strengthen your TOM" & vbNewLine
    ElseIf totalScore >= 60 And totalScore < 80 And recCount < 5 Then
        recs = recs & "- Almost there! Review RACI and Governance sections" & vbNewLine
    ElseIf totalScore >= 80 Then
        recs = recs & "- Excellent! Your TOM is comprehensive. Review for accuracy." & vbNewLine
    End If

    If recs = "" Then
        recs = "Your TOM is complete! Consider exporting to Markdown."
    End If

    GetRecommendations = recs
End Function

' =============================================================================
' PRIVATE RAG HELPER FUNCTIONS
' =============================================================================

Private Function GetDepartmentRAG() As String
    On Error Resume Next
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("1_Department")

    If ws Is Nothing Then
        GetDepartmentRAG = "RED"
        Exit Function
    End If

    ' Check required field: Department Name (B2)
    If Trim(ws.Range("B2").Value) = "" Then
        GetDepartmentRAG = "RED"
    Else
        GetDepartmentRAG = "GREEN"
    End If
End Function

Private Function GetPurposeRAG() As String
    On Error Resume Next
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("2_Purpose")

    If ws Is Nothing Then
        GetPurposeRAG = "RED"
        Exit Function
    End If

    ' Check required field: Purpose Statement (B2)
    If Trim(ws.Range("B2").Value) = "" Then
        GetPurposeRAG = "RED"
    ElseIf Trim(ws.Range("B5").Value) = "" And Trim(ws.Range("B8").Value) = "" Then
        ' Has purpose but no vision/mission
        GetPurposeRAG = "AMBER"
    Else
        GetPurposeRAG = "GREEN"
    End If
End Function

Private Function GetArrayRAG(sheetName As String, startRow As Integer, target As Integer) As String
    On Error Resume Next
    Dim ws As Worksheet
    Dim count As Integer
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets(sheetName)

    If ws Is Nothing Then
        GetArrayRAG = "RED"
        Exit Function
    End If

    ' Count non-empty rows in column A starting from startRow
    count = 0
    For i = startRow To startRow + 9
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            count = count + 1
        End If
    Next i

    If count = 0 Then
        GetArrayRAG = "RED"
    ElseIf count < target Then
        GetArrayRAG = "AMBER"
    Else
        GetArrayRAG = "GREEN"
    End If
End Function

Private Function GetValueChainRAG() As String
    On Error Resume Next
    Dim ws As Worksheet
    Dim hasInputs As Boolean
    Dim hasActivities As Boolean
    Dim hasOutputs As Boolean
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("5_ValueChain")

    If ws Is Nothing Then
        GetValueChainRAG = "RED"
        Exit Function
    End If

    ' Check inputs (rows 5-9)
    hasInputs = False
    For i = 5 To 9
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            hasInputs = True
            Exit For
        End If
    Next i

    ' Check activities (rows 13-17)
    hasActivities = False
    For i = 13 To 17
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            hasActivities = True
            Exit For
        End If
    Next i

    ' Check outputs (rows 21-25)
    hasOutputs = False
    For i = 21 To 25
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            hasOutputs = True
            Exit For
        End If
    Next i

    If Not hasInputs And Not hasActivities And Not hasOutputs Then
        GetValueChainRAG = "RED"
    ElseIf hasInputs And hasActivities And hasOutputs Then
        GetValueChainRAG = "GREEN"
    Else
        GetValueChainRAG = "AMBER"
    End If
End Function

Private Function GetGovernanceRAG() As String
    On Error Resume Next
    Dim ws As Worksheet
    Dim hasForums As Boolean
    Dim hasEscalation As Boolean
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("9_Governance")

    If ws Is Nothing Then
        GetGovernanceRAG = "RED"
        Exit Function
    End If

    ' Check forums (rows 5-9)
    hasForums = False
    For i = 5 To 9
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            hasForums = True
            Exit For
        End If
    Next i

    ' Check escalation path (B12)
    hasEscalation = Trim(ws.Range("B12").Value) <> ""

    If Not hasForums And Not hasEscalation Then
        GetGovernanceRAG = "RED"
    ElseIf hasForums And hasEscalation Then
        GetGovernanceRAG = "GREEN"
    Else
        GetGovernanceRAG = "AMBER"
    End If
End Function

' =============================================================================
' PUBLIC MACROS - Assigned to buttons
' =============================================================================

' Refresh the dashboard calculations
Public Sub RefreshDashboard()
    Application.ScreenUpdating = False
    Application.Calculate

    ' Apply conditional formatting to RAG column
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Dashboard")

    Dim ragRange As Range
    Set ragRange = ws.Range("B5:B16")

    ' Clear existing formatting
    ragRange.FormatConditions.Delete

    ' Add conditional formatting
    With ragRange.FormatConditions.Add(Type:=xlCellValue, Operator:=xlEqual, Formula1:="=""RED""")
        .Interior.Color = RGB(255, 200, 200)
        .Font.Color = RGB(180, 0, 0)
        .Font.Bold = True
    End With

    With ragRange.FormatConditions.Add(Type:=xlCellValue, Operator:=xlEqual, Formula1:="=""AMBER""")
        .Interior.Color = RGB(255, 235, 156)
        .Font.Color = RGB(156, 101, 0)
        .Font.Bold = True
    End With

    With ragRange.FormatConditions.Add(Type:=xlCellValue, Operator:=xlEqual, Formula1:="=""GREEN""")
        .Interior.Color = RGB(198, 239, 206)
        .Font.Color = RGB(0, 97, 0)
        .Font.Bold = True
    End With

    Application.ScreenUpdating = True

    MsgBox "Dashboard refreshed!", vbInformation, "TOM Builder"
End Sub

' Validate all data and show issues
Public Sub ValidateAllData()
    Dim issues As String
    Dim issueCount As Integer

    issues = "VALIDATION REPORT" & vbNewLine & String(40, "=") & vbNewLine & vbNewLine
    issueCount = 0

    ' Check Department
    If GetRAG("Department") = "RED" Then
        issues = issues & "[ ] Department Name is required" & vbNewLine
        issueCount = issueCount + 1
    End If

    ' Check Purpose
    If GetRAG("Purpose") = "RED" Then
        issues = issues & "[ ] Purpose Statement is required" & vbNewLine
        issueCount = issueCount + 1
    End If

    ' Check Services
    If GetRAG("Services") = "RED" Then
        issues = issues & "[ ] Add at least one service" & vbNewLine
        issueCount = issueCount + 1
    ElseIf GetRAG("Services") = "AMBER" Then
        issues = issues & "[~] Add more services (target: 3+)" & vbNewLine
    End If

    ' Check Stakeholders
    If GetRAG("Stakeholders") = "RED" Then
        issues = issues & "[ ] Add at least one stakeholder" & vbNewLine
        issueCount = issueCount + 1
    ElseIf GetRAG("Stakeholders") = "AMBER" Then
        issues = issues & "[~] Add more stakeholders (target: 3+)" & vbNewLine
    End If

    ' Check Value Chain
    If GetRAG("ValueChain") = "RED" Then
        issues = issues & "[ ] Complete your Value Chain" & vbNewLine
        issueCount = issueCount + 1
    ElseIf GetRAG("ValueChain") = "AMBER" Then
        issues = issues & "[~] Value Chain incomplete - add inputs, activities, and outputs" & vbNewLine
    End If

    ' Check SLAs
    If GetRAG("SLAs") = "RED" Then
        issues = issues & "[ ] Define at least one SLA" & vbNewLine
        issueCount = issueCount + 1
    End If

    ' Check KPIs
    If GetRAG("KPIs") = "RED" Then
        issues = issues & "[ ] Define at least one KPI" & vbNewLine
        issueCount = issueCount + 1
    End If

    ' Check RACI
    If GetRAG("RACI") = "RED" Then
        issues = issues & "[ ] Add at least one RACI entry" & vbNewLine
        issueCount = issueCount + 1
    End If

    issues = issues & vbNewLine & String(40, "=") & vbNewLine
    issues = issues & "Critical issues: " & issueCount & vbNewLine
    issues = issues & "[ ] = Required  [~] = Recommended"

    MsgBox issues, IIf(issueCount > 0, vbExclamation, vbInformation), "TOM Builder Validation"
End Sub

' Export TOM to Markdown file
Public Sub ExportToMarkdown()
    On Error GoTo ErrorHandler

    Dim md As String
    Dim filePath As String
    Dim deptName As String
    Dim fileNum As Integer

    ' Get department name for filename
    deptName = GetCellValue("1_Department", "B2")
    If deptName = "" Then deptName = "Unnamed"
    deptName = CleanFileName(deptName)

    ' Build markdown content
    md = BuildMarkdownContent()

    ' Get save location
    filePath = Application.GetSaveAsFilename( _
        InitialFileName:="TOM_" & deptName & "_" & Format(Now, "YYYY-MM-DD") & ".md", _
        FileFilter:="Markdown Files (*.md), *.md", _
        Title:="Save TOM as Markdown")

    If filePath = "False" Then Exit Sub

    ' Write to file
    fileNum = FreeFile
    Open filePath For Output As #fileNum
    Print #fileNum, md
    Close #fileNum

    MsgBox "TOM exported successfully to:" & vbNewLine & filePath, vbInformation, "Export Complete"
    Exit Sub

ErrorHandler:
    MsgBox "Error exporting: " & Err.Description, vbCritical, "Export Error"
End Sub

' =============================================================================
' MARKDOWN BUILDER FUNCTIONS
' =============================================================================

Private Function BuildMarkdownContent() As String
    Dim md As String

    ' Header
    md = "# Target Operating Model (TOM)" & vbNewLine & vbNewLine
    md = md & "**Department:** " & GetCellValue("1_Department", "B2") & vbNewLine
    md = md & "**Division:** " & GetCellValue("1_Department", "B3") & vbNewLine
    md = md & "**Headcount:** " & GetCellValue("1_Department", "B4") & vbNewLine
    md = md & "**Generated:** " & Format(Now, "YYYY-MM-DD HH:MM") & vbNewLine
    md = md & "**Completeness Score:** " & Format(GetTotalScore(), "0") & "%" & vbNewLine
    md = md & vbNewLine & "---" & vbNewLine & vbNewLine

    ' Purpose
    md = md & "## Purpose & Direction" & vbNewLine & vbNewLine
    md = md & "### Purpose Statement" & vbNewLine
    md = md & GetCellValue("2_Purpose", "B2") & vbNewLine & vbNewLine
    If GetCellValue("2_Purpose", "B5") <> "" Then
        md = md & "### Vision" & vbNewLine
        md = md & GetCellValue("2_Purpose", "B5") & vbNewLine & vbNewLine
    End If
    If GetCellValue("2_Purpose", "B8") <> "" Then
        md = md & "### Mission" & vbNewLine
        md = md & GetCellValue("2_Purpose", "B8") & vbNewLine & vbNewLine
    End If

    ' Services
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Service Catalogue" & vbNewLine & vbNewLine
    md = md & BuildServicesTable() & vbNewLine

    ' Stakeholders
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Stakeholders" & vbNewLine & vbNewLine
    md = md & BuildStakeholdersTable() & vbNewLine

    ' Value Chain
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Value Chain" & vbNewLine & vbNewLine
    md = md & BuildValueChainSection() & vbNewLine

    ' SLAs
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Service Level Agreements" & vbNewLine & vbNewLine
    md = md & BuildSLAsTable() & vbNewLine

    ' KPIs
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Key Performance Indicators" & vbNewLine & vbNewLine
    md = md & BuildKPIsTable() & vbNewLine

    ' RACI
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## RACI Matrix" & vbNewLine & vbNewLine
    md = md & BuildRACITable() & vbNewLine

    ' Governance
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Governance" & vbNewLine & vbNewLine
    md = md & BuildGovernanceSection() & vbNewLine

    ' Dependencies
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Dependencies" & vbNewLine & vbNewLine
    md = md & BuildDependenciesTable() & vbNewLine

    ' Risks
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Risks & Pain Points" & vbNewLine & vbNewLine
    md = md & BuildRisksTable() & vbNewLine

    ' Opportunities
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Opportunities & Improvements" & vbNewLine & vbNewLine
    md = md & BuildOpportunitiesTable() & vbNewLine

    BuildMarkdownContent = md
End Function

Private Function BuildServicesTable() As String
    Dim ws As Worksheet
    Dim md As String
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("3_Services")

    md = "| Service | Description | Type | Frequency |" & vbNewLine
    md = md & "|---------|-------------|------|-----------|" & vbNewLine

    For i = 3 To 12
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 1).Value & " | "
            md = md & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 4).Value & " |" & vbNewLine
        End If
    Next i

    BuildServicesTable = md
End Function

Private Function BuildStakeholdersTable() As String
    Dim ws As Worksheet
    Dim md As String
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("4_Stakeholders")

    md = "| Stakeholder | Role | Relationship | Expectations |" & vbNewLine
    md = md & "|-------------|------|--------------|--------------|" & vbNewLine

    For i = 3 To 12
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 1).Value & " | "
            md = md & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 4).Value & " |" & vbNewLine
        End If
    Next i

    BuildStakeholdersTable = md
End Function

Private Function BuildValueChainSection() As String
    Dim ws As Worksheet
    Dim md As String
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("5_ValueChain")

    ' Inputs
    md = "### Inputs" & vbNewLine & vbNewLine
    md = md & "| What You Receive | From Where | How Often |" & vbNewLine
    md = md & "|------------------|------------|-----------|" & vbNewLine
    For i = 5 To 9
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 1).Value & " | "
            md = md & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " |" & vbNewLine
        End If
    Next i

    ' Activities
    md = md & vbNewLine & "### Activities" & vbNewLine & vbNewLine
    md = md & "| Activity | Description | Owner | Criticality |" & vbNewLine
    md = md & "|----------|-------------|-------|-------------|" & vbNewLine
    For i = 13 To 17
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 1).Value & " | "
            md = md & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 4).Value & " |" & vbNewLine
        End If
    Next i

    ' Outputs
    md = md & vbNewLine & "### Outputs" & vbNewLine & vbNewLine
    md = md & "| What You Deliver | Who Receives It | Quality Standard |" & vbNewLine
    md = md & "|------------------|-----------------|------------------|" & vbNewLine
    For i = 21 To 25
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 1).Value & " | "
            md = md & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " |" & vbNewLine
        End If
    Next i

    BuildValueChainSection = md
End Function

Private Function BuildSLAsTable() As String
    Dim ws As Worksheet
    Dim md As String
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("6_SLAs")

    md = "| Service/Activity | Metric | Target | Measurement Method |" & vbNewLine
    md = md & "|------------------|--------|--------|-------------------|" & vbNewLine

    For i = 3 To 12
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 1).Value & " | "
            md = md & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 4).Value & " |" & vbNewLine
        End If
    Next i

    BuildSLAsTable = md
End Function

Private Function BuildKPIsTable() As String
    Dim ws As Worksheet
    Dim md As String
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("7_KPIs")

    md = "| KPI | Description | Target | Frequency | Owner | Category |" & vbNewLine
    md = md & "|-----|-------------|--------|-----------|-------|----------|" & vbNewLine

    For i = 3 To 12
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 1).Value & " | "
            md = md & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 4).Value & " | "
            md = md & ws.Cells(i, 5).Value & " | "
            md = md & ws.Cells(i, 6).Value & " |" & vbNewLine
        End If
    Next i

    BuildKPIsTable = md
End Function

Private Function BuildRACITable() As String
    Dim ws As Worksheet
    Dim md As String
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("8_RACI")

    md = "| Activity | Responsible | Accountable | Consulted | Informed |" & vbNewLine
    md = md & "|----------|-------------|-------------|-----------|----------|" & vbNewLine

    For i = 3 To 12
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 1).Value & " | "
            md = md & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 4).Value & " | "
            md = md & ws.Cells(i, 5).Value & " |" & vbNewLine
        End If
    Next i

    BuildRACITable = md
End Function

Private Function BuildGovernanceSection() As String
    Dim ws As Worksheet
    Dim md As String
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("9_Governance")

    md = "### Forums" & vbNewLine & vbNewLine
    md = md & "| Meeting | Purpose | Frequency | Participants | Decisions |" & vbNewLine
    md = md & "|---------|---------|-----------|--------------|-----------|" & vbNewLine

    For i = 5 To 9
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 1).Value & " | "
            md = md & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 4).Value & " | "
            md = md & ws.Cells(i, 5).Value & " |" & vbNewLine
        End If
    Next i

    md = md & vbNewLine & "### Escalation Path" & vbNewLine & vbNewLine
    md = md & ws.Range("B12").Value & vbNewLine & vbNewLine

    md = md & "### Decision Rights" & vbNewLine & vbNewLine
    md = md & ws.Range("B14").Value & vbNewLine

    BuildGovernanceSection = md
End Function

Private Function BuildDependenciesTable() As String
    Dim ws As Worksheet
    Dim md As String
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("10_Dependencies")

    md = "| Depends On | Type | Criticality | Impact if Unavailable |" & vbNewLine
    md = md & "|------------|------|-------------|----------------------|" & vbNewLine

    For i = 3 To 12
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 1).Value & " | "
            md = md & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 4).Value & " |" & vbNewLine
        End If
    Next i

    BuildDependenciesTable = md
End Function

Private Function BuildRisksTable() As String
    Dim ws As Worksheet
    Dim md As String
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("11_Risks")

    md = "| Risk | Type | Likelihood | Impact | Mitigation |" & vbNewLine
    md = md & "|------|------|------------|--------|------------|" & vbNewLine

    For i = 3 To 12
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 1).Value & " | "
            md = md & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 4).Value & " | "
            md = md & ws.Cells(i, 5).Value & " |" & vbNewLine
        End If
    Next i

    BuildRisksTable = md
End Function

Private Function BuildOpportunitiesTable() As String
    Dim ws As Worksheet
    Dim md As String
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("12_Opportunities")

    md = "| Opportunity | Type | Effort | Impact | Timeframe |" & vbNewLine
    md = md & "|-------------|------|--------|--------|-----------|" & vbNewLine

    For i = 3 To 12
        If Trim(ws.Cells(i, 1).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 1).Value & " | "
            md = md & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 4).Value & " | "
            md = md & ws.Cells(i, 5).Value & " |" & vbNewLine
        End If
    Next i

    BuildOpportunitiesTable = md
End Function

' =============================================================================
' UTILITY FUNCTIONS
' =============================================================================

Private Function GetCellValue(sheetName As String, cellRef As String) As String
    On Error Resume Next
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets(sheetName)
    If ws Is Nothing Then
        GetCellValue = ""
    Else
        GetCellValue = Trim(ws.Range(cellRef).Value)
    End If
End Function

Private Function GetTotalScore() As Double
    GetTotalScore = GetScore("Department") + GetScore("Purpose") + _
                    GetScore("Services") + GetScore("Stakeholders") + _
                    GetScore("ValueChain") + GetScore("SLAs") + _
                    GetScore("KPIs") + GetScore("RACI") + _
                    GetScore("Governance") + GetScore("Dependencies") + _
                    GetScore("Risks") + GetScore("Opportunities")
End Function

Private Function CleanFileName(fileName As String) As String
    Dim result As String
    Dim i As Integer
    Dim c As String

    result = ""
    For i = 1 To Len(fileName)
        c = Mid(fileName, i, 1)
        If c Like "[A-Za-z0-9 _-]" Then
            result = result & c
        End If
    Next i

    CleanFileName = Replace(result, " ", "_")
End Function

' =============================================================================
' SETUP HELPER - Run once to create the workbook structure
' =============================================================================

Public Sub SetupWorkbook()
    Dim ws As Worksheet
    Dim sheetNames As Variant
    Dim i As Integer

    Application.ScreenUpdating = False

    sheetNames = Array("Dashboard", "1_Department", "2_Purpose", "3_Services", _
                       "4_Stakeholders", "5_ValueChain", "6_SLAs", "7_KPIs", _
                       "8_RACI", "9_Governance", "10_Dependencies", "11_Risks", _
                       "12_Opportunities", "_Lookups")

    ' Create sheets if they don't exist
    For i = LBound(sheetNames) To UBound(sheetNames)
        If Not SheetExists(CStr(sheetNames(i))) Then
            Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
            ws.Name = sheetNames(i)
        End If
    Next i

    ' Setup _Lookups sheet
    SetupLookups

    ' Setup each data sheet
    SetupDepartmentSheet
    SetupPurposeSheet
    SetupServicesSheet
    SetupStakeholdersSheet
    SetupValueChainSheet
    SetupSLAsSheet
    SetupKPIsSheet
    SetupRACISheet
    SetupGovernanceSheet
    SetupDependenciesSheet
    SetupRisksSheet
    SetupOpportunitiesSheet
    SetupDashboardSheet

    ' Hide lookups sheet
    ThisWorkbook.Sheets("_Lookups").Visible = xlSheetHidden

    ' Go to Dashboard
    ThisWorkbook.Sheets("Dashboard").Activate

    Application.ScreenUpdating = True

    MsgBox "Workbook setup complete! Start by filling in the Department sheet.", vbInformation, "TOM Builder"
End Sub

Private Function SheetExists(sheetName As String) As Boolean
    Dim ws As Worksheet
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets(sheetName)
    SheetExists = Not ws Is Nothing
End Function

Private Sub SetupLookups()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("_Lookups")

    ws.Cells.Clear

    ' Service Types
    ws.Range("A1").Value = "ServiceType"
    ws.Range("A2").Value = "Core"
    ws.Range("A3").Value = "Support"
    ws.Range("A4").Value = "Strategic"

    ' Stakeholder Relationships
    ws.Range("B1").Value = "StakeholderRel"
    ws.Range("B2").Value = "Internal Customer"
    ws.Range("B3").Value = "External Customer"
    ws.Range("B4").Value = "Partner"
    ws.Range("B5").Value = "Supplier"
    ws.Range("B6").Value = "Leadership"

    ' Frequency
    ws.Range("C1").Value = "Frequency"
    ws.Range("C2").Value = "Daily"
    ws.Range("C3").Value = "Weekly"
    ws.Range("C4").Value = "Monthly"
    ws.Range("C5").Value = "Quarterly"
    ws.Range("C6").Value = "On-demand"

    ' Criticality / Likelihood / Impact / Effort
    ws.Range("D1").Value = "Level"
    ws.Range("D2").Value = "High"
    ws.Range("D3").Value = "Medium"
    ws.Range("D4").Value = "Low"

    ' Risk Types
    ws.Range("E1").Value = "RiskType"
    ws.Range("E2").Value = "Operational"
    ws.Range("E3").Value = "Financial"
    ws.Range("E4").Value = "Compliance"
    ws.Range("E5").Value = "Reputational"
    ws.Range("E6").Value = "Strategic"

    ' KPI Categories
    ws.Range("F1").Value = "KPICategory"
    ws.Range("F2").Value = "Quality"
    ws.Range("F3").Value = "Speed"
    ws.Range("F4").Value = "Cost"
    ws.Range("F5").Value = "Customer Satisfaction"
    ws.Range("F6").Value = "Compliance"

    ' Dependency Types
    ws.Range("G1").Value = "DependencyType"
    ws.Range("G2").Value = "System"
    ws.Range("G3").Value = "Team"
    ws.Range("G4").Value = "Process"
    ws.Range("G5").Value = "Data"
    ws.Range("G6").Value = "External"

    ' Opportunity Types
    ws.Range("H1").Value = "OpportunityType"
    ws.Range("H2").Value = "Efficiency"
    ws.Range("H3").Value = "Quality"
    ws.Range("H4").Value = "Growth"
    ws.Range("H5").Value = "Innovation"
    ws.Range("H6").Value = "Cost Reduction"

    ' Create named ranges
    ThisWorkbook.Names.Add Name:="ServiceTypes", RefersTo:="='_Lookups'!$A$2:$A$4"
    ThisWorkbook.Names.Add Name:="StakeholderRels", RefersTo:="='_Lookups'!$B$2:$B$6"
    ThisWorkbook.Names.Add Name:="Frequencies", RefersTo:="='_Lookups'!$C$2:$C$6"
    ThisWorkbook.Names.Add Name:="Levels", RefersTo:="='_Lookups'!$D$2:$D$4"
    ThisWorkbook.Names.Add Name:="RiskTypes", RefersTo:="='_Lookups'!$E$2:$E$6"
    ThisWorkbook.Names.Add Name:="KPICategories", RefersTo:="='_Lookups'!$F$2:$F$6"
    ThisWorkbook.Names.Add Name:="DependencyTypes", RefersTo:="='_Lookups'!$G$2:$G$6"
    ThisWorkbook.Names.Add Name:="OpportunityTypes", RefersTo:="='_Lookups'!$H$2:$H$6"
End Sub

Private Sub SetupDepartmentSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("1_Department")

    ws.Cells.Clear

    ws.Range("A1").Value = "DEPARTMENT INFORMATION"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14

    ws.Range("A2").Value = "Department Name*"
    ws.Range("A3").Value = "Division/Business Unit"
    ws.Range("A4").Value = "Team Size (Headcount)"

    ws.Range("A6").Value = "* Required field"
    ws.Range("A6").Font.Italic = True
    ws.Range("A6").Font.Color = RGB(128, 128, 128)

    ws.Columns("A").ColumnWidth = 25
    ws.Columns("B").ColumnWidth = 40
End Sub

Private Sub SetupPurposeSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("2_Purpose")

    ws.Cells.Clear

    ws.Range("A1").Value = "PURPOSE STATEMENT"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14

    ws.Range("A2").Value = "Purpose Statement*"
    ws.Range("A3").Value = "(Why does your team exist?)"
    ws.Range("A3").Font.Italic = True
    ws.Range("A3").Font.Color = RGB(128, 128, 128)

    ws.Range("A5").Value = "Vision"
    ws.Range("A6").Value = "(Where are you headed?)"
    ws.Range("A6").Font.Italic = True
    ws.Range("A6").Font.Color = RGB(128, 128, 128)

    ws.Range("A8").Value = "Mission"
    ws.Range("A9").Value = "(How will you get there?)"
    ws.Range("A9").Font.Italic = True
    ws.Range("A9").Font.Color = RGB(128, 128, 128)

    ws.Range("A11").Value = "* Required field"
    ws.Range("A11").Font.Italic = True
    ws.Range("A11").Font.Color = RGB(128, 128, 128)

    ' Make cells taller for multi-line
    ws.Rows("2").RowHeight = 60
    ws.Rows("5").RowHeight = 45
    ws.Rows("8").RowHeight = 45

    ws.Range("B2").WrapText = True
    ws.Range("B5").WrapText = True
    ws.Range("B8").WrapText = True

    ws.Columns("A").ColumnWidth = 25
    ws.Columns("B").ColumnWidth = 60
End Sub

Private Sub SetupServicesSheet()
    Dim ws As Worksheet
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("3_Services")

    ws.Cells.Clear

    ws.Range("A1").Value = "SERVICE CATALOGUE"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14
    ws.Range("C1").Value = "Target: 3+ services"
    ws.Range("C1").Font.Italic = True

    ws.Range("A2").Value = "Service Name*"
    ws.Range("B2").Value = "Description"
    ws.Range("C2").Value = "Type*"
    ws.Range("D2").Value = "Frequency"
    ws.Range("A2:D2").Font.Bold = True

    ' Add data validation for Type and Frequency
    For i = 3 To 12
        With ws.Range("C" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=ServiceTypes"
        End With
        With ws.Range("D" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=Frequencies"
        End With
    Next i

    ws.Columns("A").ColumnWidth = 25
    ws.Columns("B").ColumnWidth = 40
    ws.Columns("C").ColumnWidth = 15
    ws.Columns("D").ColumnWidth = 15
End Sub

Private Sub SetupStakeholdersSheet()
    Dim ws As Worksheet
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("4_Stakeholders")

    ws.Cells.Clear

    ws.Range("A1").Value = "STAKEHOLDERS"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14
    ws.Range("C1").Value = "Target: 3+ stakeholders"
    ws.Range("C1").Font.Italic = True

    ws.Range("A2").Value = "Name/Team*"
    ws.Range("B2").Value = "Role/Position"
    ws.Range("C2").Value = "Relationship Type*"
    ws.Range("D2").Value = "What They Expect From You"
    ws.Range("A2:D2").Font.Bold = True

    For i = 3 To 12
        With ws.Range("C" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=StakeholderRels"
        End With
    Next i

    ws.Columns("A").ColumnWidth = 25
    ws.Columns("B").ColumnWidth = 20
    ws.Columns("C").ColumnWidth = 20
    ws.Columns("D").ColumnWidth = 40
End Sub

Private Sub SetupValueChainSheet()
    Dim ws As Worksheet
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("5_ValueChain")

    ws.Cells.Clear

    ws.Range("A1").Value = "VALUE CHAIN"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14

    ' Inputs section
    ws.Range("A3").Value = "INPUTS (What you receive)"
    ws.Range("A3").Font.Bold = True
    ws.Range("A3").Interior.Color = RGB(220, 230, 241)

    ws.Range("A4").Value = "What You Receive"
    ws.Range("B4").Value = "From Where"
    ws.Range("C4").Value = "How Often"
    ws.Range("A4:C4").Font.Bold = True

    ' Activities section
    ws.Range("A11").Value = "ACTIVITIES (What you do)"
    ws.Range("A11").Font.Bold = True
    ws.Range("A11").Interior.Color = RGB(226, 239, 218)

    ws.Range("A12").Value = "Activity Name"
    ws.Range("B12").Value = "Description"
    ws.Range("C12").Value = "Owner"
    ws.Range("D12").Value = "Criticality"
    ws.Range("A12:D12").Font.Bold = True

    For i = 13 To 17
        With ws.Range("D" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=Levels"
        End With
    Next i

    ' Outputs section
    ws.Range("A19").Value = "OUTPUTS (What you deliver)"
    ws.Range("A19").Font.Bold = True
    ws.Range("A19").Interior.Color = RGB(255, 242, 204)

    ws.Range("A20").Value = "What You Deliver"
    ws.Range("B20").Value = "Who Receives It"
    ws.Range("C20").Value = "Quality Standard"
    ws.Range("A20:C20").Font.Bold = True

    ws.Columns("A").ColumnWidth = 25
    ws.Columns("B").ColumnWidth = 30
    ws.Columns("C").ColumnWidth = 20
    ws.Columns("D").ColumnWidth = 15
End Sub

Private Sub SetupSLAsSheet()
    Dim ws As Worksheet

    Set ws = ThisWorkbook.Sheets("6_SLAs")

    ws.Cells.Clear

    ws.Range("A1").Value = "SERVICE LEVEL AGREEMENTS"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14
    ws.Range("C1").Value = "Target: 2+ SLAs"
    ws.Range("C1").Font.Italic = True

    ws.Range("A2").Value = "Service/Activity*"
    ws.Range("B2").Value = "Metric (What You're Measuring)*"
    ws.Range("C2").Value = "Target/Commitment*"
    ws.Range("D2").Value = "How You'll Measure It"
    ws.Range("A2:D2").Font.Bold = True

    ws.Columns("A").ColumnWidth = 25
    ws.Columns("B").ColumnWidth = 30
    ws.Columns("C").ColumnWidth = 20
    ws.Columns("D").ColumnWidth = 25
End Sub

Private Sub SetupKPIsSheet()
    Dim ws As Worksheet
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("7_KPIs")

    ws.Cells.Clear

    ws.Range("A1").Value = "KEY PERFORMANCE INDICATORS"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14
    ws.Range("D1").Value = "Target: 3+ KPIs"
    ws.Range("D1").Font.Italic = True

    ws.Range("A2").Value = "KPI Name*"
    ws.Range("B2").Value = "Description"
    ws.Range("C2").Value = "Target*"
    ws.Range("D2").Value = "Frequency"
    ws.Range("E2").Value = "Owner"
    ws.Range("F2").Value = "Category*"
    ws.Range("A2:F2").Font.Bold = True

    For i = 3 To 12
        With ws.Range("D" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=Frequencies"
        End With
        With ws.Range("F" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=KPICategories"
        End With
    Next i

    ws.Columns("A").ColumnWidth = 20
    ws.Columns("B").ColumnWidth = 30
    ws.Columns("C").ColumnWidth = 15
    ws.Columns("D").ColumnWidth = 12
    ws.Columns("E").ColumnWidth = 15
    ws.Columns("F").ColumnWidth = 20
End Sub

Private Sub SetupRACISheet()
    Dim ws As Worksheet

    Set ws = ThisWorkbook.Sheets("8_RACI")

    ws.Cells.Clear

    ws.Range("A1").Value = "RACI MATRIX"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14
    ws.Range("C1").Value = "Target: 3+ entries"
    ws.Range("C1").Font.Italic = True

    ws.Range("A2").Value = "Activity/Process*"
    ws.Range("B2").Value = "Responsible (Does the work)"
    ws.Range("C2").Value = "Accountable* (ONE person)"
    ws.Range("D2").Value = "Consulted (Input needed)"
    ws.Range("E2").Value = "Informed (Told after)"
    ws.Range("A2:E2").Font.Bold = True

    ws.Columns("A").ColumnWidth = 25
    ws.Columns("B").ColumnWidth = 25
    ws.Columns("C").ColumnWidth = 25
    ws.Columns("D").ColumnWidth = 25
    ws.Columns("E").ColumnWidth = 25
End Sub

Private Sub SetupGovernanceSheet()
    Dim ws As Worksheet
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("9_Governance")

    ws.Cells.Clear

    ws.Range("A1").Value = "GOVERNANCE & DECISION-MAKING"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14

    ws.Range("A3").Value = "FORUMS"
    ws.Range("A3").Font.Bold = True
    ws.Range("A3").Interior.Color = RGB(220, 230, 241)

    ws.Range("A4").Value = "Meeting Name"
    ws.Range("B4").Value = "Purpose"
    ws.Range("C4").Value = "Frequency"
    ws.Range("D4").Value = "Participants"
    ws.Range("E4").Value = "What Gets Decided"
    ws.Range("A4:E4").Font.Bold = True

    For i = 5 To 9
        With ws.Range("C" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=Frequencies"
        End With
    Next i

    ws.Range("A11").Value = "ESCALATION & DECISIONS"
    ws.Range("A11").Font.Bold = True
    ws.Range("A11").Interior.Color = RGB(226, 239, 218)

    ws.Range("A12").Value = "Escalation Path:"
    ws.Range("A14").Value = "Decision Rights:"

    ws.Rows("12").RowHeight = 60
    ws.Rows("14").RowHeight = 60
    ws.Range("B12").WrapText = True
    ws.Range("B14").WrapText = True

    ws.Columns("A").ColumnWidth = 20
    ws.Columns("B").ColumnWidth = 30
    ws.Columns("C").ColumnWidth = 12
    ws.Columns("D").ColumnWidth = 25
    ws.Columns("E").ColumnWidth = 30
End Sub

Private Sub SetupDependenciesSheet()
    Dim ws As Worksheet
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("10_Dependencies")

    ws.Cells.Clear

    ws.Range("A1").Value = "DEPENDENCIES"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14
    ws.Range("C1").Value = "Target: 2+ dependencies"
    ws.Range("C1").Font.Italic = True

    ws.Range("A2").Value = "Depends On*"
    ws.Range("B2").Value = "Type*"
    ws.Range("C2").Value = "Criticality"
    ws.Range("D2").Value = "Impact if Unavailable"
    ws.Range("A2:D2").Font.Bold = True

    For i = 3 To 12
        With ws.Range("B" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=DependencyTypes"
        End With
        With ws.Range("C" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=Levels"
        End With
    Next i

    ws.Columns("A").ColumnWidth = 30
    ws.Columns("B").ColumnWidth = 15
    ws.Columns("C").ColumnWidth = 15
    ws.Columns("D").ColumnWidth = 40
End Sub

Private Sub SetupRisksSheet()
    Dim ws As Worksheet
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("11_Risks")

    ws.Cells.Clear

    ws.Range("A1").Value = "RISKS & PAIN POINTS"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14
    ws.Range("C1").Value = "Target: 2+ risks"
    ws.Range("C1").Font.Italic = True

    ws.Range("A2").Value = "Risk Description*"
    ws.Range("B2").Value = "Type*"
    ws.Range("C2").Value = "Likelihood"
    ws.Range("D2").Value = "Impact"
    ws.Range("E2").Value = "Mitigation"
    ws.Range("A2:E2").Font.Bold = True

    For i = 3 To 12
        With ws.Range("B" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=RiskTypes"
        End With
        With ws.Range("C" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=Levels"
        End With
        With ws.Range("D" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=Levels"
        End With
    Next i

    ws.Columns("A").ColumnWidth = 35
    ws.Columns("B").ColumnWidth = 15
    ws.Columns("C").ColumnWidth = 12
    ws.Columns("D").ColumnWidth = 12
    ws.Columns("E").ColumnWidth = 40
End Sub

Private Sub SetupOpportunitiesSheet()
    Dim ws As Worksheet
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("12_Opportunities")

    ws.Cells.Clear

    ws.Range("A1").Value = "OPPORTUNITIES & IMPROVEMENTS"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14
    ws.Range("C1").Value = "Target: 2+ opportunities"
    ws.Range("C1").Font.Italic = True

    ws.Range("A2").Value = "Opportunity Description*"
    ws.Range("B2").Value = "Type*"
    ws.Range("C2").Value = "Effort"
    ws.Range("D2").Value = "Impact"
    ws.Range("E2").Value = "Timeframe"
    ws.Range("A2:E2").Font.Bold = True

    For i = 3 To 12
        With ws.Range("B" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=OpportunityTypes"
        End With
        With ws.Range("C" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=Levels"
        End With
        With ws.Range("D" & i).Validation
            .Delete
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
                 Formula1:="=Levels"
        End With
    Next i

    ws.Columns("A").ColumnWidth = 40
    ws.Columns("B").ColumnWidth = 15
    ws.Columns("C").ColumnWidth = 10
    ws.Columns("D").ColumnWidth = 10
    ws.Columns("E").ColumnWidth = 15
End Sub

Private Sub SetupDashboardSheet()
    Dim ws As Worksheet

    Set ws = ThisWorkbook.Sheets("Dashboard")

    ws.Cells.Clear

    ' Title
    ws.Range("A1").Value = "TOM BUILDER DASHBOARD"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 18

    ' Department info
    ws.Range("A2").Value = "Department:"
    ws.Range("B2").Formula = "=IF('1_Department'!B2="""",""[Not Set]"",'1_Department'!B2)"
    ws.Range("D2").Value = "Last Updated:"
    ws.Range("E2").Formula = "=NOW()"
    ws.Range("E2").NumberFormat = "YYYY-MM-DD HH:MM"

    ' Headers
    ws.Range("A4").Value = "Section"
    ws.Range("B4").Value = "Status"
    ws.Range("C4").Value = "Score"
    ws.Range("D4").Value = "Weight"
    ws.Range("A4:D4").Font.Bold = True
    ws.Range("A4:D4").Interior.Color = RGB(68, 84, 106)
    ws.Range("A4:D4").Font.Color = RGB(255, 255, 255)

    ' Section rows
    ws.Range("A5").Value = "1. Department Info"
    ws.Range("A6").Value = "2. Purpose Statement"
    ws.Range("A7").Value = "3. Service Catalogue"
    ws.Range("A8").Value = "4. Stakeholders"
    ws.Range("A9").Value = "5. Value Chain"
    ws.Range("A10").Value = "6. SLAs"
    ws.Range("A11").Value = "7. KPIs"
    ws.Range("A12").Value = "8. RACI Matrix"
    ws.Range("A13").Value = "9. Governance"
    ws.Range("A14").Value = "10. Dependencies"
    ws.Range("A15").Value = "11. Risks"
    ws.Range("A16").Value = "12. Opportunities"

    ' RAG formulas
    ws.Range("B5").Formula = "=GetRAG(""Department"")"
    ws.Range("B6").Formula = "=GetRAG(""Purpose"")"
    ws.Range("B7").Formula = "=GetRAG(""Services"")"
    ws.Range("B8").Formula = "=GetRAG(""Stakeholders"")"
    ws.Range("B9").Formula = "=GetRAG(""ValueChain"")"
    ws.Range("B10").Formula = "=GetRAG(""SLAs"")"
    ws.Range("B11").Formula = "=GetRAG(""KPIs"")"
    ws.Range("B12").Formula = "=GetRAG(""RACI"")"
    ws.Range("B13").Formula = "=GetRAG(""Governance"")"
    ws.Range("B14").Formula = "=GetRAG(""Dependencies"")"
    ws.Range("B15").Formula = "=GetRAG(""Risks"")"
    ws.Range("B16").Formula = "=GetRAG(""Opportunities"")"

    ' Score formulas
    ws.Range("C5").Formula = "=GetScore(""Department"")"
    ws.Range("C6").Formula = "=GetScore(""Purpose"")"
    ws.Range("C7").Formula = "=GetScore(""Services"")"
    ws.Range("C8").Formula = "=GetScore(""Stakeholders"")"
    ws.Range("C9").Formula = "=GetScore(""ValueChain"")"
    ws.Range("C10").Formula = "=GetScore(""SLAs"")"
    ws.Range("C11").Formula = "=GetScore(""KPIs"")"
    ws.Range("C12").Formula = "=GetScore(""RACI"")"
    ws.Range("C13").Formula = "=GetScore(""Governance"")"
    ws.Range("C14").Formula = "=GetScore(""Dependencies"")"
    ws.Range("C15").Formula = "=GetScore(""Risks"")"
    ws.Range("C16").Formula = "=GetScore(""Opportunities"")"

    ' Weights
    ws.Range("D5").Value = "10%"
    ws.Range("D6").Value = "10%"
    ws.Range("D7").Value = "10%"
    ws.Range("D8").Value = "10%"
    ws.Range("D9").Value = "15%"
    ws.Range("D10").Value = "10%"
    ws.Range("D11").Value = "10%"
    ws.Range("D12").Value = "10%"
    ws.Range("D13").Value = "5%"
    ws.Range("D14").Value = "5%"
    ws.Range("D15").Value = "5%"
    ws.Range("D16").Value = "5%"

    ' Total row
    ws.Range("A18").Value = "TOTAL SCORE"
    ws.Range("A18").Font.Bold = True
    ws.Range("C18").Formula = "=SUM(C5:C16)"
    ws.Range("C18").Font.Bold = True
    ws.Range("C18").Font.Size = 14
    ws.Range("D18").Value = "100%"

    ' Recommendations
    ws.Range("A20").Value = "RECOMMENDATIONS"
    ws.Range("A20").Font.Bold = True
    ws.Range("A20").Font.Size = 12
    ws.Range("A21").Formula = "=GetRecommendations()"
    ws.Range("A21").WrapText = True
    ws.Rows("21").RowHeight = 100

    ' Column widths
    ws.Columns("A").ColumnWidth = 25
    ws.Columns("B").ColumnWidth = 12
    ws.Columns("C").ColumnWidth = 10
    ws.Columns("D").ColumnWidth = 10
    ws.Columns("E").ColumnWidth = 20

    ' Add borders
    ws.Range("A4:D16").Borders.LineStyle = xlContinuous

    ' Add conditional formatting for RAG
    Dim ragRange As Range
    Set ragRange = ws.Range("B5:B16")

    ragRange.FormatConditions.Delete

    With ragRange.FormatConditions.Add(Type:=xlCellValue, Operator:=xlEqual, Formula1:="=""RED""")
        .Interior.Color = RGB(255, 200, 200)
        .Font.Color = RGB(180, 0, 0)
        .Font.Bold = True
    End With

    With ragRange.FormatConditions.Add(Type:=xlCellValue, Operator:=xlEqual, Formula1:="=""AMBER""")
        .Interior.Color = RGB(255, 235, 156)
        .Font.Color = RGB(156, 101, 0)
        .Font.Bold = True
    End With

    With ragRange.FormatConditions.Add(Type:=xlCellValue, Operator:=xlEqual, Formula1:="=""GREEN""")
        .Interior.Color = RGB(198, 239, 206)
        .Font.Color = RGB(0, 97, 0)
        .Font.Bold = True
    End With
End Sub
