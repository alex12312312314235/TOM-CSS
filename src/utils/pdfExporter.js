// PDF Export utilities for TOM Builder
// Uses browser print functionality for clean PDF generation

import { SECTION_NAMES, getTOMSectionStatus, STATUS_LABELS } from '../data/mockDepartments';

/**
 * Generate a printable HTML document for a single TOM
 */
export function generateTOMPrintHTML(tomData, departmentInfo = {}) {
  const sectionStatus = getTOMSectionStatus(tomData);
  const statusEmoji = {
    green: '✅',
    amber: '🟡',
    red: '❌'
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <title>TOM Report - ${tomData?.department?.name || 'Unknown'}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; padding: 20px; }
    .header { background: linear-gradient(135deg, #c8102e, #7a0019); color: white; padding: 20px; margin: -20px -20px 20px; }
    .header h1 { font-size: 24px; margin-bottom: 5px; }
    .header p { opacity: 0.9; }
    .meta { display: flex; gap: 30px; margin-bottom: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px; }
    .meta-item { }
    .meta-label { font-size: 10px; color: #666; text-transform: uppercase; }
    .meta-value { font-weight: bold; font-size: 14px; }
    .section { margin-bottom: 20px; page-break-inside: avoid; }
    .section-header { display: flex; align-items: center; gap: 10px; padding: 10px; background: #f0f0f0; border-radius: 4px; margin-bottom: 10px; }
    .section-title { font-weight: bold; }
    .section-status { font-size: 16px; }
    .section-content { padding-left: 15px; }
    .item { margin-bottom: 8px; padding: 8px; background: #fafafa; border-left: 3px solid #c8102e; }
    .item-title { font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }
    th { background: #f5f5f5; font-weight: bold; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #c8102e; text-align: center; color: #666; font-size: 10px; }
    @media print {
      body { padding: 0; }
      .header { margin: 0 0 20px 0; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Target Operating Model</h1>
    <p>${tomData?.department?.name || 'Department TOM Report'}</p>
  </div>

  <div class="meta">
    <div class="meta-item">
      <div class="meta-label">Division</div>
      <div class="meta-value">${tomData?.department?.division || '-'}</div>
    </div>
    <div class="meta-item">
      <div class="meta-label">Headcount</div>
      <div class="meta-value">${tomData?.department?.headcount || '-'}</div>
    </div>
    <div class="meta-item">
      <div class="meta-label">Status</div>
      <div class="meta-value">${STATUS_LABELS[departmentInfo.workflowStatus] || 'Draft'}</div>
    </div>
    <div class="meta-item">
      <div class="meta-label">Last Updated</div>
      <div class="meta-value">${tomData?.metadata?.lastModified ? new Date(tomData.metadata.lastModified).toLocaleDateString() : '-'}</div>
    </div>
  </div>

  <!-- Purpose -->
  <div class="section">
    <div class="section-header">
      <span class="section-status">${statusEmoji[sectionStatus.purpose]}</span>
      <span class="section-title">1. Purpose & Vision</span>
    </div>
    <div class="section-content">
      <p><strong>Purpose:</strong> ${tomData?.purpose?.statement || '-'}</p>
      <p><strong>Vision:</strong> ${tomData?.purpose?.vision || '-'}</p>
      <p><strong>Mission:</strong> ${tomData?.purpose?.mission || '-'}</p>
    </div>
  </div>

  <!-- Services -->
  <div class="section">
    <div class="section-header">
      <span class="section-status">${statusEmoji[sectionStatus.serviceCatalogue]}</span>
      <span class="section-title">2. Service Catalogue (${tomData?.serviceCatalogue?.length || 0} services)</span>
    </div>
    <div class="section-content">
      ${tomData?.serviceCatalogue?.length > 0 ? `
        <table>
          <tr><th>Service</th><th>Type</th><th>Frequency</th><th>Description</th></tr>
          ${tomData.serviceCatalogue.map(s => `
            <tr><td>${s.serviceName}</td><td>${s.type}</td><td>${s.frequency}</td><td>${s.description}</td></tr>
          `).join('')}
        </table>
      ` : '<p>No services defined</p>'}
    </div>
  </div>

  <!-- Stakeholders -->
  <div class="section">
    <div class="section-header">
      <span class="section-status">${statusEmoji[sectionStatus.stakeholders]}</span>
      <span class="section-title">3. Stakeholders (${tomData?.stakeholders?.length || 0})</span>
    </div>
    <div class="section-content">
      ${tomData?.stakeholders?.length > 0 ? `
        <table>
          <tr><th>Name</th><th>Role</th><th>Relationship</th><th>Expectations</th></tr>
          ${tomData.stakeholders.map(s => `
            <tr><td>${s.name}</td><td>${s.role}</td><td>${s.relationship}</td><td>${s.expectations}</td></tr>
          `).join('')}
        </table>
      ` : '<p>No stakeholders defined</p>'}
    </div>
  </div>

  <!-- Value Chain -->
  <div class="section">
    <div class="section-header">
      <span class="section-status">${statusEmoji[sectionStatus.valueChain]}</span>
      <span class="section-title">4. Value Chain</span>
    </div>
    <div class="section-content">
      <p><strong>Inputs:</strong> ${tomData?.valueChain?.inputs?.length || 0} |
         <strong>Activities:</strong> ${tomData?.valueChain?.activities?.length || 0} |
         <strong>Outputs:</strong> ${tomData?.valueChain?.outputs?.length || 0}</p>
    </div>
  </div>

  <!-- KPIs -->
  <div class="section">
    <div class="section-header">
      <span class="section-status">${statusEmoji[sectionStatus.kpis]}</span>
      <span class="section-title">5. KPIs (${tomData?.kpis?.length || 0})</span>
    </div>
    <div class="section-content">
      ${tomData?.kpis?.length > 0 ? `
        <table>
          <tr><th>KPI</th><th>Target</th><th>Category</th><th>Frequency</th></tr>
          ${tomData.kpis.map(k => `
            <tr><td>${k.name}</td><td>${k.target}</td><td>${k.category}</td><td>${k.frequency}</td></tr>
          `).join('')}
        </table>
      ` : '<p>No KPIs defined</p>'}
    </div>
  </div>

  <!-- Risks -->
  <div class="section">
    <div class="section-header">
      <span class="section-status">${statusEmoji[sectionStatus.risks]}</span>
      <span class="section-title">6. Risks (${tomData?.risks?.length || 0})</span>
    </div>
    <div class="section-content">
      ${tomData?.risks?.length > 0 ? `
        <table>
          <tr><th>Risk</th><th>Type</th><th>Likelihood</th><th>Impact</th></tr>
          ${tomData.risks.map(r => `
            <tr><td>${r.description}</td><td>${r.type}</td><td>${r.likelihood}</td><td>${r.impact}</td></tr>
          `).join('')}
        </table>
      ` : '<p>No risks identified</p>'}
    </div>
  </div>

  <div class="footer">
    <p>TOM Builder Report • Generated ${new Date().toLocaleString()}</p>
    <p>Target Operating Model Management System</p>
  </div>
</body>
</html>
  `;
}

/**
 * Generate a summary report HTML for VP Dashboard (multiple departments)
 */
export function generateDivisionReportHTML(departments) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#22c55e';
      case 'submitted': case 'under_review': return '#f59e0b';
      case 'needs_revision': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <title>Division TOM Status Report</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; padding: 20px; }
    .header { background: linear-gradient(135deg, #c8102e, #7a0019); color: white; padding: 20px; margin: -20px -20px 20px; }
    .header h1 { font-size: 24px; margin-bottom: 5px; }
    .header p { opacity: 0.9; }
    .summary { display: flex; gap: 20px; margin-bottom: 30px; }
    .summary-card { flex: 1; padding: 15px; background: #f5f5f5; border-radius: 8px; text-align: center; }
    .summary-number { font-size: 28px; font-weight: bold; }
    .summary-label { font-size: 11px; color: #666; text-transform: uppercase; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
    th { background: #f5f5f5; font-weight: bold; }
    .status-badge { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: bold; color: white; }
    .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 2px; }
    .dot-green { background: #22c55e; }
    .dot-amber { background: #f59e0b; }
    .dot-red { background: #ef4444; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #c8102e; text-align: center; color: #666; font-size: 10px; }
    @media print { body { padding: 0; } .header { margin: 0 0 20px 0; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>Division TOM Status Report</h1>
    <p>Overview of all department Target Operating Models</p>
  </div>

  <div class="summary">
    <div class="summary-card">
      <div class="summary-number">${departments.length}</div>
      <div class="summary-label">Total Departments</div>
    </div>
    <div class="summary-card">
      <div class="summary-number" style="color: #22c55e">${departments.filter(d => d.workflowStatus === 'approved').length}</div>
      <div class="summary-label">Approved</div>
    </div>
    <div class="summary-card">
      <div class="summary-number" style="color: #f59e0b">${departments.filter(d => ['submitted', 'under_review'].includes(d.workflowStatus)).length}</div>
      <div class="summary-label">Pending Review</div>
    </div>
    <div class="summary-card">
      <div class="summary-number" style="color: #9ca3af">${departments.filter(d => d.workflowStatus === 'draft').length}</div>
      <div class="summary-label">Draft</div>
    </div>
    <div class="summary-card">
      <div class="summary-number">${Math.round(departments.reduce((sum, d) => sum + d.completeness, 0) / departments.length)}%</div>
      <div class="summary-label">Avg Completeness</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Department</th>
        <th>Division</th>
        <th>Status</th>
        <th>Completeness</th>
        <th>Sections</th>
        <th>Submitted By</th>
      </tr>
    </thead>
    <tbody>
      ${departments.map(dept => {
        const sectionStatus = getTOMSectionStatus(dept.tomData);
        const counts = {
          green: Object.values(sectionStatus).filter(s => s === 'green').length,
          amber: Object.values(sectionStatus).filter(s => s === 'amber').length,
          red: Object.values(sectionStatus).filter(s => s === 'red').length
        };
        return `
          <tr>
            <td><strong>${dept.name}</strong></td>
            <td>${dept.division || '-'}</td>
            <td><span class="status-badge" style="background: ${getStatusColor(dept.workflowStatus)}">${STATUS_LABELS[dept.workflowStatus] || 'Draft'}</span></td>
            <td>${dept.completeness}%</td>
            <td>
              <span class="dot dot-green"></span>${counts.green}
              <span class="dot dot-amber"></span>${counts.amber}
              <span class="dot dot-red"></span>${counts.red}
            </td>
            <td>${dept.submittedBy || '-'}</td>
          </tr>
        `;
      }).join('')}
    </tbody>
  </table>

  <div class="footer">
    <p>TOM Builder Division Report • Generated ${new Date().toLocaleString()}</p>
    <p>Target Operating Model Management System</p>
  </div>
</body>
</html>
  `;
}

/**
 * Open print dialog with generated HTML
 */
export function printReport(htmlContent) {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
}

/**
 * Export single TOM as PDF (via print)
 */
export function exportTOMToPDF(tomData, departmentInfo = {}) {
  const html = generateTOMPrintHTML(tomData, departmentInfo);
  printReport(html);
}

/**
 * Export division report as PDF (via print)
 */
export function exportDivisionToPDF(departments) {
  const html = generateDivisionReportHTML(departments);
  printReport(html);
}
