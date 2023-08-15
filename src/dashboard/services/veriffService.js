import moment from "moment";
import {externalNetwork} from 'shared/services/network';
import crypto from "crypto";

import {createVeriffFrame as originalCreateVeriffFrame, MESSAGES} from "@veriff/incontext-sdk";
import config from "config/general";


export {MESSAGES};

const {isDevelopmentEnvironment} = config;

// Put the API key of the integration
const API_PUBLIC_KEY = process.env.REACT_APP_VERIFF_PUBLIC_KEY;
const API_PRIVATE_KEY = process.env.REACT_APP_VERIFF_PRIVATE_KEY;

function sign(apiPrivateKey, data) {
    let payload = data;
    if (payload.constructor === Object) {
        payload = JSON.stringify(payload);
    }

    if (payload.constructor !== Buffer) {
        payload = Buffer.from(payload, "utf8");
    }

    return crypto
        .createHmac("sha256", apiPrivateKey)
        .update(Buffer.from(payload, "utf8"))
        .digest("hex")
        .toLowerCase();
}

export const createSession = () => {
    return externalNetwork.post(
        "https://stationapi.veriff.com/v1/sessions/",
        {
            verification: {
                callback: "https://www.incard.co/",
                timestamp: moment().format(),
            },
        },
        {
            headers: {
                "Content-Type": "application/json",
                "X-AUTH-CLIENT": API_PUBLIC_KEY,
            },
        },
    );
};

const getVeriffDecision = async sessionId => {
    return externalNetwork.get(`https://stationapi.veriff.com/v1/sessions/${sessionId}/decision`, {
        headers: {
            "Content-Type": "application/json",
            "X-HMAC-SIGNATURE": sign(API_PRIVATE_KEY, sessionId),
            "X-AUTH-CLIENT": API_PUBLIC_KEY,
        },
    });
};

const decisionMock = {
    data: {
        verification: {
            status: "approved",
            person: {
                firstName: "Carl",
                lastName: "Marx",
                dateOfBirth: "1999-12-20"
            },
        },
    },
};

const skipVeriffParam = "veriff=incard123";

const isSkipVeriff = () => {
    if (isDevelopmentEnvironment) {
        return true;
    }

    let search = false;
    try {
        search = window.location.hash.includes(skipVeriffParam);
    } catch (error) {
        return search;
    }
    return search;
};

export const createVeriffFrame = ({url, lang, onEvent}) => {
    const onEventMock = (msg) => {
        const skipVeriff = isSkipVeriff();
        const message = skipVeriff ? MESSAGES.FINISHED : msg;
        return onEvent(message);
    };
    return originalCreateVeriffFrame({url, lang, onEvent: onEventMock});
};

export const getDecision = async sessionId => {
    const skipVeriff = isSkipVeriff();
    if (skipVeriff) {
        return decisionMock;
    }

    return getVeriffDecision(sessionId);
};
