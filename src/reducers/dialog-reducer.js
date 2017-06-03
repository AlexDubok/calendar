import { DIALOG_OPEN, DIALOG_CLOSE } from '../actions/dialog-actions';

const initialState = {
    isOpen   : false,
    position : null,
    startTime: null
};

export default function inputs(state = initialState, action) {
    switch (action.type) {
        case (DIALOG_OPEN):
            return { ...state, isOpen: true, position: action.position, startTime: action.startTime };
        case (DIALOG_CLOSE):
            return { ...state, isOpen: false };
        default:
            return state;
    }
}
