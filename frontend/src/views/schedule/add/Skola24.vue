<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { router } from '@/router';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div class="content-spacer-smaller"></div>
    <h1 style="text-align: center;">Add Schedule</h1>
    <div class="content-spacer-small"></div>
    <div class="card-container">
        <div class="card">
            <p>Not implemented yet.</p>
            <button class="card-form-button negative" @click="router.push('/schedule/add')">Cancel</button>
        </div>
    </div>
</template>