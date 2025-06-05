<template>
    <div class="container mt_75">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow rounded-4">
          <div class="card-body p-5">
            <h3 class="card-title text-center mb-4">Login</h3>
            <form @submit.prevent="loginForm()">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-control" id="email" placeholder="Enter email">
                 
              </div>

              <div class="mb-3 form_input">

                <label for="password" class="form-label">Password</label>
                <input  v-model="form.password" 
                :type="showPassword ? 'text':'password'" 
                class="form-control" id="password" placeholder="Password">

                <i class="fa-regular fa-eye-slash icon_s" 
                :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                @click="showPassword=!showPassword"></i>

              </div>

              <button 
              :disabled="validation() || formsubmiting"
              type="submit" class="btn btn-primary w-100">{{ 
              formsubmiting ? 'Loading...':'Login'
              }}</button>

              <div class="text-center mt-3">
                Don't have an account? <router-link to="/register">Register</router-link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { login } from "../services/api.js";
import { isValidEmail } from "../utlit/index.js";
import { mapActions } from 'vuex';
export default{
    data(){
        return {
            form:{
                email:"",
                password:""
            },
            formsubmiting:false,
            errorMessage:"",
            showPassword:false,
        }
    },
    methods:{
         ...mapActions(['updateAuth']),
        async loginForm(){
           
            this.formsubmiting=true;
            this.errorMessage="";
            try {
                const response = await login(this.form);
                localStorage.setItem('token',JSON.stringify(response.data));
                this.formsubmiting=false;
                this.updateAuth({...response.data})
                this.$router.push('./dashboard');
            } catch (error) {
                this.formsubmiting=false;
                this.errorMessage = error.response.data.message;
                this.toastMessage(this.errorMessage);
            }
        },
        validation(){
            if(this.form.email && this.form.password && isValidEmail(this.form.email)){
                return false;
            }
            return true;
        },
        toastMessage(message){
            toast.error(message, {
                autoClose: 3000,
            });
        }
    }
}
</script>