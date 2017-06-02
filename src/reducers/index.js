import { combineReducers } from 'redux';
import calendar from './calendar-reducer';
import displayed from './displayed-reducer';
import tasks from './task-reducer';

export default combineReducers({
    calendar,
    displayed,
    tasks
});
