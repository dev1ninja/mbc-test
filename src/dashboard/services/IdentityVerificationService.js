import {internalNetwork} from 'shared/services/network';

const networkConfig = {headers: { 'Content-Type': 'multipart/form-data' }};

const uploadDocuments = (url, uploadObj = {}) => {
    const bodyFormData = new FormData();
    bodyFormData.append('documents', uploadObj.file);
    bodyFormData.append('_id', uploadObj.id);
    bodyFormData.append('reference', uploadObj.reference);
    const networkUrl = `/incard/v1/user/${url}`;
    return internalNetwork.post(networkUrl, bodyFormData, networkConfig)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

const verifyCompanyMembers = (url, uploadObj = {}) => {
    const bodyFormData = new FormData();
    bodyFormData.append('documents', uploadObj.file);
    bodyFormData.append('reference', uploadObj.reference);
    const networkUrl = `/incard/v1/user/${url}?id=${uploadObj.id}&email=${uploadObj.email}`;
    return internalNetwork.put(networkUrl, bodyFormData, networkConfig)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

const faceVerification = (url, uploadObj = {}) => {
    const bodyFormData = new FormData();
    bodyFormData.append('current', uploadObj.current);
    bodyFormData.append('_id', uploadObj.id);
    bodyFormData.append('comparison', uploadObj.comparison);
    const networkUrl = `/incard/v1/user/${url}`;
    return internalNetwork.post(networkUrl, bodyFormData, networkConfig)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response;
        });
};

const alternateVerification = (url, uploadObj = {}) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', uploadObj.file);
    bodyFormData.append('_id', uploadObj.id);
    bodyFormData.append('reference', uploadObj.reference);
    bodyFormData.append('country', uploadObj.country);
    bodyFormData.append('dayOfBirth', uploadObj.dayOfBirth);
    bodyFormData.append('foreName', uploadObj.foreName);
    bodyFormData.append('houseNameNumber', uploadObj.houseNameNumber);
    bodyFormData.append('monthOfBirth', uploadObj.monthOfBirth);
    bodyFormData.append('postcode', uploadObj.postcode);
    bodyFormData.append('surname', uploadObj.surname);
    bodyFormData.append('yearOfBirth', uploadObj.yearOfBirth);
    const networkUrl = `/incard/v1/user/${url}`;
    return internalNetwork.post(networkUrl, bodyFormData, networkConfig)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

const alternateUserVerification = (url, uploadObj = {}) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', uploadObj.file);
    bodyFormData.append('reference', uploadObj.reference);
    bodyFormData.append('country', uploadObj.country);
    bodyFormData.append('dayOfBirth', uploadObj.dayOfBirth);
    bodyFormData.append('foreName', uploadObj.foreName);
    bodyFormData.append('houseNameNumber', uploadObj.houseNameNumber);
    bodyFormData.append('monthOfBirth', uploadObj.monthOfBirth);
    bodyFormData.append('postcode', uploadObj.postcode);
    bodyFormData.append('surname', uploadObj.surname);
    bodyFormData.append('yearOfBirth', uploadObj.yearOfBirth);
    const networkUrl = `/incard/v1/user/${url}?id=${uploadObj.id}&email=${uploadObj.email}`;
    return internalNetwork.put(networkUrl, bodyFormData, networkConfig)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};
export { uploadDocuments, faceVerification, alternateVerification, alternateUserVerification, verifyCompanyMembers };
