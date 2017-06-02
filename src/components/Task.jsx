import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './Task.less';

class Timeline extends PureComponent {
    static propTypes = {
        dayKey   : PropTypes.string,
        task     : PropTypes.object,
        maxHeight: PropTypes.number
    }

    state = {
        editing  : false,
        startTime: this.props.task.startTime,
        endTime  : this.props.task.endTime
    }

    getMoment = (time) => {
        return moment(time, 'HH:mm');
    }

    getMinutesDiff = (time1, time2) => {
        return time1.diff(time2, 'minutes');
    }

    getHeight = () => {
        const { maxHeight, task } = this.props;
        const startMinute = this.getMoment(task.startTime);
        const endMinute = this.getMoment(task.endTime);

        const heightInMinutes = this.getMinutesDiff(endMinute, startMinute);
        const heightInPx = heightInMinutes * maxHeight / 1440;

        return heightInPx;
    }

    getTopPosition = () => {
        const { maxHeight, task } = this.props;
        const startMinute = this.getMoment(task.startTime);
        const topInMinutes = this.getMinutesDiff(startMinute, moment('00:00', 'HH:mm'));

        console.log('topInMinutes', topInMinutes);
        const topInPx = topInMinutes * maxHeight / 1440;

        return topInPx;
    }

    render() {
        const { task } = this.props;
        const top = this.getTopPosition();
        const height = this.getHeight();

        console.log(top, height);

        return (
            <div
                styleName='Task'
                style={{ top, height, color: task.color || 'blue' }}
            >
                <div styleName='bg' />
                <div styleName='time'>{`${task.startTime}-${task.endTime}`}</div>
                <div>{task.title}</div>
                <div styleName='description'>{task.description}</div>
            </div>
        );
    }
}

export default Timeline;
