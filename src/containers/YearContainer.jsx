import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToday } from '../reducers/displayed-reducer.js';
import Year from '../components/Year.jsx';

class YearContainer extends PureComponent {
    static propTypes = {
        selected: PropTypes.object,
        tasks   : PropTypes.object,
        today   : PropTypes.object
    }

    render() {
        const { selected, tasks, today } = this.props;

        return (
            <Year selected={selected} tasks={tasks} today={today} />
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
