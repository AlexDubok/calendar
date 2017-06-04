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
        const days = Array(7).fill(null);

        return (
            <div styleName='Week' >
                <div styleName='mainContainer'>
                    <div styleName='dayLabels'>
                        {
                            days.map((day, i) => {
                                const date = selected.isoWeekday(i + 1);
                                const dayKey = date.format('YYYY-MM-DD');

                                return (
                                    <div key={dayKey} styleName='date'>{date.format('ddd, MMM DD')}</div>
                                );
                            })
                        }
                    </div>
                    <div styleName='daysContainer'>
                        <div styleName='timeLabels'>{timeLabels}</div>
                        {
                            days.map((day, i) => {
                                const date = selected.isoWeekday(i + 1);
                                const dayKey = date.format('YYYY-MM-DD');

                                return (
                                    <div key={dayKey} styleName='weekDay'>
                                        <TimelineContainer dayKey={dayKey} />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Week;
