import {internalNetwork} from 'shared/services/network';

export default (expectedChannels, isOtherSelected, othersValue) => {
    const url = '/incard/v1/user/add/product_channel_specification';
    let data;

    if (isOtherSelected)
        data = {
            expectedChannels,
            isOtherSelected,
            othersValue
        };
    else
        data = {
            expectedChannels,
            isOtherSelected
        };

    return internalNetwork
        .post(url, data)
        .then(res => res)
        .catch(err => err);
};
