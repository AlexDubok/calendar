import { SET_TASK } from '../actions/calendar-actions';

const initialState = {
    task: 'no task'
};

export default function inputs(state = initialState, action) {
    switch (action.type) {
        case (SET_TASK):
            return { ...state, task: action.payload.task };
        default:
            return state;
    }
}
