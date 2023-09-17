import { lazy } from 'react'

const ReportRoutes = [
  {
    path: '/loginv1',
    component: lazy(() => import('../../views/pages/authentication/LoginV1')),
    layout: 'BlankLayout'
  },
  {
    path: '/report/HistoricalReport',
    component: lazy(() => import('../../views/reports/HistoricalReport'))
  },
  {
    path: '/report/historical-report-gmdr/table',
    component: lazy(() => import('../../views/reports/HistoricalReport/HistoricalReportTable'))
  },
  {
    path: '/report/DailyReport',
    component: lazy(() => import('../../views/reports/DailyReport'))
  },
  {
    path: '/report/daily-report-gmdr/table',
    component: lazy(() => import('../../views/reports/DailyReport/DailyReportTable'))
  },
  {
    path: '/report/HourlyReport',
    component: lazy(() => import('../../views/reports/HourlyReport'))
  },
  {
    path: '/report/hourly-report-gmdr/table',
    component: lazy(() => import('../../views/reports/HourlyReport/HourlyReportTable'))
  },
  {
    path: '/report/CheckReport',
    component: lazy(() => import('../../views/reports/CheckReport'))
  },
  {
    path: '/report/check-report-gmdr/table',
    component: lazy(() => import('../../views/reports/CheckReport/CheckReportTable'))
  }
]

export default ReportRoutes
