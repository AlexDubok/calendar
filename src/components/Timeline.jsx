import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { TIME_FORMAT } from '../store/constants.js';
import Task from './Task.jsx';
import './Timeline.less';


class Timeline extends PureComponent {
    static propTypes = {
        dayKey    : PropTypes.string,
        tasks     : PropTypes.object,
        openDialog: PropTypes.func,
        deleteTask: PropTypes.func
    }

    state = {
        editing: false,
        mounted: false
    }

    state = {
        dayWidth: 100
    }

    componentDidMount() {
        this.setState({ dayWidth: this.column.offsetWidth }); // eslint-disable-line
    }

    handleCreateTask = (e) => {
        e.stopPropagation();
        const startTime =  e.target.getAttribute('data-time');

        this.props.openDialog({ startTime });
    }

    renderTimeline = (date) => {
        const start = moment(date).startOf('day');

        const hours = Array(48).fill(null)
            .map((hour, i) => {
                const timeObj = start.clone().add(i * 30, 'minutes');
                const time = timeObj.format(TIME_FORMAT);

                return (
                    <div
                        key={time}
                        styleName='timeframe'
                        data-time={time}
                        onClick={this.handleCreateTask}
                    />
                );
            });

        return hours;
    }

    renderTasks = () => {
        const { tasks, dayKey, openDialog } = this.props;

        if (tasks && tasks[dayKey]) {
            return tasks[dayKey].map((task, i) => {
                return (
                    <Task
                        key={i}
                        task={task}
                        maxHeight={960}
                        openDialog={openDialog}
                        timeFormat={TIME_FORMAT}
                        parentWidth={this.state.dayWidth}
                        deleteTask={this.props.deleteTask}
                    />
                );
            });
        }
    }

    render() {
        const { dayKey } = this.props;

        return (
            <div styleName='Timeline'
                onMouseLeave={this.handleStopEditing}
                ref={col => this.column = col}
            >
                {this.renderTimeline(dayKey)}
                {this.renderTasks()}
            </div>
        );
    }
}

export default Timeline;
