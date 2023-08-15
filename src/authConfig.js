export const onboarding = [
    {
        propName: "isEmailVerified",
        step: 1,
        substep: "/auth/verify-email",
        type: "boolean"
    },
    {
        propName: "phoneNumber",
        step: 1,
        substep: "/admin/mobile-verification",
        type: "number"
    },
    {
        propName: 'isPhoneVerified',
        step: 1,
        substep: '/admin/mobile-verification',
        type: 'boolean'
    },
    {
        propName: ["firstName", "lastName", "gender", "nationality", "dob", "placeOfBirth"],
        type: "main",
        step: 2,
        substep: "/admin/personal-demographics"
    },
    {
        objName: "homeAddress",
        propName: ["address_1", "town", "postCode", "countryCode"],
        type: "object",
        step: 2,
        substep: "/admin/personal-demographics"
    },
    {
        propName: 'isIdentityVerified',
        type: 'boolean',
        step: 2,
    },
    {
        objName: "businessDemographics",
        propName: ["businessType"],
        type: "object",
        step: 3,
        substep: "/admin/businessType"
    },
    {
        objName: "businessDemographics",
        propName: [
            "countryOfIncorporation",
            "dateOfIncorporation",
            "legalName",
            "registrationNumber"
        ],
        type: "object",
        step: 3,
        substep: "/admin/business-data"
    },
    {
        objName: "registeredAddress",
        propName: ["address_1", "countryOfIncorporation", "postCode", "town"],
        type: "object",
        step: 3,
        substep: "/admin/business-address"
    },
    {
        objName: "businessAddress",
        propName: ["address_1", "countryOfIncorporation", "postCode", "town"],
        type: "object",
        step: 3,
        substep: "/admin/business-address"
    },
    {
        objName: "companyDocuments",
        type: "array",
        step: 3,
        substep: "/admin/upload-docs"
    },
    {
        objName: "businessDemographics",
        propName: ["currency", "maxSinglePayment", "natureOfBusiness"],
        type: "object",
        step: 3,
        substep: "/admin/businessCategory"
    },
    {
        objName: "roleInfo",
        propName: ["role"],
        type: "object",
        step: 3,
        substep: "/admin/role-in-company"
    },
    {
        objName: "companyDocuments",
        type: "array",
        step: 3,
        substep: "/admin/role-in-company"
    },
    {
        objName: "shareholders",
        type: "array",
        step: 3,
        substep: "/admin/shareholders"
    },
    {
        propName: "consentChecked",
        type: "boolean",
        step: 4,
        substep: "/admin/general-agreement"
    }
];
