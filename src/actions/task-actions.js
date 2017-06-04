import uuid from 'uuid';
import { TASK_SAVE } from '../store/constants';
import { DIALOG_CLOSE } from './dialog-actions';

export function saveTask(taskKey, taskObj) {
    const newId = taskObj.id ? taskObj.id : uuid.v4();
    const newTask = {
        ...taskObj,
        id: newId
    };

    return (dispatch) => {
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
