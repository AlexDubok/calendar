import React, { PureComponent } from 'react';
import moment from 'moment';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { TIME_FORMAT } from '../store/constants.js';
import Task from './Task.jsx';
import './Timeline.less';


class Timeline extends PureComponent {
    static propTypes = {
        dayKey    : PropTypes.string,
        tasks     : PropTypes.object,
        openDialog: PropTypes.func
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
        const dialogParams = {
            startTime: e.target.getAttribute('data-time')
        };

        this.props.openDialog(dialogParams);
    }


    handleDrag = (e) => console.log(e.target);

    renderTimeline = (date) => {
        const start = moment(date).startOf('day');

        const hours = Array(48).fill(null)
            .map((hour, i) => {
                const timeObj = start.clone().add(i * 30, 'minutes');
                const time = timeObj.format(TIME_FORMAT);
                const cellStyles = cx('timeframe', {
                });

                return (
                    <div
                        key={time}
                        styleName={cellStyles}
                        data-time={time}
                        data-index={i}
                        onClick={this.handleCreateTask}
                    />
                );
            });

        return hours;
    }

    renderTasks = () => {
        const { tasks, dayKey } = this.props;

        if (tasks && tasks[dayKey]) {
            return tasks[dayKey].map((task, i) => {
                return (
                    <Task
                        key={i}
                        task={task}
                        maxHeight={1000}
                        timeFormat={TIME_FORMAT}
                        parentWidth={this.state.dayWidth}
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
