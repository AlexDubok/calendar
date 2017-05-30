import { SET_TASK } from '../actions/calendar-actions';

const initialState = {
    task  : 'no task',
    events: [ { // TODO: put this in reducer
        date       : '',
        description: ''
    } ],
    activeView: 'month'
};

export default function inputs(state = initialState, action) {
    switch (action.type) {
        case (SET_TASK):
            return { ...state, task: action.payload.task };
        default:
            return state;
    }
}
