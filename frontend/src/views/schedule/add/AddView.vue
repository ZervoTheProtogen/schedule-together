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
    <div style="text-align:center;">
        <div style="text-align: center;">
            <p>How do you want to add a schedule?</p>
        </div>
        <button class="card-form-button" @click="router.push('/schedule/add/schoolsoft')">Extract from SchoolSoft</button>
        <br>
        <button class="card-form-button" @click="router.push('/schedule/add/skola24')">Extract from Skola24</button>
    </div>
</template>