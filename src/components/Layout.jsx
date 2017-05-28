import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect }              from 'react-redux';
import { setTask }                 from '../actions/calendar-actions.js';
import './Layout.less';


class Layout extends PureComponent {
    static propTypes = {
        task   : PropTypes.string,
        setTask: PropTypes.func
    }

    state = {
    }

    componentDidMount() {
    }

    handleSetTask = (e) => {
        this.props.setTask(e.target.value);
    }

    render() {
        return (
            <div styleName='Layout' >
                <div styleName='controls'>
                    <button styleName='btn' onClick={this.handleRandomize}>{'<'}</button>
                    <button styleName='btn' onClick={this.handleClearBoard}>{'>'}</button>
                </div>
                <div styleName='container'>
                    <div styleName='task'>
                        <h1>{this.props.task}</h1>
                    </div>
                    <input type='text' onBlur={this.handleSetTask}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        task: state.calendar.task
    };
}

export default connect(mapStateToProps, { setTask })(Layout);
