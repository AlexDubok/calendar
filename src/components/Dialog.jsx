import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { saveTask } from '../actions/task-actions.js';
import { TIME_FORMAT } from '../store/constants.js';
import './Dialog.less';

class Dialog extends Component {
    static propTypes = {
        style       : PropTypes.object,
        closeDialog : PropTypes.func,
        saveTask    : PropTypes.func,
        dialogParams: PropTypes.object,
        tasks       : PropTypes.object
    }

    state = {
        title      : 'Default title',
        id         : null,
        startDate  : '',
        startTime  : '',
        endDate    : '',
        endTime    : '',
        description: 'no description'
    }

    componentWillMount() {
        const { tasks } = this.props;
        const {
            startTime,
            taskId,
            taskKey
        } = this.props.dialogParams;

        if (!taskId) {
            const [selectedDate, selectedTime] = startTime.split('_');
            const defaultEndTime = moment(selectedTime, 'HH:mm').add(1, 'hour').format('HH:mm');

            this.setState({
                startDate: selectedDate,
                startTime: selectedTime,
                endDate  : selectedDate,
                endTime  : defaultEndTime
            });
        } else {
            const editingTask = tasks[taskKey].filter(task => task.id === taskId)[0];
            const [selectedDate, selectedTime] = editingTask.startTime.split('_');
            const [endDate, endTime] = editingTask.endTime.split('_');

            this.setState({
                id         : taskId,
                title      : editingTask.title,
                startDate  : selectedDate,
                startTime  : selectedTime,
                description: editingTask.description,
                endDate,
                endTime
            });
        }
    }

    handleChange = (e) => {
        const { id, value } = e.target;

        this.delayedInputChange(id, value);
    }

    // eslint-disable-next-line
    delayedInputChange = debounce((id, value) => this.setState({ [id]: value }), 150);

    handleCancel = () => this.props.closeDialog();

    handleSaveTask = () => {
        const {
            id,
            title,
            startDate,
            startTime,
            endDate,
            endTime,
            description
        } = this.state;
        const fullStartTime = [startDate, startTime].join('_');
        const fullEndTime = [endDate, endTime].join('_');

        const newTask = {
            id,
            title,
            startTime: fullStartTime,
            endTime  : fullEndTime,
            description
        };

        if (startDate === endDate) {
            this.props.saveTask(startDate, newTask);
        } else {
            const momentStartTime = moment(fullStartTime, TIME_FORMAT);
            const momentEndTime = moment(fullEndTime, TIME_FORMAT);
            const taskInHours = momentEndTime.diff(momentStartTime, 'hours');

            if (taskInHours <= 24) {
                const task1 = {
                    id,
                    title,
                    startTime: fullStartTime,
                    endTime  : momentStartTime.clone().endOf('day').format(TIME_FORMAT),
                    description
                };
                const task2 = {
                    id,
                    title,
                    startTime: momentEndTime.clone().startOf('day').format(TIME_FORMAT),
                    endTime  : fullEndTime,
                    description
                };

                this.props.saveTask(startDate, task1);
                this.props.saveTask(endDate, task2);
            } else {
                const taskInDays = momentEndTime.diff(momentStartTime, 'days');

                const task = {
                    id,
                    title,
                    multiDay : true,
                    daysTotal: taskInDays + 1, // including last day
                    startTime: fullStartTime,
                    endTime  : fullEndTime,
                    description
                };

                this.props.saveTask(startDate, task);
            }
        }
    }

    handleStopPropagation = (e) => e.stopPropagation();

    render() {
        const {
            title,
            startDate,
            startTime,
            endDate,
            endTime
        } = this.state;

        return (
            <div
                styleName='Dialog'
                onClick={this.handleStopPropagation}
            >
                <div styleName='title'>
                    <input
                        id='title'
                        type='text'
                        placeholder='Task name'
                        defaultValue={title}
                        onChange={this.handleChange}
                    />
                    <button
                        styleName='close'
                        onClick={this.handleCancel}
                    >
                        X
                    </button>
                </div>
                <div styleName='dateSelection'>
                    <div>
                        <input
                            id='startDate'
                            type='date'
                            defaultValue={startDate}
                            onChange={this.handleChange}
                        />
                        <input
                            id='startTime'
                            type='time'
                            defaultValue={startTime}
                            onChange={this.handleChange}
                        />
                    </div>
                    {' — '}
                    <div>
                        <input
                            id='endDate'
                            type='date'
                            defaultValue={endDate}
                            onChange={this.handleChange}
                        />
                        <input
                            id='endTime'
                            type='time'
                            defaultValue={endTime}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div styleName='description'>
                    <textarea id='description' placeholder='Description...' onChange={this.handleChange} />
                </div>
                <div styleName='submit'>
                    <button styleName='cta' onClick={this.handleSaveTask}>Save</button>
                </div>
            </div>
        );
    }
}

export default connect(null, { saveTask })(Dialog);
