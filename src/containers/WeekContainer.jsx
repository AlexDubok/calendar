import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToday } from '../reducers/displayed-reducer.js';
import Week from '../components/Week.jsx';

class WeekContainer extends PureComponent {
    static propTypes = {
        selected: PropTypes.object,
        today   : PropTypes.object
    }

    render() {
        const { selected, today } = this.props;

        return (
            <Week selected={selected} today={today} />
        );
    }
}

function mapStateToProps(state) {
    return {
        selected: state.view.selected,
        today   : getToday()
    };
}

export default connect(mapStateToProps)(WeekContainer);
