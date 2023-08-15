import {internalNetwork} from 'shared/services/network';

const addCompanyMembers = (url, data = {}) => {
    return internalNetwork
        .post(`/incard/v1/user/${url}`, data)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export default addCompanyMembers;
