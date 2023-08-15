import React, { useContext, useEffect } from "react";
import { node } from "prop-types";
import { useHistory } from "react-router-dom";
import sidebarContext from "context/sidebar/sidebarContext";
import TabletSidebar from "../sidebar/tabletSidebar/TabletSidebar";
import Sidebar from "../sidebar/Sidebar";
import "./Navigations.scss";

const registerPathname = "/auth/register";
const Navigations = ({ children }) => {
    const { setDefaultState } = useContext(sidebarContext);
    const history = useHistory();

    useEffect(() => {
        if (history.location.pathname === registerPathname) {
            sessionStorage.clear();
            setDefaultState();
        }
    }, []);

    return (
        <div className="Navigations">
            <div className="Navigations-container">
                {/* <Grid item xs={12}>
                        <Footer {...this.props} />
                    </Grid> */}
                <div className="Navigations-sidebar">
                    <div className="Navigations-sidebar--content">
                        <Sidebar />
                    </div>
                </div>
                <div className="Navigations-content">
                    <div className="Navigations-navbar">
                        <TabletSidebar />
                    </div>
                    <div className="content-container">{children}</div>
                </div>
            </div>
        </div>
    );
};
export default Navigations;

Navigations.propTypes = {
    children: node.isRequired
};
