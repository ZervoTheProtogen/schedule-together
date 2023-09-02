<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

async function onSubmit(values) {
    const authStore = useAuthStore();
    const { username, password } = values;
    await authStore.login(username, password);
}
</script>

<template>
    <div class="content-spacer-smaller"></div>
    <div style="text-align: center;">
        <a class="title">ScheduleTogether</a>
    </div>
    <div class="content-spacer-normal"></div>
    <div class="card-container">
        <div class="card">
            <h4 class="card-header">Login</h4>
            <div>
                <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                    <div class="form-group">
                        <label class="form-label">Username</label>
                        <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                        <div class="invalid-feedback">{{ errors.username }}</div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                        <div class="invalid-feedback">{{ errors.password }}</div>
                    </div>
                    <div class="form-group">
                        <button class="form-button" :disabled="isSubmitting">
                            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                            Login
                        </button>
                        <router-link to="register" class="form-button-link">Register</router-link>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>