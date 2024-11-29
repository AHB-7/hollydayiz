/**
 * CalendarComponent is a reusable calendar component that allows users to select a date range,
 * manage unavailable dates, and apply custom styles to calendar tiles.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {[Date, Date] | null} props.dateRange - The currently selected date range. `null` if no range is selected.
 * @param {(range: [Date, Date]) => void} props.setDateRange - Callback to update the selected date range.
 * @param {(date: Date) => boolean} props.isDateUnavailable - Function to determine if a specific date is unavailable.
 * @param {({ date }: { date: Date }) => string} props.getTileClassName - Function to provide custom class names for calendar tiles.
 *
 * @example
 * // Example usage:
 * const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
 * const isDateUnavailable = (date: Date) => date.getDay() === 0; // Disable Sundays
 * const getTileClassName = ({ date }) => {
 *   if (date.getDay() === 6) return "highlight-saturday";
 *   return "";
 * };
 *
 * <CalendarComponent
 *   dateRange={dateRange}
 *   setDateRange={setDateRange}
 *   isDateUnavailable={isDateUnavailable}
 *   getTileClassName={getTileClassName}
 * />
 */

import React from "react";
import { StyledCalendar } from "../../styles/index";
import { CalendarComponentProps } from "../../types/global";

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
