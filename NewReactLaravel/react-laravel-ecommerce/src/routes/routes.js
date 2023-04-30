import Category from "../components/admin/category/Category";
import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import ViewCategory from "../components/admin/category/ViewCategory";
import EditCategory from "../components/admin/category/EditCategory";
import AddProduct from "../components/admin/product/AddProduct";


const routes = [
    {
        path: '/admin',
        exact: true,
        name: 'Admin',

    },
    {
        path: '/admin/dashboard',
        name: 'Dashboard',
        exact: true,
        component: Dashboard,
    },
    {
        path: '/admin/profile',
        name: 'Profile',
        exact: true,
        component: Profile,
    },
    {
        path: '/admin/add-category',
        name: 'Category',
        exact: true,
        component: Category,
    },
    {
        path: '/admin/view-category',
        name: 'ViewCategory',
        exact: true,
        component: ViewCategory,
    },
    {
        path: '/admin/edit-catgeory/:id',
        name: 'EditCategory',
        exact: true,
        component: EditCategory,
    },
    {
        path: '/admin/add-product',
        name: 'AddProduct',
        exact: true,
        component: AddProduct,
    },
];

export default routes;