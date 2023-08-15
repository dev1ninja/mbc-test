import { useState } from 'react';

function useValidations(init) {
    const [isValid, handleValidFields] = useState(init);

    const setIsValid = (field, val) => {
        // val can either be true or false
        handleValidFields(prevState => {
            return { ...prevState, [field]: val };
        });
    };

    const resetValidationFields = () => {
        handleValidFields(init);
    };

    return [isValid, setIsValid, resetValidationFields];
}

export default useValidations;
