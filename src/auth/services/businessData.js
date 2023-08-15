import {internalNetwork} from 'shared/services/network';

export const getCompanyInfo = async (countryCode, number) => {
    const res = await internalNetwork.post("/incard/v1/user/searchCompany", {
        country: countryCode,
        companyRegNumber: number
    });
    return res?.data;
};
