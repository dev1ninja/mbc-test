import React from 'react';
import { PriorityHigh } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

const errors = title => {
    return (
        <Tooltip title={title}>
            <PriorityHigh color="secondary" />
        </Tooltip>
    );
};

export default errors;
