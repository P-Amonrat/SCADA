import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Users, UserPlus, UserCheck, Inbox, Airplay, FolderMinus, FileMinus } from 'react-feather'

export default [
  {
    header: 'Reports'
  },
  {
    id: 'report1',
    title: 'Data Historical Report', // PLHSSVR1N 
    icon: <Airplay size={20} />,
    navLink: '/report/HistoricalReport'
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
  },
  {
    id: 'profiles',
    title: 'Profiles',
    icon: <Users size={20} />,
    children: [
      {
        id: 'add-profile',
        title: 'Add', // PLHSSVR1N 
        // icon: <UserPlus size={20} />,
        navLink: '/profiles/add'
      },
      {
        id: 'main-profile',
        title: 'List Profiles', // PLHSSVR1N 
        // icon: <UserCheck size={20} />,
        navLink: '/profiles/list'
      },
      {
        id: 'auth-profile',
        title: 'Authorize Profile', // PLHSSVR1N 
        // icon: <UserCheck size={20} />,
        navLink: '/profiles/authorize'
      }
    ]
  }
]
