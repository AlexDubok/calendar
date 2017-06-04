import React, { PureComponent } from 'react';
import cx                       from 'classnames';
import moment                   from 'moment';
import PropTypes                from 'prop-types';
import './Task.less';

class Task extends PureComponent {
    static propTypes = {
        timeFormat : PropTypes.string,
        dayKey     : PropTypes.string,
        task       : PropTypes.object,
        parentWidth: PropTypes.number,
        maxHeight  : PropTypes.number
    }

    state = {
        editing  : false,
        startTime: this.props.task.startTime,
        endTime  : this.props.task.endTime
    }

    getHeight = () => {
        const { timeFormat, maxHeight, task } = this.props;
        const startMinute = moment(task.startTime, timeFormat);
        const endMinute = moment(task.endTime, timeFormat);

        const heightInMinutes = endMinute.diff(startMinute, 'minutes');
        const heightInPx = heightInMinutes * maxHeight / 1440;

        return heightInPx;
    }

    getTopPosition = () => {
        const { timeFormat, maxHeight, task } = this.props;
        const startMinute = moment(task.startTime, timeFormat);

        const topInMinutes = startMinute.diff(startMinute.clone().startOf('day'), 'minutes');
        const topInPx = topInMinutes * maxHeight / 1440;

        return topInPx;
    }

    render() {
        const { task, timeFormat, parentWidth } = this.props;
        const top = this.getTopPosition();
        const height = this.getHeight();
        const startMoment = moment(task.startTime, timeFormat);
        const endMoment = moment(task.endTime, timeFormat);
        const startTime = startMoment.format('HH:mm');
        const endTime = endMoment.format('HH:mm');
        const taskStyle = task.multiDay
            ? { top: 0, height: 25, width: parentWidth * task.daysTotal, color: task.color || 'blue' }
            : { top, height, color: task.color || 'blue' };
        const oneLine = task.multiDay || endMoment.diff(startMoment, 'minutes') < 60;
        const taskClass = cx('Task', {
            oneLine
        });

        return (
            <div
                styleName={taskClass}
                style={taskStyle}
            >
                <div styleName='bg' />
                <div styleName='time'>{`${startTime} - ${!oneLine ? endTime : ''}`}</div>
                <div styleName='title'>{task.title}</div>
            </div>
        );
    }
}

export default Task;
