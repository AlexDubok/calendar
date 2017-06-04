import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToday } from '../reducers/displayed-reducer.js';
import Month from '../components/Month.jsx';

class MonthContainer extends PureComponent {
    static propTypes = {
        selected: PropTypes.object,
        tasks   : PropTypes.object,
        today   : PropTypes.object
    }

    render() {
        const { selected, tasks, today } = this.props;

        return (
            <Month selected={selected} tasks={tasks} today={today} />
        );
    }
}

function mapStateToProps(state) {
    return {
        selected: state.view.selected,
        tasks   : state.tasks,
        today   : getToday()
    };
}

export default connect(mapStateToProps)(MonthContainer);
