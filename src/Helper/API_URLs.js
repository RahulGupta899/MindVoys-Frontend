const {REACT_APP_BACKEND_API} = process.env

export const API_URLs = {
    oldestAndNewDates_API:              `${REACT_APP_BACKEND_API}/api/get-oldest-and-newest-date`,
    transcriptionsDateWise_API:         `${REACT_APP_BACKEND_API}/api/generate-datewise-quality-score`,
    qualityScore_In_Date_Range_API:     `${REACT_APP_BACKEND_API}/api/generate-date-range-quality-score`,
}
