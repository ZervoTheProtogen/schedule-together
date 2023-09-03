<script setup>
import { storeToRefs } from 'pinia';

import { useAlertStore } from '@/stores';

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>

<template>
    <div v-if="alert" class="alert-container">
        <div>
            <div class="alert" :class="alert.type">
                <button @click="alertStore.clear()" class="alert-button">&times;</button>
                {{alert.message}}
            </div>
        </div>
    </div>
</template>