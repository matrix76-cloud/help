import * as React from 'react';
import { useEffect, useState } from 'react';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import './multi-style.css';
const MultipleSelection = () => {
    const [selectedValues, setSelectedValues] = useState([
        new Date(new Date().getFullYear(), new Date().getMonth(), 10),
        new Date(new Date().getFullYear(), new Date().getMonth(), 15),
        new Date(new Date().getFullYear(), new Date().getMonth(), 25),
    ]);
    const onchange = (args) => {
        if (args) {
            setSelectedValues(args.values);
        }
    };
    return (<div className="col-lg-12">
            <div className="col-lg-7 control-section">
                <div id="control_wrapper" className="col-lg-6 col-sm-8 col-md-8 multiselectWrapper">
                    <div className="calendar-control-section">
                        <CalendarComponent id="calendar" isMultiSelection={true} values={selectedValues} change={onchange.bind(this)} created={onchange.bind(this)}></CalendarComponent>
                    </div>
                </div>
            </div>
            <div className="col-lg-5">
                <label style={{ paddingTop: '22px' }}>Selected values</label>
                <div className="content-value">
                    {[...selectedValues].reverse().map((value, index) => (<div key={index}>{value.toString()}</div>))}
                </div>
            </div>
        </div>);
};
export default MultipleSelection;
