import Vue from 'vue';
import VueRouter from 'vue-router';
import AboutPage from '@/components/AboutPage';
import ResumePage from '@/components/ResumePage';
import ProjectPage from '@/components/ProjectPage';
import ProjectsPage from '@/components/ProjectsPage';
import BuildPage from '@/components/BuildPage';
import BuildsPage from '@/components/BuildsPage';
import NotFoundPage from '@/components/NotFoundPage';
import { DEFAULT_DOCUMENT_TITLE } from '@/store/constants';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
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
        title: DEFAULT_DOCUMENT_TITLE,
      },
    },
    {
      path: '/resume',
      component: ResumePage,
      meta: {
        secure: false,
        title: `Résumé | ${DEFAULT_DOCUMENT_TITLE}`,
      },
    },
    {
      path: '/projects',
      component: ProjectsPage,
      meta: {
        secure: false,
        title: `Projects | ${DEFAULT_DOCUMENT_TITLE}`,
      },
    },
    {
      path: '/projects/:id',
      component: ProjectPage,
      meta: {
        secure: false,
        title: false,
      },
    },
    {
      path: '/builds',
      component: BuildsPage,
      meta: {
        secure: false,
        title: `Builds | ${DEFAULT_DOCUMENT_TITLE}`,
      },
    },
    {
      path: '/builds/:id',
      component: BuildPage,
      meta: {
        secure: false,
        title: false,
      },
    },
    {
      path: '*',
      component: NotFoundPage,
      meta: {
        secure: false,
        title: `404 | ${DEFAULT_DOCUMENT_TITLE}`,
      },
    },
  ],
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    if (to.meta.title !== false) {
      document.title = to.meta.title;
    }
  });
});

export default router;
