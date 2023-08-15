import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { initUser } from "shared/helpers/auth";
import Navigations from "dashboard/components/navigations/Navigations";
import InfoModal from "shared/components/InfoModal";
import ItemsList from "shared/components/ItemsList";
import { updateCompanyDocs, deleteDocument, uploadFile } from "dashboard/services/companyDocServices";
import BackButtonLayout from "shared/components/BackButtonLayout";
import CustomButton from "shared/components/CustomButton";
import DropZone from "shared/components/DropZone";

import { useStyles } from "./styles";

const INFO_MODAL_ITEMS = [
    { id: 1, label: "A less than 3 months utility bill." },
    { id: 2, label: "Building society or credit union statement." },
    { id: 3, label: "Most recent mortgage statement with your name and address on it." }
];

const UploadDocs = () => {
    const styles = useStyles();
    const history = useHistory();
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [isModalShown, setIsModalShown] = useState(false);
    const [isWorkingOnFiles, setIsWorkingOnFiles] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const initializeUploadedFiles = () => {
        const docs = user?.companyDocuments || [];
        const filteredDocs = docs.filter((doc) => {
            return doc.documentType === 'Company Document'
        })
        const newArray = filteredDocs.map(doc => ({ name: doc.name, url: doc.link, valid: true }));
        setUploadedFiles(newArray)
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
    }, [user])


    useEffect(() => {
        getUser();
    }, []);

    const handleFiles = async (file) => {
        setIsWorkingOnFiles(true);
        const response = await Promise.all(file.map(uploadFile));
        const files = response.map((response, index) => {
            if (!response.status) {
                return null;
            }
            return {
                name: file[index].name,
                url: response.data.obj.url,
                valid: true,
            };
        }).filter(Boolean);
        const formattedFiles = files.map(doc => ({ link: doc.url, name: doc.name, valid: true }));
        await updateCompanyDocs(false, formattedFiles);
        await getUser()
        setError("");
        setIsWorkingOnFiles(false);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!uploadedFiles.length) {
            setError("Please upload company documents to continue");
            return;
        }
        const files = uploadedFiles.map(doc => ({ link: doc.url || doc.link, name: doc.name }));
        const res = await updateCompanyDocs(false, files);
        if (res.status === 200) {
            history.push("/admin/businessCategory");
        }
    };

    const handleFileDelete = async (url) => {
        setIsWorkingOnFiles(true);
        await deleteDocument(url, true);
        const newFiles = uploadedFiles.filter(({ url: innerUrl }) => innerUrl !== url)
        setUploadedFiles(newFiles);
        // TODO filter by URL
        setIsWorkingOnFiles(false);
    };

    const toggleModal = () => {
        setIsModalShown(prev => !prev);
    };

    const listItems = [
        { id: 1, label: "You company’s certificate of incorporation" },
        { id: 2, label: "Your proof of address", hasInfo: true, onInfoIconClick: toggleModal }
    ];

    const goBack = () => {
        history.goBack();
    };

    return (
        <Navigations>
            <Box className={styles.container}>
                <form className={styles.formWrapper} onSubmit={handleSubmit}>
                    <BackButtonLayout
                        onClick={goBack}
                        titleText="Upload company documents for your application."
                    />
                    <ItemsList
                        className={styles.rulesWrapper}
                        title="Please upload your power of attorney:"
                        items={listItems}
                    />
                    <DropZone
                        disabled={isWorkingOnFiles}
                        onChange={handleFiles}
                        value={uploadedFiles}
                        onDeletFile={handleFileDelete}
                    />
                    {error && <Typography className={styles.error}>{error}</Typography>}
                    <CustomButton
                        type="submit"
                        className={styles.button}
                        isLoading={isWorkingOnFiles}
                        variant="contained"
                    >
                        Continue
                    </CustomButton>
                </form>
            </Box>
            <InfoModal isShown={isModalShown} onClose={toggleModal}>
                <ItemsList
                    className={styles.modalWrapper}
                    title="Proof of address can be one of the following documents:"
                    items={INFO_MODAL_ITEMS}
                />
            </InfoModal>
        </Navigations>
    );
};

export default UploadDocs;
