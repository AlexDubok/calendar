import React, { PureComponent } from 'react';
import moment from 'moment';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './Timeline.less';

const TIME_FORMAT = 'YYYY-MM-DD_HH:mm';

class Timeline extends PureComponent {
    static propTypes = {
        dayKey    : PropTypes.string,
        tasks     : PropTypes.object,
        openDialog: PropTypes.func
    }

    state = {
        editing: false
    }


    handleCreateTask = (e) => {
        e.stopPropagation();
        const rect = e.target.getBoundingClientRect();
        const { top, left } = rect;

        const dialogParams = {
            position : { top: top - 30, left: left + 120 },
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

    render() {
        const { tasks, dayKey } = this.props;

        return (
            <div styleName='Timeline' onMouseLeave={this.handleStopEditing}>
                {this.renderTimeline(dayKey)}
                {
                    tasks && tasks[dayKey] &&
                    tasks[dayKey].map((task, i) => {
                        return (
                            <Task
                                key={i}
                                task={task}
                                maxHeight={800}
                                timeFormat={TIME_FORMAT}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default Timeline;
