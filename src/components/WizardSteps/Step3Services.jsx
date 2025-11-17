import React, { useState } from 'react';
import InputField from '../shared/InputField';
import InfoBox from '../shared/InfoBox';
import SimpleGraphic from '../shared/SimpleGraphic';
import { Plus, Trash2 } from 'lucide-react';

export default function Step3Services({ data, onChange }) {
  const [services, setServices] = useState(data || []);

  const addService = () => {
    const newServices = [...services, { serviceName: '', description: '', type: '', frequency: '' }];
    setServices(newServices);
    onChange(newServices);
  };

  const removeService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
    onChange(newServices);
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
    onChange(newServices);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Catalogue</h2>
        <p className="text-gray-600">
          What services does your team provide? Think of these as your "products" that other teams use.
        </p>
      </div>

      <SimpleGraphic type="services" />

      <InfoBox type="info">
        <strong>What's this for?</strong> Your services are what you deliver to others. Each service should
        be something that someone requests or depends on. Examples: "Monthly Financial Reports," "Payroll Processing,"
        "IT Support Tickets."
      </InfoBox>

      <div className="space-y-6">
        {services.map((service, index) => (
          <div key={index} className="card bg-gray-50 relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">Service {index + 1}</h3>
              {services.length > 1 && (
                <button
                  onClick={() => removeService(index)}
                  className="text-red-500 hover:text-red-700"
                  type="button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <InputField
              label="Service Name"
              name="serviceName"
              value={service.serviceName}
              onChange={(e) => handleServiceChange(index, 'serviceName', e.target.value)}
              placeholder="e.g., Invoice Processing"
              helper="What do you call this service?"
              required
            />

            <InputField
              label="Description"
              name="description"
              value={service.description}
              onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
              multiline
              rows={2}
              placeholder="What does this service involve?"
              helper="A quick explanation of what this service includes"
            />

            <InputField
              label="Type"
              name="type"
              type="select"
              value={service.type}
              onChange={(e) => handleServiceChange(index, 'type', e.target.value)}
              options={['Core', 'Support', 'Strategic']}
              helper="Core = main job, Support = helps others, Strategic = future-focused"
              tooltip="Core: Your main responsibility. Support: Helps other teams. Strategic: Planning and improvement work."
              required
            />

            <InputField
              label="Frequency"
              name="frequency"
              value={service.frequency}
              onChange={(e) => handleServiceChange(index, 'frequency', e.target.value)}
              placeholder="e.g., Daily, Weekly, Monthly, On-demand"
              helper="How often do you deliver this service?"
            />
          </div>
        ))}

        <button
          onClick={addService}
          className="btn-secondary w-full flex items-center justify-center gap-2"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Another Service
        </button>
      </div>
    </div>
  );
}
