import React from "react";
import { array, func, object } from "prop-types";
import ClientControl from "shared/components/ClientControl";
import { Box } from "@material-ui/core";

import { useStyles } from "./styles";

const Directors = ({ directors, onDirectorEdit, onDirectorDelete, onDirectorAdd, user }) => {
    const styles = useStyles();

    const sortedDirectors = directors.sort(a => (!a.isMe ? 0 : -1));

    return (
        <Box>
            {user &&
                sortedDirectors.map(director => {
                    const fullName = `${director.firstName} ${director.lastName}`;
                    const { _id: id } = director;
                    const directorRole = "Director";

                    if (director.isMe) {
                        return (
                            <ClientControl
                                key={id}
                                className={styles.clientControl}
                                title={fullName}
                                subtitle={directorRole}
                            />
                        );
                    }
                    return (
                        <ClientControl
                            key={id}
                            className={styles.clientControl}
                            title={fullName}
                            subtitle={directorRole}
                            onEdit={e => onDirectorEdit(director, e)}
                            onDelete={e => onDirectorDelete(id, e)}
                        />
                    );
                })}
            <ClientControl
                title="Add a director"
                className={styles.clientControl}
                subtitle="If there are other directors in the company, register here."
                onAdd={onDirectorAdd}
            />
        </Box>
    );
};

export default Directors;

Directors.propTypes = {
    directors: array.isRequired,
    onDirectorEdit: func.isRequired,
    onDirectorDelete: func.isRequired,
    onDirectorAdd: func.isRequired,
    user: object
};
