import moment from 'moment';
import { DATE_SELECT } from '../actions/displayed-actions';

const initialState = {
    selected: moment()
};

export const getToday = () => moment(); // eslint-disable-line

export default function inputs(state = initialState, action) {
    switch (action.type) {
        case (DATE_SELECT): {
            return { ...state, selected: action.selected };
        }
        default:
            return state;
    }
}
