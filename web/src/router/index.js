import Vue from "vue"
import VueRouter from "vue-router"
import AuthAPI from "@/utils/api/auth"
import About from "@/components/About"
import Resume from "@/components/Resume"
import Builds from "@/components/Builds"
import Projects from "@/components/Projects"
import Login from "@/components/Login"
import Dashboard from "@/components/dashboard/Dashboard"
import DashboardImages from "@/components/dashboard/DashboardImages"
import DashboardBuilds from "@/components/dashboard/DashboardBuilds"
import DashboardProjects from "@/components/dashboard/DashboardProjects"
import DashboardAccount from "@/components/dashboard/DashboardAccount"
import NotFound from "@/components/NotFound"
import { API_TOKEN_KEY } from "@/store/constants"

Vue.use(VueRouter)

let defaultTitle = "Chris Meyers - Developer, Tech Enthusiast"

let formatTitle = (name) => {
  // Surround hyphens with spaces
  return name.replace(/([!?-])/g, ' $1 ')
}

let router = new VueRouter({
  mode: "history",
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: "/",
      name: "About",
      component: About,
      meta: {
        secure: false,
        title: defaultTitle
      }
    },
    {
      path: "/resume",
      name: "Resume",
      component: Resume,
      meta: {
        secure: false,
        title: defaultTitle
      }
    },
    {
      path: "/builds",
      name: "Builds",
      component: Builds,
      meta: {
        secure: false,
        title: defaultTitle
      }
    },
    {
      path: "/projects",
      name: "Projects",
      component: Projects,
      meta: {
        secure: false,
        title: defaultTitle
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        secure: false,
        title: formatTitle(Login.name)
      }
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        secure: true,
        title: formatTitle(Dashboard.name)
      },
      children: [
        {
          path: "images",
          component: DashboardImages,
          meta: {
            secure: true,
            title: formatTitle(DashboardImages.name)
          }
        },
        {
          path: "builds",
          component: DashboardBuilds,
          meta: {
            secure: true,
            title: formatTitle(DashboardBuilds.name)
          }
        },
        {
          path: "projects",
          component: DashboardProjects,
          meta: {
            secure: true,
            title: formatTitle(DashboardProjects.name)
          }
        },
        {
          path: "account",
          component: DashboardAccount,
          meta: {
            secure: true,
            title: formatTitle(DashboardAccount.name)
          }
        }
      ]
    },
    {
      path: "*",
      component: NotFound,
      meta: {
        secure: false,
        title: defaultTitle
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  let match, authorized

  // Update the HTML title
  document.title = to.meta.title

  // Checking if valid cookie exists, skips login if true
  if(to.fullPath === "/login") {
    match = document.cookie.match(
      new RegExp(`(^| )${API_TOKEN_KEY}=([^]+)`)
    )

    if(match === null) {
      return next()
    }

    authorized = await AuthAPI.checkLoggedIn(
      document.cookie.match(match[2])
    )

    // Checking if valid cookie exists before going to secure page.
    // Redirects to login if false, continues if true.
    if(!authorized) {
      next()
    }
    else {
      next("/dashboard")
    }
  }
  else if(to.matched.some(record => record.meta.secure)) {
    match = document.cookie.match(
      new RegExp(`(^| )${API_TOKEN_KEY}=([^]+)`)
    )

    if(match === null) {
      return next("/login")
    }

    authorized = await AuthAPI.checkLoggedIn(
      document.cookie.match(match[2])
    )

    if(!authorized) {
      next("/login")
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
