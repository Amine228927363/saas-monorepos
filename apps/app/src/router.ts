import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { hydrate } from '@/hydrate'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import privateView from './views/private-view.vue'
import publicView from './views/public-view.vue'
import CustomerView from './modules/home/routes/Customers.vue'
import TaskView from './modules/home/routes/Tasks.vue'
import HomeOverview from './modules/home/routes/home-overview.vue'
import LoginRoute from '@/routes/login/login-route.vue'
import RegisterRoute from './routes/register/RegisterRoute.vue'
import ForgotRoute from '@/routes/forgot/forgot-route.vue'
import ResetRoute from '@/routes/reset/reset-route.vue'
import PrivateNotFoundRoute from '@/routes/private-not-found-route.vue'
import CreateTask from '@/views/components/CreateTask.vue'
import CustomerProfil from '@/views/components/CustomerProfil.vue'
import Workspace from '@/views/components/Workspace.vue'
import FirstView from './modules/home/routes/FirstView.vue'
import { useUserStore } from '@/stores/user'
const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/Landing'
  },
  {
    name: 'Landing',
    path: '/Landing',
    component: FirstView,
    meta: {
      public: true
    }
  },
  {
    name: 'workspace',
    path: '/workspace',
    component: Workspace,
    meta: {
      public: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: LoginRoute,
    meta: {
      public: true
    }
  },
  {
    name: 'reset',
    path: '/reset',
    component: ResetRoute,
    meta: {
      public: true
    }
  },
  {
    name: 'forgot',
    path: '/forgot',
    component: ForgotRoute,
    meta: {
      public: true
    }
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterRoute,
    meta: {
      public: true
    }
  },
  {
    name: 'home-overview',
    path: '/home',
    component: HomeOverview,
    meta: {
      public: true
    }
  },
  {
    name: 'customer-view',
    path: '/customer/:workspaceId',
    component: CustomerView,
    meta: {
      public: true
    }
  },
  {
    name: 'task-view',
    path: '/task',
    component: TaskView,
    meta: {
      public: true
    }
  },
  {
    name: 'createTask',
    path: '/Createtask',
    component: CreateTask,
    meta: {
      public: true
    }
  },
  {
    path: '/customer/:id',
    name: 'CustomerProfile',
    component: CustomerProfil,
    props: true
  },
  {
    name: 'private-404',
    path: '/:_(.+)+',
    component: PrivateNotFoundRoute
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: defaultRoutes
})

let firstLoad = true
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  const appStore = useAppStore()
  const userStore = useUserStore()
  // First load
  if (firstLoad) {
    firstLoad = false
    try {
      await authStore.authCheck()
      await appStore.hydrate()
    } catch (err: any) {
      appStore.error = err
    }
  }

  if (to.meta?.public !== true) {
    if (appStore.isHydrated === false) {
      appStore.isHydrating = false
      if (authStore.isAuthenticated) {
        try {
          await hydrate()
        } catch {
          // Ignore error
        }
        return to.fullPath
      } else {
        if (to.fullPath) {
          return '/login?redirect=' + encodeURIComponent(to.fullPath)
        } else {
          return '/login'
        }
      }
    }
  }
})
