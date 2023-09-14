<script setup>
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores';
import { router } from '@/router';
import { ref, computed, watch } from 'vue'

import { Spinner } from '@/components';

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

const searchQuery = ref('');

usersStore.getAll();

var filteredUsers = computed(() => {
    if (users.value.length) {
        const filter = searchQuery.value.toLowerCase();
        const filtered = users.value.filter(row => {
            const username = row.username.toString().toLowerCase();
            const firstname = row.firstName.toString().toLowerCase();
            const lastname = row.lastName.toString().toLowerCase();
            const email = row.email.toLowerCase();
            return username.includes(filter) ||
            email.includes(filter) ||
            firstname.includes(filter) ||
            lastname.includes(filter);
        });
        return filtered.length > 0 ? filtered : [];
    } else {
        return [];
    }
});
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
                        <input name="searchbox" type="text" placeholder="search" v-model="searchQuery" class="card-form-control" style="height:35px;"/>
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
                    <template v-if="filteredUsers && filteredUsers.length">
                        <tr v-for="user in filteredUsers" :key="user.id" class="card-table-row">
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
                        <td colspan="7" class="text-center">
                            <Spinner />
                        </td>
                    </tr>
                    <tr v-if="filteredUsers.length == 0 && !users.loading" class="text-center">
                        <td colspan="7">
                            <div class="text-negative">No user found</div>
                        </td>
                    </tr>
                    <tr v-if="users.error">
                        <td colspan="7">
                            <div class="text-negative">Error loading users: {{users.error}}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>