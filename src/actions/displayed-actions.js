// import moment from 'moment';

export const DATE_SELECT = 'DATE_SELECT';

export function selectDate(dateObj) {
    return {
        type    : DATE_SELECT,
        selected: dateObj
    };
}

