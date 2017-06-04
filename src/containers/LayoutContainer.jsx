import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeDialog } from '../actions/dialog-actions.js';
import * as viewActions from '../actions/displayed-actions.js';
import Layout from '../components/Layout.jsx';

class LayoutContainer extends PureComponent {
    static propTypes = {
        tasks      : PropTypes.object,
        dialog     : PropTypes.object,
        closeDialog: PropTypes.func,
        selectDate : PropTypes.func,
        selected   : PropTypes.object,
        location   : PropTypes.object,
        today      : PropTypes.object
    };

    render() {
        const { tasks, dialog, selected, location } = this.props;
        const path = location.pathname.split('/')[1] || 'week';

        return (
            <Layout
                tasks={tasks}
                dialog={dialog}
                closeDialog={this.props.closeDialog}
                selectDate={this.props.selectDate}
                selected={selected}
                path={path}
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        tasks   : state.tasks,
        dialog  : state.dialog,
        selected: state.view.selected
    };
}

export default connect(mapStateToProps, { closeDialog, ...viewActions })(LayoutContainer);
