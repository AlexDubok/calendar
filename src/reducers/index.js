import { combineReducers } from 'redux';
import dialog from './dialog-reducer';
import tasks from './task-reducer';
import view from './displayed-reducer';

export default combineReducers({
    dialog,
    tasks,
    view
});
