// importing core modules, components, pages
import React, { lazy, Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import ReactRouterPropTypes from 'react-router-prop-types';

import Register from "auth/screens/register/Register";

const LoginPage = lazy(() => import("auth/screens/login/Login"));
const PersonalDemographics = lazy(() => import("../personalDemographics/PersonalDemographics"));
const MobileVerification = lazy(() => import("../mobileVerification/MobileVerification"));
const ResetPassword = lazy(() => import("auth/screens/forgotPassword/ResetPassword"));
const AllSetPassword = lazy(() => import("auth/screens/forgotPassword/AllSetPassword"));
const ForgotPassword = lazy(() => import("auth/screens/forgotPassword/ForgotPassword"));
const UploadDocs = lazy(() => import("../businessDemographics/upload-docs/UploadDocs"));
// const BusinessType = lazy(() => import("../businessDemographics/businessType/BusinessType"));
const BusinessDemographics = lazy(() => import("../businessDemographics/BusinessDemographics"));
const BusinessAddress = lazy(() =>
    import("../businessDemographics/businessAddress/BusinessAddress")
);
const BusinessCategory = lazy(() =>
    import("../businessDemographics/businessCategory/BusinessCategory")
);
const IdentityVerfication = lazy(() => import("../identityVerification/IdentityVerification"));
const SuccessWebPage = lazy(() => import("../identityVerification/success-web/SuccessWeb"));
const RoleInComapny = lazy(() => import("../businessDemographics/roleInCompany/RoleInCompany"));
const WhyIncard = lazy(() => import("../why-use-incard/whyIncard"));
const CustomerType = lazy(() => import("../types-of-customers/CustomerType"));
const ProductSpecification = lazy(() => import("../productChannel/ProductSpecification"));
const HistoricalSH = lazy(() => import("../stakeholdership/HistoricalSH"));
const Directors = lazy(() => import("../businessDemographics/directors/Directors"));
const Shareholders = lazy(() => import("../businessDemographics/shareholders/Shareholders"));
const CheckShareholder = lazy(() =>
    import("../businessDemographics/shareholders/CheckShareholder")
);
const GeneralService = lazy(() => import("../generalServiceAgreement/GeneralService"));
const ExpectedAmount = lazy(() => import("../expected-amount/ExpectedAmount"));
const CheckList = lazy(() => import("auth/checklist/CheckList"));

export default class BaseRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // const { history } = this.props;
        // const token = sessionStorage.getItem('token');
        // if (!token) {
        //     history.push('/');
        // }
        // console.log(history);
        let routes = null;
        routes = (
            <>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/auth/register" />
                    </Route>
                    <Route exact path="/auth/login" component={LoginPage} />
                    <Route exact path="/auth/register" component={Register} />
                    <Route exact path="/auth/forgot-password" component={ForgotPassword} />
                    <Route
                        exact
                        path="/auth/reset-password"
                        render={props => <ResetPassword {...props} />}
                    />
                    <Route exact path="/auth/all-set" component={AllSetPassword} />
                    <Route exact path="/admin/mobile-verification" component={MobileVerification} />
                    {/* <Route exact path="/admin/businessType" component={BusinessType} /> */}
                    <Route
                        exact
                        path="/admin/personal-demographics"
                        component={PersonalDemographics}
                    />
                    <Route exact path="/admin/upload-docs" component={UploadDocs} />
                    <Route
                        exact
                        path="/admin/business-demographics"
                        component={BusinessDemographics}
                    />
                    <Route exact path="/admin/business-address" component={BusinessAddress} />
                    <Route exact path="/admin/businessCategory" component={BusinessCategory} />
                    <Route
                        exact
                        path="/admin/identity-verification"
                        component={IdentityVerfication}
                    />
                    <Route exact path="/admin/identity-success" component={SuccessWebPage} />
                    <Route exact path="/admin/role-in-company" component={RoleInComapny} />
                    <Route path="/admin/types-of-customer" component={CustomerType} />
                    <Route path="/admin/why-incard" component={WhyIncard} />
                    <Route path="/admin/product-specification" component={ProductSpecification} />
                    <Route path="/admin/stakeholdership" component={HistoricalSH} />
                    <Route path="/admin/directors" component={Directors} />
                    <Route path="/admin/shareholders" component={Shareholders} />
                    <Route path="/admin/check-shareholder" component={CheckShareholder} />
                    <Route path="/admin/amount-specification" component={ExpectedAmount} />
                    <Route exact path="/admin/general-agreement" component={GeneralService} />
                    <Route exact path="/admin/check-list" component={CheckList} />
                </Switch>
            </>
        );
        return <>{routes}</>;
    }
}

BaseRoutes.propTypes = {
    // history: ReactRouterPropTypes.history.isRequired
};
