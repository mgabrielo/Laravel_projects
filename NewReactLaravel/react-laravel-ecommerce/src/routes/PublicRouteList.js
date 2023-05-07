import About from "../components/frontend/About";
import Cart from "../components/frontend/Cart";
import Contact from "../components/frontend/Contact";
import Home from "../components/frontend/Home";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import ProductDetail from "../components/frontend/collections/ProductDetail";
import ViewCategory from "../components/frontend/collections/ViewCategory";
import ViewProduct from "../components/frontend/collections/ViewProduct";


const public_routes_list = [
    {
        path: '/',
        name: 'Home',
        exact: true,
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        exact: true,
        component: About,
    },
    {
        path: '/contact',
        name: 'Contact',
        exact: true,
        component: Contact,
    },
    {
        path: '/login',
        name: 'Login',
        exact: true,
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        exact: true,
        component: Register,
    },
    {
        path: '/collections',
        name: 'ViewCategory',
        exact: true,
        component: ViewCategory,
    },
    {
        path: '/collections/:slug',
        name: 'ViewProduct',
        exact: true,
        component: ViewProduct,
    },
    {
        path: '/collections/:category/:product',
        name: 'ProductDetail',
        exact: true,
        component: ProductDetail,
    },
    {
        path: '/cart',
        name: 'Cart',
        exact: true,
        component: Cart,
    },
]

export default public_routes_list;