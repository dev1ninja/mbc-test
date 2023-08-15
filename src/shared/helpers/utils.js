import countries from "shared/constants/country";
import { onboarding } from "authConfig";

export const onPressKeyHandler = (e) => {
    const validationKey =
        e?.code === 'Space' || e?.code === 'Enter' || e?.type === 'click';
    return validationKey;
}

export const onPressKeyEnter = (e) =>{
    const verificationEnterKey =
      (e.charCode || e.keyCode) === 13 && (e.code || e.key) === 'Enter';
    return verificationEnterKey;
}

export const findCountry = (countryCode, isLabel) => {
    const key = isLabel ? 'label' : 'code';
    if (countryCode) {
        const country = countries.find((country) => country[key] === countryCode);
        return country;
    }
    return null;
};

export const loginCheck = (user, isLogin, history, hasCompleted, veriff) => {
    if (isLogin) {
        if (user?.verification?.isFraudAccount) {
            history.push('/admin/not-verify');
            return null;
        }

        if (user.incardApproved) {
            history.push('/admin/onboard-finish');
            return null;
        }

        if (user?.consentChecked && user.isIdentityVerified) {
            history.push('/admin/verify-wait');
            return null;
        }

        const result = onboarding.some(step => {
            if (step.type === "number") {
                if (!user[step.propName]) {
                    history.push(step.substep);
                    sessionStorage.setItem("steps", step.step);
                    hasCompleted(step.step)
                    return true;
                }
                return false;
            }

            if (step.type === "main") {
                const checkUserFields = step.propName.every(key => Boolean(user[key]));
                if (checkUserFields) {
                    return false;
                }
                sessionStorage.setItem("steps", step.step);
                hasCompleted(step.step)
                history.push(step.substep);
                return true;
            }

            if (step.type === "boolean") {
                if (step.propName === 'isIdentityVerified' && !user.isIdentityVerified) {
                    veriff();
                    return false;
                }

                if (!user[step.propName]) {
                    sessionStorage.setItem("steps", step.step);
                    hasCompleted(step.step)
                    history.push({
                        pathname: step.substep,
                        state: {
                            veriff: true,
                        },
                    });
                    return true;
                }
                return false;
            }

            if (step.type === "object") {
                if (step.objName === "roleInfo") {
                    if (user?.shareholders && user?.shareholders?.length) {
                        sessionStorage.setItem("steps", step.step);
                        hasCompleted(step.step)
                        history.push('/admin/general-agreement')
                        return true;
                    }
                    const role = user[step.objName]?.role;
                    if (role && role === "Director") {
                        sessionStorage.setItem("steps", step.step);
                        hasCompleted(step.step)
                        history.push("/admin/shareholders");
                        return true;
                    }
                    sessionStorage.setItem("steps", step.step);
                    hasCompleted(step.step)
                    history.push(step.substep);
                    return true;
                }
                if (user[step.objName]) {
                    const checkObjectFields = step.propName.every(key => user[step.objName][key]);
                    if (checkObjectFields) {
                        return false;
                    }
                    sessionStorage.setItem("steps", step.step);
                    hasCompleted(step.step)
                    history.push(step.substep);
                    return true;
                }
                sessionStorage.setItem("steps", step.step);
                hasCompleted(step.step)
                history.push(step.substep);
                return true;
            }

            if (step.type === "array") {
                if (step.objName === "companyDocuments") {
                    const isDirector = user.roleInfo && user.roleInfo?.role === "Director";
                    if (isDirector) {
                        return false;
                    }

                    const isCompanyDocumentsExist = Array.isArray(user.companyDocuments) && user.companyDocuments.some(({ documentType }) => documentType === 'Company Document');
                    if (!isCompanyDocumentsExist && !user.isCompanyFetchedFromApi) {
                        history.push(step.substep);
                        hasCompleted(step.step);
                        return true;
                    }
                    return false;
                }

                if (!user[step.objName] || !user[step.objName].length) {
                    sessionStorage.setItem("steps", step.step);
                    hasCompleted(step.step)
                    history.push(step.substep);
                    return true;
                }
            }
            return false;
        });
        return result;
    }
    return null;
};
