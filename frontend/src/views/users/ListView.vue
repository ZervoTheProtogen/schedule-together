<script setup>
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores';
import { router } from '@/router';

import { Spinner } from '@/components';

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

usersStore.getAll();
</script>

<template>
    <div class="content-spacer-smaller"></div>
    <h1 style="text-align: center;">Users</h1>
    <div class="card-container">
        <div class="card">
            <button class="card-form-button" @click="router.push('/users/add')">Add User</button>
            <table class="card-table">
                <thead>
                    <tr>
                        <th style="width: 30%">First Name</th>
                        <th style="width: 30%">Last Name</th>
                        <th style="width: 30%">Username</th>
                        <th style="width: 10%"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="users.length">
                        <tr v-for="user in users" :key="user.id" class="card-table-row">
                            <td>{{ user.firstName }}</td>
                            <td>{{ user.lastName }}</td>
                            <td>{{ user.username }}</td>
                            <td style="white-space: nowrap">
                                <button @click="router.push('/users/edit/'+user.id)" class="card-list-button">Edit</button>
                                <button @click="usersStore.delete(user.id)" class="card-list-button negative" :disabled="user.isDeleting">
                                    <Spinner v-if="user.isDeleting" />
                                    <span v-else>Delete</span>
                                </button>
                            </td>
                        </tr>
                    </template>
                    <tr v-if="users.loading">
                        <td colspan="4" class="text-center">
                            <Spinner />
                        </td>
                    </tr>
                    <tr v-if="users.error">
                        <td colspan="4">
                            <div class="text-negative">Error loading users: {{users.error}}</div>
                        </td>
                    </tr>            
                </tbody>
            </table>
        </div>
    </div>
</template>