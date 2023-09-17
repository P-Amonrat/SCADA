import { lazy } from 'react'

const ProfilesRoutes = [
  {
    path: '/profiles/add',
    component: lazy(() => import('../../views/profiles/AddProfile/add'))
  },
  {
    path: '/profiles/list',
    component: lazy(() => import('../../views/profiles/ProfileList/ProfileList'))
  },
  {
    path: '/profiles/authorize',
    component: lazy(() => import('../../views/profiles/AuthorizeProfile/AuthorizeProfile'))
  }
]

export default ProfilesRoutes
