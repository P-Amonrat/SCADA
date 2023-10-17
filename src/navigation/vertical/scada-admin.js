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
