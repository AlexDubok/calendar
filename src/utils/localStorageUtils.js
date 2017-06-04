const stateID = 'calendar-state';

export function loadState() {
    try {
        const serializedData = localStorage.getItem(stateID);

        if (serializedData === null) return undefined;

        return JSON.parse(serializedData);
    } catch (err) {
        return undefined;
    }
}

export function saveState(store) {
    try {
        const state = {
            tasks: store.tasks,
            view : store.view
        };
        const serializedData = JSON.stringify(state);

        localStorage.setItem(stateID, serializedData);
    } catch (err) {
        // some error handlers
        console.log(err);
    }
}
