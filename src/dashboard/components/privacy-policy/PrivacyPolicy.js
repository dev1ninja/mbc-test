import React from 'react';
import { Typography } from '@material-ui/core';
import useStyle from './PolicyStyles';

function PrivacyPolicy() {
    const classes = useStyle();

    return (
        <div className={classes.content}>
            {/* left to style */}
            <Typography variant="h3" className={classes.heading}>
                Privacy Policy
            </Typography>
            <Typography className={classes.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet sapien rhoncus eros facilisis lobortis. Pellentesque efficitur augue purus, eleifend efficitur nisl consequat
                non. Sed cursus sem arcu, at posuere arcu mollis vel. Suspendisse potenti. Nam auctor non nisi at venenatis. Donec vitae viverra augue. Cras dolor est, malesuada eu dui eget, rutrum
                varius elit. Sed a ante pulvinar, faucibus purus sit amet, convallis libero. Suspendisse potenti. Proin imperdiet convallis massa. Sed nec diam ac risus vestibulum bibendum. Curabitur
                mollis, lacus mollis sodales viverra, lectus purus consectetur est, non fermentum nisl ipsum nec arcu. Suspendisse eget nisi finibus, tristique lacus vel, vestibulum nibh. Nunc ut
                aliquam tellus. Sed orci tellus, dignissim vitae pretium pellentesque, accumsan vitae ligula. Integer sed odio lobortis, luctus arcu sit amet, tincidunt massa.
            </Typography>
            <Typography className={classes.text}>
                Cras varius fringilla enim, vitae efficitur leo blandit non. Vivamus facilisis ultrices libero, sit amet posuere sapien efficitur at. Praesent sed faucibus sem. Donec pharetra
                pellentesque erat, vitae imperdiet purus tincidunt sed. Etiam rhoncus, orci vitae tempus vehicula, ex nibh bibendum nisi, et ornare urna risus at mauris. Praesent efficitur lorem vel
                luctus sagittis. Maecenas sit amet lacus et est accumsan interdum. Mauris mi nulla, tincidunt sit amet ullamcorper ut, tempor in leo. Etiam vel lectus sed ante aliquam viverra
                scelerisque a lectus.
            </Typography>
            <Typography className={classes.text}>
                Aliquam quis ante sem. Vestibulum vitae velit gravida, hendrerit ipsum vitae, bibendum massa. In hac habitasse platea dictumst. Mauris libero erat, dapibus non lectus eget, egestas
                viverra augue. Aenean id tellus tempus, tempus velit sed, commodo justo. Aenean quis euismod leo. Suspendisse egestas condimentum ante, id venenatis turpis sollicitudin ut. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Nunc quis elit ultrices, tempor ante sed, egestas mi. Praesent maximus magna justo, non commodo urna tristique ac. Aliquam lobortis
                tincidunt porttitor. Curabitur fermentum rutrum placerat.
            </Typography>
        </div>
    );
}

export default PrivacyPolicy;
