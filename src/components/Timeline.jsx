import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './Timeline.less';

class Timeline extends PureComponent {
    static propTypes = {
        dayKey : PropTypes.string,
        taskKey: PropTypes.string,
        tasks  : PropTypes.object
    }

    state = {
        activeDay: null
    }

    handleActivate = (taskKey, time) =>
        this.setState({
            editing  : true,
            activeDay: taskKey,
            startTime: moment(taskKey).add(time * 30, 'minutes')
        });

    handleDeactivate = (taskKey, time) => {
        const { activeDay } = this.state;

        this.setState({ endTime: moment(activeDay).add(time * 30, 'minutes'), editing: false });
    };

    handleSelect = (time) => {
        const { activeDay, editing } = this.state;

        if (editing) {
            this.setState({ endTime: moment(activeDay).add(time * 30, 'minutes') });
        }
    }

    getTimeStamp(time) {
        return moment(time, 'HH:mm');
    }

    getMinutesDiff(time1, time2) {
        return time1.diff(time2, 'minutes');
    }

    renderTimeline = () => {
        const hours = Array(48).fill(null)
            .map((hour, i) =>
                <div
                    key={i}
                    styleName='timeframe'
                />
            );

        return hours;
    }

    render() {
        const { tasks, dayKey } = this.props;
        const st = '09:00';
        const m = moment(st, 'HH:mm').diff(moment('00:00', 'HH:mm'), 'minutes');

        console.log('m:', m);

        return (
            <div styleName='Timeline' >
                {this.renderTimeline()}
                {
                    tasks && tasks[dayKey] &&
                    tasks[dayKey].map((task, i) => {
                        return (
                            <Task key={i} task={task} maxHeight={800} />
                        );
                    })
                }
            </div>
        );
    }
}

export default Timeline;
