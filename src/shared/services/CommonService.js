const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const getUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
};

export { capitalizeFirstLetter, getUser };
