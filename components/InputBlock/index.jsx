import React from 'react'

function InputBlock({
    inputName,
    inputId,
    inputType,
    inputPlaceholder,
    labelText,
    inputChangeHandler
}) {

    return(
        <>
            <label htmlFor={inputId}>{labelText}</label>
            <input
                type={inputType}
                name={inputName}
                id={inputId}
                placeholder={inputPlaceholder}
                onChange={event => inputChangeHandler(event)}
            />
        </>
        
    )
}

export default InputBlock