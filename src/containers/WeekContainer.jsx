import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Week from '../components/Week.jsx';

class WeekContainer extends PureComponent {
    static propTypes = {
        selected: PropTypes.object
    }

    render() {
        const { selected } = this.props;

        return (
            <Week selected={selected} />
        );
    }
}

function mapStateToProps(state) {
    return {
        selected: state.view.selected
    };
}

export default connect(mapStateToProps)(WeekContainer);
