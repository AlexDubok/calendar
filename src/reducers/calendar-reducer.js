import { SET_TASK } from '../actions/calendar-actions';

const initialState = {
    tasks : { '2017-05-31': true },
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
