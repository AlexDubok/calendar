import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openDialog, closeDialog } from '../actions/dialog-actions.js';
import Timeline from '../components/Timeline.jsx';


class TimelineContainer extends Component {
    static propTypes = {
        dayKey    : PropTypes.string,
        tasks     : PropTypes.object,
        openDialog: PropTypes.func
    }

    render() {
        const { dayKey, tasks } = this.props;

        return (
            <Timeline
                openDialog={this.props.openDialog}
                dayKey={dayKey}
                tasks={tasks}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    };
}

export default connect(mapStateToProps, { openDialog, closeDialog })(TimelineContainer);
