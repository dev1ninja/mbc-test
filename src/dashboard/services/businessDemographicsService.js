import {internalNetwork} from 'shared/services/network';

const postBusinessApi = async (url, data = {}) => {
    return internalNetwork.post(`/incard/v1/user/${url}`, data);
};

const deleteDirector = async (url, id) => {
    return internalNetwork.delete(`/incard/v1/user/${url}/${id}`);
}

const searchCompany = async (data = {}) => {
    try {
        return internalNetwork
            .post(`/incard/v1/user/searchCompany`, data);
    } catch (error) {
        return error;
    }
};

export { postBusinessApi, searchCompany, deleteDirector };
