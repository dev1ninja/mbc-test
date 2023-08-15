import {internalNetwork} from 'shared/services/network';

export default (selectedCustomerTypes, isOtherSelected, othersValue) => {
    const url = '/incard/v1/user/add/customer_type_specification';
    let data;
    if (isOtherSelected)
        data = {
            selectedCustomerTypes,
            isOtherSelected,
            othersValue
        };
    else
        data = {
            selectedCustomerTypes,
            isOtherSelected
        };

    return internalNetwork
        .post(url, data)
        .then(res => res)
        .catch(err => err);
};
