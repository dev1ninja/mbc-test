import {internalNetwork} from 'shared/services/network';

const multipartFormDataConfig = { "Content-Type": "multipart/form-data" }

const roleInComapny = (url, uploadObj = {}) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', uploadObj.file);
    bodyFormData.append('role', uploadObj.role);
    bodyFormData.append('roleTitle', uploadObj.roleTitle);
    bodyFormData.append('token', sessionStorage.getItem('token'));
    const networkUrl = `/incard/v1/user/${url}`;
    return internalNetwork.post(networkUrl, bodyFormData, multipartFormDataConfig)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};
export default roleInComapny;
