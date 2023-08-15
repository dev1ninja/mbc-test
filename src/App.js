import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, HashRouter, Redirect, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "theme/theme";
import ResetPasswordForm from "auth/screens/ResetPasswordForm";
import { IntercomProvider } from "react-use-intercom";
import AuthState from "context/auth/authState";
import OnboardFinish from "dashboard/components/onboardFinish";
import CompletePageError from "shared/components/CompetePageError";
import Intercom from "shared/components/Intercom";
import CompletePageSuccess from "shared/components/CompletePageSuccess";
import PrivateRoute from "shared/components/PrivateRoute";
import CardTermsAgreement from "dashboard/components/generalServiceAgreement/CardTermsAgreement";
import PersonalDemographics from "./dashboard/components/personalDemographics/PersonalDemographics";
import MobileVerification from "./dashboard/components/mobileVerification/MobileVerification";
import PhoneVerify from "./auth/screens/PhoneVerify";
import BusinessCategory from "./dashboard/components/businessDemographics/businessCategory/BusinessCategory";
import Directors from "./dashboard/components/businessDemographics/directors/DirectorsContainer";
import AllSetPassword from "./auth/screens/forgotPassword/AllSetPassword";
import AxiosInterceptor from "./shared/helpers/interceptor/Interceptor";
import UploadDocs from "./dashboard/components/businessDemographics/upload-docs/UploadDocs";
import ForgotPasswordContainer from "./auth/screens/forgotPassword/ForgotPasswordContainer";
import PrivacyPolicy from "./dashboard/components/privacy-policy/PrivacyPolicy";
import GeneralService from "./dashboard/components/generalServiceAgreement";
import RoleInComapny from "./dashboard/components/businessDemographics/roleInCompany/RoleInCompany";
import SuccessWebPage from "./dashboard/components/identityVerification/success-web/SuccessWeb";
import IdentityVerfication from "./dashboard/components/identityVerification/IdentityVerification";
import BusinessAddress from "./dashboard/components/businessDemographics/businessAddress/BusinessAddress";
// import BusinessType from "./dashboard/components/businessDemographics/businessType/BusinessType";
import BusinessData from "./dashboard/components/businessDemographics/businessData/BusinessData";
import Shareholders from "./dashboard/components/businessDemographics/shareholders/Shareholders";
import Register from "./auth/screens/register/Register";
import SidebarState from "./context/sidebar/SidebarState";
import Login from "./auth/screens/login/Login";
import VerifyEmailAddress from "./auth/screens/register/VerifyEmailAddress";

import "./App.scss";

const App = () => {
    useEffect(() => {
        AxiosInterceptor();
    }, []);

    return (
        <Router>
            <HashRouter>
                <ThemeProvider theme={theme}>
                    <Route exact path="/policy" component={PrivacyPolicy} />
                    <Route exact path="/auth/forgot-password" component={ForgotPasswordContainer} />
                    <Route path="/auth/reset-password" component={PhoneVerify} />
                    <Route
                        exact
                        path="/auth/set-new-password"
                        render={props => <ResetPasswordForm {...props} />}
                    />
                    <Route exact path="/auth/all-set" component={AllSetPassword} />
                    <SidebarState>
                        <AuthState>
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/auth/register" />
                                </Route>
                                <Route path="/auth/register" component={Register} />
                                <Route exact path="/auth/login" component={Login} />

                                <PrivateRoute
                                    path="/auth/verify-email/"
                                    component={VerifyEmailAddress}
                                />
                                <PrivateRoute
                                    exact
                                    path="/admin/mobile-verification"
                                    component={MobileVerification}
                                />
                                <IntercomProvider appId={process.env.REACT_APP_INTERCOM_APP_ID}>
                                    <Intercom>
                                        <PrivateRoute
                                            exact
                                            path="/admin/onboard-finish"
                                            component={OnboardFinish}
                                        />
                                        <PrivateRoute
                                            exact
                                            path="/admin/verify-wait"
                                            component={CompletePageSuccess}
                                        />
                                        <PrivateRoute
                                            exact
                                            path="/admin/not-verify"
                                            component={CompletePageError}
                                        />
                                        <PrivateRoute
                                            exact
                                            path="/admin/personal-demographics"
                                            component={PersonalDemographics}
                                        />
                                        <PrivateRoute
                                            exact
                                            path="/admin/upload-docs"
                                            component={UploadDocs}
                                        />
                                        <PrivateRoute
                                            exact
                                            path="/admin/business-data"
                                            component={BusinessData}
                                        />
                                        {/* <PrivateRoute
                                            exact
                                            path="/admin/businessType"
                                            component={BusinessType}
                                        /> */}
                                        <PrivateRoute
                                            exact
                                            path="/admin/business-address"
                                            component={BusinessAddress}
                                        />
                                        <PrivateRoute
                                            exact
                                            path="/admin/identity-verification"
                                            component={IdentityVerfication}
                                        />
                                        <PrivateRoute
                                            exact
                                            path="/admin/identity-success"
                                            component={SuccessWebPage}
                                        />
                                        <PrivateRoute
                                            exact
                                            path="/admin/role-in-company"
                                            component={RoleInComapny}
                                        />
                                        <PrivateRoute
                                            exact
                                            path="/admin/general-agreement"
                                            component={GeneralService}
                                        />
                                        <PrivateRoute
                                            exact
                                            path="/admin/card-terms-agreement"
                                            component={CardTermsAgreement}
                                        />
                                        <PrivateRoute
                                            exact
                                            path="/admin/businessCategory"
                                            component={BusinessCategory}
                                        />
                                        <PrivateRoute
                                            path="/admin/directors"
                                            component={Directors}
                                        />
                                        <PrivateRoute
                                            path="/admin/shareholders"
                                            component={Shareholders}
                                        />
                                    </Intercom>
                                </IntercomProvider>
                            </Switch>
                        </AuthState>
                    </SidebarState>
                </ThemeProvider>
            </HashRouter>
        </Router>
    );
};
export default App;
