import {internalNetwork} from 'shared/services/network';

const userSignUp = async (body = {}) => {
    const signupUrl = "/incard/v1/user/signup";
    const res = await internalNetwork.post(signupUrl, body);
    return res;
};

export default userSignUp;
