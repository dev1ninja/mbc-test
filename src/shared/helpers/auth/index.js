import { getUser } from "auth/services/AuthService";

export const setUser = user => {
    const { _id: id, accessToken, activationKey, email } = user;
    sessionStorage.setItem("userId", id);
    sessionStorage.setItem("activationKey", activationKey);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("token", accessToken);
    sessionStorage.setItem("user", JSON.stringify(user));
};

export const initUser = async () => {
    const res = await getUser();
    const user = res?.data?.user;
    setUser(user);
    return user;
};
