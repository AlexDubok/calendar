import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dialog.less';

class Dialog extends Component {
    render() {
        return (
            <div
                styleName='Dialog'
                style={this.props.style}
            />
        );
    }
}

Dialog.propTypes = {
    style: PropTypes.object
};

export default Dialog;
