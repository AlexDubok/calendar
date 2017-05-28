import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect }              from 'react-redux';
import { setTask }                 from '../actions/calendar-actions.js';
import styles                   from './Layout.less';


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
            <div className={styles.Layout} >
                <div className={styles.controls}>
                    <button className={styles.btn} onClick={this.handleRandomize}>{'<'}</button>
                    <button className={styles.btn} onClick={this.handleClearBoard}>{'>'}</button>
                </div>
                <div className={styles.container}>
                    <div className={styles.task}>
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
