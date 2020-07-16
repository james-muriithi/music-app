import React from 'react'
import PropTypes from "prop-types";
import Tooltip from '@material-ui/core/Tooltip';

export default function ValueLabel(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value} style={{zIndex: '10000'}}>
            {children}
        </Tooltip>
    );
}

ValueLabel.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};