import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import custom from './Datepicker.less';


class Datepicker extends Component {
    static propTypes = {
        label       : PropTypes.string,
        selectsStart: PropTypes.bool,
        selectsEnd  : PropTypes.bool,
        onDateSelect: PropTypes.func,
        startDate   : PropTypes.object,
        endDate     : PropTypes.object,
        selectedDate: PropTypes.object
    };

    handleChange = date => {
        this.props.onDateSelect(date);
    }

    render() {
        const {
            selectedDate
        } = this.props;

        console.log('selectedDate', selectedDate);

        return (
            <div >
                <div className={custom.input} >
                    <DatePicker
                        dateFormat='YYYY MMMM DD'
                        selected={selectedDate}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }

}

export default Datepicker;
