import { type App } from 'vue'
import PrivateView from './private-view.vue'
import PublicView from './public-view.vue'
import KanbanBoard from './components/dragAndDrop/KanbanBoard.vue'
import search from './components/Search.vue'
import TaskTable from './components/TaskTable.vue'
import Button from './components/Button.vue'
import Form from './components/CreateCustomerForm.vue'
import Tasks from './components/tasks.vue'
export function registerViews(app: App): void {
  app.component('PrivateView', PrivateView)
  app.component('PublicView', PublicView)
  app.component('KanbanBoard', KanbanBoard)
  app.component('Search', search)
  app.component('TaskTable', TaskTable)
  app.component('button', Button)
  app.component('CustomerForm', Form)
  app.component('Tasks', Tasks)
}
