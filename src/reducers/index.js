import { combineReducers } from 'redux';
import calendar from './calendar-reducer';
import displayed from './displayed-reducer';
import selected from './selected-reducer';

export default combineReducers({
    calendar,
    displayed,
    selected
});
