import React, { Component } from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as _ from "underscore";
import {
    Button,
    Typography,
    TextField,
    InputAdornment,
    FormControlLabel,
    AccordionDetails,
    AccordionSummary,
    Accordion
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Navigations from "dashboard/components/navigations/Navigations";
import CompanyMemberDilalog from "./addCompanyMemberDialog/CompanyMemberDialog";
import SearchableDropdown from "../../../shared/components/SearchableDropdown";
import store from "../../../shared/redux/Store";
import { deleteMember } from "../../../shared/redux/addMember/Action";
import errors from "../../../shared/helpers/validations/Validation";
import { EMAIL, PHONENUMBER } from "../../../shared/helpers/validations/PatternConstants";
import "./AddCompanyMemebers.scss";
import addCompanyMembers from "../../services/memberService";
import CountryCode from "../../../shared/components/CountryCode";
import { success, warning } from "../../../shared/helpers/alerts/Toast";
import { MEMBERADDED } from "../../../shared/constants/ToasMessages";

// const moblieNumberlength = 10;
const roleInCompanyData = [
    {
        id: 1,
        name: "Director"
    },
    {
        id: 2,
        name: "Beneficial owner"
    },
    {
        id: 3,
        name: "Partner"
    }
];
class AddCompanyMemebers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,
            disabled: false,
            members: [],
            mobileError: false,
            emailError: false,
            isValid: true,
            expanded: false
        };
    }

    activeTab = panel => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? panel : false });
    };

    addMemberDialog = () => {
        const getMembers = store.getState();
        this.setState({ isOpenDialog: true, members: getMembers.members.members });
    };

    closeDialog = e => {
        this.setState({ isOpenDialog: e });
    };

    handleChange = (field, value, member) => {
        const { members } = this.state;
        const memberObj = _.findWhere(members, { email: member.email });
        if (field === "percOfVotingRightsOrShares") {
            if (value <= 100 && value >= 0) {
                memberObj[field] = value;
            }
        } else {
            memberObj[field] = value;
            if (field === "email") {
                this.checkMendateComplete(value);
            }
            if (field === "phoneNumber" || field === "countryCode") {
                this.checkPhoneComplete(memberObj.phoneNumber, memberObj.countryCode);
            }
            if (field === "roleInCompany") {
                memberObj.role = value ? value.name : null;
                if (member.role) {
                    this.setState({ disabled: false });
                } else {
                    this.setState({ disabled: true });
                }
            }
        }
        this.setState({ members });
    };

    // Checking if the mendate field is filled or not
    checkMendateComplete = email => {
        const matched = EMAIL.test(email); // Cheking if mail format is matching or not
        this.setState({
            isValid: matched,
            emailError: !matched
        });
    };

    checkPhoneComplete = (phone, countryCode) => {
        const matched = PHONENUMBER.test(phone);
        if (countryCode) {
            this.setState({
                // isValid: matched,
                mobileError: !matched
            });
        } else {
            this.setState({
                // isValid: matched,
                mobileError: matched
            });
        }
    };

    removeMemeber = member => {
        const { removeMember } = this.props;
        removeMember(member);
        const getMembers = store.getState();
        this.setState({ members: getMembers.members.members });
    };

    capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    showPhoneValidStatus = (field, message) => {
        const { mobileError } = this.state;
        return !mobileError ? <DoneIcon color="primary" /> : errors(message);
    };

    navigate = async () => {
        const { members } = this.state;
        const { history } = this.props;
        members.map(member => {
            const aliasName = member;
            aliasName.aliasesNames = aliasName.aliasesNames ? [aliasName.aliasesNames] : [];
            aliasName.countryCode = `+${aliasName.countryCode.phone}`;
            return members;
        });
        const resp = await addCompanyMembers("add/other_company_members", {
            otherCompanyMembers: members
        });
        if (resp.status) {
            success(MEMBERADDED);
            history.push("/admin/why-incard");
        } else {
            warning(resp);
        }
    };

    render() {
        const {
            isOpenDialog,
            members,
            mobileError,
            emailError,
            isValid,
            expanded,
            disabled
        } = this.state;
        return (
            <Navigations>
                <form className="form-wrapper">
                    <Typography variant="h3" gutterBottom>
                        Additional company members.
                    </Typography>
                    <div className="accordion">
                        <Accordion>
                            <div
                                role="button"
                                tabIndex={0}
                                className="add-accordion"
                                onClick={this.addMemberDialog}
                                onKeyDown={ev => {
                                    ev.preventDefault();
                                }}
                            >
                                <FormControlLabel
                                    aria-label="collapsed"
                                    control={<AddIcon className="remove-icon" />}
                                    label="Add additional shareholders"
                                />
                            </div>
                        </Accordion>
                        {members.length > 0
                            ? members.map((member, i) => {
                                  const memberRole = _.findWhere(roleInCompanyData, {
                                      name: member.role
                                  });
                                  return (
                                      <Accordion
                                          key={member + [i]}
                                          expanded={expanded === `id${i}`}
                                          onChange={this.activeTab(`id${i}`)}
                                      >
                                          <AccordionSummary
                                              expandIcon={<ExpandMoreIcon />}
                                              aria-label="Expand"
                                              aria-controls="additional-actions1-content"
                                              id="additional-actions1-header"
                                          >
                                              <FormControlLabel
                                                  aria-label="Acknowledge"
                                                  onClick={event => event.stopPropagation()}
                                                  onFocus={event => event.stopPropagation()}
                                                  control={
                                                      <RemoveIcon
                                                          onClick={() => this.removeMemeber(member)}
                                                          className="remove-icon"
                                                      />
                                                  }
                                                  label={`${this.capitalizeFirstLetter(
                                                      member.firstName
                                                  )} ${this.capitalizeFirstLetter(
                                                      member.lastName
                                                  )}`}
                                              />
                                          </AccordionSummary>
                                          <AccordionDetails>
                                              <form className="form-wrapper">
                                                  <div className="twoColumnInput">
                                                      <TextField
                                                          autoComplete="off"
                                                          className="form-field-input"
                                                          placeholder="Legal first name*"
                                                          variant="outlined"
                                                          value={this.capitalizeFirstLetter(
                                                              member.firstName
                                                          )}
                                                          name="firstName"
                                                          onChange={e =>
                                                              this.handleChange(
                                                                  "firstName",
                                                                  e.target.value,
                                                                  member
                                                              )
                                                          }
                                                      />
                                                      <TextField
                                                          autoComplete="off"
                                                          className="form-field-input"
                                                          placeholder="Legal last name*"
                                                          variant="outlined"
                                                          value={this.capitalizeFirstLetter(
                                                              member.lastName
                                                          )}
                                                          name="lastName"
                                                          onChange={e =>
                                                              this.handleChange(
                                                                  "lastName",
                                                                  e.target.value,
                                                                  member
                                                              )
                                                          }
                                                      />
                                                  </div>
                                                  <TextField
                                                      autoComplete="off"
                                                      className="form-field-input"
                                                      placeholder="Alias name"
                                                      variant="outlined"
                                                      value={member.aliasesNames}
                                                      name="aliasesNames"
                                                      onChange={e =>
                                                          this.handleChange(
                                                              "aliasesNames",
                                                              e.target.value,
                                                              member
                                                          )
                                                      }
                                                  />
                                                  <TextField
                                                      className={`form-field-input ${
                                                          emailError ? "error" : "correct"
                                                      }`}
                                                      required
                                                      variant="outlined"
                                                      placeholder="Email*"
                                                      name="email"
                                                      value={member.email}
                                                      onChange={e =>
                                                          this.handleChange(
                                                              "email",
                                                              e.target.value,
                                                              member
                                                          )
                                                      }
                                                      InputProps={{
                                                          endAdornment: member.email !== "" && (
                                                              <InputAdornment position="end">
                                                                  {isValid ? (
                                                                      <DoneIcon color="primary" />
                                                                  ) : (
                                                                      errors(
                                                                          "Please enter a valid email address!"
                                                                      )
                                                                  )}
                                                              </InputAdornment>
                                                          )
                                                      }}
                                                  />
                                                  <div className="twoColumnInput">
                                                      <CountryCode
                                                          title="+44*"
                                                          value={member.countryCode}
                                                          onChangeCountry={(e, value) =>
                                                              this.handleChange(
                                                                  "countryCode",
                                                                  value,
                                                                  member
                                                              )
                                                          }
                                                      />
                                                      <TextField
                                                          className={`form-field-input phoneNumber ${
                                                              mobileError ? "error" : ""
                                                          }`}
                                                          placeholder="Phone number*"
                                                          variant="outlined"
                                                          value={member.phoneNumber}
                                                          type="number"
                                                          name="phoneNumber"
                                                          onChange={e =>
                                                              this.handleChange(
                                                                  "phoneNumber",
                                                                  e.target.value,
                                                                  member
                                                              )
                                                          }
                                                          InputProps={{
                                                              endAdornment: (
                                                                  <InputAdornment position="end">
                                                                      {member.phoneNumber.length >
                                                                          0 &&
                                                                          this.showPhoneValidStatus(
                                                                              "phoneNumber",
                                                                              "Please enter a valid phone number"
                                                                          )}
                                                                  </InputAdornment>
                                                              )
                                                          }}
                                                      />
                                                  </div>
                                                  <SearchableDropdown
                                                      title="Role in the company*"
                                                      value={memberRole}
                                                      onChangeDropdown={(e, value) =>
                                                          this.handleChange(
                                                              "roleInCompany",
                                                              value,
                                                              member
                                                          )
                                                      }
                                                      options={roleInCompanyData}
                                                  />
                                                  <div className="shareHolderBind">
                                                      <Typography variant="subtitle2">
                                                          Please enter your percentage of voting
                                                          rights or shares*
                                                      </Typography>
                                                      <div className="shareHolderWrapper">
                                                          <TextField
                                                              className="form-field-input"
                                                              variant="outlined"
                                                              value={
                                                                  member.percOfVotingRightsOrShares
                                                              }
                                                              type="number"
                                                              name="percOfVotingRightsOrShares"
                                                              onChange={e =>
                                                                  this.handleChange(
                                                                      "percOfVotingRightsOrShares",
                                                                      e.target.value,
                                                                      member
                                                                  )
                                                              }
                                                              InputProps={{
                                                                  endAdornment: (
                                                                      <InputAdornment position="end">
                                                                          %
                                                                      </InputAdornment>
                                                                  )
                                                              }}
                                                          />
                                                      </div>
                                                  </div>
                                              </form>
                                          </AccordionDetails>
                                      </Accordion>
                                  );
                              })
                            : null}
                    </div>
                    <div className="button-submit">
                        <Button
                            className="form-button"
                            variant="contained"
                            color="default"
                            disabled={members.length === 0 || !isValid || mobileError || disabled}
                            onClick={this.navigate}
                        >
                            Continue
                        </Button>
                    </div>
                    {isOpenDialog && (
                        <CompanyMemberDilalog
                            showDialog={isOpenDialog}
                            closeMemberDialog={eve => this.closeDialog(eve)}
                        />
                    )}
                </form>
            </Navigations>
        );
    }
}
const mapDispatchToProps = action => {
    return {
        removeMember: res => action(deleteMember(res))
    };
};
export default connect(null, mapDispatchToProps)(AddCompanyMemebers);
AddCompanyMemebers.propTypes = {
    removeMember: PropTypes.func,
    history: ReactRouterPropTypes.history.isRequired
};
AddCompanyMemebers.defaultProps = {
    removeMember: null
};
