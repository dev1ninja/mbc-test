import {internalNetwork} from 'shared/services/network';

export default async isChecked => {
    const obj = { consentChecked: isChecked };

    const url = 'incard/v1/user/accept/general_service_agreement';
    return internalNetwork
        .post(url, obj)
        .then(res => res)
        .catch(err => err);
};
