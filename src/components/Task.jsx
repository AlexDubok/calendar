import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './Task.less';

class Timeline extends PureComponent {
    static propTypes = {
        timeFormat: PropTypes.string,
        dayKey    : PropTypes.string,
        task      : PropTypes.object,
        maxHeight : PropTypes.number
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
        const { task, timeFormat } = this.props;
        const top = this.getTopPosition();
        const height = this.getHeight();
        const startTime = moment(task.startTime, timeFormat).format('HH:mm');
        const endTime = moment(task.endTime, timeFormat).format('HH:mm');

        return (
            <div
                styleName='Task'
                style={{ top, height, color: task.color || 'blue' }}
            >
                <div styleName='bg' />
                <div styleName='time'>{`${startTime}-${endTime}`}</div>
                <div>{task.title}</div>
                <div styleName='description'>{task.description}</div>
            </div>
        );
    }
}

export default Timeline;
