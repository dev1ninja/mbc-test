import { makeStyles } from "@material-ui/styles";

export default makeStyles({
    container: {
        width: "100%"
    },
    dropContainer: {
        display: "flex",
        boxSizing: "border-box",
        alignItems: "center",
        justifyContent: "center",
        margin: "2rem 0 1rem",
        width: "90%",
        height: "234px",
        background: "#23252B",
        border: "2px dashed #646671",
        borderRadius: "4px",
        zIndex: "1200009"
    },
    disableUpload: {
        cursor: "not-allowed"
    },
    uploadIcon: {
        color: "#fff",
        width: "70px",
        height: "70px"
    },
    dropMessage: {
        textAlign: "center"
    },
    fileInput: {
        display: "none"
    },
    fileStatus: {
        display: "flex",
        alignItems: "center",
        marginTop: ".7rem"
    },
    fileDescription: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "89%",
        color: "#fff",
        boxSizing: "border-box",
        borderRadius: "4px",
        padding: "13px 12px",
        "& div": {
            display: "flex",
            alignItems: "center"
        }
    },
    validFile: {
        background: "#15161A",
        border: "1px solid #0CF8E9"
    },
    invalidFile: {
        background: "rgba(221, 66, 90, 0.15)",
        border: "1px solid #DD425A"
    },
    fileName: {
        marginLeft: "1.5rem"
    },
    removeFileIcon: {
        width: "1.1rem",
        height: "1.1rem",
        marginLeft: "1rem",
        color: "#DD425A",
        cursor: "pointer"
    }
});
