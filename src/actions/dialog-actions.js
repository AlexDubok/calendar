export const DIALOG_OPEN = 'DIALOG_OPEN';
export const DIALOG_CLOSE = 'DIALOG_CLOSE';

export function openDialog({ taskKey, taskId, startTime }) {
    return {
        type   : DIALOG_OPEN,
        payload: {
            startTime,
            taskId,
            taskKey
        }
    };
}

export function closeDialog() {
    return {
        type: DIALOG_CLOSE
    };
}
