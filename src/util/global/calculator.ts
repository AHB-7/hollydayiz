/**
 * Calculates the number of days between two dates in a date range.
 *
 * @param {[Date, Date] | null} range - A tuple containing two dates representing the range. If `null`, the result is `0`.
 * @returns {number} The number of days between the two dates. Returns `0` if the range is `null`.
 *
 * @example
 * // Example usage:
 * const range: [Date, Date] = [new Date("2023-01-01"), new Date("2023-01-05")];
 * const days = calculateDays(range);
 * console.log(days); // Output: 4
 */

export const calculateDays = (range: [Date, Date] | null): number =>
    range
        ? Math.ceil(
              (range[1].getTime() - range[0].getTime()) / (1000 * 60 * 60 * 24)
          )
        : 0;
