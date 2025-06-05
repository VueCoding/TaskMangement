<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link to="/dashboard" class="navbar-brand">Event Management</router-link>
        <div class="d-flex">
          <span class="navbar-text me-3">
            Hello, {{name}}
          </span>
          <button class="btn btn-outline-light" type="button" @click="logoutUser()">Logout</button>
        </div>
      </div>
    </nav>
</template>
<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { logout } from '../services/api';
export default{
    data(){
        return {
            name:''
        }
    },
    mounted(){
        this.getName();
    },
    methods:{
        getName(){
            let token = JSON.parse(localStorage.getItem('token'));
            this.name = token.user.name;
        },
        async logoutUser(){
            try {
                await logout();
                localStorage.clear() 
                this.$router.push('/login');
            } catch (error) {
                this.toastMessage("Something went wrong");
            }
        },
        toastMessage(message){
            toast.error(message, {
                autoClose: 2000,
            });
        },
    }
}
</script>