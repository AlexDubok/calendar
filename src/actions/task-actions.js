import uuid from 'uuid';
import { TASK_SAVE } from '../store/constants';
import { DIALOG_CLOSE } from './dialog-actions';

export function saveTask(taskKey, taskObj) {
    let newId;

    if (!taskObj.id) {
        newId = uuid.v4();
    }

    return (dispatch) => {
        const newTask = {
            id      : newId,
            multiDay: false,
            ...taskObj
        };

        dispatch({
            type: TASK_SAVE,
            key : taskKey,
            task: newTask
        });
        dispatch({
            type: DIALOG_CLOSE
        });
    };
}
