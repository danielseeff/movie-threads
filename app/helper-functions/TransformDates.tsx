export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    // Extract hours, minutes, day, month, and year
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear();

    // Determine AM or PM
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Format minutes with leading zero if needed
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

    // Format day and month with leading zero if needed
    const dayFormatted = day < 10 ? `0${day}` : day;
    const monthFormatted = month < 10 ? `0${month}` : month;

    // Combine into desired format
    return `${hours}:${minutesFormatted}${ampm} ${dayFormatted}-${monthFormatted}-${year}`;
}