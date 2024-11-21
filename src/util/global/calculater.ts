export const calculateDays = (range: [Date, Date] | null): number =>
    range
        ? Math.ceil(
              (range[1].getTime() - range[0].getTime()) / (1000 * 60 * 60 * 24)
          )
        : 0;
