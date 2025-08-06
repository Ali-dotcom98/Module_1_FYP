import moment from "moment";

export function formatYearMonth(yearMonth) {
    return yearMonth
        ? moment(yearMonth, "YYYY-MM-DD").format("MMM DD, YYYY")
        : "";
}
