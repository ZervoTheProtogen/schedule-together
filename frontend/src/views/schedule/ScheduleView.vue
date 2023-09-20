<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div>
        <div style="text-align: center;">
            <p>ScheduleView</p>
            <p><router-link to="/schedule/add">Add Schedule</router-link></p>
        </div>
    </div>
</template>