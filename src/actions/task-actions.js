import uuid from 'uuid';
import { DIALOG_CLOSE } from './dialog-actions';

export const TASK_SAVE = 'TASK_SAVE';
export const TASK_UPDATE = 'TASK_UPDATE';
export const TASK_DELETE = 'TASK_DELETE';

export function saveTask(taskKey, taskObj) {
    const newId = taskObj.id ? taskObj.id : uuid.v4();
    const newTask = {
        multiDay: false,
        ...taskObj,
        id      : newId
    };

    if (taskObj.id) {
        return (dispatch) => {
            dispatch({
                type: TASK_UPDATE,
                key : taskKey,
                task: newTask
            });
            dispatch({
                type: DIALOG_CLOSE
            });
        };
    }


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

export function deleteTask(taskKey, task) {
    return {
        type: TASK_DELETE,
        key : taskKey,
        task
    };
}
