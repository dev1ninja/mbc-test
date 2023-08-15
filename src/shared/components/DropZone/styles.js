import { makeStyles } from "@material-ui/styles";
import { lighterGrey, lightGreyBackground, red, white, lightGrey } from "theme/variables";

export const useStyles = makeStyles({
    container: {
        width: "100%",
        marginBottom: "1.2rem",
    },
    dropContainer: {
        cursor: "pointer",
        display: "flex",
        boxSizing: "border-box",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: '1rem',
        width: "100%",
        height: "23.4rem",
        background: "#23252B",
        border: `.1rem dashed ${lightGrey}`,
        borderRadius: ".4rem",
        zIndex: "1200009"
    },
    disableUpload: {
        cursor: "not-allowed"
    },
    uploadIcon: {
        width: "4rem",
        height: "5.3rem",
    },
    dropMessage: {
        textAlign: "center",
        color: lighterGrey,
    },
    textDropMessage:{
        paddingTop: '2.2rem',
        color: lighterGrey,
        fontWeight: '300',
    },
    fileInput: {
        display: "none"
    },
    fileStatus: {
        display: "flex",
        alignItems: "center",
        marginTop: "1.5rem"
    },
    fileDescription: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        color: white,
        boxSizing: "border-box",
        padding: "1.7rem 1rem",
    },
    validFile: {
        background: lightGreyBackground,
        border: 0,
        borderRadius: ".4rem",
    },
    invalidFile: {
        background: "rgba(221, 66, 90, 0.15)",
        border: `.1rem solid ${red}`
    },
    outlinedIcon:{
        width: "2.6em",
        height: "1.6em",
    },
    selectFile: {
        display: 'flex',
        flex: '1 0 90%',
        maxWidth: '90%',
    },
    fileName: {
        width: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        marginLeft: "0.5rem",
        fontWeight: '300'
    },
    doneIcon: {
        width: "2rem",
        height: "3rem",
    },
    removeFileIcon: {
        marginLeft: '.5rem',
        cursor: "pointer"
    }
});
