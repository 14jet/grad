const getLocalTimeString = (
  originalDate,
  options = {
    time: true,
  }
) => {
  const adjustedTimestamp = originalDate.getTime() + 420 * 60000;
  const date = new Date(adjustedTimestamp);
  const y = date.getUTCFullYear();
  const M = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  const h = date.getUTCHours();
  const m = date.getUTCMinutes();

  if (!options?.time) return `${d}/${M}/${y}`;

  return `${h}:${m} ${d}/${M}/${y}`;
};

module.exports = getLocalTimeString;
