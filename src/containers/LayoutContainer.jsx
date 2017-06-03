import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeDialog } from '../actions/dialog-actions.js';
import Layout from '../components/Layout.jsx';

class LayoutContainer extends Component {
    static propTypes = {
        tasks : PropTypes.object,
        dialog: PropTypes.object
    };

    render() {
        const { tasks, dialog } = this.props;

        return (
            <Layout
                tasks={tasks}
                dialog={dialog}
                closeDialog={this.props.closeDialog}
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        tasks : state.tasks,
        dialog: state.dialog
    };
}

export default connect(mapStateToProps, { closeDialog })(LayoutContainer);
