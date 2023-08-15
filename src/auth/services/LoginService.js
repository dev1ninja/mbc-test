import {internalNetwork} from 'shared/services/network';

const userLogin = (body = {}) => {
    const loginUrl = '/incard/v1/user/login';
    const loginObj = { ...body, isMobile: false };
    return internalNetwork
        .post(loginUrl, loginObj)
};

export default userLogin;
