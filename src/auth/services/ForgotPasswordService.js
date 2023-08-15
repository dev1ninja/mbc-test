import {internalNetwork} from 'shared/services/network';


const PostForgotPassword = async (url, data = {}) => {
    try {
        return internalNetwork.post(`/incard/v1/user/${url}`, data);
    } catch (error) {
        return error.response;
    }
};

export default PostForgotPassword;
