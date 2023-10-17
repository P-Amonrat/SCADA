// ** Routes Imports
import AppRoutes from './Apps'
import FormRoutes from './Forms'
import PagesRoutes from './Pages'
import TablesRoutes from './Tables'
import ChartMapsRoutes from './ChartsMaps'
import DashboardRoutes from './Dashboards'
import UiElementRoutes from './UiElements'
import ExtensionsRoutes from './Extensions'
import PageLayoutsRoutes from './PageLayouts'

//
import ReportRoutes from './Report'
import ProfilesRoutes from './Profiles'
import UsersRoutes from './Users'

// ** Document title
const TemplateTitle = '%s - Scada'

// ** Default Route
let DefaultRoute
const role = localStorage.getItem('role')
if (role === "GMDR_ADMIN") {
   DefaultRoute = '/report/DailyReport'
} else {
  DefaultRoute = '/report/HistoricalReport'
}

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...AppRoutes,
  ...PagesRoutes,
  ...UiElementRoutes,
  ...ExtensionsRoutes,
  ...PageLayoutsRoutes,
  ...FormRoutes,
  ...TablesRoutes,
  ...ChartMapsRoutes,

  ...ReportRoutes,
  ...ProfilesRoutes,
  ...UsersRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
