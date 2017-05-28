import { saveState } from '../utils/localStorageUtils.js';


export const SET_TASK = 'SET_TASK';

export function setTask(task) {
    return (dispatch, getState) => {
        dispatch({ type   : SET_TASK,
            payload: { task },
            meta   : {
                offline: {
                // the network action to execute:
                    effect  : { url: '/api/follow', method: 'POST', body: { task } },
                // action to dispatch when effect succeeds:
                    commit  : { type: SET_TASK, meta: { task } },
                // action to dispatch if network action fails permanently:
                    rollback: { type: SET_TASK, meta: { task } }
                }
            }
        });
        saveState(getState());
    };
}
