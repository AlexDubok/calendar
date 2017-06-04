import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToday } from '../reducers/displayed-reducer.js';
import Year from '../components/Year.jsx';

class YearContainer extends PureComponent {
    static propTypes = {
        selected: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        tasks   : PropTypes.object,
        today   : PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    }

    render() {
        const { selected, tasks, today } = this.props;

        return (
            <Year selected={moment(selected)} tasks={tasks} today={moment(today)} />
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

export default connect(mapStateToProps)(YearContainer);
