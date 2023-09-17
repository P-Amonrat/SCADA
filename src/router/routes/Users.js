import { lazy } from 'react'

const UsersRoutes = [
  {
    path: '/users/add',
    component: lazy(() => import('../../views/users/AddUsers/AddUsers'))
  },
  {
    path: '/users/list',
    component: lazy(() => import('../../views/users/UserList/UserList'))
  }
]

export default UsersRoutes
