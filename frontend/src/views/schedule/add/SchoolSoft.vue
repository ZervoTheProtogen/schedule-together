<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { router } from '@/router';
import { getStatus } from '@/helpers';
import { ref } from 'vue';

import { Spinner } from '@/components';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

var desUrl = ref('');
var returnCode = ref(1);
</script>

<template>
    <div class="content-spacer-smaller"></div>
    <h1 style="text-align: center;">Add Schedule</h1>
    <div class="content-spacer-small"></div>
    <div class="card-container">
        <div v-if="desUrl == ''" style="text-align: center;">
            <p>Enter school code</p>
            <div class="card-form-group" style="margin-bottom:10px;">
                <input name="searchbox" type="text" placeholder="input code.." v-model="schoolCode" class="card-form-control" style="height:35px;"/>
            </div>
            <div class="card-form-row">
                <button style="margin-right:20px;" class="card-form-button negative" @click="router.push('/schedule/add')">Cancel</button>
                <button class="card-form-button" @click="desUrl = `https://sms.schoolsoft.se/${schoolCode}/html/redirect_login.htm`">Continue</button>
            </div>
        </div>
        <div v-else>
            <div v-if="returnCode == 0">
                <Spinner />
            </div>
            <div v-else class="card">
                <iframe :src="desUrl" title="SchoolSoft" width="500px" height="700px" sandbox="allow-forms allow-scripts allow-same-origin allow-popups">aaa</iframe>
            </div>
        </div>
        <div></div>
    </div>
</template>