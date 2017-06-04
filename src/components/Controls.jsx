import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Controls.less';

class Controls extends Component {
    static propTypes = {
        selected  : PropTypes.object,
        selectDate: PropTypes.func,
        path      : PropTypes.string
    }

    handleNext = () => {
        const { selectDate, selected, path } = this.props;
        const newSelected = selected.clone().add(1, path);

        selectDate(newSelected);
    }

    handlePrevious = () => {
        const { selectDate, selected, path } = this.props;
        const newSelected = selected.clone();

        newSelected.add(-1, path);

        selectDate(newSelected);
    }

    renderDetails = () => {
        const { selected, path } = this.props;

        const startDate = selected.startOf('isoWeek').format('MMM Do');
        const endDate = selected.endOf('isoWeek').format('MMM Do');
        const month = selected.format('MMMM');
        const year = selected.year();

        switch (path) {
            case 'week':
                return (
                    <div>
                        <div>{`Year: ${year}, Week: ${selected.isoWeek()}`}</div>
                        <h3>{`${startDate} - ${endDate}`}</h3>
                    </div>
                );
            case 'month':
                return <h3>{`${month}, ${year}`}</h3>;
            case 'year':
                return <h3>{`${year}`}</h3>;
            default:
                break;
        }
    }

    render() {
        return (
            <div styleName='Controls'>
                <button styleName='btn' onClick={this.handlePrevious}>{'<'}</button>
                {this.renderDetails()}
                <button styleName='btn' onClick={this.handleNext}>{'>'}</button>
            </div>
        );
    }
}


export default Controls;
