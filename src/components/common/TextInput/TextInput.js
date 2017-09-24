import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';

const TextInput = ({ htmlId, name, label = "", type = "text", oneline = false, verticalLayout = true, required = false, onChange, placeholder, value = "", isValid = true, modifier = "", error, children, ...props}) => {
  let getTextInputClasses = () => {
    let classes = ['text-input'];
    if (oneline) {
      classes.push('text-input--oneline');
    }
    if (!isValid) {
      classes.push('has-error');
    }
    return classes.join(' ');
  }

  return (
    <div className={getTextInputClasses()} style={ verticalLayout ? { marginBottom: '15px' } : { marginRight: '5px' }}>
      { label && <Label htmlFor={htmlId} label={label} required={required}/> }
      <div className='text-input__input-wrapper'>
        <input
          id={htmlId}
          type={type}
          className='form-control'
          onChange={onChange} 
          value={value}
          name={name}
          data-fv-field={name}
          placeholder={placeholder}
          {...props}/>

          { !isValid && <i className='form-control-feedback glyphicon glyphicon-remove' data-fv-icon-for={name}></i> }
        </div>
        { children }
        { error && <div className='help-block'>{ error }</div> }
    </div>
  );
};

TextInput.propTypes = {
  htmlId: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  children: PropTypes.element,
  oneline: PropTypes.bool,
  verticalLayout: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  required: PropTypes.bool,
  isValid: PropTypes.bool
};

export default TextInput;