import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextField, InputAdornment, Button } from "@material-ui/core";
import ReactRouterPropTypes from "react-router-prop-types";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DoneIcon from "@material-ui/icons/Done";
import { errorMenuItems } from "shared/redux/checkList/Action";
import store from "shared/redux/Store";
import { getUser } from "shared/services/CommonService";
import "./CheckList.scss";

class CheckList extends Component {
    unsubscribe = store.subscribe(() => {});

    constructor(props) {
        super(props);
        this.state = {
            element1: "",
            element2: "",
            element3: "",
            activeTab: ""
        };
    }

    componentDidMount() {
        const userObj = getUser();
        // window.history.pushState(null, null, window.location.href);
        // window.onpopstate = () => {
        //     window.history.go(1);
        // };
        this.checkVerified(userObj);
        this.dispatchTOReducer(userObj);
        this.unsubscribe();
        this.setActiveTab();
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            activeTab: nextProps.activeIndex
        };
    }

    setActiveTab = () => {
        const storeState = store.getState().menu.activeMenu;
        this.setState({
            activeTab: storeState
        });
    };

    navigateToSection = path => {
        const { history } = this.props;
        history.push(path);
    };

    dispatchTOReducer = userObj => {
        const { errorMenuItem } = this.props;
        const {
            isPhoneVerified,
            isAddressProofAdded,
            isEmailVerified,
            isFaceVerified,
            consentChecked
        } = userObj;
        if (!isPhoneVerified || !isEmailVerified || !isFaceVerified) {
            errorMenuItem(1);
        }
        if (!isAddressProofAdded) {
            errorMenuItem(2);
        }
        if (!consentChecked) {
            errorMenuItem(4);
        }
    };

    checkVerified = userObj => {
        const {
            isPhoneVerified,
            isAddressProofAdded,
            isBusinessAddressProofAdded,
            businessDemographics,
            directors,
            shareholders,
            businessAddress,
            isCompanyDocumentsAdded,
            isEmailVerified,
            isFaceVerified,
            roleInfo,
            consentChecked
        } = userObj;
        const { errorMenuItem } = this.props;
        if (!isPhoneVerified || !isEmailVerified || !isFaceVerified) {
            this.setState({
                element1: (
                    <div>
                        {!isPhoneVerified ? (
                            <>
                                <div className="go-to">
                                    <TextField
                                        className="form-field-input correct checklist"
                                        placeholder="Phone number verification"
                                        variant="outlined"
                                        value="Phone number verification"
                                        name="Phone number verification missing"
                                        helperText="Pending phone number verification."
                                        disabled
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <ErrorOutlineIcon className="error-icon" />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="default"
                                        onClick={() =>
                                            this.navigateToSection("/admin/mobile-verification")
                                        }
                                    >
                                        Edit &nbsp; <EditOutlinedIcon />
                                    </Button>
                                </div>
                            </>
                        ) : null}
                        {!isEmailVerified ? (
                            <>
                                <TextField
                                    className="form-field-input correct checklist"
                                    placeholder="Physical address"
                                    variant="outlined"
                                    value="Email verification"
                                    name="Email verification"
                                    helperText="Pending email verification."
                                    disabled
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <ErrorOutlineIcon className="error-icon" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </>
                        ) : null}
                        {!isFaceVerified ? (
                            <>
                                <div className="go-to">
                                    <TextField
                                        className="form-field-input correct checklist"
                                        placeholder="Identity verification"
                                        variant="outlined"
                                        value="Identity verification"
                                        name="Identity verification"
                                        helperText="Pending Identity verification."
                                        disabled
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <ErrorOutlineIcon className="error-icon" />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="default"
                                        onClick={() =>
                                            this.navigateToSection("/admin/identity-verification")
                                        }
                                    >
                                        Edit &nbsp; <EditOutlinedIcon />
                                    </Button>
                                </div>
                            </>
                        ) : null}
                    </div>
                )
            });
        }
        if (!isAddressProofAdded) {
            this.setState({
                element2: (
                    <div className="go-to">
                        <TextField
                            className="form-field-input correct checklist"
                            placeholder="Physical address missing"
                            variant="outlined"
                            value="Physical address missing"
                            name="physical address missing"
                            helperText="Pending address verification."
                            disabled
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ErrorOutlineIcon className="error-icon" />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant="contained"
                            color="default"
                            onClick={() => this.navigateToSection("/admin/personal-demographics")}
                        >
                            Edit &nbsp; <EditOutlinedIcon />
                        </Button>
                    </div>
                )
            });
        }
        const businessType = businessDemographics?.businessType;
        const businessName = businessDemographics?.legalName;
        const businessCategory = businessDemographics?.natureOfBusiness;
        const isDirectors = directors?.length !== 0;
        const isShareholders = shareholders && shareholders.length > 0;
        const isBusinessDataProvided = businessDemographics?.id !== null;
        const isCompanySafe = isBusinessDataProvided || businessAddress?.countryCode === "GB";
        // if KYB is not completed then mark the 3rd item in the sidebar as uncompleted.
        const isKYBCompleted =
            (businessType &&
                businessName &&
                businessCategory &&
                isDirectors &&
                isShareholders &&
                isBusinessAddressProofAdded &&
                roleInfo &&
                (isCompanySafe || isCompanyDocumentsAdded)) ||
            true; // I will remove that true after finishing dev
        if (isKYBCompleted) {
            errorMenuItem(3);
        }
        this.setState({
            element3: (
                <>
                    <div className="go-to">
                        <TextField
                            className="form-field-input correct checklist"
                            variant="outlined"
                            value="Business type"
                            name="Business type missing"
                            helperText={!businessType && "Business type missing"}
                            disabled
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {businessType ? (
                                            <DoneIcon color="primary" />
                                        ) : (
                                            <ErrorOutlineIcon className="error-icon" />
                                        )}
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant="contained"
                            color="default"
                            onClick={() => this.navigateToSection("/admin/businessType")}
                        >
                            Edit &nbsp; <EditOutlinedIcon />
                        </Button>
                    </div>
                    <div className="go-to">
                        <TextField
                            className="form-field-input correct checklist"
                            placeholder="Physical address missing"
                            variant="outlined"
                            value="Company information"
                            name="Business address missing"
                            helperText={!businessName && "Business Name & RegNumber missing"}
                            disabled
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {businessName ? (
                                            <DoneIcon color="primary" />
                                        ) : (
                                            <ErrorOutlineIcon className="error-icon" />
                                        )}
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant="contained"
                            color="default"
                            onClick={() => this.navigateToSection("/admin/business-demographics")}
                        >
                            Edit &nbsp; <EditOutlinedIcon />
                        </Button>
                    </div>
                    <div className="go-to">
                        <TextField
                            disabled
                            className="form-field-input correct checklist"
                            placeholder="Physical address missing"
                            variant="outlined"
                            value="Business address"
                            name="Business address missing"
                            helperText={
                                !isBusinessAddressProofAdded &&
                                "Pending Business address verification."
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {isBusinessAddressProofAdded ? (
                                            <DoneIcon color="primary" />
                                        ) : (
                                            <ErrorOutlineIcon className="error-icon" />
                                        )}
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant="contained"
                            color="default"
                            onClick={() => this.navigateToSection("/admin/business-address")}
                        >
                            Edit &nbsp; <EditOutlinedIcon />
                        </Button>
                    </div>
                    {!isCompanySafe && (
                        <div className="go-to">
                            <TextField
                                className="form-field-input correct checklist"
                                placeholder="Certificate of incorporation"
                                variant="outlined"
                                value="Certificate of incorporation"
                                name="Certificate of incorporation"
                                helperText={
                                    !isCompanyDocumentsAdded &&
                                    "Pending Certificate of incorporation."
                                }
                                disabled
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isCompanyDocumentsAdded ? (
                                                <DoneIcon color="primary" />
                                            ) : (
                                                <ErrorOutlineIcon className="error-icon" />
                                            )}
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button
                                variant="contained"
                                color="default"
                                onClick={() => this.navigateToSection("/admin/upload-docs")}
                            >
                                Edit &nbsp; <EditOutlinedIcon />
                            </Button>
                        </div>
                    )}
                    <div className="go-to">
                        <TextField
                            className="form-field-input correct checklist"
                            placeholder="Business category missing"
                            variant="outlined"
                            value="Business category"
                            name="Business category missing"
                            helperText={!businessCategory && "Business category missing"}
                            disabled
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {businessCategory ? (
                                            <DoneIcon color="primary" />
                                        ) : (
                                            <ErrorOutlineIcon className="error-icon" />
                                        )}
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant="contained"
                            color="default"
                            onClick={() => this.navigateToSection("/admin/businessCategory")}
                        >
                            Edit &nbsp; <EditOutlinedIcon />
                        </Button>
                    </div>
                    <div className="go-to">
                        <TextField
                            className="form-field-input correct checklist"
                            variant="outlined"
                            value="Role in the company"
                            name="Business category missing"
                            helperText={!roleInfo && "Role is missing"}
                            disabled
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {roleInfo ? (
                                            <DoneIcon color="primary" />
                                        ) : (
                                            <ErrorOutlineIcon className="error-icon" />
                                        )}
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant="contained"
                            color="default"
                            onClick={() => this.navigateToSection("/admin/role-in-company")}
                        >
                            Edit &nbsp; <EditOutlinedIcon />
                        </Button>
                    </div>

                    <div className="go-to">
                        <TextField
                            className="form-field-input correct checklist"
                            variant="outlined"
                            value="Directors"
                            name="Directors"
                            helperText={!isDirectors && "Directors missing"}
                            disabled
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {isDirectors ? (
                                            <DoneIcon color="primary" />
                                        ) : (
                                            <ErrorOutlineIcon className="error-icon" />
                                        )}
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant="contained"
                            color="default"
                            onClick={() => this.navigateToSection("/admin/directors")}
                        >
                            Edit &nbsp; <EditOutlinedIcon />
                        </Button>
                    </div>

                    <div className="go-to">
                        <TextField
                            className="form-field-input correct checklist"
                            variant="outlined"
                            value="Shareholders"
                            name="Shareholders"
                            helperText={!isShareholders && "Shareholders missing"}
                            disabled
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {isShareholders ? (
                                            <DoneIcon color="primary" />
                                        ) : (
                                            <ErrorOutlineIcon className="error-icon" />
                                        )}
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant="contained"
                            color="default"
                            onClick={() => this.navigateToSection("/admin/shareholders")}
                        >
                            Edit &nbsp; <EditOutlinedIcon />
                        </Button>
                    </div>
                </>
            )
        });
        this.setState({
            element4: (
                <>
                    <div className="go-to">
                        <TextField
                            className="form-field-input correct checklist"
                            variant="outlined"
                            value="Service Agreement"
                            name="Agreement missing"
                            helperText={!consentChecked && "Service Agreement missing"}
                            disabled
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {consentChecked ? (
                                            <DoneIcon color="primary" />
                                        ) : (
                                            <ErrorOutlineIcon className="error-icon" />
                                        )}
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant="contained"
                            color="default"
                            onClick={() => this.navigateToSection("/admin/general-agreement")}
                        >
                            Edit &nbsp; <EditOutlinedIcon />
                        </Button>
                    </div>
                </>
            )
        });
        if (
            isPhoneVerified &&
            isAddressProofAdded &&
            isBusinessAddressProofAdded &&
            isCompanyDocumentsAdded &&
            isEmailVerified &&
            isFaceVerified
        ) {
            sessionStorage.clear();
            localStorage.clear();
            this.navigateToSection("/final");
        }
    };

    render() {
        const { activeTab, element1, element2, element3, element4 } = this.state;
        return (
            <form className="form-wrapper">
                {activeTab && activeTab === 1 ? element1 : null}
                {activeTab && activeTab === 2 ? element2 : null}
                {activeTab && activeTab === 3 ? element3 : null}
                {activeTab && activeTab === 4 ? element4 : null}
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeIndex: state.menu.activeMenu
    };
};

const mapDispatchToProps = action => {
    return {
        errorMenuItem: res => action(errorMenuItems(res))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);

CheckList.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    errorMenuItem: PropTypes.func,
    activeIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
CheckList.defaultProps = {
    errorMenuItem: null,
    activeIndex: null
};
