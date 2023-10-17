// ** Navigation sections imports
import apps from './apps'
import webAdmin from './web-admin'
import gasAdmin from './gas-admin'
import tables from './tables'
import others from './others'
import scdaAdmin from './scada-admin'
import uiElements from './ui-elements'
import gmdrAdmin from './gmdr-admin'

// ** Merge & Export
// export default [...dashboards, ...apps, ...pages, ...uiElements, ...forms, ...tables, ...chartsAndMaps, ...others]

// export default [...dashboards, ...apps]

const role = localStorage.getItem('role')
let exportedValue

if (role === "GAS_ADMIN") {
  exportedValue = [...gasAdmin]
} else if (role === "GMDR_ADMIN") {
  exportedValue = [...gmdrAdmin]
} else if (role === "SCADA_ADMIN") {
  exportedValue = [...scdaAdmin]
} else if (role === "ADMIN_ROOT") {
  exportedValue = [...webAdmin]
} else {
  exportedValue = [...apps]
}

export default exportedValue
