import { useState } from 'react';

function useCounter(init) {
    const [counter, setCounter] = useState(init);

    const incrementCount = incrementBy => {
        setCounter(prevState => prevState + incrementBy);
    };

    const decrementCount = decrementBy => {
        setCounter(prevState => prevState - decrementBy);
    };

    return [counter, incrementCount, decrementCount];
}

export default useCounter;
