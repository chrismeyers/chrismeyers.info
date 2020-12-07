import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthAPI from '@/utils/api/auth';
import AboutPage from '@/components/AboutPage';
import ResumePage from '@/components/ResumePage';
import ProjectsPage from '@/components/ProjectsPage';
import BuildsPage from '@/components/BuildsPage';
import LoginPage from '@/components/LoginPage';
import DashboardHome from '@/components/dashboard/DashboardHome';
import DashboardImages from '@/components/dashboard/DashboardImages';
import DashboardBuilds from '@/components/dashboard/DashboardBuilds';
import DashboardProjects from '@/components/dashboard/DashboardProjects';
import DashboardAccount from '@/components/dashboard/DashboardAccount';
import NotFoundPage from '@/components/NotFoundPage';
import { API_TOKEN_KEY } from '@/store/constants';

Vue.use(VueRouter);

const defaultTitle = 'Chris Meyers - Developer, Tech Enthusiast';

const formatPageTitle = (name) => {
  // Remove hyphens and "page"
  return name
    .toLowerCase()
    .split('-')
    .filter((s) => s !== 'page')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1));
};

const formatDashboardTitle = (name) => {
  // Capitalize each word and surround hyphens with spaces
  return name
    .toLowerCase()
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' - ');
};

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            selector: to.hash,
          });
        }, 250);
      });
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: '/',
      component: AboutPage,
      meta: {
        secure: false,
        title: defaultTitle,
      },
    },
    {
      path: '/resume',
      component: ResumePage,
      meta: {
        secure: false,
        title: defaultTitle,
      },
    },
    {
      path: '/builds',
      component: BuildsPage,
      meta: {
        secure: false,
        title: defaultTitle,
      },
    },
    {
      path: '/projects',
      component: ProjectsPage,
      meta: {
        secure: false,
        title: defaultTitle,
      },
    },
    {
      path: '/login',
      component: LoginPage,
      meta: {
        secure: false,
        title: formatPageTitle(LoginPage.name),
      },
    },
    {
      path: '/dashboard',
      component: DashboardHome,
      meta: {
        secure: true,
        title: formatDashboardTitle(DashboardHome.name),
      },
      children: [
        {
          path: 'images',
          component: DashboardImages,
          meta: {
            secure: true,
            title: formatDashboardTitle(DashboardImages.name),
          },
        },
        {
          path: 'builds',
          component: DashboardBuilds,
          meta: {
            secure: true,
            title: formatDashboardTitle(DashboardBuilds.name),
          },
        },
        {
          path: 'projects',
          component: DashboardProjects,
          meta: {
            secure: true,
            title: formatDashboardTitle(DashboardProjects.name),
          },
        },
        {
          path: 'account',
          component: DashboardAccount,
          meta: {
            secure: true,
            title: formatDashboardTitle(DashboardAccount.name),
          },
        },
      ],
    },
    {
      path: '*',
      component: NotFoundPage,
      meta: {
        secure: false,
        title: defaultTitle,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  let match, authorized;

  // Update the HTML title
  document.title = to.meta.title;

  // Checking if valid cookie exists, skips login if true
  if (to.fullPath === '/login') {
    match = document.cookie.match(new RegExp(`(^| )${API_TOKEN_KEY}=([^]+)`));

    if (match === null) {
      return next();
    }

    authorized = await AuthAPI.checkLoggedIn(document.cookie.match(match[2]));

    // Checking if valid cookie exists before going to secure page.
    // Redirects to login if false, continues if true.
    if (!authorized) {
      next();
    } else {
      next('/dashboard');
    }
  } else if (to.matched.some((record) => record.meta.secure)) {
    match = document.cookie.match(new RegExp(`(^| )${API_TOKEN_KEY}=([^]+)`));

    if (match === null) {
      return next('/login');
    }

    authorized = await AuthAPI.checkLoggedIn(document.cookie.match(match[2]));

    if (!authorized) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
