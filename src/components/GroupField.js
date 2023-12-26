// GroupField.js
import React from 'react';
import PropTypes from 'prop-types';

const GroupField = ({ fieldJson, formData, handleFieldChange, renderFormField }) => {
  return (
    <div className={`field-group field-${fieldJson.jsonKey}`}>
      <label>{fieldJson.label}</label>
      {fieldJson.subParameters.map((subFieldJson) => (
        <div key={subFieldJson.jsonKey} className={`field-${subFieldJson.uiType}`}>
          <label>{subFieldJson.label}</label>
          {renderFormField(subFieldJson, formData, handleFieldChange)}
        </div>
      ))}
    </div>
  );
};

GroupField.propTypes = {
  fieldJson: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  renderFormField: PropTypes.func.isRequired, // Pass the renderFormField function as a prop
};

export default GroupField;
