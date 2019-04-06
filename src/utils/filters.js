export function formatSeconds(seconds) {
  if (!seconds || seconds <= 0) return 0
  seconds = parseInt(seconds)
  let minutes = 0
  let hours = 0
  if (seconds > 60) {
    minutes = parseInt(seconds / 60)
    seconds = parseInt(seconds % 60)
    if (minutes > 60) {
      hours = parseInt(minutes / 60)
      minutes = parseInt(minutes % 60)
    }
  }
  let res = `${seconds}秒`
  if (minutes > 0) {
    res = `${minutes}分` + res
  }
  if (hours > 0) {
    res = `${hours}小时` + res
  }
  return res
}
