import { Layout, Schedule, Add } from '@/views/schedule';

export default {
    path: '/schedule',
    component: Layout,
    children: [
        { path: '', component: Schedule },
        { path: 'add', component: Add }
    ]
};