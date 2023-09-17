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
  },
  {
    id: 'users',
    title: 'Users',
    icon: <User size={20} />,
    children: [
      {
        id: 'add-user',
        title: 'Add', // PLHSSVR1N 
        // icon: <UserPlus size={20} />,
        navLink: '/users/add'
      },
      {
        id: 'main-user',
        title: 'List Users', // PLHSSVR1N 
        // icon: <UserCheck size={20} />,
        navLink: '/users/list'
      }
    ]
  }
  
  // {
  //   id: 'email',
  //   title: 'Email',
  //   icon: <Mail size={20} />,
  //   navLink: '/apps/email'
  // },
  // {
  //   id: 'chat',
  //   title: 'Chat',
  //   icon: <MessageSquare size={20} />,
  //   navLink: '/apps/chat'
  // },
  // {
  //   id: 'todo',
  //   title: 'Todo',
  //   icon: <CheckSquare size={20} />,
  //   navLink: '/apps/todo'
  // },
  // {
  //   id: 'calendar',
  //   title: 'Calendar',
  //   icon: <Calendar size={20} />,
  //   navLink: '/apps/calendar'
  // },
  // {
  //   id: 'invoiceApp',
  //   title: 'Invoice',
  //   icon: <FileText size={20} />,
  //   children: [
  //     {
  //       id: 'invoiceList',
  //       title: 'List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/list'
  //     },
  //     {
  //       id: 'invoicePreview',
  //       title: 'Preview',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/preview'
  //     },
  //     {
  //       id: 'invoiceEdit',
  //       title: 'Edit',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/edit'
  //     },
  //     {
  //       id: 'invoiceAdd',
  //       title: 'Add',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/add'
  //     }
  //   ]
  // },
  // {
  //   id: 'eCommerce',
  //   title: 'eCommerce',
  //   icon: <ShoppingCart size={20} />,
  //   children: [
  //     {
  //       id: 'shop',
  //       title: 'Shop',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/shop'
  //     },
  //     {
  //       id: 'detail',
  //       title: 'Details',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/product-detail'
  //     },
  //     {
  //       id: 'wishList',
  //       title: 'Wish List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/wishlist'
  //     },
  //     {
  //       id: 'checkout',
  //       title: 'Checkout',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/checkout'
  //     }
  //   ]
  // },
  // {
  //   id: 'users',
  //   title: 'User',
  //   icon: <User size={20} />,
  //   children: [
  //     {
  //       id: 'list',
  //       title: 'List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/list'
  //     },
  //     {
  //       id: 'view',
  //       title: 'View',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/view'
  //     },
  //     {
  //       id: 'edit',
  //       title: 'Edit',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/edit'
  //     }
  //   ]
  // }
]
