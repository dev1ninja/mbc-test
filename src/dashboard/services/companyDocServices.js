import {internalNetwork} from 'shared/services/network';

const multipartFormDataConfig = { "Content-Type": "multipart/form-data" }

export const uploadFile = async (file = {}) => {
    const formData = new FormData();
    formData.append("file", file);

    const networkUrl = "/incard/v1/user/uploadFile";
    return internalNetwork.post(networkUrl, formData, multipartFormDataConfig)
        .then(response => response)
        .catch(error => error);
};

export const deleteDocument = async (url, fromDB) => {
    const res = await internalNetwork.delete('/incard/v1/user/companyDocuments', {
        name: url,
        fromDB,
    });
    return res;
};

export const updateCompanyDocs = async (provide, documents = []) => {
    const uploadUrl = "/incard/v1/user/updateCompanyDocuments";
    const data = {
        provide,
        companyDocuments: documents
    };
    return internalNetwork
        .post(uploadUrl, data)
        .then(response => response)
        .catch(error => error);
};
