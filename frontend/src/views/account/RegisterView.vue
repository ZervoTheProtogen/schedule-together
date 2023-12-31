<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { Spinner } from '@/components';

import { useUsersStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const schema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required'),
    firstName: Yup.string()
        .required('First Name is required'),
    lastName: Yup.string()
        .required('Last Name is required'),
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
});

async function onSubmit(values) {
    const usersStore = useUsersStore();
    const alertStore = useAlertStore();
    try {
        await usersStore.register(values);
        await router.push('/account/login');
        alertStore.success('Registration successful');
    } catch (error) { 
        alertStore.error(error);
    }
}
</script>

<template>
    <div class="content-spacer-smaller"></div>
    <div style="text-align: center;">
        <a class="title">ScheduleTogether</a>
    </div>
    <div class="content-spacer-small"></div>
    <div class="card-container">
        <div class="card">
            <h4 class="card-header">Register</h4>
            <div class="card-body">
                <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                    <div class="card-form-group">
                        <label class="card-form-label">Email</label>
                        <Field name="email" type="text" class="card-form-control" :class="{ 'field-is-invalid': errors.email }" />
                        <div class="invalid-feedback">{{ errors.email }}</div>
                    </div>
                    <div class="card-form-group">
                        <label class="card-form-label">First Name</label>
                        <Field name="firstName" type="text" class="card-form-control" :class="{ 'field-is-invalid': errors.firstName }" />
                        <div class="invalid-feedback">{{ errors.firstName }}</div>
                    </div>
                    <div class="card-form-group">
                        <label class="card-form-label">Last Name</label>
                        <Field name="lastName" type="text" class="card-form-control" :class="{ 'field-is-invalid': errors.lastName }" />
                        <div class="invalid-feedback">{{ errors.lastName }}</div>
                    </div>
                    <div class="card-form-group">
                        <label class="card-form-label">Username</label>
                        <Field name="username" type="text" class="card-form-control" :class="{ 'field-is-invalid': errors.username }" />
                        <div class="invalid-feedback">{{ errors.username }}</div>
                    </div>
                    <div class="card-form-group">
                        <label class="card-form-label">Password</label>
                        <Field name="password" type="password" class="card-form-control" :class="{ 'field-is-invalid': errors.password }" />
                        <div class="invalid-feedback">{{ errors.password }}</div>
                    </div>
                    <div class="card-form-group center">
                        <button class="card-form-button" :disabled="isSubmitting">
                            Register
                        </button>
                        <router-link to="login" class="card-form-button-link">Cancel</router-link>
                    </div>
                    <div class="card-form-group center">
                        <Spinner v-show="isSubmitting" class="spinner-center" />
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>