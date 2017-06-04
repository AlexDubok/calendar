import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
// import cx                    from 'classnames';
import DayOfMonth               from './DayOfMonth.jsx';
import './Month.less';

class Month extends PureComponent {
    static propTypes = {
        selected: PropTypes.object,
        tasks   : PropTypes.object,
        small   : PropTypes.bool,
        today   : PropTypes.object
    }

    renderDays = (weekStart) => {
        const { selected, tasks, small, today } = this.props;

        const days = Array(7).fill(null)
            .map((day, i) => {
                const currentDay = weekStart.clone().add(1 * i, 'days');
                const taskKey = currentDay.format('YYYY-MM-DD');

                return (
                    <DayOfMonth
                        key={currentDay.format('MM-DD')}
                        date={currentDay.format('DD')}
                        currentMonth={currentDay.format('MM') === selected.format('MM')}
                        tasks={tasks && tasks[taskKey]}
                        isToday={today.format('YYYY-MM-DD') === taskKey}
                        small={small}
                    />
                );
            });

        return <div key={weekStart.format('MM-DD')} styleName='week'>{days}</div>;
    }

    renderWeeks = () => {
        const { selected } = this.props;
        // const days = Array(7).fill(null);
        const firstDay = selected.clone().startOf('month').startOf('isoWeek');
        const nextMonth = selected.clone().startOf('month').add(1, 'month');
        const curentWeek = firstDay.clone();
        const weeks = [];

        while (curentWeek.isBefore(nextMonth)) {
            weeks.push(this.renderDays(curentWeek));
            // console.log(curentWeek.add(1, 'week').format('YYYY-MM-DD'));
            curentWeek.add(1, 'week');
        }

        return weeks;
    }

    render() {
        const { small } = this.props;
        const dayNames = small
            ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
            : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        return (
            <div styleName='Month' >
                <div styleName='topContainer'>
                    {dayNames.map((day, i) => <div key={i} styleName='weekDay'>{day}</div>)}
                </div>
                <div styleName='monthContainer'>
                    {this.renderWeeks()}
                </div>
            </div>
        );
    }
}

export default Month;
