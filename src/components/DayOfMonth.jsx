import React, { PureComponent } from 'react';
import moment from 'moment';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './DayOfMonth.less';

class DayOfMonth extends PureComponent {
    static propTypes = {
        tasks       : PropTypes.array,
        date        : PropTypes.string,
        currentMonth: PropTypes.bool,
        small       : PropTypes.bool
    }


    render() {
        const { tasks, date, currentMonth, small } = this.props;
        const dayClass = cx('DayOfMonth', {
            currentMonth,
            small
        });

        return (
            <div styleName={dayClass}>
                {date}
                {
                    tasks
                        ? <div styleName='tasks'>
                            {
                                tasks.map((task, i) => {
                                    const taskTime = moment(task.startTime, 'YYYY-MM-DD').format('HH:mm');

                                    return (
                                        <div
                                            key={i}
                                            styleName='task'
                                            style={{ borderLeft: `4px solid ${task.color || 'blue'}` }}
                                        >{small ? '' : `${taskTime} - ${task.title}`}</div>
                                    );
                                })
                            }
                        </div>
                        : null
                }
            </div>
        );
    }
}

export default DayOfMonth;
