import { Layout, Schedule } from '@/views/schedule';

export default {
    path: '/schedule',
    component: Layout,
    children: [
        { path: '', component: Schedule }
    ]
};