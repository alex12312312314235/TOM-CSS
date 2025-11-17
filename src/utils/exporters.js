// Export utilities for TOM data

export function exportToJSON(tomData) {
  const exportData = {
    ...tomData,
    metadata: {
      createdDate: tomData.metadata?.createdDate || new Date().toISOString(),
      lastModified: new Date().toISOString(),
      version: '1.0',
      author: tomData.metadata?.author || 'TOM Builder Wizard'
    }
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `TOM_${tomData.department?.name || 'Export'}_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function generateMarkdown(tomData) {
  let md = '# Target Operating Model\n\n';

  // Department
  if (tomData.department) {
    md += '## Department Information\n\n';
    md += `**Name:** ${tomData.department.name || 'N/A'}\n\n`;
    if (tomData.department.division) md += `**Division:** ${tomData.department.division}\n\n`;
    if (tomData.department.headcount) md += `**Team Size:** ${tomData.department.headcount} people\n\n`;
  }

  // Purpose
  if (tomData.purpose) {
    md += '## Purpose\n\n';
    if (tomData.purpose.statement) md += `${tomData.purpose.statement}\n\n`;
    if (tomData.purpose.vision) md += `**Vision:** ${tomData.purpose.vision}\n\n`;
    if (tomData.purpose.mission) md += `**Mission:** ${tomData.purpose.mission}\n\n`;
  }

  // Service Catalogue
  if (tomData.serviceCatalogue && tomData.serviceCatalogue.length > 0) {
    md += '## Service Catalogue\n\n';
    tomData.serviceCatalogue.forEach((service, i) => {
      md += `### ${i + 1}. ${service.serviceName}\n\n`;
      if (service.description) md += `${service.description}\n\n`;
      md += `- **Type:** ${service.type}\n`;
      if (service.frequency) md += `- **Frequency:** ${service.frequency}\n`;
      md += '\n';
    });
  }

  // Stakeholders
  if (tomData.stakeholders && tomData.stakeholders.length > 0) {
    md += '## Stakeholders\n\n';
    md += '| Name | Role | Relationship | Expectations |\n';
    md += '|------|------|--------------|-------------|\n';
    tomData.stakeholders.forEach(sh => {
      md += `| ${sh.name || 'N/A'} | ${sh.role || '-'} | ${sh.relationship || '-'} | ${sh.expectations || '-'} |\n`;
    });
    md += '\n';
  }

  // Value Chain
  if (tomData.valueChain) {
    md += '## Value Chain\n\n';

    if (tomData.valueChain.inputs && tomData.valueChain.inputs.length > 0) {
      md += '### Inputs\n\n';
      tomData.valueChain.inputs.forEach(input => {
        md += `- **${input.name}**`;
        if (input.source) md += ` (from ${input.source})`;
        if (input.frequency) md += ` - ${input.frequency}`;
        md += '\n';
      });
      md += '\n';
    }

    if (tomData.valueChain.activities && tomData.valueChain.activities.length > 0) {
      md += '### Activities\n\n';
      tomData.valueChain.activities.forEach((act, i) => {
        md += `${i + 1}. **${act.name}**`;
        if (act.criticality) md += ` [${act.criticality} criticality]`;
        md += '\n';
        if (act.description) md += `   - ${act.description}\n`;
        if (act.owner) md += `   - Owner: ${act.owner}\n`;
        md += '\n';
      });
    }

    if (tomData.valueChain.outputs && tomData.valueChain.outputs.length > 0) {
      md += '### Outputs\n\n';
      tomData.valueChain.outputs.forEach(output => {
        md += `- **${output.name}**`;
        if (output.recipient) md += ` → ${output.recipient}`;
        if (output.quality) md += ` (Quality: ${output.quality})`;
        md += '\n';
      });
      md += '\n';
    }
  }

  // SLAs
  if (tomData.slas && tomData.slas.length > 0) {
    md += '## Service Level Agreements\n\n';
    md += '| Service | Metric | Target | Measurement |\n';
    md += '|---------|--------|--------|-------------|\n';
    tomData.slas.forEach(sla => {
      md += `| ${sla.service || 'N/A'} | ${sla.metric || '-'} | ${sla.target || '-'} | ${sla.measurement || '-'} |\n`;
    });
    md += '\n';
  }

  // KPIs
  if (tomData.kpis && tomData.kpis.length > 0) {
    md += '## Key Performance Indicators\n\n';
    tomData.kpis.forEach((kpi, i) => {
      md += `### ${i + 1}. ${kpi.name}\n\n`;
      if (kpi.description) md += `${kpi.description}\n\n`;
      md += `- **Target:** ${kpi.target}\n`;
      md += `- **Category:** ${kpi.category}\n`;
      if (kpi.frequency) md += `- **Frequency:** ${kpi.frequency}\n`;
      if (kpi.owner) md += `- **Owner:** ${kpi.owner}\n`;
      md += '\n';
    });
  }

  // RACI
  if (tomData.raci && tomData.raci.length > 0) {
    md += '## RACI Matrix\n\n';
    md += '| Activity | Responsible | Accountable | Consulted | Informed |\n';
    md += '|----------|-------------|-------------|-----------|----------|\n';
    tomData.raci.forEach(r => {
      const resp = Array.isArray(r.responsible) ? r.responsible.join(', ') : r.responsible || '-';
      const cons = Array.isArray(r.consulted) ? r.consulted.join(', ') : r.consulted || '-';
      const inf = Array.isArray(r.informed) ? r.informed.join(', ') : r.informed || '-';
      md += `| ${r.activity || 'N/A'} | ${resp} | ${r.accountable || '-'} | ${cons} | ${inf} |\n`;
    });
    md += '\n';
  }

  // Governance
  if (tomData.governance && tomData.governance.forums && tomData.governance.forums.length > 0) {
    md += '## Governance\n\n';
    md += '### Forums\n\n';
    tomData.governance.forums.forEach((forum, i) => {
      md += `#### ${i + 1}. ${forum.name}\n\n`;
      if (forum.purpose) md += `**Purpose:** ${forum.purpose}\n\n`;
      if (forum.frequency) md += `**Frequency:** ${forum.frequency}\n\n`;
      if (forum.participants) {
        const parts = Array.isArray(forum.participants) ? forum.participants.join(', ') : forum.participants;
        md += `**Participants:** ${parts}\n\n`;
      }
    });

    if (tomData.governance.escalationPath) {
      md += '### Escalation Path\n\n';
      md += `${tomData.governance.escalationPath}\n\n`;
    }

    if (tomData.governance.decisionRights) {
      md += '### Decision Rights\n\n';
      md += `${tomData.governance.decisionRights}\n\n`;
    }
  }

  // Dependencies
  if (tomData.dependencies && tomData.dependencies.length > 0) {
    md += '## Dependencies\n\n';
    tomData.dependencies.forEach((dep, i) => {
      md += `${i + 1}. **${dep.on}** (${dep.type})`;
      if (dep.criticality) md += ` - ${dep.criticality} criticality`;
      md += '\n';
      if (dep.impact) md += `   - Impact if unavailable: ${dep.impact}\n`;
      md += '\n';
    });
  }

  // Risks
  if (tomData.risks && tomData.risks.length > 0) {
    md += '## Risks & Pain Points\n\n';
    tomData.risks.forEach((risk, i) => {
      md += `### ${i + 1}. ${risk.type || 'Risk'}\n\n`;
      md += `${risk.description}\n\n`;
      if (risk.likelihood || risk.impact) {
        md += `- **Likelihood:** ${risk.likelihood || 'N/A'}\n`;
        md += `- **Impact:** ${risk.impact || 'N/A'}\n`;
      }
      if (risk.mitigation) md += `- **Mitigation:** ${risk.mitigation}\n`;
      md += '\n';
    });
  }

  // Opportunities
  if (tomData.opportunities && tomData.opportunities.length > 0) {
    md += '## Opportunities & Improvements\n\n';
    tomData.opportunities.forEach((opp, i) => {
      md += `### ${i + 1}. ${opp.type || 'Opportunity'}\n\n`;
      md += `${opp.description}\n\n`;
      if (opp.effort || opp.impact) {
        md += `- **Effort:** ${opp.effort || 'N/A'}\n`;
        md += `- **Impact:** ${opp.impact || 'N/A'}\n`;
      }
      if (opp.timeframe) md += `- **Timeframe:** ${opp.timeframe}\n`;
      md += '\n';
    });
  }

  md += '---\n\n';
  md += `*Generated by TOM Builder Wizard on ${new Date().toLocaleDateString()}*\n`;

  return md;
}

export function downloadMarkdown(tomData) {
  const markdown = generateMarkdown(tomData);
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `TOM_${tomData.department?.name || 'Export'}_${new Date().toISOString().split('T')[0]}.md`;
  link.click();
  URL.revokeObjectURL(url);
}

export function copyMarkdownToClipboard(tomData) {
  const markdown = generateMarkdown(tomData);
  navigator.clipboard.writeText(markdown).then(() => {
    return true;
  }).catch(() => {
    return false;
  });
}
