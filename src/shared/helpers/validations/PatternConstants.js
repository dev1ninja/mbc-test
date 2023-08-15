// const NAME = /[A-Za-z\s]{3,30}$/;
// const EMAIL = /^[w-.]+@([w-]+.)+[w-]{2,8}$/;
// const PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,16}$/;
// const TITLE = /^[A-Za-z0-9\s\-_,.:;()''""]+$/;
// const FULLNAME = /^[A-Za-z\s]{1,}[.]{0,1}[A-Za-z\s]{0,}$/;
// const ADDRESS = /^[a-zA-Z0-9\s, ]{4,50}$/; // for user address
// const REGION = /^[a-zA-Z\s ]{3,30}$/; // city country and state for user
// const PINCODE = /^[a-zA-Z0-9\s ]{5,20}$/;
// const DESCRIPTION = /^[-.&\w\s,? ]{4,250}$/;
// const BNAME = /^[a-zA-Z\s ]{3,100}$/;
// const AREA = /^[a-zA-Z\s ]{3,50}$/;
// const PINNUMBER = /^[0-9]{2,10}$/;
// const MIN = /^(?=.*[1-9])\d*(?:\.\d{1,2})?$/;
// const MAX = /^[1-9][0-9]{0,6}$/;
// const USERNAME = /^[A-Za-z\s]{1,}[\]{0,1}[A-Za-z\s]{0,}$/;
// const STATE = /^[a-zA-Z\s ]{4,50}$/;
// const COUNTRY = /^[a-zA-Z\s ]{4,50}$/;
// const SLAB_DECIMAL = /^(?=.*[1-9])\d*(?:\.\d{1,2})?$/;
// const PAN_NO = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
// const AADHAR_NO = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
// const CAPITAL_LETTERS = /[A-Za-z\s]{4,50}$/;
// const IFSC = /^[A-Z]{4}0[A-Z0-9]{6}$/;
// const COMMON_NAME = /^[a-zA-Z\s ]{4,100}$/;
// const UNAME = /[a-zA-Z]$/;
// const DECIMAL = /^-?\d*(\.\d+)?$/;
// const NAME_WU = /[A-Za-z_\s]{3,30}$/;
const NUMBER = new RegExp(/^[0-9]{1,10}$/);
const PHONENUMBER = new RegExp(/^[0-9]{7,13}$/);

// ? new Regex
// const EMAIL = new RegExp('^[a-zA-Z0-9._:$!%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
const EMAIL = new RegExp(
    /^(("[\w-\s]+")|([\w+-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w+-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

const PASSWORD = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
export { EMAIL, PASSWORD, NUMBER, PHONENUMBER };

// export {
//     NAME,
//     EMAIL,
//     PASSWORD,
//     TITLE,
//     FULLNAME,
//     ADDRESS,
//     REGION,
//     PINCODE,
//     NUMBER,
//     AREA,
//     DESCRIPTION,
//     BNAME,
//     PINNUMBER,
//     USERNAME,
//     STATE,
//     COUNTRY,
//     MIN,
//     MAX,
//     SLAB_DECIMAL,
//     PAN_NO,
//     AADHAR_NO,
//     CAPITAL_LETTERS,
//     IFSC,
//     COMMON_NAME,
//     UNAME,
//     DECIMAL,
//     NAME_WU
// };
