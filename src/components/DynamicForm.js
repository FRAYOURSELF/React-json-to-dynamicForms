import React, { useState } from 'react';
import './DynamicForm.css';

const DynamicForm = () => {
  // Initial state for user-input JSON schema and form data
  const [uiSchema, setUiSchema] = useState('');
  const [formData, setFormData] = useState({});

  // Handle UI schema change
  const handleUiSchemaChange = (event) => {
    setUiSchema(event.target.value);
  };

  // Handle form field change
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const checkConditions = (conditions) => {
    if (!conditions || conditions.length === 0) {
      return true; // If no conditions are specified, consider it enabled
    }
  
    for (const condition of conditions) {
      const { jsonKey, op, value, action } = condition;
  
      switch (op) {
        case '==':
          if (formData[jsonKey] === value && action === 'enable') {
            return true;
          }
          break;
        // Add other conditions as needed
        default:
          break;
      }
    }
  
    return false; // If no conditions are met, consider it disabled
  };
  // Render the form based on the user-input JSON schema
  const renderForm = () => {
    let parsedUiSchema = null;

    try {
      parsedUiSchema = JSON.parse(uiSchema);

      // Ensure parsedUiSchema is an array
      if (!Array.isArray(parsedUiSchema)) {
        console.error('UI Schema must be an array');
        return null;
      }
    } catch (error) {
      console.error('Invalid UI Schema JSON:', error);
      // Handle the error as needed
      return null;
    }
    if (!parsedUiSchema) {
        return <div>Loading...</div>;
      }
    return (
        <form>
      {parsedUiSchema.map((fieldJson, index) => (
        <div key={fieldJson.jsonKey} className={`field-${index}`}>
          <label>{fieldJson.label}</label>
          {renderFormField(fieldJson)}
        </div>
      ))}
      <div>
        <button id="submit-btn" type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
    //     <form>
    //     {parsedUiSchema.map((fieldJson) => (
    //       <div key={fieldJson.jsonKey}>
    //         <label>{fieldJson.label}</label>
    //         {renderFormField(fieldJson)}
    //       </div>
    //     ))}
    //     <div>
    //       <button id="submit-btn" type="submit" className="btn btn-primary">
    //         Submit
    //       </button>
    //     </div>
    //   </form>
    );
  };
  const renderIgnoreField = (fieldJson) => {
    if (checkConditions(fieldJson.conditions)) {
      return (
        <div key={fieldJson.jsonKey}>
          {fieldJson.subParameters.map((subField) => (
            <div key={subField.jsonKey}>
              <label>{subField.label}</label>
              {renderFormField(subField)}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  const renderGroupField = (fieldJson) => {
      return (
        <div key={fieldJson.jsonKey}>
          {fieldJson.subParameters.map((subField) => (
            <div key={subField.jsonKey}>
              <label>{subField.label}</label>
              {renderFormField(subField)}
            </div>
          ))}
        </div>
      );
    return null;
  };
  // Render the form field based on the field JSON schema
  const renderFormField = (fieldJson) => {
    switch (fieldJson.uiType) {
      case 'Input':
        return (
          <input
            type="text"
            name={fieldJson.jsonKey}
            value={formData[fieldJson.jsonKey] || ''}
            onChange={handleFieldChange}
            placeholder={fieldJson.placeholder}
            required={fieldJson.validate.required}
            readOnly={fieldJson.validate.immutable}
          />
        );
        case 'Ignore':
      return renderIgnoreField(fieldJson);
      case 'Group':
      return renderGroupField(fieldJson);
      case 'Radio':
        return (
          <div>
            {fieldJson.validate.options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleFieldChange({ target: { name: fieldJson.jsonKey, value: option.value } })}
                disabled={formData[fieldJson.jsonKey] === option.value || fieldJson.validate.immutable}
              >
                {option.label}
              </button>
            ))}
          </div>
        );
        case 'Switch':
      return (
        <div>
          <label className="switch">
            <input
              type="checkbox"
              name={fieldJson.jsonKey}
              checked={!!formData[fieldJson.jsonKey]}
              onChange={(e) => handleFieldChange({ target: { name: fieldJson.jsonKey, value: e.target.checked } })}
              required={fieldJson.validate.required}
              disabled={fieldJson.validate.immutable}
            />
            <span className="slider"></span>
          </label>
        </div>
      );
      
      case 'Select':
        return (
          <select
            name={fieldJson.jsonKey}
            value={formData[fieldJson.jsonKey] || fieldJson.validate.defaultValue}
            onChange={handleFieldChange}
            required={fieldJson.validate.required}
            disabled={fieldJson.validate.immutable}
          >
            {fieldJson.validate.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dynamic-form-container">
      {/* Left Section - JSON Editor */}
      <div className="json-editor">
        <textarea
          placeholder="Paste UI Schema here"
          value={uiSchema}
          onChange={handleUiSchemaChange}
        />
      </div>

      {/* Right Section - Form Preview */}
      <div className="form-preview">
        <div className="form-container">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
