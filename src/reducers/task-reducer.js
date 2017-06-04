import { TASK_SAVE, TASK_UPDATE, TASK_DELETE } from '../actions/task-actions';

const initialState = {
    '2017-06-01': [
        {
            id         : 'defaultId', // uuid
            title      : 'DevChallenge Final',
            multiDay   : false,
            daysTotal  : 1,
            startTime  : '2017-06-01_09:00', // format('YYYY-MM-DD_HH:mm')
            endTime    : '2017-06-01_12:30', // format('YYYY-MM-DD_HH:mm')
            description: 'Default description',
            color      : 'green'
        }
    ]
};

export default function inputs(state = initialState, action) {
    switch (action.type) {
        case (TASK_SAVE):
            if (state[action.key]) {
                return { ...state, [action.key]: [...state[action.key], action.task] };
            }

            return { ...state, [action.key]: [ action.task ] };
        case (TASK_UPDATE):
            return {
                ...state,
                [action.key]: [...state[action.key].filter(task => task.id !== action.task.id), action.task]
            };
        case (TASK_DELETE):
            return {
                ...state,
                [action.key]: [ ...state[action.key].filter(task => task.id !== action.task.id) ]
            };
        default:
            return state;
    }
}
