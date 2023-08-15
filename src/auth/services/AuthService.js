import {internalNetwork} from 'shared/services/network';
import Cookies from 'js-cookie';

export const sendVerify = async email => {
    await internalNetwork.post('/incard/v1/user/send_verify_token', {
        email,
    });
};

export const verifyEmail = async (email, token) => {
    return internalNetwork.put(`/incard/v2/user/verify/email`, {
        email,
        token,
    });
};

export const getInfoByVerifyTokens = async (activationToken) => {
    const {data} = await internalNetwork.post(`/incard/v2/user/verify/get-info-by-verify-tokens`, {
        activationToken,
    });
    return data;
};

export const getUser = async () => {
    const res = await internalNetwork.get('/incard/v1/user/me');
    return res;
};

export const sendCode = async email => {
    await internalNetwork.post('/incard/v1/user/forgotPassword/phone', {
        email,
    });
};

export const verifyPhone = async (email, otp) => {
    const {data} = await internalNetwork.put('/incard/v1/user/forgotPassword/phone', {
        email,
        otp,
    });
    return data;
};

export const createResetToken = async (email) => {
    const {data} = await internalNetwork.put('/incard/v1/user/forgotPassword/phone', {
        email,
    });
    return data;
};

export const getInfoByVerifyTokensForForgotPassword = async (activationKey, activationToken) => {
    const {data} = await internalNetwork.post(`/incard/v2/user/forgot-password/get-info-by-verify-tokens`, {
        activationKey,
        activationToken,
    });
    return data;
};

export const verifyEmailForForgotPassword = async (email, token) => {
    return internalNetwork.put(`/incard/v2/user/forgot-password/verify/email`, {
        email,
        token,
    });
};

export const resetPassword = async (password, resetToken) => {
    await internalNetwork.post('/incard/v1/user/resetPassword', {
        password,
        resetToken,
    });
};

export const logout = async () => {
    await internalNetwork.delete('/incard/v1/user/logout');
    Cookies.set('token', '');
};
