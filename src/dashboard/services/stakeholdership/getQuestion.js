import {internalNetwork} from 'shared/services/network';

const getQuestion = () => {
    const url = `/incard/v1/user/questions`;

    return internalNetwork
        .get(url)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export default getQuestion;
