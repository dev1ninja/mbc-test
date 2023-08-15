import { useState } from 'react';

function useToggle(initialVal) {
    const [isToggle, setToggle] = useState(initialVal);

    const handleToggle = event => {
        const { name } = event.target;
        setToggle({ ...isToggle, [name]: !isToggle[name] });
    };

    return [isToggle, handleToggle];
}

export default useToggle;
