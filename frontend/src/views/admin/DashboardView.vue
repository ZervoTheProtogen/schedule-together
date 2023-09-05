<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div v-if="user">
        <div style="text-align: center;">
            <p><router-link to="/admin/users">Manage Users</router-link></p>
        </div>
    </div>
</template>