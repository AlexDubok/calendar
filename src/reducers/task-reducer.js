const initialState = {
    '2017-06-01': [ {
        startTime  : '2017-06-01_09:00', // format('YYYY-MM-DD_HH:mm')
        endTime    : '2017-06-01_12:30', // format('YYYY-MM-DD_HH:mm')
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
