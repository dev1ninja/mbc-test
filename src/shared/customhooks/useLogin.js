import { initUser } from "shared/helpers/auth";
import { useEffect, useState } from "react";
import {
    createSession,
    createVeriffFrame,
    getDecision,
    MESSAGES
} from "dashboard/services/veriffService";
import { useHistory } from "react-router-dom";
import postPersonalDemographics from "dashboard/services/personalDemographicsService";

export const useLogin = () => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    const veriff = async () => {
        const user = getUser();
        let response;
        let status;
        let sessionId = user.verification?.id;
        let sessionUrl = user.verification?.url;
        if (user.verification?.id) {
            response = await getDecision(sessionId);
            status = response?.data?.verification?.status;
        }
        if (!status || status === "expired" || status === "abandoned") {
            response = await createSession();
            if (response.data.status !== "success") return;
            sessionId = response.data.verification.id;
            sessionUrl = response.data.verification.url;
            postPersonalDemographics("verification", {
                id: sessionId,
                url: sessionUrl
            });
        }
        const { placeOfBirth, homeAddress, nationality } = user;

        createVeriffFrame({
            url: sessionUrl,
            onEvent: async msg => {
                switch (msg) {
                    case MESSAGES.CANCELED:
                        postPersonalDemographics("verifyUser", { isIdentityVerified: false });
                        break;
                    case MESSAGES.STARTED:
                        break;
                    case MESSAGES.FINISHED:
                        response = await getDecision(sessionId);
                        if (response?.data?.verification?.code === 9102) {
                            const { person } = response.data.verification;
                            postPersonalDemographics("verification", {
                                firstName: person.firstName,
                                lastName: person.lastName,
                                dateOfBirth: person.dateOfBirth
                                    ? new Date(person.dateOfBirth)
                                    : null,
                                isFraudAccount: true
                            });
                            history.push("/admin/not-verify");
                            return;
                        }

                        if (response?.data?.verification?.status === "approved") {
                            const { person } = response.data.verification;
                            postPersonalDemographics("verifyUser", { isIdentityVerified: true });
                            postPersonalDemographics("verification", {
                                firstName: person.firstName,
                                lastName: person.lastName,
                                dateOfBirth: person.dateOfBirth
                                    ? new Date(person.dateOfBirth)
                                    : null
                            });
                            const arrayOfCountries = [
                                nationality.code,
                                placeOfBirth.code,
                                homeAddress.countryCode
                            ].filter(code => code);
                            postPersonalDemographics("complianceCheck", {
                                firstName: person.firstName,
                                lastName: person.lastName,
                                birthYear: person.yearOfBirth,
                                clientRef: sessionId,
                                arrayOfCountries
                            });
                        }
                        break;
                    default:
                        break;
                }
            }
        });
    };

    const getUser = async () => {
        if (user) {
            return;
        }
        try {
            setIsLoading(true);
            const user = await initUser();
            setUser(user);
        } catch (error) {
            setUser(null);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getUser();
        return () => {
            setIsLoading(true);
            sessionStorage.clear();
            setUser(null);
        };
    }, []);

    return { user, setUser, isLoading, veriff };
};
