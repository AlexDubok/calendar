export const DIALOG_OPEN = 'SET_TASK';
export const DIALOG_CLOSE = 'DIALOG_CLOSE';

export function openDialog(startTime) {
    return {
        type: DIALOG_OPEN,
        startTime
    };
}

export function closeDialog() {
    return {
        type: DIALOG_CLOSE
    };
}
