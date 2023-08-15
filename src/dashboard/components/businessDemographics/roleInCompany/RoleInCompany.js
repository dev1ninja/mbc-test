import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Navigations from "dashboard/components/navigations/Navigations";
import * as _ from "underscore";

import { deleteDocument, uploadFile } from "dashboard/services/companyDocServices";
import { postBusinessApi } from "dashboard/services/businessDemographicsService";
import BackButtonLayout from "shared/components/BackButtonLayout";
import { initUser } from "shared/helpers/auth";
import CustomButton from "shared/components/CustomButton";
import CustomChecbox from "shared/components/CustomCheckbox";
import DropZone from "shared/components/DropZone";
import Radio from "shared/components/Radio";
import ItemsList from "shared/components/ItemsList";

import { useStyles } from "./styles";

const roleInCompanyData = [
    {
        id: 1,
        name: "Director"
    },
    {
        id: 2,
        name: "Non-director"
    }
];

const RoleInCompany = () => {
    const history = useHistory();
    const styles = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isChecked, setCheckbox] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const rulesItems = [{ id: 1, label: "Your power of attorney" }];

    const initializeUploadedFiles = () => {
        const docs = user?.companyDocuments || [];
        const filteredDocs = docs.filter(doc => {
            return doc.documentType !== "Company Document";
        });
        const newArray = filteredDocs.map(doc => ({ name: doc.name, url: doc.link, valid: true }));
        setUploadedFiles(newArray);
        return newArray;
    };

    const getUser = async () => {
        const user = await initUser();
        setUser(user);
    };

    useEffect(() => {
        if (user) {
            initializeUploadedFiles();
        }
        if (user?.roleInfo) {
            setRole(_.findWhere(roleInCompanyData, { name: user.roleInfo.role }));
        }
    }, [user]);

    useEffect(() => {
        getUser();
    }, []);

    const handleFiles = async file => {
        setIsLoading(true);
        const response = await Promise.all(Array.from(file).map(uploadFile));
        const files = response
            .map((response, index) => {
                if (!response.status) {
                    return null;
                }
                return {
                    name: file[index].name,
                    url: response.data.obj.url,
                    valid: true
                };
            })
            .filter(Boolean);
        const formattedFiles = files.map(doc => ({ link: doc.url, name: doc.name, valid: true }));
        const docs = role.id === 1 ? [] : formattedFiles;
        await postBusinessApi("updateRoleInCompany", {
            companyDocuments: docs,
            role: role.name
        });
        await getUser();
        setIsLoading(false);
    };

    const submit = async e => {
        e.preventDefault();
        if (isChecked) {
            history.push("/admin/not-verify");
            await postBusinessApi("updateRoleInCompany", {
                companyDocuments: [],
                role: role.name
            });
            return;
        }
        await postBusinessApi("updateRoleInCompany", {
            companyDocuments: [],
            role: role.name
        });
        history.push("/admin/directors");
    };

    const handleFileDelete = async url => {
        setIsLoading(true);
        await deleteDocument(url, true);
        const newFiles = uploadedFiles.filter(({ url: innerUrl }) => innerUrl !== url);
        setUploadedFiles(newFiles);
        // TODO filter by URL
        setIsLoading(false);
    };

    const goBack = () => {
        history.goBack();
    };

    const isShouldRenderDropzone = role?.id === 2;

    return (
        <Navigations>
            <div className={styles.container}>
                <form className={styles.formWrapper}>
                    <BackButtonLayout titleText="Your role in the company" onClick={goBack} />
                    <Box className={styles.listContainer}>
                        {roleInCompanyData.map(item => {
                            return (
                                <Radio
                                    key={item.id}
                                    label={item.name}
                                    className={styles.radio}
                                    checked={role === item}
                                    onChange={(e) => setRole(item, e)}
                                />
                            );
                        })}
                    </Box>
                    {isShouldRenderDropzone && (
                        <>
                            <ItemsList
                                className={styles.rulesWrapper}
                                title="Please upload your power of attorney:"
                                items={rulesItems}
                            />
                            <DropZone
                                disabled={isChecked || isLoading}
                                onChange={handleFiles}
                                onDeletFile={handleFileDelete}
                                value={uploadedFiles}
                            />
                        </>
                    )}
                    <CustomButton
                        variant="contained"
                        className={styles.continueBtn}
                        disabled={
                            !role ||
                            (!uploadedFiles.length && !isChecked && role.name !== "Director")
                        }
                        isLoading={isLoading}
                        onClick={submit}
                    >
                        Continue
                    </CustomButton>
                    {isShouldRenderDropzone && (
                        <CustomChecbox
                            label="I am unable to provide this document"
                            labelPosition="right"
                            checked={isChecked}
                            onChange={({ target: { checked } }) => setCheckbox(checked)}
                        />
                    )}
                </form>
            </div>
        </Navigations>
    );
};

export default RoleInCompany;
