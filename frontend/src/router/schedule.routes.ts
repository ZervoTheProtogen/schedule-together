import { Layout, Schedule } from '@/views/schedule';
import { Add, SchoolSoft, Skola24 } from '@/views/schedule/add';

export default {
    path: '/schedule',
    component: Layout,
    children: [
        { path: '', component: Schedule },
        { path: 'add', component: Add },
        { path: 'add/schoolsoft', component: SchoolSoft },
        { path: 'add/skola24', component: Skola24 }
    ]
};