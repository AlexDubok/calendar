import React, { PureComponent } from 'react';
import moment                   from 'moment';
import PropTypes                from 'prop-types';
import Timeline from './Timeline.jsx';
import './Week.less';

class Week extends PureComponent {
    static propTypes = {
        selected: PropTypes.object,
        tasks   : PropTypes.object
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

    render() {
        const { selected, tasks } = this.props;
        const timeLabels = Array(24).fill(null)
            .map((hour, i) => <div key={i} styleName='timeLabel'>{selected.hour(i).format('HH:00')}</div>);

        const days = Array(7).fill(null)
            .map((day, i) => {
                const date = selected.isoWeekday(i + 1);
                const dayKey = date.format('YYYY-MM-DD');

                return (
                    <div key={dayKey} styleName='weekDay'>
                        <div styleName='date'>{date.format('ddd, MMM DD')}</div>
                        <Timeline dayKey={dayKey} tasks={tasks} />
                    </div>
                );
            });


        return (
            <div styleName='Week' >
                <div styleName='timeLabels'>{timeLabels}</div>
                {days}
            </div>
        );
    }
}

export default Week;
