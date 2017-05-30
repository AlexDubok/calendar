import moment from 'moment';

const initialState = {
    year : moment().year(),
    month: moment().month(),
    week : moment().week(),
    day  : moment().day()
};

export default function inputs(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
