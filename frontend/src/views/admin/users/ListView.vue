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
            <div>
                <div class="card-form-row compact">
                    <button class="card-form-button" @click="router.push('/admin/users/add')">Add User</button>
                    <div class="card-form-group" style="margin-bottom:10px;">
                        <input name="searchbox" type="text" placeholder="search" class="card-form-control" style="height:35px;"/>
                    </div>
                </div>
            </div>
            <table class="card-table">
                <thead>
                    <tr>
                        <th style="width: 16%">First Name</th>
                        <th style="width: 16%">Last Name</th>
                        <th style="width: 16%">Email</th>
                        <th style="width: 16%">Username</th>
                        <th style="width: 16%">Role</th>
                        <th style="width: 4%"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="users.length">
                        <tr v-for="user in users" :key="user.id" class="card-table-row">
                            <td>{{ user.firstName }}</td>
                            <td>{{ user.lastName }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.role }}</td>
                            <td style="white-space: nowrap">
                                <button @click="router.push('/admin/users/edit/'+user.id)" class="card-list-button">Edit</button>
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