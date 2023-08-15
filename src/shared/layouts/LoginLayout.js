import { node } from "prop-types";
import React from "react";

import "./styles.scss";

const LoginLayout = ({ children }) => {
    return (
        <div className="LoginLayout">
            <div className="LoginLayout-scroll">{children}</div>
        </div>
    );
};

export default LoginLayout;

LoginLayout.propTypes = {
    children: node.isRequired
};
