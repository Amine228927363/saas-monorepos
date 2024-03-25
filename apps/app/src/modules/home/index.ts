import { defineModule } from '@/utils'
import HomeOverview from './routes/home-overview.vue'
import CustomerView from './routes/Customers.vue'
import TaskView from './routes/Tasks.vue'
export default defineModule({
  id: 'home',
  name: 'home',
  routes: [
    {
      name: 'home-overview',
      path: '',
      component: HomeOverview
    },
    {
      name: 'customer-view',
      path: '/customers',
      component: CustomerView
    },
    {
      name: 'task-view',
      path: '/tasks',
      component: TaskView
    }
  ]
})
