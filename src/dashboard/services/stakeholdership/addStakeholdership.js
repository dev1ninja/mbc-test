import {internalNetwork} from 'shared/services/network';

const addStakeholdership = historicalArray => {
    const data = { questions: historicalArray };
    const url = '/add/historical_stakeholdership';
    return internalNetwork
        .post(`/incard/v1/user${url}`, data)
        .then(response => response)
        .catch(error => error);
};

export default addStakeholdership;
