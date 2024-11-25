import React from "react";
import { StyledCalendar } from "../../styles/index";

interface CalendarComponentProps {
    dateRange: [Date, Date] | null;
    setDateRange: (range: [Date, Date]) => void;
    isDateUnavailable: (date: Date) => boolean;
    getTileClassName: ({ date }: { date: Date }) => string;
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({
    dateRange,
    setDateRange,
    isDateUnavailable,
    getTileClassName,
}) => {
    return (
        <StyledCalendar
            selectRange
            onChange={(range) => setDateRange(range as [Date, Date])}
            value={dateRange}
            tileDisabled={({ date }) => isDateUnavailable(date)}
            tileClassName={getTileClassName}
        />
    );
};

export default CalendarComponent;
