import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Route, NavLink  }  from 'react-router-dom';
import WeekContainer        from '../containers/WeekContainer.jsx';
import MonthContainer       from '../containers/MonthContainer.jsx';
import YearContainer        from '../containers/YearContainer.jsx';
import Controls             from './Controls.jsx';
import Dialog               from './Dialog.jsx';
import './Layout.less';


class Layout extends Component {
    static propTypes = {
        tasks      : PropTypes.object,
        dialog     : PropTypes.object,
        closeDialog: PropTypes.func,
        selected   : PropTypes.object,
        selectDate : PropTypes.func,
        path       : PropTypes.string
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

    handleCloseDialog = () => this.props.closeDialog();

    render() {
        const { closeDialog, selected, selectDate, path } = this.props;
        const { isOpen, startTime } = this.props.dialog;
        const selectedStyle = {
            background  : 'black',
            color       : 'white',
            borderRadius: 10

        };

        return (
            <div styleName='Layout' onClick={this.handleCloseDialog} >
                <div styleName='navigation'>
                    <NavLink
                        to='/'
                        exact
                        styleName='link'
                        activeStyle={selectedStyle}
                    > Week</NavLink >
                    <NavLink styleName='link' activeStyle={selectedStyle} to='/month'>Month</NavLink >
                    <NavLink styleName='link' activeStyle={selectedStyle} to='/year'>Year</NavLink >
                </div>
                <Controls selected={selected} selectDate={selectDate} path={path} />
                <div styleName='container'>
                    <Route exact path='/' component={WeekContainer} />
                    <Route exact path='/month' component={MonthContainer} />
                    <Route exact path='/year' component={YearContainer} />
                </div>
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
