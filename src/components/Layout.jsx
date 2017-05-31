import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect }              from 'react-redux';
import moment from 'moment';
import { setTask }                 from '../actions/calendar-actions.js';
import './Layout.less';


class Layout extends PureComponent {
    static propTypes = {
        setTask: PropTypes.func,
        tasks  : PropTypes.object
    }


    state = {
        selected: moment()
    }

    componentDidMount() {
    }

    handleNext = () => {
        const newSelected = this.state.selected.clone();

        newSelected.add(1, 'week');

        this.setState({ selected: newSelected });
    }

    handlePrevious = () => {
        const newSelected = this.state.selected.clone();

        newSelected.add(-1, 'week');

        this.setState({ selected: newSelected });
    }

    render() {
        const { selected } = this.state;
        const { tasks } = this.props;

        console.log(tasks);
        const startDate = selected.startOf('isoWeek').format('MMM Do');
        const endDate = selected.endOf('isoWeek').format('MMM Do');
        const timeLabels = Array(24).fill(null)
            .map((hour, i) => <div key={i} styleName='timeLabel'>{selected.hour(i).format('HH:00')}</div>);
        const hours = Array(48).fill(null)
            .map((hour, i) => <div key={i} styleName='timeframe' />);
        const days = Array(7).fill(null)
            .map((day, i) => {
                const date = selected.isoWeekday(i + 1);
                const taskKey = date.format('YYYY-MM-DD');

                return (
                    <div key={i} styleName='weekDay'>
                        <div styleName='date'>{date.format('ddd, MMM DD')}</div>
                        <div styleName='timeline'>{hours}</div>
                        {
                            tasks && tasks[taskKey] && <div styleName='task'>{taskKey}</div>
                        }
                    </div>
                );
            });

        console.log(selected);

        return (
            <div styleName='Layout' >
                <div styleName='controls'>
                    <button styleName='btn' onClick={this.handlePrevious}>{'<'}</button>
                    <div>
                        <div>{`Year: ${selected.year()}, Week: ${selected.isoWeek()}`}</div>
                        <h3>{`${startDate} - ${endDate}`}</h3>
                    </div>
                    <button styleName='btn' onClick={this.handleNext}>{'>'}</button>
                </div>
                <div styleName='container'>
                    <div styleName='timeLabels'>{timeLabels}</div>
                    {days}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.calendar.tasks
    };
}

export default connect(mapStateToProps, { setTask })(Layout);
