export function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor(t / 1000 % 60);
  const minutes = Math.floor(t / 1000 / 60 % 60);
  const hours = Math.floor(t / (1000 * 60 * 60) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days,
    hours,
    minutes,
    seconds: seconds < 10 ? '0' + seconds : seconds,
  };
}
