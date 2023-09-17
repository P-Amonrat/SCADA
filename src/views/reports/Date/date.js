const now = new Date(Date.now())
const Day = new Date()
const todaystart = new Date(now.setHours(0, 0, 0, 0))
const todayend = new Date(now.setHours(23, 59, 59, 99))
const getnewtime = new Date(Date.now())

export const dateTimeRange = {
  dateFormat: 'DD/MM/YYYY',
  timeFormat: 'HH:mm',
  todayStart: new Date(now.setHours(0, 0, 0, 0)),
  todayEnd: new Date(now.setHours(23, 59, 59, 99)),
  yesterdayStart: new Date(todaystart - (60000 * 60 * 24)), //3600 * 24000
  yesterdayEnd: new Date(todayend - (3600 * 24000)),
  lastWeekStart: new Date(now.setDate((now.getDate() - now.getDay() - 7), now.setHours(0, 0, 0, 0))),
  lastWeekdayEnd: new Date(now.setDate((now.getDate() - now.getDay() + 6), now.setHours(23, 59, 59, 99))),
  lastMonthStart: new Date(Day.getFullYear(), (parseInt(Day.getMonth()) - 1), 1, 0, 0, 0, 0),
  lastMonthEnd: new Date(Day.getFullYear(), (parseInt(Day.getMonth())), 0, 23, 59, 59, 99),
  thisMonthStart: new Date(Day.getFullYear(), (parseInt(Day.getMonth())), 1, 0, 0, 0, 0),
  thisMonthEnd: new Date(Day.getFullYear(), (parseInt(Day.getMonth()) + 1), 0, 23, 59, 59, 99),
  getNewTime: new Date(Date.now()),
  last6Hours: new Date(getnewtime.getTime() - (3600 * 6000)),
  last24Hours: new Date(getnewtime.getTime() - (3600 * 24000))
}

export const compareDate = (startDate, endDate) => {
  const start = new Date(startDate?.setHours(0, 0, 0, 0))
  const end = new Date(endDate?.setHours(0, 0, 0, 0))
  if (start.getTime() === end.getTime()) {
    return true
  } else {
    return false
  }
}