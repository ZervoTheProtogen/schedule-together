<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useUsersStore, useAlertStore } from '@/stores';
import { router } from '@/router';

import { Spinner } from '@/components';

const usersStore = useUsersStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let title = 'Add User';
let user = null;
if (id) {
    title = 'Edit User';
    ({ user } = storeToRefs(usersStore));
    usersStore.getById(id);
}

const schema = Yup.object().shape({
    firstName: Yup.string()
        .required('First Name is required'),
    lastName: Yup.string()
        .required('Last Name is required'),
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .transform(x => x === '' ? undefined : x)
        // password optional in edit mode
        .concat(user ? null : Yup.string().required('Password is required'))
        .min(8, 'Password must be at least 8 characters')
});

async function onSubmit(values) {
    try {
        let message;
        if (user) {
            await usersStore.update(user.value.id, values)
            message = 'User updated';
        } else {
            await usersStore.register(values);
            message = 'User added';
        }
        await router.push('/users');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <h1 style="text-align: center;">{{title}}</h1>
    <template v-if="!(user?.loading || user?.error)">
        <div class="card-container">
            <div class="card">
                <Form @submit="onSubmit" :validation-schema="schema" :initial-values="user" v-slot="{ errors, isSubmitting }">
                    <div class="card-form-group">
                        <label class="card-form-label">First Name</label>
                        <Field name="firstName" type="text" class="card-form-control" :class="{ 'is-invalid': errors.firstName }" />
                        <div class="invalid-feedback">{{ errors.firstName }}</div>
                    </div>
                    <div class="card-form-group">
                        <label class="card-form-label">Last Name</label>
                        <Field name="lastName" type="text" class="card-form-control" :class="{ 'is-invalid': errors.lastName }" />
                        <div class="invalid-feedback">{{ errors.lastName }}</div>
                    </div>
                    <div class="card-form-group">
                        <label class="card-form-label">Username</label>
                        <Field name="username" type="text" class="card-form-control" :class="{ 'is-invalid': errors.username }" />
                        <div class="invalid-feedback">{{ errors.username }}</div>
                    </div>
                    <div class="card-form-group">
                        <label class="card-form-label">Password</label>
                        <Field name="password" type="password" class="card-form-control" :class="{ 'is-invalid': errors.password }" />
                        <div class="invalid-feedback">{{ errors.password }}</div>
                        <label><em v-if="user">(Leave blank to keep the same password)</em></label>
                    </div>
                    <div class="card-form-group center">
                        <button class="card-form-button" :disabled="isSubmitting">
                            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                            Save
                        </button>
                        <button class="card-form-button negative" style="margin-left:20px;" @click="router.push('/users')">Cancel</button>
                    </div>
                </Form>
            </div>
        </div>
    </template>
    <template v-if="user?.loading">
        <div>
            <Spinner />
        </div>
    </template>
    <template v-if="user?.error">
        <div class="text-center">
            <div class="text-negative">Error loading user: {{user.error}}</div>
        </div>
    </template>
</template>