import {internalNetwork} from 'shared/services/network';

export default (data = []) => {
    const url = '/incard/v1/user/add/business_relationship_purpose';
    const obj = {
        purposeOfBusinessRelationship: data
    };
    return internalNetwork
        .post(url, obj)
        .then(res => res)
        .catch(err => err);
};
