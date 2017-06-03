import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openDialog } from '../actions/dialog-actions.js';
import Timeline from '../components/Timeline.jsx';

const TIME_FORMAT = 'YYYY-MM-DD_HH:mm';

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
                timeFormat={TIME_FORMAT}
                openDialog={this.props.openDialog}
                dayKey={dayKey}
                tasks={tasks}

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

export default connect(mapStateToProps, { openDialog })(TimelineContainer);
