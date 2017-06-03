export const DIALOG_OPEN = 'SET_TASK';
export const DIALOG_CLOSE = 'DIALOG_CLOSE';

export function openDialog(params) {
    const { position, startTime } = params;

    return {
        type: DIALOG_OPEN,
        position,
        startTime
    };
}

export function closeDialog() {
    return {
        type: DIALOG_CLOSE
    };
}
