/**
 * Formats the *timestamp* in accordance to *timeFormat*.
 * 
 * @param {string} timeFormat - format can be 12h or 24h
 * @param {number} timestamp - The timestamp to format.
 * @returns {string} A string with the time stamp formatted.
 */
const formatTime = (timeFormat, timestamp) => {
  const dt = new Date(timestamp);
  const mins = dt.getMinutes();

  const formattedMins = mins < 10 ? "0" + mins : mins;
  let hours = dt.getHours();
  let ampm = "";

  if (timeFormat === "12h") {
    ampm = hours < 12 ? " am" : " pm";
    hours = hours % 12;
  }
  const formattedHours = hours < 10 ? "0" + hours : hours;
  const dateStr = `${formattedHours}:${formattedMins}${ampm}`;

  return dateStr;
};

export default formatTime;
