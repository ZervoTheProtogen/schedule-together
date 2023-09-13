<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div v-if="user">
        <div style="text-align: center;">
            <h1>Welcome, {{user.firstName}}!</h1>
            <p>You're logged in sucessfully!!</p>
        </div>
    </div>
</template>