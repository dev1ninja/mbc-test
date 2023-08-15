import {internalNetwork} from 'shared/services/network';

export default async ({ expectedAmtMoneyMovementPerMonth, expectedTransactionVolPerMonth, maximumSingleAmt }, currency) => {
    const obj = {
        expectedAmtMoneyMovementPerMonth,
        expectedTransactionVolPerMonth,
        maximumSingleAmt: `${currency} ${maximumSingleAmt}`
    };
    const url = 'incard/v1/user/add/expected_amount_specification';
    return internalNetwork
        .post(url, obj)
        .then(res => res)
        .catch(err => err);
};
