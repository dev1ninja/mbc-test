import {externalNetwork} from 'shared/services/network';

const getPostcodeAddressReq = async postCodeAddress => {
    const API_KEY = "5QdY8Z7Gx0uh4bZId-H2Uw32197";
    const url = `https://api.getAddress.io/find/${postCodeAddress}?expand=true&api-key=${API_KEY}`;
    const res = await externalNetwork.get(url);
    return res;
};
export default getPostcodeAddressReq;
