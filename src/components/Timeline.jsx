import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './TimeLine.less';

class Timeline extends PureComponent {
    static propTypes = {
        dayKey : PropTypes.string,
        taskKey: PropTypes.string,
        tasks  : PropTypes.object
    }

    state = {
        editing  : false,
        activeDay: null,
        startTime: null,
        endTime  : null
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

        return (
            <div styleName='Timeline' >
                {this.renderTimeline()}
                {
                    tasks && tasks[dayKey] && <div styleName='task'>{dayKey}</div>
                }
            </div>
        );
    }
}

export default Timeline;
