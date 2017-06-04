import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import cx                       from 'classnames';
import TimelineContainer        from '../containers/TimelineContainer.jsx';
import './Week.less';

class Week extends PureComponent {
    static propTypes = {
        selected: PropTypes.object,
        today   : PropTypes.object
    }

    render() {
        const { selected, today } = this.props;
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
                                const dateStyle = cx('date', {
                                    isToday: today.format('YYYY-MM-DD') === dayKey
                                });

                                return (
                                    <div key={dayKey} styleName={dateStyle}>{date.format('ddd, MMM DD')}</div>
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
                                const dayStyle = cx('weekDay', {
                                    isToday: today.format('YYYY-MM-DD') === dayKey
                                });

                                return (
                                    <div key={dayKey} styleName={dayStyle}>
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
