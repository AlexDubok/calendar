import { combineReducers } from 'redux';
import dialog from './dialog-reducer';
import tasks from './task-reducer';

export default combineReducers({
    dialog,
    tasks
});
