import Category from "../components/admin/category/Category";
import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import ViewCategory from "../components/admin/category/ViewCategory";
import EditCategory from "../components/admin/category/EditCategory";
import AddProduct from "../components/admin/product/AddProduct";
import ViewProduct from "../components/admin/product/ViewProduct";
import EditProduct from "../components/admin/product/EditProduct";


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
    {
        path: '/admin/view-product',
        name: 'ViewProduct',
        exact: true,
        component: ViewProduct,
    },
    {
        path: '/admin/edits-product/:id',
        name: 'EditProduct',
        exact: true,
        component: EditProduct,
    },
];

export default routes;