import { useContext, useEffect } from "react";
import authContext from "context/auth/authContext";
import { useIntercom } from "react-use-intercom";

const Intercom = ({ children }) => {
    const { boot } = useIntercom();
    const { user } = useContext(authContext);

    useEffect(() => {
        if (user) {
            const { _id: userId } = user;
            boot({ userId });
        }
    }, [user]);

    return children;
};

export default Intercom;
