import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Month from '../components/Month.jsx';

class MonthContainer extends PureComponent {
    static propTypes = {
        selected: PropTypes.object,
        tasks   : PropTypes.object
    }

    render() {
        const { selected, tasks } = this.props;

        return (
            <Month selected={selected} tasks={tasks} />
        );
    }
}

function mapStateToProps(state) {
    return {
        selected: state.view.selected,
        tasks   : state.tasks
    };
}

export default connect(mapStateToProps)(MonthContainer);