import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./react-datepicker.css"

const DatePick = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
            <div className="date-picker-container-1">
            <DatePicker selected={new Date()} />
        </div>
            <div className="date-picker-container-2">
                <DatePicker selected={new Date()} />
            </div>
        </div>
    );
};

export default DatePick;