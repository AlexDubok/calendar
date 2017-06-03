import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import TimelineContainer from '../containers/TimelineContainer.jsx';
import './Week.less';

class Week extends PureComponent {
    static propTypes = {
        selected: PropTypes.object
    }

    render() {
        const { selected } = this.props;
        const timeLabels = Array(24).fill(null)
            .map((hour, i) => <div key={i} styleName='timeLabel'>{selected.hour(i).format('HH:00')}</div>);

        const days = Array(7).fill(null)
            .map((day, i) => {
                const date = selected.isoWeekday(i + 1);
                const dayKey = date.format('YYYY-MM-DD');

                return (
                    <div key={dayKey} styleName='weekDay'>
                        <div styleName='date'>{date.format('ddd, MMM DD')}</div>
                        <TimelineContainer dayKey={dayKey} />
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
