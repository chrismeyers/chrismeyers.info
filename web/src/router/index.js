import Vue from "vue"
import VueRouter from "vue-router"
import AuthApi from "@/utils/api/auth"
import About from "@/components/About"
import Resume from "@/components/Resume"
import Builds from "@/components/Builds"
import Projects from "@/components/Projects"
import Login from "@/components/Login"
import Dashboard from "@/components/dashboard/Dashboard"
import DashboardImages from "@/components/dashboard/DashboardImages"
import DashboardBuilds from "@/components/dashboard/DashboardBuilds"
import DashboardProjects from "@/components/dashboard/DashboardProjects"

Vue.use(VueRouter)

var router = new VueRouter({
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
        secure: false
      }
    },
    {
      path: "/resume",
      name: "Resume",
      component: Resume,
      meta: {
        secure: false
      }
    },
    {
      path: "/builds",
      name: "Builds",
      component: Builds,
      meta: {
        secure: false
      }
    },
    {
      path: "/projects",
      name: "Projects",
      component: Projects,
      meta: {
        secure: false
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        secure: false
      }
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        secure: true
      },
      children: [
        {
          path: "images",
          component: DashboardImages
        },
        {
          path: "builds",
          component: DashboardBuilds
        },
        {
          path: "projects",
          component: DashboardProjects
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  var match, authorized;

  // Checking if valid cookie exists, skips login if true
  if(to.fullPath === "/login") {
    match = document.cookie.match(
      new RegExp("(^| )" + "chrismeyers_info_apiToken" + "=([^;]+)")
    );

    if(match === null) {
      return next();
    }

    authorized = await AuthApi.checkLoggedIn(
      document.cookie.match(match[2])
    );

    // Checking if valid cookie exists before going to secure page.
    // Redirects to login if false, continues if true.
    if(!authorized) {
      next();
    }
    else {
      next("/dashboard");
    }
  }
  else if(to.matched.some(record => record.meta.secure)) {
    match = document.cookie.match(
      new RegExp("(^| )" + "chrismeyers_info_apiToken" + "=([^;]+)")
    );

    if(match === null) {
      return next("/login");
    }

    authorized = await AuthApi.checkLoggedIn(
      document.cookie.match(match[2])
    );

    if(!authorized) {
      next("/login");
    }
    else {
      next();
    }
  }
  else {
    next();
  }
});

export default router
