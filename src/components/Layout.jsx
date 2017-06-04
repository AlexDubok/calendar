import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import moment                   from 'moment';
import Dialog                   from './Dialog.jsx';
import Week                     from './Week.jsx';
import './Layout.less';


class Layout extends PureComponent {
    static propTypes = {
        tasks      : PropTypes.object,
        dialog     : PropTypes.object,
        closeDialog: PropTypes.func
    }

    state = {
        selected: moment()
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

    handleCloseDialog = () => this.props.closeDialog();

    render() {
        const { selected } = this.state;
        const { tasks, closeDialog } = this.props;
        const { isOpen, startTime } = this.props.dialog;

        const startDate = selected.startOf('isoWeek').format('MMM Do');
        const endDate = selected.endOf('isoWeek').format('MMM Do');

        return (
            <div styleName='Layout' onClick={this.handleCloseDialog} >
                <div styleName='controls'>
                    <button styleName='btn' onClick={this.handlePrevious}>{'<'}</button>
                    <div>
                        <div>{`Year: ${selected.year()}, Week: ${selected.isoWeek()}`}</div>
                        <h3>{`${startDate} - ${endDate}`}</h3>
                    </div>
                    <button styleName='btn' onClick={this.handleNext}>{'>'}</button>
                </div>
                <Week selected={selected} tasks={tasks} />
                {
                    isOpen
                        ? <Dialog
                            startTime={startTime}
                            closeDialog={closeDialog}
                          />
                        : null
                }
            </div>
        );
    }
}


export default Layout;
