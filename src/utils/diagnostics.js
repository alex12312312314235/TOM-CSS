// Diagnostic utilities for TOM completeness and quality assessment

/**
 * Calculate completeness percentage for the entire TOM
 */
export function calculateCompleteness(tomData) {
  const weights = {
    department: 10,
    purpose: 10,
    serviceCatalogue: 10,
    stakeholders: 10,
    valueChain: 15,
    slas: 10,
    kpis: 10,
    raci: 10,
    governance: 5,
    dependencies: 5,
    risks: 5,
    opportunities: 5
  };

  let totalScore = 0;
  let maxScore = 100;

  // Department
  if (tomData.department?.name) {
    totalScore += weights.department * 0.7;
    if (tomData.department?.division) totalScore += weights.department * 0.15;
    if (tomData.department?.headcount) totalScore += weights.department * 0.15;
  }

  // Purpose
  if (tomData.purpose?.statement) {
    totalScore += weights.purpose * 0.7;
    if (tomData.purpose?.vision) totalScore += weights.purpose * 0.15;
    if (tomData.purpose?.mission) totalScore += weights.purpose * 0.15;
  }

  // Service Catalogue
  if (tomData.serviceCatalogue?.length > 0) {
    const serviceScore = Math.min(tomData.serviceCatalogue.length / 5, 1);
    totalScore += weights.serviceCatalogue * serviceScore;
  }

  // Stakeholders
  if (tomData.stakeholders?.length > 0) {
    const stakeholderScore = Math.min(tomData.stakeholders.length / 5, 1);
    totalScore += weights.stakeholders * stakeholderScore;
  }

  // Value Chain
  const hasInputs = tomData.valueChain?.inputs?.length > 0;
  const hasActivities = tomData.valueChain?.activities?.length > 0;
  const hasOutputs = tomData.valueChain?.outputs?.length > 0;
  if (hasInputs) totalScore += weights.valueChain * 0.3;
  if (hasActivities) totalScore += weights.valueChain * 0.4;
  if (hasOutputs) totalScore += weights.valueChain * 0.3;

  // SLAs
  if (tomData.slas?.length > 0) {
    const slaScore = Math.min(tomData.slas.length / 3, 1);
    totalScore += weights.slas * slaScore;
  }

  // KPIs
  if (tomData.kpis?.length > 0) {
    const kpiScore = Math.min(tomData.kpis.length / 5, 1);
    totalScore += weights.kpis * kpiScore;
  }

  // RACI
  if (tomData.raci?.length > 0) {
    const raciScore = Math.min(tomData.raci.length / 5, 1);
    totalScore += weights.raci * raciScore;
  }

  // Governance
  if (tomData.governance?.forums?.length > 0) {
    totalScore += weights.governance;
  }

  // Dependencies
  if (tomData.dependencies?.length > 0) {
    const depScore = Math.min(tomData.dependencies.length / 3, 1);
    totalScore += weights.dependencies * depScore;
  }

  // Risks
  if (tomData.risks?.length > 0) {
    const riskScore = Math.min(tomData.risks.length / 3, 1);
    totalScore += weights.risks * riskScore;
  }

  // Opportunities
  if (tomData.opportunities?.length > 0) {
    const oppScore = Math.min(tomData.opportunities.length / 3, 1);
    totalScore += weights.opportunities * oppScore;
  }

  return Math.round(totalScore);
}

/**
 * Get RAG status for each section
 */
export function getSectionRAG(tomData) {
  return {
    department: getRAG(tomData.department?.name, 'required'),
    purpose: getRAG(tomData.purpose?.statement, 'required'),
    serviceCatalogue: getRAG(tomData.serviceCatalogue?.length, 'array', 3),
    stakeholders: getRAG(tomData.stakeholders?.length, 'array', 3),
    valueChain: getValueChainRAG(tomData.valueChain),
    slas: getRAG(tomData.slas?.length, 'array', 2),
    kpis: getRAG(tomData.kpis?.length, 'array', 3),
    raci: getRAG(tomData.raci?.length, 'array', 3),
    governance: getRAG(tomData.governance?.forums?.length, 'array', 1),
    dependencies: getRAG(tomData.dependencies?.length, 'array', 2),
    risks: getRAG(tomData.risks?.length, 'array', 2),
    opportunities: getRAG(tomData.opportunities?.length, 'array', 2)
  };
}

function getRAG(value, type, minCount = 1) {
  if (type === 'required') {
    return value ? 'green' : 'red';
  }

  if (type === 'array') {
    if (!value || value === 0) return 'red';
    if (value < minCount) return 'amber';
    return 'green';
  }

  return 'amber';
}

function getValueChainRAG(valueChain) {
  const hasInputs = valueChain?.inputs?.length > 0;
  const hasActivities = valueChain?.activities?.length > 0;
  const hasOutputs = valueChain?.outputs?.length > 0;

  const count = [hasInputs, hasActivities, hasOutputs].filter(Boolean).length;

  if (count === 3) return 'green';
  if (count >= 1) return 'amber';
  return 'red';
}

/**
 * Get missing or incomplete sections
 */
export function getMissingSections(tomData) {
  const missing = [];
  const ragStatus = getSectionRAG(tomData);

  const sectionNames = {
    department: 'Department Information',
    purpose: 'Purpose Statement',
    serviceCatalogue: 'Service Catalogue',
    stakeholders: 'Stakeholders',
    valueChain: 'Value Chain (Inputs → Activities → Outputs)',
    slas: 'Service Level Agreements',
    kpis: 'Key Performance Indicators',
    raci: 'RACI Matrix',
    governance: 'Governance & Forums',
    dependencies: 'Dependencies',
    risks: 'Risks & Pain Points',
    opportunities: 'Opportunities & Improvements'
  };

  Object.entries(ragStatus).forEach(([key, status]) => {
    if (status === 'red') {
      missing.push({
        section: sectionNames[key],
        severity: 'critical',
        message: 'Not started - this is required'
      });
    } else if (status === 'amber') {
      missing.push({
        section: sectionNames[key],
        severity: 'warning',
        message: 'Incomplete - add more detail'
      });
    }
  });

  return missing;
}

/**
 * Get recommendations based on current TOM state
 */
export function getRecommendations(tomData) {
  const recommendations = [];
  const completeness = calculateCompleteness(tomData);

  if (completeness < 30) {
    recommendations.push('Focus on completing the core sections: Department, Purpose, and Service Catalogue');
  } else if (completeness < 60) {
    recommendations.push('Good start! Now add your Value Chain and Stakeholders to show how work flows');
  } else if (completeness < 80) {
    recommendations.push('Almost there! Define your SLAs and KPIs to measure success');
  } else {
    recommendations.push('Excellent work! Consider reviewing your RACI and Governance for clarity');
  }

  // Specific recommendations
  if (!tomData.valueChain?.activities?.length) {
    recommendations.push('List your key activities - what does your team actually do day-to-day?');
  }

  if (!tomData.kpis?.length) {
    recommendations.push('Add KPIs to track your performance - how will you know if you\'re successful?');
  }

  if (!tomData.raci?.length) {
    recommendations.push('Define who does what with a RACI matrix - this prevents confusion and duplicated effort');
  }

  if (!tomData.risks?.length) {
    recommendations.push('Identify risks and pain points - what keeps you up at night?');
  }

  return recommendations;
}
