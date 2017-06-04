import { throttledSaveState } from './task-actions';

export const DATE_SELECT = 'DATE_SELECT';

export function selectDate(dateObj) {
    return (dispatch, getState) => {
        dispatch({
            type    : DATE_SELECT,
            selected: dateObj
        });
        throttledSaveState(getState());
    };
}

