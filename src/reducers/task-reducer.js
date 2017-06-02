const initialState = {
    '2017-06-01': [ {
        startTime  : '09:00',
        endTime    : '12:30',
        description: 'Default description',
        title      : 'Default title'
    } ]
};

export default function inputs(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
