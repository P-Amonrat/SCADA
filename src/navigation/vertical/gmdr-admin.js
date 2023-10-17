import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Users, UserPlus, UserCheck, Inbox, Airplay, FolderMinus, FileMinus } from 'react-feather'

export default [
  {
    header: 'Reports'
  },
  {
    id: 'report2',
    title: 'View Daily GMDR', // PLHSSVR1N 
    icon: <Inbox size={20} />,
    navLink: '/report/DailyReport'
  },
  {
    id: 'report3',
    title: 'View Hourly GMDR', // PLHSSVR1N 
    icon: <FileMinus size={20} />,
    navLink: '/report/HourlyReport'
  },
  {
    id: 'report4',
    title: 'View Check GMDR', // PLHSSVR1N 
    icon: <FolderMinus size={20} />,
    navLink: '/report/CheckReport'
  }
]
