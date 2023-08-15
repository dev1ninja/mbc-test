import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const success = message => {
    return toast.success(message, { autoClose: 2500 });
};

const warning = message => {
    return toast.error(message, { autoClose: 5000 });
};

export { success, warning };
