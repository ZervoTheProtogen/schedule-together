import { Layout, List, AddEdit } from '@/views/users';
import { Dashboard } from '@/views/admin'; 

export default {
    path: '/admin',
    component: Layout,
    children: [
        { path: '', redirect: 'dashboard' },
        { path: 'dashboard', component: Dashboard },
        { path: 'users', component: List },
        { path: 'users/add', component: AddEdit },
        { path: 'users/edit/:id', component: AddEdit }
    ]
};