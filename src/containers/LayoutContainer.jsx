import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openDialog, closeDialog } from '../actions/dialog-actions.js';
import * as viewActions from '../actions/displayed-actions.js';
import { getToday } from '../reducers/displayed-reducer.js';
import { saveTask } from '../actions/task-actions.js';
import Layout from '../components/Layout.jsx';

class LayoutContainer extends PureComponent {
    static propTypes = {
        tasks      : PropTypes.object,
        dialog     : PropTypes.object,
        openDialog : PropTypes.func,
        closeDialog: PropTypes.func,
        selectDate : PropTypes.func,
        saveTask   : PropTypes.func,
        selected   : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        location   : PropTypes.object,
        today      : PropTypes.object
    };

    render() {
        const { tasks, dialog, selected, location, today, selectDate } = this.props;
        const path = location.pathname.split('/')[1] || 'week';

        return (
            <Layout
                saveTask={saveTask}
                today={today}
                tasks={tasks}
                dialog={dialog}
                closeDialog={this.props.closeDialog}
                openDialog={this.props.openDialog}
                selectDate={selectDate}
                selected={moment(selected)}
                path={path}
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        tasks   : state.tasks,
        dialog  : state.dialog,
        selected: state.view.selected,
        today   : getToday()
    };
}

export default connect(mapStateToProps, { openDialog, closeDialog, saveTask, ...viewActions })(LayoutContainer);
