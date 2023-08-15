import { useState } from 'react';

function useInput(initialValue) {
    const [state, setState] = useState(initialValue);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };

    const resetInputFields = () => {
        setState(initialValue);
    };

    return [state, handleInputChange, resetInputFields];
}
export default useInput;
