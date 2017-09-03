import React from 'react';

const InputWrapperComponent = (props) => {
    const { isValid, type, name, placeholder, onChange, value } = props;

    return (
        <div className={"form-group input-wrapper " + (!isValid ? 'has-error' : '')}>
            <input 
                type={type || "text"} 
                className="form-control" 
                onChange={onChange} 
                value={value}
                name={name}
                data-fv-field={name}
                placeholder={placeholder}
            />
            <i className="form-control-feedback glyphicon glyphicon-remove" data-fv-icon-for={name}></i>
        </div>
    );
}

export default InputWrapperComponent;