import {internalNetwork} from 'shared/services/network';

const getCertificateName = countryName => {
    const url = `getCertificateName?country=${countryName}`;

    return internalNetwork
        .get(`/incard/v1/user/${url}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export default getCertificateName;
