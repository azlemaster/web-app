import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Events from '@/components/Events/Index'
import CreateEvent from '@/components/CreateEvent'
import EditEvent from '@/components/EditEvent'
import ViewEvent from '@/components/ViewEvent/Index'
import Profil from '@/components/Profil'
import YourEvents from '@/components/YourEvents'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profil',
      name: 'profil',
      component: Profil
    },
    {
      path: '/your_events',
      name: 'your_events',
      component: YourEvents
    },
    {
      path: '/events',
      name: 'events',
      component: Events
    },
    {
      path: '/events/create',
      name: 'events-create',
      component: CreateEvent
    },
    {
      path: '/events/:eventId',
      name: 'event',
      component: ViewEvent
    },
    {
      path: '/events/:eventId/edit',
      name: 'event-edit',
      component: EditEvent
    },
    {
      path: '*',
      redirect: 'events'
    }
  ]
})
