import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import Navigations from "dashboard/components/navigations/Navigations";
import { deleteDirector } from "dashboard/services/businessDemographicsService";
import EditDirectorForm from "dashboard/components/businessDemographics/directors/EditDirectorForm";
import Directors from "dashboard/components/businessDemographics/directors/Directors";
import { ErrorComponent } from "shared/components/Error";
import { onPressKeyHandler } from "shared/helpers/utils";
import { getUser } from "auth/services/AuthService";
import CustomButton from "shared/components/CustomButton";
import BackButtonLayout from "shared/components/BackButtonLayout";

import { useStyles } from "./styles";

const DirectorsContainer = () => {
    const [directors, setDirectors] = useState([]);
    const [editableDirector, setEditableDirector] = useState(null);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const styles = useStyles();
    const history = useHistory();

    const initUser = async () => {
        const { data } = await getUser();
        const user = data?.user;
        setDirectors(user.directors);
        setUser(user);
    };

    useEffect(() => {
        initUser();
    }, []);

    const navigate = () => {
        if (!user.directors || !user?.directors?.length) {
            setError('Please add at least one director');
            return;
        }
        history.push("/admin/shareholders");
    };

    const clearEditableDirector = () => {
        setEditableDirector(null);
        initUser();
    };

    const handleDirectorEdit = (director, e) => {
        const verificationKey = onPressKeyHandler(e);
        if(verificationKey)   {
            setEditableDirector(director);
        }
    };

    const handleDirectorDelete = async (id, e) => {
        const verificationKey = onPressKeyHandler(e);
        if(verificationKey)   {
            await deleteDirector("directors", id);
            clearEditableDirector();
        }
    };

    const handleDirectorAdd = (e) => {
        const verificationKey = onPressKeyHandler(e);
        if(verificationKey)   {
            setError('');
            setEditableDirector({});
        }
    };

    const goBack = () => {
        if (editableDirector) {
            setEditableDirector(null);
            return;
        }
        history.goBack();
    };

    const title = editableDirector ? "Company director information" : "Add company directors";

    return (
        <Navigations>
            <Box className={styles.container}>
                <Box className={styles.wrapper}>
                    <BackButtonLayout titleText={title} onClick={goBack} />
                    {!editableDirector ? (
                        <>
                            <Directors
                                user={user}
                                directors={directors}
                                onDirectorEdit={handleDirectorEdit}
                                onDirectorDelete={handleDirectorDelete}
                                onDirectorAdd={handleDirectorAdd}
                            />
                            <ErrorComponent message={error}/>
                            <CustomButton variant="contained" onClick={navigate}>
                                Continue
                            </CustomButton>
                        </>
                    ) : (
                        <EditDirectorForm
                            director={editableDirector}
                            directors={directors}
                            clearEditableDirector={clearEditableDirector}
                        />
                    )}
                </Box>
            </Box>
        </Navigations>
    );
};

export default DirectorsContainer;
