' =============================================================================
' TOM BUILDER - EXCEL VERSION (FULL)
' =============================================================================
' Complete VBA module with styling, helper content, and all functionality
' Matches the web application experience
' =============================================================================

Option Explicit

' Color constants (RGB values)
Private Const COLOR_PRIMARY As Long = 4485478       ' #446688 - Dark blue
Private Const COLOR_PRIMARY_LIGHT As Long = 15395562 ' #EAF2FA - Light blue bg
Private Const COLOR_SUCCESS As Long = 5287936       ' #50B83C - Green
Private Const COLOR_SUCCESS_BG As Long = 14348258   ' #DAF5D2 - Light green
Private Const COLOR_WARNING As Long = 39423         ' #FF9A00 - Amber/Orange
Private Const COLOR_WARNING_BG As Long = 10092543   ' #FFF4E5 - Light amber
Private Const COLOR_DANGER As Long = 255            ' #FF0000 - Red
Private Const COLOR_DANGER_BG As Long = 13816530    ' #FFE5E5 - Light red
Private Const COLOR_GRAY_TEXT As Long = 8421504     ' #808080 - Gray text
Private Const COLOR_LIGHT_GRAY As Long = 15790320   ' #F0F0F0 - Light gray bg
Private Const COLOR_WHITE As Long = 16777215        ' #FFFFFF - White

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

Public Function GetRAG(sectionName As String) As String
    On Error Resume Next
    Select Case LCase(sectionName)
        Case "department": GetRAG = GetDepartmentRAG()
        Case "purpose": GetRAG = GetPurposeRAG()
        Case "services": GetRAG = GetArrayRAG("3_Services", 5, TARGET_SERVICES)
        Case "stakeholders": GetRAG = GetArrayRAG("4_Stakeholders", 5, TARGET_STAKEHOLDERS)
        Case "valuechain": GetRAG = GetValueChainRAG()
        Case "slas": GetRAG = GetArrayRAG("6_SLAs", 5, TARGET_SLAS)
        Case "kpis": GetRAG = GetArrayRAG("7_KPIs", 5, TARGET_KPIS)
        Case "raci": GetRAG = GetArrayRAG("8_RACI", 5, TARGET_RACI)
        Case "governance": GetRAG = GetGovernanceRAG()
        Case "dependencies": GetRAG = GetArrayRAG("10_Dependencies", 5, TARGET_DEPENDENCIES)
        Case "risks": GetRAG = GetArrayRAG("11_Risks", 5, TARGET_RISKS)
        Case "opportunities": GetRAG = GetArrayRAG("12_Opportunities", 5, TARGET_OPPORTUNITIES)
        Case Else: GetRAG = "ERROR"
    End Select
End Function

Public Function GetScore(sectionName As String) As Double
    On Error Resume Next
    Dim rag As String
    Dim weight As Double

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

    rag = GetRAG(sectionName)

    Select Case rag
        Case "GREEN": GetScore = weight
        Case "AMBER": GetScore = weight * 0.5
        Case "RED": GetScore = 0
        Case Else: GetScore = 0
    End Select
End Function

Public Function GetRecommendations() As String
    On Error Resume Next
    Dim recs As String
    Dim totalScore As Double

    totalScore = GetTotalScore()
    recs = ""

    ' Critical (RED) items first
    If GetRAG("Department") = "RED" Then recs = recs & Chr(149) & " Enter your Department Name (required)" & vbNewLine
    If GetRAG("Purpose") = "RED" Then recs = recs & Chr(149) & " Add your Purpose Statement - why does your team exist?" & vbNewLine
    If GetRAG("Services") = "RED" Then recs = recs & Chr(149) & " Define at least one service your team delivers" & vbNewLine
    If GetRAG("ValueChain") = "RED" Then recs = recs & Chr(149) & " Complete your Value Chain (inputs, activities, outputs)" & vbNewLine

    ' Amber items
    If GetRAG("Services") = "AMBER" Then recs = recs & Chr(149) & " Add more services (target: 3+ for comprehensive coverage)" & vbNewLine
    If GetRAG("Stakeholders") = "AMBER" Then recs = recs & Chr(149) & " Add more stakeholders (target: 3+)" & vbNewLine
    If GetRAG("ValueChain") = "AMBER" Then recs = recs & Chr(149) & " Value Chain incomplete - ensure all 3 sections have entries" & vbNewLine
    If GetRAG("KPIs") = "AMBER" Then recs = recs & Chr(149) & " Add more KPIs to track performance (target: 3+)" & vbNewLine

    ' General advice based on score
    If totalScore < 30 Then
        recs = recs & vbNewLine & "Focus on completing the core sections first: Department, Purpose, and Services."
    ElseIf totalScore >= 30 And totalScore < 60 Then
        recs = recs & vbNewLine & "Good progress! Now add your Value Chain and define SLAs/KPIs."
    ElseIf totalScore >= 60 And totalScore < 80 Then
        recs = recs & vbNewLine & "Almost there! Review RACI assignments and Governance structure."
    ElseIf totalScore >= 80 Then
        recs = recs & vbNewLine & "Excellent coverage! Review all sections for accuracy and export your TOM."
    End If

    If recs = "" Then recs = "Your TOM is comprehensive. Ready to export!"

    GetRecommendations = recs
End Function

Public Function GetTotalScore() As Double
    GetTotalScore = GetScore("Department") + GetScore("Purpose") + _
                    GetScore("Services") + GetScore("Stakeholders") + _
                    GetScore("ValueChain") + GetScore("SLAs") + _
                    GetScore("KPIs") + GetScore("RACI") + _
                    GetScore("Governance") + GetScore("Dependencies") + _
                    GetScore("Risks") + GetScore("Opportunities")
End Function

' =============================================================================
' PRIVATE RAG FUNCTIONS
' =============================================================================

Private Function GetDepartmentRAG() As String
    On Error Resume Next
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("1_Department")
    If ws Is Nothing Then GetDepartmentRAG = "RED": Exit Function
    If Trim(ws.Range("C5").Value) = "" Then
        GetDepartmentRAG = "RED"
    Else
        GetDepartmentRAG = "GREEN"
    End If
End Function

Private Function GetPurposeRAG() As String
    On Error Resume Next
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("2_Purpose")
    If ws Is Nothing Then GetPurposeRAG = "RED": Exit Function

    If Trim(ws.Range("C5").Value) = "" Then
        GetPurposeRAG = "RED"
    ElseIf Trim(ws.Range("C9").Value) = "" And Trim(ws.Range("C13").Value) = "" Then
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
    If ws Is Nothing Then GetArrayRAG = "RED": Exit Function

    count = 0
    For i = startRow To startRow + 9
        If Trim(ws.Cells(i, 2).Value) <> "" Then count = count + 1
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
    Dim hasInputs As Boolean, hasActivities As Boolean, hasOutputs As Boolean
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("5_ValueChain")
    If ws Is Nothing Then GetValueChainRAG = "RED": Exit Function

    hasInputs = False
    For i = 7 To 11
        If Trim(ws.Cells(i, 2).Value) <> "" Then hasInputs = True: Exit For
    Next i

    hasActivities = False
    For i = 16 To 20
        If Trim(ws.Cells(i, 2).Value) <> "" Then hasActivities = True: Exit For
    Next i

    hasOutputs = False
    For i = 25 To 29
        If Trim(ws.Cells(i, 2).Value) <> "" Then hasOutputs = True: Exit For
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
    Dim hasForums As Boolean, hasEscalation As Boolean
    Dim i As Integer

    Set ws = ThisWorkbook.Sheets("9_Governance")
    If ws Is Nothing Then GetGovernanceRAG = "RED": Exit Function

    hasForums = False
    For i = 7 To 11
        If Trim(ws.Cells(i, 2).Value) <> "" Then hasForums = True: Exit For
    Next i

    hasEscalation = Trim(ws.Range("C16").Value) <> ""

    If Not hasForums And Not hasEscalation Then
        GetGovernanceRAG = "RED"
    ElseIf hasForums And hasEscalation Then
        GetGovernanceRAG = "GREEN"
    Else
        GetGovernanceRAG = "AMBER"
    End If
End Function

' =============================================================================
' MAIN SETUP MACRO - Run this first!
' =============================================================================

Public Sub SetupTOMBuilder()
    Application.ScreenUpdating = False
    Application.DisplayAlerts = False

    ' Delete existing sheets except Sheet1
    Dim ws As Worksheet
    For Each ws In ThisWorkbook.Sheets
        If ws.Name <> "Sheet1" Then
            On Error Resume Next
            ws.Delete
            On Error GoTo 0
        End If
    Next ws

    ' Create all sheets
    CreateLookupsSheet
    CreateDashboardSheet
    CreateDepartmentSheet
    CreatePurposeSheet
    CreateServicesSheet
    CreateStakeholdersSheet
    CreateValueChainSheet
    CreateSLAsSheet
    CreateKPIsSheet
    CreateRACISheet
    CreateGovernanceSheet
    CreateDependenciesSheet
    CreateRisksSheet
    CreateOpportunitiesSheet

    ' Delete Sheet1 if it exists
    On Error Resume Next
    ThisWorkbook.Sheets("Sheet1").Delete
    On Error GoTo 0

    ' Hide lookups sheet
    ThisWorkbook.Sheets("_Lookups").Visible = xlSheetHidden

    ' Activate Dashboard
    ThisWorkbook.Sheets("Dashboard").Activate

    Application.DisplayAlerts = True
    Application.ScreenUpdating = True

    MsgBox "TOM Builder setup complete!" & vbNewLine & vbNewLine & _
           "Start with the '1_Department' sheet and work through each section." & vbNewLine & _
           "The Dashboard will track your progress automatically.", _
           vbInformation, "TOM Builder Ready"
End Sub

' =============================================================================
' LOOKUPS SHEET
' =============================================================================

Private Sub CreateLookupsSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "_Lookups"

    ' Service Types
    ws.Range("A1").Value = "ServiceType"
    ws.Range("A2:A4").Value = Application.Transpose(Array("Core", "Support", "Strategic"))

    ' Stakeholder Relationships
    ws.Range("B1").Value = "StakeholderRel"
    ws.Range("B2:B6").Value = Application.Transpose(Array("Internal Customer", "External Customer", "Partner", "Supplier", "Leadership"))

    ' Frequency
    ws.Range("C1").Value = "Frequency"
    ws.Range("C2:C6").Value = Application.Transpose(Array("Daily", "Weekly", "Monthly", "Quarterly", "On-demand"))

    ' Criticality/Likelihood/Impact
    ws.Range("D1").Value = "Level"
    ws.Range("D2:D4").Value = Application.Transpose(Array("High", "Medium", "Low"))

    ' Risk Types
    ws.Range("E1").Value = "RiskType"
    ws.Range("E2:E6").Value = Application.Transpose(Array("Operational", "Financial", "Compliance", "Reputational", "Strategic"))

    ' KPI Categories
    ws.Range("F1").Value = "KPICategory"
    ws.Range("F2:F6").Value = Application.Transpose(Array("Quality", "Speed", "Cost", "Customer Satisfaction", "Compliance"))

    ' Dependency Types
    ws.Range("G1").Value = "DependencyType"
    ws.Range("G2:G6").Value = Application.Transpose(Array("System", "Team", "Process", "Data", "External"))

    ' Opportunity Types
    ws.Range("H1").Value = "OpportunityType"
    ws.Range("H2:H6").Value = Application.Transpose(Array("Efficiency", "Quality", "Growth", "Innovation", "Cost Reduction"))

    ' Create named ranges
    On Error Resume Next
    ThisWorkbook.Names("ServiceTypes").Delete
    ThisWorkbook.Names("StakeholderRels").Delete
    ThisWorkbook.Names("Frequencies").Delete
    ThisWorkbook.Names("Levels").Delete
    ThisWorkbook.Names("RiskTypes").Delete
    ThisWorkbook.Names("KPICategories").Delete
    ThisWorkbook.Names("DependencyTypes").Delete
    ThisWorkbook.Names("OpportunityTypes").Delete
    On Error GoTo 0

    ThisWorkbook.Names.Add Name:="ServiceTypes", RefersTo:="='_Lookups'!$A$2:$A$4"
    ThisWorkbook.Names.Add Name:="StakeholderRels", RefersTo:="='_Lookups'!$B$2:$B$6"
    ThisWorkbook.Names.Add Name:="Frequencies", RefersTo:="='_Lookups'!$C$2:$C$6"
    ThisWorkbook.Names.Add Name:="Levels", RefersTo:="='_Lookups'!$D$2:$D$4"
    ThisWorkbook.Names.Add Name:="RiskTypes", RefersTo:="='_Lookups'!$E$2:$E$6"
    ThisWorkbook.Names.Add Name:="KPICategories", RefersTo:="='_Lookups'!$F$2:$F$6"
    ThisWorkbook.Names.Add Name:="DependencyTypes", RefersTo:="='_Lookups'!$G$2:$G$6"
    ThisWorkbook.Names.Add Name:="OpportunityTypes", RefersTo:="='_Lookups'!$H$2:$H$6"
End Sub

' =============================================================================
' DASHBOARD SHEET
' =============================================================================

Private Sub CreateDashboardSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "Dashboard"

    ApplyBaseStyle ws

    ' Title area
    ws.Range("B2:G2").Merge
    ws.Range("B2").Value = "TOM BUILDER DASHBOARD"
    ws.Range("B2").Font.Size = 24
    ws.Range("B2").Font.Bold = True
    ws.Range("B2").Font.Color = COLOR_PRIMARY

    ' Subtitle
    ws.Range("B3:G3").Merge
    ws.Range("B3").Value = "Target Operating Model - Progress Tracker"
    ws.Range("B3").Font.Size = 12
    ws.Range("B3").Font.Color = COLOR_GRAY_TEXT

    ' Department info box
    ws.Range("B5:D5").Merge
    ws.Range("B5").Value = "Department:"
    ws.Range("B5").Font.Bold = True
    ws.Range("E5:G5").Merge
    ws.Range("E5").Formula = "=IF('1_Department'!C5="""",""[Not Set]"",'1_Department'!C5)"
    ws.Range("E5").Font.Size = 14
    ws.Range("E5").Font.Color = COLOR_PRIMARY

    ' Score display box
    ws.Range("B7:C9").Merge
    ws.Range("B7").Value = "COMPLETENESS"
    ws.Range("B7").Font.Size = 10
    ws.Range("B7").Font.Color = COLOR_GRAY_TEXT
    ws.Range("B7").HorizontalAlignment = xlCenter
    ws.Range("B7").VerticalAlignment = xlTop

    ws.Range("B10:C10").Merge
    ws.Range("B10").Formula = "=ROUND(GetTotalScore(),0) & ""%"""
    ws.Range("B10").Font.Size = 36
    ws.Range("B10").Font.Bold = True
    ws.Range("B10").HorizontalAlignment = xlCenter

    ' Score box styling
    With ws.Range("B7:C11").Borders
        .LineStyle = xlContinuous
        .Color = COLOR_PRIMARY
        .Weight = xlMedium
    End With
    ws.Range("B7:C11").Interior.Color = COLOR_PRIMARY_LIGHT

    ' Section table headers
    ws.Range("B13").Value = "SECTION"
    ws.Range("E13").Value = "STATUS"
    ws.Range("F13").Value = "SCORE"
    ws.Range("G13").Value = "WEIGHT"
    ws.Range("B13:G13").Font.Bold = True
    ws.Range("B13:G13").Font.Color = COLOR_WHITE
    ws.Range("B13:G13").Interior.Color = COLOR_PRIMARY

    ' Section data
    Dim sections As Variant
    sections = Array("1. Department Info", "2. Purpose Statement", "3. Service Catalogue", _
                     "4. Stakeholders", "5. Value Chain", "6. SLAs", _
                     "7. KPIs", "8. RACI Matrix", "9. Governance", _
                     "10. Dependencies", "11. Risks", "12. Opportunities")

    Dim sectionKeys As Variant
    sectionKeys = Array("Department", "Purpose", "Services", "Stakeholders", _
                        "ValueChain", "SLAs", "KPIs", "RACI", "Governance", _
                        "Dependencies", "Risks", "Opportunities")

    Dim weights As Variant
    weights = Array("10%", "10%", "10%", "10%", "15%", "10%", "10%", "10%", "5%", "5%", "5%", "5%")

    Dim i As Integer
    For i = 0 To 11
        ws.Range("B" & (14 + i) & ":D" & (14 + i)).Merge
        ws.Range("B" & (14 + i)).Value = sections(i)
        ws.Range("E" & (14 + i)).Formula = "=GetRAG(""" & sectionKeys(i) & """)"
        ws.Range("E" & (14 + i)).HorizontalAlignment = xlCenter
        ws.Range("F" & (14 + i)).Formula = "=GetScore(""" & sectionKeys(i) & """)"
        ws.Range("F" & (14 + i)).HorizontalAlignment = xlCenter
        ws.Range("G" & (14 + i)).Value = weights(i)
        ws.Range("G" & (14 + i)).HorizontalAlignment = xlCenter

        ' Alternating row colors
        If i Mod 2 = 0 Then
            ws.Range("B" & (14 + i) & ":G" & (14 + i)).Interior.Color = COLOR_LIGHT_GRAY
        End If
    Next i

    ' Borders for table
    With ws.Range("B13:G25").Borders
        .LineStyle = xlContinuous
        .Color = RGB(200, 200, 200)
    End With

    ' Total row
    ws.Range("B26:D26").Merge
    ws.Range("B26").Value = "TOTAL"
    ws.Range("B26").Font.Bold = True
    ws.Range("F26").Formula = "=SUM(F14:F25)"
    ws.Range("F26").Font.Bold = True
    ws.Range("G26").Value = "100%"
    ws.Range("G26").Font.Bold = True
    ws.Range("B26:G26").Interior.Color = COLOR_PRIMARY_LIGHT

    ' Conditional formatting for RAG status
    Dim ragRange As Range
    Set ragRange = ws.Range("E14:E25")
    ragRange.FormatConditions.Delete

    With ragRange.FormatConditions.Add(Type:=xlCellValue, Operator:=xlEqual, Formula1:="=""RED""")
        .Interior.Color = COLOR_DANGER_BG
        .Font.Color = COLOR_DANGER
        .Font.Bold = True
    End With

    With ragRange.FormatConditions.Add(Type:=xlCellValue, Operator:=xlEqual, Formula1:="=""AMBER""")
        .Interior.Color = COLOR_WARNING_BG
        .Font.Color = COLOR_WARNING
        .Font.Bold = True
    End With

    With ragRange.FormatConditions.Add(Type:=xlCellValue, Operator:=xlEqual, Formula1:="=""GREEN""")
        .Interior.Color = COLOR_SUCCESS_BG
        .Font.Color = COLOR_SUCCESS
        .Font.Bold = True
    End With

    ' Recommendations section
    ws.Range("B28:G28").Merge
    ws.Range("B28").Value = "RECOMMENDATIONS"
    ws.Range("B28").Font.Bold = True
    ws.Range("B28").Font.Size = 14
    ws.Range("B28").Font.Color = COLOR_PRIMARY

    ws.Range("B29:G35").Merge
    ws.Range("B29").Formula = "=GetRecommendations()"
    ws.Range("B29").WrapText = True
    ws.Range("B29").VerticalAlignment = xlTop
    ws.Range("B29").Font.Size = 11
    With ws.Range("B29:G35").Borders
        .LineStyle = xlContinuous
        .Color = RGB(200, 200, 200)
    End With
    ws.Range("B29:G35").Interior.Color = COLOR_LIGHT_GRAY

    ' Column widths
    ws.Columns("A").ColumnWidth = 3
    ws.Columns("B").ColumnWidth = 8
    ws.Columns("C").ColumnWidth = 8
    ws.Columns("D").ColumnWidth = 15
    ws.Columns("E").ColumnWidth = 12
    ws.Columns("F").ColumnWidth = 10
    ws.Columns("G").ColumnWidth = 10
    ws.Columns("H").ColumnWidth = 3
End Sub

' =============================================================================
' 1. DEPARTMENT SHEET
' =============================================================================

Private Sub CreateDepartmentSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "1_Department"

    ApplyBaseStyle ws

    ' Header
    CreateSectionHeader ws, "Department Information", "Step 1 of 12", _
        "Let's start with the basics. This helps identify your team within the organization."

    ' Info box
    CreateInfoBox ws, 4, "B", "G", _
        "This information will appear at the top of your TOM document and helps " & _
        "leadership understand which team this operating model belongs to."

    ' Fields
    CreateFieldLabel ws, "B5", "Department Name", True
    CreateFieldInput ws, "C5", "E5", ""
    CreateFieldHelper ws, "F5", "e.g., 'Customer Support', 'Finance Operations', 'IT Infrastructure'"

    CreateFieldLabel ws, "B7", "Division / Business Unit", False
    CreateFieldInput ws, "C7", "E7", ""
    CreateFieldHelper ws, "F7", "The larger group your team belongs to"

    CreateFieldLabel ws, "B9", "Team Size (Headcount)", False
    CreateFieldInput ws, "C9", "C9", ""
    ws.Range("C9").NumberFormat = "0"
    CreateFieldHelper ws, "D9", "Current number of team members"

    ' Navigation hint
    CreateNavHint ws, 12, "Next: Define your Purpose Statement (Sheet '2_Purpose')"

    ' Column widths
    ws.Columns("A").ColumnWidth = 3
    ws.Columns("B").ColumnWidth = 25
    ws.Columns("C").ColumnWidth = 20
    ws.Columns("D").ColumnWidth = 15
    ws.Columns("E").ColumnWidth = 15
    ws.Columns("F").ColumnWidth = 40
    ws.Columns("G").ColumnWidth = 3
End Sub

' =============================================================================
' 2. PURPOSE SHEET
' =============================================================================

Private Sub CreatePurposeSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "2_Purpose"

    ApplyBaseStyle ws

    ' Header
    CreateSectionHeader ws, "Purpose Statement", "Step 2 of 12", _
        "Define why your team exists. This is the foundation of your operating model."

    ' Info box
    CreateInfoBox ws, 4, "B", "G", _
        "A clear purpose statement helps everyone understand your team's reason for being. " & _
        "It should answer: 'Why does this team exist?' and 'What value do we provide?'"

    ' Purpose field
    CreateFieldLabel ws, "B5", "Purpose Statement", True
    ws.Range("C5:F7").Merge
    ws.Range("C5").Value = ""
    ws.Range("C5").WrapText = True
    ws.Range("C5").VerticalAlignment = xlTop
    StyleInputCell ws.Range("C5:F7")
    ws.Rows("5:7").RowHeight = 25
    CreateFieldHelper ws, "B8", "Why does your team exist? What problem do you solve?"
    ws.Range("B8").Font.Italic = True
    ws.Range("B8").Font.Color = COLOR_GRAY_TEXT

    ' Vision field
    CreateFieldLabel ws, "B9", "Vision", False
    ws.Range("C9:F11").Merge
    ws.Range("C9").Value = ""
    ws.Range("C9").WrapText = True
    ws.Range("C9").VerticalAlignment = xlTop
    StyleInputCell ws.Range("C9:F11")
    ws.Rows("9:11").RowHeight = 25
    CreateFieldHelper ws, "B12", "Where is your team headed? What does success look like?"
    ws.Range("B12").Font.Italic = True
    ws.Range("B12").Font.Color = COLOR_GRAY_TEXT

    ' Mission field
    CreateFieldLabel ws, "B13", "Mission", False
    ws.Range("C13:F15").Merge
    ws.Range("C13").Value = ""
    ws.Range("C13").WrapText = True
    ws.Range("C13").VerticalAlignment = xlTop
    StyleInputCell ws.Range("C13:F15")
    ws.Rows("13:15").RowHeight = 25
    CreateFieldHelper ws, "B16", "How will you achieve your vision? What approach do you take?"
    ws.Range("B16").Font.Italic = True
    ws.Range("B16").Font.Color = COLOR_GRAY_TEXT

    ' Navigation hint
    CreateNavHint ws, 18, "Next: Define your Service Catalogue (Sheet '3_Services')"

    ' Column widths
    ws.Columns("A").ColumnWidth = 3
    ws.Columns("B").ColumnWidth = 22
    ws.Columns("C").ColumnWidth = 20
    ws.Columns("D").ColumnWidth = 15
    ws.Columns("E").ColumnWidth = 15
    ws.Columns("F").ColumnWidth = 20
    ws.Columns("G").ColumnWidth = 3
End Sub

' =============================================================================
' 3. SERVICES SHEET
' =============================================================================

Private Sub CreateServicesSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "3_Services"

    ApplyBaseStyle ws

    ' Header
    CreateSectionHeader ws, "Service Catalogue", "Step 3 of 12", _
        "List the services your team provides. Think of these as your 'products'."

    ' Info box with target
    CreateInfoBox ws, 4, "B", "G", _
        "Target: 3+ services for comprehensive coverage. Services are the distinct " & _
        "offerings your team provides to internal or external customers."

    ' Table headers
    ws.Range("B4").Value = "Service Name *"
    ws.Range("C4").Value = "Description"
    ws.Range("E4").Value = "Type *"
    ws.Range("F4").Value = "Frequency"
    ws.Range("B4:F4").Font.Bold = True
    ws.Range("B4:F4").Interior.Color = COLOR_PRIMARY
    ws.Range("B4:F4").Font.Color = COLOR_WHITE
    ws.Range("C4:D4").Merge

    ' Data rows
    Dim i As Integer
    For i = 5 To 14
        ws.Range("C" & i & ":D" & i).Merge
        StyleInputCell ws.Range("B" & i)
        StyleInputCell ws.Range("C" & i)
        StyleInputCell ws.Range("E" & i)
        StyleInputCell ws.Range("F" & i)

        ' Add dropdowns
        AddDropdown ws.Range("E" & i), "ServiceTypes"
        AddDropdown ws.Range("F" & i), "Frequencies"

        ' Alternating colors
        If i Mod 2 = 0 Then
            ws.Range("B" & i & ":F" & i).Interior.Color = COLOR_LIGHT_GRAY
        End If
    Next i

    ' Helper text
    ws.Range("B16").Value = "Service Types:"
    ws.Range("B16").Font.Bold = True
    ws.Range("B17").Value = Chr(149) & " Core - Essential services that define your team's existence"
    ws.Range("B18").Value = Chr(149) & " Support - Services that enable other teams to function"
    ws.Range("B19").Value = Chr(149) & " Strategic - Services aligned with organizational strategy"
    ws.Range("B17:B19").Font.Color = COLOR_GRAY_TEXT
    ws.Range("B17:B19").Font.Size = 10

    ' Navigation
    CreateNavHint ws, 21, "Next: Identify your Stakeholders (Sheet '4_Stakeholders')"

    ' Column widths
    ws.Columns("A").ColumnWidth = 3
    ws.Columns("B").ColumnWidth = 25
    ws.Columns("C").ColumnWidth = 20
    ws.Columns("D").ColumnWidth = 20
    ws.Columns("E").ColumnWidth = 15
    ws.Columns("F").ColumnWidth = 15
    ws.Columns("G").ColumnWidth = 3
End Sub

' =============================================================================
' 4. STAKEHOLDERS SHEET
' =============================================================================

Private Sub CreateStakeholdersSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "4_Stakeholders"

    ApplyBaseStyle ws

    ' Header
    CreateSectionHeader ws, "Stakeholders", "Step 4 of 12", _
        "Who do you work with? Map the people and teams that interact with your services."

    ' Info box
    CreateInfoBox ws, 4, "B", "G", _
        "Target: 3+ stakeholders. Understanding your stakeholders helps you design " & _
        "services that meet their needs and manage relationships effectively."

    ' Table headers
    ws.Range("B4").Value = "Name / Team *"
    ws.Range("C4").Value = "Role"
    ws.Range("D4").Value = "Relationship *"
    ws.Range("E4").Value = "What They Expect From You"
    ws.Range("B4:F4").Font.Bold = True
    ws.Range("B4:F4").Interior.Color = COLOR_PRIMARY
    ws.Range("B4:F4").Font.Color = COLOR_WHITE
    ws.Range("E4:F4").Merge

    ' Data rows
    Dim i As Integer
    For i = 5 To 14
        ws.Range("E" & i & ":F" & i).Merge
        StyleInputCell ws.Range("B" & i)
        StyleInputCell ws.Range("C" & i)
        StyleInputCell ws.Range("D" & i)
        StyleInputCell ws.Range("E" & i)

        AddDropdown ws.Range("D" & i), "StakeholderRels"

        If i Mod 2 = 0 Then
            ws.Range("B" & i & ":F" & i).Interior.Color = COLOR_LIGHT_GRAY
        End If
    Next i

    ' Helper text
    ws.Range("B16").Value = "Relationship Types:"
    ws.Range("B16").Font.Bold = True
    ws.Range("B17").Value = Chr(149) & " Internal Customer - Teams within your org who use your services"
    ws.Range("B18").Value = Chr(149) & " External Customer - Outside parties who receive your services"
    ws.Range("B19").Value = Chr(149) & " Partner - Teams you collaborate with closely"
    ws.Range("B20").Value = Chr(149) & " Supplier - Teams that provide inputs to your work"
    ws.Range("B21").Value = Chr(149) & " Leadership - Executives and decision-makers"
    ws.Range("B17:B21").Font.Color = COLOR_GRAY_TEXT
    ws.Range("B17:B21").Font.Size = 10

    CreateNavHint ws, 23, "Next: Map your Value Chain (Sheet '5_ValueChain')"

    ws.Columns("A").ColumnWidth = 3
    ws.Columns("B").ColumnWidth = 22
    ws.Columns("C").ColumnWidth = 18
    ws.Columns("D").ColumnWidth = 18
    ws.Columns("E").ColumnWidth = 22
    ws.Columns("F").ColumnWidth = 15
    ws.Columns("G").ColumnWidth = 3
End Sub

' =============================================================================
' 5. VALUE CHAIN SHEET
' =============================================================================

Private Sub CreateValueChainSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "5_ValueChain"

    ApplyBaseStyle ws

    ' Header
    CreateSectionHeader ws, "Value Chain", "Step 5 of 12", _
        "Show how work flows through your team: what comes in, what you do, what goes out."

    ' Info box
    CreateInfoBox ws, 4, "B", "G", _
        "This is the most important section (15% weight). Complete all three parts: " & _
        "Inputs, Activities, and Outputs to show your end-to-end value creation."

    ' INPUTS Section
    ws.Range("B5:F5").Merge
    ws.Range("B5").Value = "INPUTS - What You Receive"
    ws.Range("B5").Font.Bold = True
    ws.Range("B5").Font.Size = 12
    ws.Range("B5:F5").Interior.Color = RGB(220, 230, 241)

    ws.Range("B6").Value = "What You Receive"
    ws.Range("C6").Value = "From Where"
    ws.Range("D6").Value = "How Often"
    ws.Range("B6:D6").Font.Bold = True
    ws.Range("C6:D6").Merge
    ws.Range("D6:E6").Merge

    Dim i As Integer
    For i = 7 To 11
        StyleInputCell ws.Range("B" & i)
        ws.Range("C" & i & ":D" & i).Merge
        StyleInputCell ws.Range("C" & i)
        ws.Range("E" & i & ":F" & i).Merge
        StyleInputCell ws.Range("E" & i)
    Next i

    ' ACTIVITIES Section
    ws.Range("B13:F13").Merge
    ws.Range("B13").Value = "ACTIVITIES - What You Do"
    ws.Range("B13").Font.Bold = True
    ws.Range("B13").Font.Size = 12
    ws.Range("B13:F13").Interior.Color = RGB(226, 239, 218)

    ws.Range("B14").Value = "Activity Name"
    ws.Range("C14").Value = "Description"
    ws.Range("E14").Value = "Owner"
    ws.Range("F14").Value = "Criticality"
    ws.Range("B14:F14").Font.Bold = True
    ws.Range("C14:D14").Merge

    For i = 15 To 19
        StyleInputCell ws.Range("B" & i)
        ws.Range("C" & i & ":D" & i).Merge
        StyleInputCell ws.Range("C" & i)
        StyleInputCell ws.Range("E" & i)
        StyleInputCell ws.Range("F" & i)
        AddDropdown ws.Range("F" & i), "Levels"
    Next i

    ' OUTPUTS Section
    ws.Range("B21:F21").Merge
    ws.Range("B21").Value = "OUTPUTS - What You Deliver"
    ws.Range("B21").Font.Bold = True
    ws.Range("B21").Font.Size = 12
    ws.Range("B21:F21").Interior.Color = RGB(255, 242, 204)

    ws.Range("B22").Value = "What You Deliver"
    ws.Range("C22").Value = "Who Receives It"
    ws.Range("E22").Value = "Quality Standard"
    ws.Range("B22:F22").Font.Bold = True
    ws.Range("C22:D22").Merge
    ws.Range("E22:F22").Merge

    For i = 23 To 27
        StyleInputCell ws.Range("B" & i)
        ws.Range("C" & i & ":D" & i).Merge
        StyleInputCell ws.Range("C" & i)
        ws.Range("E" & i & ":F" & i).Merge
        StyleInputCell ws.Range("E" & i)
    Next i

    CreateNavHint ws, 29, "Next: Define your SLAs (Sheet '6_SLAs')"

    ws.Columns("A").ColumnWidth = 3
    ws.Columns("B").ColumnWidth = 22
    ws.Columns("C").ColumnWidth = 18
    ws.Columns("D").ColumnWidth = 12
    ws.Columns("E").ColumnWidth = 18
    ws.Columns("F").ColumnWidth = 15
    ws.Columns("G").ColumnWidth = 3
End Sub

' =============================================================================
' 6. SLAs SHEET
' =============================================================================

Private Sub CreateSLAsSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "6_SLAs"

    ApplyBaseStyle ws

    CreateSectionHeader ws, "Service Level Agreements", "Step 6 of 12", _
        "Define your commitments. What can stakeholders expect from your services?"

    CreateInfoBox ws, 4, "B", "G", _
        "Target: 2+ SLAs. Service Level Agreements set clear expectations about " & _
        "quality, timeliness, and performance of your services."

    ' Table headers
    ws.Range("B4").Value = "Service/Activity *"
    ws.Range("C4").Value = "Metric *"
    ws.Range("D4").Value = "Target *"
    ws.Range("E4").Value = "How You'll Measure It"
    ws.Range("B4:F4").Font.Bold = True
    ws.Range("B4:F4").Interior.Color = COLOR_PRIMARY
    ws.Range("B4:F4").Font.Color = COLOR_WHITE
    ws.Range("E4:F4").Merge

    Dim i As Integer
    For i = 5 To 14
        StyleInputCell ws.Range("B" & i)
        StyleInputCell ws.Range("C" & i)
        StyleInputCell ws.Range("D" & i)
        ws.Range("E" & i & ":F" & i).Merge
        StyleInputCell ws.Range("E" & i)

        If i Mod 2 = 0 Then
            ws.Range("B" & i & ":F" & i).Interior.Color = COLOR_LIGHT_GRAY
        End If
    Next i

    ' Examples
    ws.Range("B16").Value = "Example SLAs:"
    ws.Range("B16").Font.Bold = True
    ws.Range("B17").Value = Chr(149) & " Response Time: Acknowledge all requests within 4 business hours"
    ws.Range("B18").Value = Chr(149) & " Resolution Time: Resolve 90% of tickets within 24 hours"
    ws.Range("B19").Value = Chr(149) & " Availability: System uptime of 99.5% during business hours"
    ws.Range("B20").Value = Chr(149) & " Quality: Less than 2% error rate on processed transactions"
    ws.Range("B17:B20").Font.Color = COLOR_GRAY_TEXT
    ws.Range("B17:B20").Font.Size = 10

    CreateNavHint ws, 22, "Next: Define your KPIs (Sheet '7_KPIs')"

    ws.Columns("A").ColumnWidth = 3
    ws.Columns("B").ColumnWidth = 22
    ws.Columns("C").ColumnWidth = 22
    ws.Columns("D").ColumnWidth = 18
    ws.Columns("E").ColumnWidth = 18
    ws.Columns("F").ColumnWidth = 15
    ws.Columns("G").ColumnWidth = 3
End Sub

' =============================================================================
' 7. KPIs SHEET
' =============================================================================

Private Sub CreateKPIsSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "7_KPIs"

    ApplyBaseStyle ws

    CreateSectionHeader ws, "Key Performance Indicators", "Step 7 of 12", _
        "How do you measure success? Define the metrics that matter most."

    CreateInfoBox ws, 4, "B", "H", _
        "Target: 3+ KPIs. These metrics help you track performance and demonstrate " & _
        "value to leadership. Include a mix of categories for balanced measurement."

    ' Table headers
    ws.Range("B4").Value = "KPI Name *"
    ws.Range("C4").Value = "Description"
    ws.Range("D4").Value = "Target *"
    ws.Range("E4").Value = "Frequency"
    ws.Range("F4").Value = "Owner"
    ws.Range("G4").Value = "Category *"
    ws.Range("B4:G4").Font.Bold = True
    ws.Range("B4:G4").Interior.Color = COLOR_PRIMARY
    ws.Range("B4:G4").Font.Color = COLOR_WHITE

    Dim i As Integer
    For i = 5 To 14
        StyleInputCell ws.Range("B" & i)
        StyleInputCell ws.Range("C" & i)
        StyleInputCell ws.Range("D" & i)
        StyleInputCell ws.Range("E" & i)
        StyleInputCell ws.Range("F" & i)
        StyleInputCell ws.Range("G" & i)

        AddDropdown ws.Range("E" & i), "Frequencies"
        AddDropdown ws.Range("G" & i), "KPICategories"

        If i Mod 2 = 0 Then
            ws.Range("B" & i & ":G" & i).Interior.Color = COLOR_LIGHT_GRAY
        End If
    Next i

    ' Category explanations
    ws.Range("B16").Value = "KPI Categories:"
    ws.Range("B16").Font.Bold = True
    ws.Range("B17").Value = Chr(149) & " Quality - Accuracy, completeness, error rates"
    ws.Range("B18").Value = Chr(149) & " Speed - Turnaround times, throughput"
    ws.Range("B19").Value = Chr(149) & " Cost - Efficiency, cost per transaction"
    ws.Range("B20").Value = Chr(149) & " Customer Satisfaction - NPS, feedback scores"
    ws.Range("B21").Value = Chr(149) & " Compliance - Audit results, policy adherence"
    ws.Range("B17:B21").Font.Color = COLOR_GRAY_TEXT
    ws.Range("B17:B21").Font.Size = 10

    CreateNavHint ws, 23, "Next: Define RACI responsibilities (Sheet '8_RACI')"

    ws.Columns("A").ColumnWidth = 3
    ws.Columns("B").ColumnWidth = 20
    ws.Columns("C").ColumnWidth = 25
    ws.Columns("D").ColumnWidth = 15
    ws.Columns("E").ColumnWidth = 12
    ws.Columns("F").ColumnWidth = 15
    ws.Columns("G").ColumnWidth = 18
    ws.Columns("H").ColumnWidth = 3
End Sub

' =============================================================================
' 8. RACI SHEET
' =============================================================================

Private Sub CreateRACISheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "8_RACI"

    ApplyBaseStyle ws

    CreateSectionHeader ws, "RACI Matrix", "Step 8 of 12", _
        "Who does what? Clarify roles and responsibilities for key activities."

    CreateInfoBox ws, 4, "B", "G", _
        "Target: 3+ RACI entries. RACI helps avoid confusion about who is responsible " & _
        "for what. Each activity should have exactly ONE Accountable person."

    ' Table headers
    ws.Range("B4").Value = "Activity *"
    ws.Range("C4").Value = "R - Responsible"
    ws.Range("D4").Value = "A - Accountable *"
    ws.Range("E4").Value = "C - Consulted"
    ws.Range("F4").Value = "I - Informed"
    ws.Range("B4:F4").Font.Bold = True
    ws.Range("B4:F4").Interior.Color = COLOR_PRIMARY
    ws.Range("B4:F4").Font.Color = COLOR_WHITE

    Dim i As Integer
    For i = 5 To 14
        StyleInputCell ws.Range("B" & i)
        StyleInputCell ws.Range("C" & i)
        StyleInputCell ws.Range("D" & i)
        StyleInputCell ws.Range("E" & i)
        StyleInputCell ws.Range("F" & i)

        If i Mod 2 = 0 Then
            ws.Range("B" & i & ":F" & i).Interior.Color = COLOR_LIGHT_GRAY
        End If
    Next i

    ' RACI explanations
    ws.Range("B16").Value = "RACI Definitions:"
    ws.Range("B16").Font.Bold = True
    ws.Range("B17").Value = "R - Responsible: Does the work. Can be multiple people."
    ws.Range("B18").Value = "A - Accountable: Approves/owns the outcome. ONLY ONE person per activity."
    ws.Range("B19").Value = "C - Consulted: Provides input before the work is done."
    ws.Range("B20").Value = "I - Informed: Notified after the work is completed."
    ws.Range("B17:B20").Font.Color = COLOR_GRAY_TEXT
    ws.Range("B17:B20").Font.Size = 10

    CreateNavHint ws, 22, "Next: Define Governance structure (Sheet '9_Governance')"

    ws.Columns("A").ColumnWidth = 3
    ws.Columns("B").ColumnWidth = 25
    ws.Columns("C").ColumnWidth = 18
    ws.Columns("D").ColumnWidth = 18
    ws.Columns("E").ColumnWidth = 18
    ws.Columns("F").ColumnWidth = 18
    ws.Columns("G").ColumnWidth = 3
End Sub

' =============================================================================
' 9. GOVERNANCE SHEET
' =============================================================================

Private Sub CreateGovernanceSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "9_Governance"

    ApplyBaseStyle ws

    CreateSectionHeader ws, "Governance & Decision-Making", "Step 9 of 12", _
        "How are decisions made? Define your meeting structure and escalation paths."

    CreateInfoBox ws, 4, "B", "G", _
        "Good governance ensures decisions are made efficiently and consistently. " & _
        "Include your key forums and how issues escalate when needed."

    ' FORUMS Section
    ws.Range("B5:F5").Merge
    ws.Range("B5").Value = "FORUMS - Regular Meetings"
    ws.Range("B5").Font.Bold = True
    ws.Range("B5").Font.Size = 12
    ws.Range("B5:F5").Interior.Color = RGB(220, 230, 241)

    ws.Range("B6").Value = "Meeting Name"
    ws.Range("C6").Value = "Purpose"
    ws.Range("D6").Value = "Frequency"
    ws.Range("E6").Value = "Participants"
    ws.Range("F6").Value = "What Gets Decided"
    ws.Range("B6:F6").Font.Bold = True

    Dim i As Integer
    For i = 7 To 11
        StyleInputCell ws.Range("B" & i)
        StyleInputCell ws.Range("C" & i)
        StyleInputCell ws.Range("D" & i)
        StyleInputCell ws.Range("E" & i)
        StyleInputCell ws.Range("F" & i)
        AddDropdown ws.Range("D" & i), "Frequencies"
    Next i

    ' ESCALATION Section
    ws.Range("B13:F13").Merge
    ws.Range("B13").Value = "ESCALATION & DECISION RIGHTS"
    ws.Range("B13").Font.Bold = True
    ws.Range("B13").Font.Size = 12
    ws.Range("B13:F13").Interior.Color = RGB(226, 239, 218)

    ws.Range("B15").Value = "Escalation Path:"
    ws.Range("B15").Font.Bold = True
    ws.Range("C15:F17").Merge
    StyleInputCell ws.Range("C15:F17")
    ws.Range("C15").WrapText = True
    ws.Range("C15").VerticalAlignment = xlTop
    ws.Rows("15:17").RowHeight = 25

    ws.Range("B14").Value = "How do issues escalate when they can't be resolved at the team level?"
    ws.Range("B14").Font.Italic = True
    ws.Range("B14").Font.Color = COLOR_GRAY_TEXT
    ws.Range("B14").Font.Size = 10

    ws.Range("B19").Value = "Decision Rights:"
    ws.Range("B19").Font.Bold = True
    ws.Range("C19:F21").Merge
    StyleInputCell ws.Range("C19:F21")
    ws.Range("C19").WrapText = True
    ws.Range("C19").VerticalAlignment = xlTop
    ws.Rows("19:21").RowHeight = 25

    ws.Range("B18").Value = "What decisions can your team make independently vs. needing approval?"
    ws.Range("B18").Font.Italic = True
    ws.Range("B18").Font.Color = COLOR_GRAY_TEXT
    ws.Range("B18").Font.Size = 10

    CreateNavHint ws, 23, "Next: Identify Dependencies (Sheet '10_Dependencies')"

    ws.Columns("A").ColumnWidth = 3
    ws.Columns("B").ColumnWidth = 18
    ws.Columns("C").ColumnWidth = 20
    ws.Columns("D").ColumnWidth = 12
    ws.Columns("E").ColumnWidth = 18
    ws.Columns("F").ColumnWidth = 22
    ws.Columns("G").ColumnWidth = 3
End Sub

' =============================================================================
' 10. DEPENDENCIES SHEET
' =============================================================================

Private Sub CreateDependenciesSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "10_Dependencies"

    ApplyBaseStyle ws

    CreateSectionHeader ws, "Dependencies", "Step 10 of 12", _
        "What do you depend on? Identify external factors critical to your success."

    CreateInfoBox ws, 4, "B", "G", _
        "Target: 2+ dependencies. Understanding dependencies helps manage risk " & _
        "and ensures you have contingency plans for critical external factors."

    ' Table headers
    ws.Range("B4").Value = "Depends On *"
    ws.Range("C4").Value = "Type *"
    ws.Range("D4").Value = "Criticality"
    ws.Range("E4").Value = "Impact if Unavailable"
    ws.Range("B4:F4").Font.Bold = True
    ws.Range("B4:F4").Interior.Color = COLOR_PRIMARY
    ws.Range("B4:F4").Font.Color = COLOR_WHITE
    ws.Range("E4:F4").Merge

    Dim i As Integer
    For i = 5 To 14
        StyleInputCell ws.Range("B" & i)
        StyleInputCell ws.Range("C" & i)
        StyleInputCell ws.Range("D" & i)
        ws.Range("E" & i & ":F" & i).Merge
        StyleInputCell ws.Range("E" & i)

        AddDropdown ws.Range("C" & i), "DependencyTypes"
        AddDropdown ws.Range("D" & i), "Levels"

        If i Mod 2 = 0 Then
            ws.Range("B" & i & ":F" & i).Interior.Color = COLOR_LIGHT_GRAY
        End If
    Next i

    ' Dependency types
    ws.Range("B16").Value = "Dependency Types:"
    ws.Range("B16").Font.Bold = True
    ws.Range("B17").Value = Chr(149) & " System - Software, tools, infrastructure"
    ws.Range("B18").Value = Chr(149) & " Team - Other departments or groups"
    ws.Range("B19").Value = Chr(149) & " Process - Business processes or workflows"
    ws.Range("B20").Value = Chr(149) & " Data - Information sources or feeds"
    ws.Range("B21").Value = Chr(149) & " External - Vendors, partners, regulators"
    ws.Range("B17:B21").Font.Color = COLOR_GRAY_TEXT
    ws.Range("B17:B21").Font.Size = 10

    CreateNavHint ws, 23, "Next: Identify Risks (Sheet '11_Risks')"

    ws.Columns("A").ColumnWidth = 3
    ws.Columns("B").ColumnWidth = 25
    ws.Columns("C").ColumnWidth = 15
    ws.Columns("D").ColumnWidth = 12
    ws.Columns("E").ColumnWidth = 22
    ws.Columns("F").ColumnWidth = 18
    ws.Columns("G").ColumnWidth = 3
End Sub

' =============================================================================
' 11. RISKS SHEET
' =============================================================================

Private Sub CreateRisksSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "11_Risks"

    ApplyBaseStyle ws

    CreateSectionHeader ws, "Risks & Pain Points", "Step 11 of 12", _
        "What keeps you up at night? Identify risks and what you're doing about them."

    CreateInfoBox ws, 4, "B", "G", _
        "Target: 2+ risks. Being honest about risks shows maturity and helps " & _
        "leadership understand where support might be needed."

    ' Table headers
    ws.Range("B4").Value = "Risk Description *"
    ws.Range("C4").Value = "Type *"
    ws.Range("D4").Value = "Likelihood"
    ws.Range("E4").Value = "Impact"
    ws.Range("F4").Value = "Mitigation"
    ws.Range("B4:F4").Font.Bold = True
    ws.Range("B4:F4").Interior.Color = COLOR_PRIMARY
    ws.Range("B4:F4").Font.Color = COLOR_WHITE

    Dim i As Integer
    For i = 5 To 14
        StyleInputCell ws.Range("B" & i)
        StyleInputCell ws.Range("C" & i)
        StyleInputCell ws.Range("D" & i)
        StyleInputCell ws.Range("E" & i)
        StyleInputCell ws.Range("F" & i)

        AddDropdown ws.Range("C" & i), "RiskTypes"
        AddDropdown ws.Range("D" & i), "Levels"
        AddDropdown ws.Range("E" & i), "Levels"

        If i Mod 2 = 0 Then
            ws.Range("B" & i & ":F" & i).Interior.Color = COLOR_LIGHT_GRAY
        End If
    Next i

    ' Risk matrix hint
    ws.Range("B16").Value = "Risk Priority = Likelihood x Impact"
    ws.Range("B16").Font.Bold = True
    ws.Range("B17").Value = Chr(149) & " High/High = Critical - Needs immediate attention"
    ws.Range("B18").Value = Chr(149) & " High/Medium or Medium/High = Important - Plan mitigation"
    ws.Range("B19").Value = Chr(149) & " Medium/Medium = Moderate - Monitor regularly"
    ws.Range("B20").Value = Chr(149) & " Low combinations = Accept or monitor periodically"
    ws.Range("B17:B20").Font.Color = COLOR_GRAY_TEXT
    ws.Range("B17:B20").Font.Size = 10

    CreateNavHint ws, 22, "Next: Identify Opportunities (Sheet '12_Opportunities')"

    ws.Columns("A").ColumnWidth = 3
    ws.Columns("B").ColumnWidth = 28
    ws.Columns("C").ColumnWidth = 14
    ws.Columns("D").ColumnWidth = 12
    ws.Columns("E").ColumnWidth = 10
    ws.Columns("F").ColumnWidth = 28
    ws.Columns("G").ColumnWidth = 3
End Sub

' =============================================================================
' 12. OPPORTUNITIES SHEET
' =============================================================================

Private Sub CreateOpportunitiesSheet()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.count))
    ws.Name = "12_Opportunities"

    ApplyBaseStyle ws

    CreateSectionHeader ws, "Opportunities & Improvements", "Step 12 of 12", _
        "Where can you improve? Identify opportunities to enhance your operations."

    CreateInfoBox ws, 4, "B", "G", _
        "Target: 2+ opportunities. This shows forward thinking and helps " & _
        "prioritize investments in your team's capabilities."

    ' Table headers
    ws.Range("B4").Value = "Opportunity *"
    ws.Range("C4").Value = "Type *"
    ws.Range("D4").Value = "Effort"
    ws.Range("E4").Value = "Impact"
    ws.Range("F4").Value = "Timeframe"
    ws.Range("B4:F4").Font.Bold = True
    ws.Range("B4:F4").Interior.Color = COLOR_PRIMARY
    ws.Range("B4:F4").Font.Color = COLOR_WHITE

    Dim i As Integer
    For i = 5 To 14
        StyleInputCell ws.Range("B" & i)
        StyleInputCell ws.Range("C" & i)
        StyleInputCell ws.Range("D" & i)
        StyleInputCell ws.Range("E" & i)
        StyleInputCell ws.Range("F" & i)

        AddDropdown ws.Range("C" & i), "OpportunityTypes"
        AddDropdown ws.Range("D" & i), "Levels"
        AddDropdown ws.Range("E" & i), "Levels"

        If i Mod 2 = 0 Then
            ws.Range("B" & i & ":F" & i).Interior.Color = COLOR_LIGHT_GRAY
        End If
    Next i

    ' Quick wins hint
    ws.Range("B16").Value = "Prioritization Tip:"
    ws.Range("B16").Font.Bold = True
    ws.Range("B17").Value = Chr(149) & " Quick Wins: Low Effort + High Impact - Do these first!"
    ws.Range("B18").Value = Chr(149) & " Major Projects: High Effort + High Impact - Plan carefully"
    ws.Range("B19").Value = Chr(149) & " Fill-ins: Low Effort + Low Impact - When you have spare time"
    ws.Range("B20").Value = Chr(149) & " Avoid: High Effort + Low Impact - Question if worth doing"
    ws.Range("B17:B20").Font.Color = COLOR_GRAY_TEXT
    ws.Range("B17:B20").Font.Size = 10

    ws.Range("B22").Value = "Congratulations! Return to the Dashboard to see your complete TOM."
    ws.Range("B22").Font.Bold = True
    ws.Range("B22").Font.Color = COLOR_SUCCESS

    ws.Columns("A").ColumnWidth = 3
    ws.Columns("B").ColumnWidth = 30
    ws.Columns("C").ColumnWidth = 15
    ws.Columns("D").ColumnWidth = 10
    ws.Columns("E").ColumnWidth = 10
    ws.Columns("F").ColumnWidth = 15
    ws.Columns("G").ColumnWidth = 3
End Sub

' =============================================================================
' HELPER FUNCTIONS - Styling and formatting
' =============================================================================

Private Sub ApplyBaseStyle(ws As Worksheet)
    With ws
        .Cells.Font.Name = "Segoe UI"
        .Cells.Font.Size = 11
        .Activate
        ActiveWindow.DisplayGridlines = False
        .Cells.Interior.Color = COLOR_WHITE
    End With
End Sub

Private Sub CreateSectionHeader(ws As Worksheet, title As String, stepText As String, subtitle As String)
    ws.Range("B1:G1").Merge
    ws.Range("B1").Value = title
    ws.Range("B1").Font.Size = 22
    ws.Range("B1").Font.Bold = True
    ws.Range("B1").Font.Color = COLOR_PRIMARY

    ws.Range("B2").Value = stepText
    ws.Range("B2").Font.Size = 10
    ws.Range("B2").Font.Color = COLOR_GRAY_TEXT

    ws.Range("B3:G3").Merge
    ws.Range("B3").Value = subtitle
    ws.Range("B3").Font.Size = 11
    ws.Range("B3").Font.Color = RGB(80, 80, 80)
    ws.Range("B3").WrapText = True
End Sub

Private Sub CreateInfoBox(ws As Worksheet, row As Integer, startCol As String, endCol As String, text As String)
    ' Info boxes are handled inline with the content now
End Sub

Private Sub CreateFieldLabel(ws As Worksheet, cellRef As String, labelText As String, required As Boolean)
    ws.Range(cellRef).Value = labelText & IIf(required, " *", "")
    ws.Range(cellRef).Font.Bold = True
End Sub

Private Sub CreateFieldInput(ws As Worksheet, startRef As String, endRef As String, defaultValue As String)
    If startRef <> endRef Then
        ws.Range(startRef & ":" & endRef).Merge
    End If
    ws.Range(startRef).Value = defaultValue
    StyleInputCell ws.Range(startRef)
End Sub

Private Sub CreateFieldHelper(ws As Worksheet, cellRef As String, helperText As String)
    ws.Range(cellRef).Value = helperText
    ws.Range(cellRef).Font.Color = COLOR_GRAY_TEXT
    ws.Range(cellRef).Font.Size = 10
    ws.Range(cellRef).Font.Italic = True
End Sub

Private Sub CreateNavHint(ws As Worksheet, row As Integer, text As String)
    ws.Range("B" & row).Value = text
    ws.Range("B" & row).Font.Color = COLOR_PRIMARY
    ws.Range("B" & row).Font.Italic = True
End Sub

Private Sub StyleInputCell(rng As Range)
    With rng
        .Interior.Color = RGB(255, 255, 255)
        With .Borders
            .LineStyle = xlContinuous
            .Color = RGB(180, 180, 180)
            .Weight = xlThin
        End With
    End With
End Sub

Private Sub AddDropdown(rng As Range, namedRange As String)
    On Error Resume Next
    With rng.Validation
        .Delete
        .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, _
             Formula1:="=" & namedRange
        .InCellDropdown = True
    End With
End Sub

' =============================================================================
' EXPORT FUNCTION
' =============================================================================

Public Sub ExportToMarkdown()
    On Error GoTo ErrorHandler

    Dim md As String
    Dim filePath As String
    Dim deptName As String
    Dim fileNum As Integer

    deptName = GetCellValue("1_Department", "C5")
    If deptName = "" Then deptName = "Unnamed"
    deptName = CleanFileName(deptName)

    md = BuildMarkdownContent()

    filePath = Application.GetSaveAsFilename( _
        InitialFileName:="TOM_" & deptName & "_" & Format(Now, "YYYY-MM-DD") & ".md", _
        FileFilter:="Markdown Files (*.md), *.md", _
        Title:="Save TOM as Markdown")

    If filePath = "False" Then Exit Sub

    fileNum = FreeFile
    Open filePath For Output As #fileNum
    Print #fileNum, md
    Close #fileNum

    MsgBox "TOM exported successfully!" & vbNewLine & vbNewLine & filePath, vbInformation, "Export Complete"
    Exit Sub

ErrorHandler:
    MsgBox "Error exporting: " & Err.Description, vbCritical, "Export Error"
End Sub

Private Function BuildMarkdownContent() As String
    Dim md As String
    Dim i As Integer
    Dim ws As Worksheet

    ' Header
    md = "# Target Operating Model (TOM)" & vbNewLine & vbNewLine
    md = md & "**Department:** " & GetCellValue("1_Department", "C5") & vbNewLine
    md = md & "**Division:** " & GetCellValue("1_Department", "C7") & vbNewLine
    md = md & "**Headcount:** " & GetCellValue("1_Department", "C9") & vbNewLine
    md = md & "**Generated:** " & Format(Now, "YYYY-MM-DD HH:MM") & vbNewLine
    md = md & "**Completeness:** " & Format(GetTotalScore(), "0") & "%" & vbNewLine
    md = md & vbNewLine & "---" & vbNewLine & vbNewLine

    ' Purpose
    md = md & "## Purpose & Direction" & vbNewLine & vbNewLine
    md = md & "### Purpose Statement" & vbNewLine & vbNewLine
    md = md & GetCellValue("2_Purpose", "C5") & vbNewLine & vbNewLine

    If GetCellValue("2_Purpose", "C9") <> "" Then
        md = md & "### Vision" & vbNewLine & vbNewLine
        md = md & GetCellValue("2_Purpose", "C9") & vbNewLine & vbNewLine
    End If

    If GetCellValue("2_Purpose", "C13") <> "" Then
        md = md & "### Mission" & vbNewLine & vbNewLine
        md = md & GetCellValue("2_Purpose", "C13") & vbNewLine & vbNewLine
    End If

    ' Services
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Service Catalogue" & vbNewLine & vbNewLine
    md = md & "| Service | Description | Type | Frequency |" & vbNewLine
    md = md & "|---------|-------------|------|-----------|" & vbNewLine

    Set ws = ThisWorkbook.Sheets("3_Services")
    For i = 5 To 14
        If Trim(ws.Cells(i, 2).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 5).Value & " | "
            md = md & ws.Cells(i, 6).Value & " |" & vbNewLine
        End If
    Next i
    md = md & vbNewLine

    ' Stakeholders
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Stakeholders" & vbNewLine & vbNewLine
    md = md & "| Stakeholder | Role | Relationship | Expectations |" & vbNewLine
    md = md & "|-------------|------|--------------|--------------|" & vbNewLine

    Set ws = ThisWorkbook.Sheets("4_Stakeholders")
    For i = 5 To 14
        If Trim(ws.Cells(i, 2).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 4).Value & " | "
            md = md & ws.Cells(i, 5).Value & " |" & vbNewLine
        End If
    Next i
    md = md & vbNewLine

    ' Value Chain - simplified for brevity
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Value Chain" & vbNewLine & vbNewLine

    md = md & "### Inputs" & vbNewLine & vbNewLine
    Set ws = ThisWorkbook.Sheets("5_ValueChain")
    For i = 7 To 11
        If Trim(ws.Cells(i, 2).Value) <> "" Then
            md = md & "- **" & ws.Cells(i, 2).Value & "** from " & ws.Cells(i, 3).Value & vbNewLine
        End If
    Next i
    md = md & vbNewLine

    md = md & "### Activities" & vbNewLine & vbNewLine
    For i = 15 To 19
        If Trim(ws.Cells(i, 2).Value) <> "" Then
            md = md & "- **" & ws.Cells(i, 2).Value & "** (" & ws.Cells(i, 6).Value & " criticality)" & vbNewLine
        End If
    Next i
    md = md & vbNewLine

    md = md & "### Outputs" & vbNewLine & vbNewLine
    For i = 23 To 27
        If Trim(ws.Cells(i, 2).Value) <> "" Then
            md = md & "- **" & ws.Cells(i, 2).Value & "** to " & ws.Cells(i, 3).Value & vbNewLine
        End If
    Next i
    md = md & vbNewLine

    ' SLAs
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Service Level Agreements" & vbNewLine & vbNewLine
    md = md & "| Service | Metric | Target |" & vbNewLine
    md = md & "|---------|--------|--------|" & vbNewLine

    Set ws = ThisWorkbook.Sheets("6_SLAs")
    For i = 5 To 14
        If Trim(ws.Cells(i, 2).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 4).Value & " |" & vbNewLine
        End If
    Next i
    md = md & vbNewLine

    ' KPIs
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Key Performance Indicators" & vbNewLine & vbNewLine
    md = md & "| KPI | Target | Category |" & vbNewLine
    md = md & "|-----|--------|----------|" & vbNewLine

    Set ws = ThisWorkbook.Sheets("7_KPIs")
    For i = 5 To 14
        If Trim(ws.Cells(i, 2).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 4).Value & " | "
            md = md & ws.Cells(i, 7).Value & " |" & vbNewLine
        End If
    Next i
    md = md & vbNewLine

    ' RACI
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## RACI Matrix" & vbNewLine & vbNewLine
    md = md & "| Activity | R | A | C | I |" & vbNewLine
    md = md & "|----------|---|---|---|---|" & vbNewLine

    Set ws = ThisWorkbook.Sheets("8_RACI")
    For i = 5 To 14
        If Trim(ws.Cells(i, 2).Value) <> "" Then
            md = md & "| " & ws.Cells(i, 2).Value & " | "
            md = md & ws.Cells(i, 3).Value & " | "
            md = md & ws.Cells(i, 4).Value & " | "
            md = md & ws.Cells(i, 5).Value & " | "
            md = md & ws.Cells(i, 6).Value & " |" & vbNewLine
        End If
    Next i
    md = md & vbNewLine

    ' Risks
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Risks" & vbNewLine & vbNewLine

    Set ws = ThisWorkbook.Sheets("11_Risks")
    For i = 5 To 14
        If Trim(ws.Cells(i, 2).Value) <> "" Then
            md = md & "### " & ws.Cells(i, 2).Value & vbNewLine
            md = md & "- **Type:** " & ws.Cells(i, 3).Value & vbNewLine
            md = md & "- **Likelihood:** " & ws.Cells(i, 4).Value & vbNewLine
            md = md & "- **Impact:** " & ws.Cells(i, 5).Value & vbNewLine
            If ws.Cells(i, 6).Value <> "" Then
                md = md & "- **Mitigation:** " & ws.Cells(i, 6).Value & vbNewLine
            End If
            md = md & vbNewLine
        End If
    Next i

    ' Opportunities
    md = md & "---" & vbNewLine & vbNewLine
    md = md & "## Opportunities" & vbNewLine & vbNewLine

    Set ws = ThisWorkbook.Sheets("12_Opportunities")
    For i = 5 To 14
        If Trim(ws.Cells(i, 2).Value) <> "" Then
            md = md & "### " & ws.Cells(i, 2).Value & vbNewLine
            md = md & "- **Type:** " & ws.Cells(i, 3).Value & vbNewLine
            md = md & "- **Effort:** " & ws.Cells(i, 4).Value & vbNewLine
            md = md & "- **Impact:** " & ws.Cells(i, 5).Value & vbNewLine
            md = md & vbNewLine
        End If
    Next i

    BuildMarkdownContent = md
End Function

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
' REFRESH MACRO
' =============================================================================

Public Sub RefreshDashboard()
    Application.Calculate
    MsgBox "Dashboard refreshed!", vbInformation, "TOM Builder"
End Sub
