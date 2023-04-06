import { createRouter, createWebHistory } from "vue-router";
import homeAdminIndex from '../components/admin/home/index.vue';
import adminAboutIndex from '../components/admin/about/index.vue';
import homePageIndex from '../components/pages/home/index.vue';
import Register from '../components/auth/register.vue';
import login from '../components/auth/login.vue';
import adminServiceIndex from '../components/admin/services/index.vue'
import adminSkillIndex from '../components/admin/skills/index.vue'
import adminExperienceIndex from '../components/admin/experiences/index.vue'
import adminProjectIndex from '../components/admin/projects/index.vue'
import adminEducationIndex from '../components/admin/educations/index.vue'
import adminProjectNew from '../components/admin/projects/new.vue'
import adminProjectEdit from '../components/admin/projects/edit.vue'
import adminProductIndex from '../components/admin/shop/Products/Index.vue'
import adminProductShow from '../components/admin/shop/Products/Show.vue'
import adminOrderCheckout from '../components/admin/shop/Order/Checkout.vue'
import adminOrderSummary from '../components/admin/shop/Order/Summary.vue'
import notFound from '../components/notFound.vue';


const routes = [
    {
        path: '/admin/home',
        name: 'adminHome',
        component: homeAdminIndex,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/admin/about',
        name: 'adminAbout',
        component: adminAboutIndex,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/admin/services',
        name: 'adminService',
        component: adminServiceIndex,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/admin/skill',
        name: 'adminSkill',
        component: adminSkillIndex,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/admin/educations',
        name: 'adminEducation',
        component: adminEducationIndex,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/admin/experiences',
        name: 'adminExperience',
        component: adminExperienceIndex,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/admin/projects',
        name: 'adminProject',
        component: adminProjectIndex,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/admin/projects/new',
        name: 'adminProjectNew',
        component: adminProjectNew,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/admin/projects/edit/:id',
        name: 'adminProjectEdit',
        component: adminProjectEdit,
        meta: {
            requiresAuth: true
        },
        props: true
    },

    {
        path: '/',
        name: 'Home',
        component: login,
        meta: {
            requiresAuth: false
        }
    },

    {
        path: '/products',
        name: 'productsindex',
        component: adminProductIndex,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/products/:slug',
        name: 'productsshow',
        component: adminProductShow,
        meta: {
            requiresAuth: true
        }
    },


    {
        path: '/checkout',
        name: 'ordercheckout',
        component: adminOrderCheckout,
        meta: {
            requiresAuth: true
        }
    },


    {
        path: '/summary',
        name: 'ordersummary',
        component: adminOrderSummary,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresAuth: false
        }
    },

    {
        path: '/login',
        name: 'Login',
        component: login,
        meta: {
            requiresAuth: false
        }
    },

    {
        path: '/:patchMatch(.*)*',
        component: notFound,
        name: 'notFound',
        meta: {
            requiresAuth: false
        }
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        return { name: 'Login' }
    }

    if (to.meta.requiresAuth == false && localStorage.getItem('token')) {
        return { name: 'adminHome' }
    }
})

export default router;