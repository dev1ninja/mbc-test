import {internalNetwork} from 'shared/services/network';

const getList = url => {
    return internalNetwork
        .get(`/incard/v1/user/${url}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export default getList;
