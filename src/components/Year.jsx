import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Month from './Month.jsx';
import './Year.less';

class Year extends PureComponent {
    static propTypes = {
        selected: PropTypes.object,
        tasks   : PropTypes.object
    }

    renderMonths = () => {
        const { selected, tasks } = this.props;
        const startOfYear = selected.clone().startOf('year').startOf('month');

        const months = Array(12).fill(null)
            .map((m, i) => {
                const currentMonth = startOfYear.clone().add(i, 'month');

                return (
                    <div key={currentMonth.format('YY-MM')} styleName='monthContainer'>
                        <div styleName='name'>{currentMonth.format('MMMM')}</div>
                        <Month
                            selected={currentMonth}
                            tasks={tasks}
                            small
                        />
                    </div>
                );
            });

        return months;
    }

    render() {
        return (
            <div styleName='Year' >
                {this.renderMonths()}
            </div>
        );
    }
}

export default Year;
