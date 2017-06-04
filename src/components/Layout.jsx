import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import CSSTransitionGroup   from 'react-addons-css-transition-group';
import { Route, NavLink  }  from 'react-router-dom';
import WeekContainer        from '../containers/WeekContainer.jsx';
import MonthContainer       from '../containers/MonthContainer.jsx';
import YearContainer        from '../containers/YearContainer.jsx';
import Controls             from './Controls.jsx';
import Dialog               from './Dialog.jsx';
import styles               from './Layout.less';


class Layout extends Component {
    static propTypes = {
        tasks      : PropTypes.object,
        dialog     : PropTypes.object,
        openDialog : PropTypes.func,
        closeDialog: PropTypes.func,
        selected   : PropTypes.object,
        selectDate : PropTypes.func,
        saveTask   : PropTypes.func,
        path       : PropTypes.string,
        today      : PropTypes.object
    }

    handleOpenDialog = () => {
        const { selected } = this.props;
        const startTime = selected.format('YYYY-MM-DD');

        this.props.openDialog({ startTime });
    }

    handleSelectToday = () => {
        const { selectDate, today } = this.props;

        selectDate(today);
    }

    handleCloseDialog = () => this.props.dialog.isOpen
        ? this.props.closeDialog()
        : null;

    render() {
        const { closeDialog, selected, selectDate, path, dialog, saveTask, tasks } = this.props;
        const { isOpen } = dialog;
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
                <div styleName='helpers'>
                    <button styleName='new' onClick={this.handleOpenDialog}>New</button>
                    <button styleName='today' onClick={this.handleSelectToday}>Today</button>
                </div>
                <div styleName='container'>
                    <Route exact path='/' component={WeekContainer} />
                    <Route exact path='/month' component={MonthContainer} />
                    <Route exact path='/year' component={YearContainer} />
                </div>
                <CSSTransitionGroup
                    transitionName={{
                        enter       : styles.dialogEnter,
                        enterActive : styles.dialogEnterActive,
                        leave       : styles.dialogLeave,
                        leaveActive : styles.dialogLeaveActive,
                        appear      : styles.dialogEnter,
                        appearActive: styles.dialogEnterActive
                    }}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionAppearTimeout={300}
                    transitionAppear
                >
                    {
                        isOpen
                        ? <Dialog
                            dialogParams={dialog.params}
                            saveTask={saveTask}
                            tasks={tasks}
                            closeDialog={closeDialog.bind(this, isOpen)}
                          />
                        : null
                    }
                </CSSTransitionGroup>
            </div>
        );
    }
}


export default Layout;
