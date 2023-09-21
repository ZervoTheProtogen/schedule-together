<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { router } from '@/router';
import { getStatus } from '@/helpers'
import { ref } from 'vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const schoolCode = ref('');
const returnCode = ref(0);

</script>

<template>
    <div class="content-spacer-smaller"></div>
    <h1 style="text-align: center;">Add Schedule</h1>
    <div class="content-spacer-small"></div>
    <div class="card-container">
        <div v-if="schoolCode == ''" style="text-align: center;">
            <p>Enter school code</p>
            <div class="card-form-group" style="margin-bottom:10px;">
                <input name="searchbox" type="text" placeholder="input code.." v-model="schoolCodeLive" class="card-form-control" style="height:35px;"/>
            </div>
            <div class="card-form-row">
                <button style="margin-right:20px;" class="card-form-button negative" @click="router.push('/schedule/add')">Cancel</button>
                <button class="card-form-button" @click="schoolCode = schoolCodeLive">Continue</button>
            </div>
        </div>
        <div></div>
    </div>
</template>