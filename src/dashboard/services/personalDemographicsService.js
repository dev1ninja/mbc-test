import {internalNetwork} from 'shared/services/network';

const postPersonalDemographics = (url, data = {}) => {
    return internalNetwork
        .post(`/incard/v1/user/${url}`, data)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response.data.error;
        });
};

export default postPersonalDemographics;
