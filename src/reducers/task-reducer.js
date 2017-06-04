import { TASK_SAVE } from '../store/constants';

const initialState = {
    '2017-06-01': [
        {
            id         : 'defaultId', // uuid
            title      : 'Default title',
            multiDay   : false,
            daysTotal  : 1,
            startTime  : '2017-06-01_09:00', // format('YYYY-MM-DD_HH:mm')
            endTime    : '2017-06-01_12:30', // format('YYYY-MM-DD_HH:mm')
            description: 'Default description'
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
        default:
            return state;
    }
}
