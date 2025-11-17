// Validation utilities for form inputs

export function validateDepartment(data) {
  const errors = {};

  if (!data.name || data.name.trim() === '') {
    errors.name = 'Department name is required';
  }

  if (data.headcount && (data.headcount < 0 || !Number.isInteger(Number(data.headcount)))) {
    errors.headcount = 'Headcount must be a positive whole number';
  }

  return errors;
}

export function validatePurpose(data) {
  const errors = {};

  if (!data.statement || data.statement.trim() === '') {
    errors.statement = 'Purpose statement is required';
  } else if (data.statement.length < 20) {
    errors.statement = 'Purpose statement should be at least 20 characters';
  }

  return errors;
}

export function validateService(service) {
  const errors = {};

  if (!service.serviceName || service.serviceName.trim() === '') {
    errors.serviceName = 'Service name is required';
  }

  if (!service.type) {
    errors.type = 'Service type is required';
  }

  return errors;
}

export function validateStakeholder(stakeholder) {
  const errors = {};

  if (!stakeholder.name || stakeholder.name.trim() === '') {
    errors.name = 'Stakeholder name is required';
  }

  if (!stakeholder.relationship) {
    errors.relationship = 'Relationship type is required';
  }

  return errors;
}

export function validateSLA(sla) {
  const errors = {};

  if (!sla.service || sla.service.trim() === '') {
    errors.service = 'Service name is required';
  }

  if (!sla.metric || sla.metric.trim() === '') {
    errors.metric = 'Metric is required';
  }

  if (!sla.target || sla.target.trim() === '') {
    errors.target = 'Target is required';
  }

  return errors;
}

export function validateKPI(kpi) {
  const errors = {};

  if (!kpi.name || kpi.name.trim() === '') {
    errors.name = 'KPI name is required';
  }

  if (!kpi.target || kpi.target.trim() === '') {
    errors.target = 'Target is required';
  }

  if (!kpi.category) {
    errors.category = 'Category is required';
  }

  return errors;
}

export function validateRACI(raci) {
  const errors = {};

  if (!raci.activity || raci.activity.trim() === '') {
    errors.activity = 'Activity is required';
  }

  if (!raci.accountable || raci.accountable.trim() === '') {
    errors.accountable = 'Accountable person is required (there must be exactly one)';
  }

  return errors;
}

export function validateDependency(dependency) {
  const errors = {};

  if (!dependency.on || dependency.on.trim() === '') {
    errors.on = 'Dependency description is required';
  }

  if (!dependency.type) {
    errors.type = 'Dependency type is required';
  }

  return errors;
}

export function validateRisk(risk) {
  const errors = {};

  if (!risk.description || risk.description.trim() === '') {
    errors.description = 'Risk description is required';
  }

  if (!risk.type) {
    errors.type = 'Risk type is required';
  }

  return errors;
}

export function validateOpportunity(opportunity) {
  const errors = {};

  if (!opportunity.description || opportunity.description.trim() === '') {
    errors.description = 'Opportunity description is required';
  }

  if (!opportunity.type) {
    errors.type = 'Opportunity type is required';
  }

  return errors;
}
