import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { connect }              from 'react-redux';
import moment                   from 'moment';
import { setTask }              from '../actions/calendar-actions.js';
import Week from './Week.jsx';
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
                <Week selected={selected} />
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
