import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './Timeline.less';

const TIME_FORMAT = 'YYYY-MM-DD_HH:mm';

class Timeline extends PureComponent {
    static propTypes = {
        dayKey: PropTypes.string,
        tasks : PropTypes.object
    }

    state = {
        editing  : false,
        activeDay: null
    }


    handleCreateTask = () => {
        // this.props.openTaskDialog(i);
    }

    handleDefineArea = (e) => {
        if (this.state.editing) {
            console.log(e.target.getAttribute('data-time'));
        }
    }

    handleStartEditing = () => {
        console.log('start');
        this.setState({ editing: true });
    }

    handleStopEditing = () => {
        if (this.state.editing) {
            console.log('stop');
            this.setState({ editing: false });
        }
    };

    renderTimeline = (date) => {
        const start = moment(date).startOf('day');

        const hours = Array(48).fill(null)
            .map((hour, i) => {
                const time = start.clone().add(i * 30, 'minutes').format(TIME_FORMAT);

                return (
                    <div
                        key={time}
                        styleName='timeframe'
                        data-time={time}
                        onClick={this.handleCreateTask}
                        onMouseDown={this.handleStartEditing}
                        onMouseOver={this.handleDefineArea}
                        onMouseUp={this.handleStopEditing}
                    />
                );
            });

        return hours;
    }

    render() {
        const { tasks, dayKey } = this.props;

        return (
            <div styleName='Timeline' onMouseLeave={this.handleStopEditing}>
                {this.renderTimeline(dayKey)}
                {
                    tasks && tasks[dayKey] &&
                    tasks[dayKey].map((task, i) => {
                        return (
                            <Task
                                key={i}
                                task={task}
                                maxHeight={800}
                                timeFormat={TIME_FORMAT}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default Timeline;
