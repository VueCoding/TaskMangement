<template>
    <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow rounded-4">
          <div class="card-body p-5">
            <h3 class="card-title text-center mb-4">Register</h3>
            <p v-if="errorMessage" class="text-center text-danger">{{errorMessage}}</p>
            <form @submit.prevent="registerForm()">

            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input v-model="form.name" type="text" class="form-control" id="name" placeholder="Enter name">
            </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-control" id="email" placeholder="Enter email">
              </div>

              <div class="mb-3 form_input">

                <label for="password" class="form-label">Password</label>
                <input  v-model="form.password" 
                :type="showPassword1 ? 'text':'password'" 
                class="form-control" id="password" placeholder="Password">

                <i class="fa-regular fa-eye-slash icon_s" 
                :class="showPassword1 ? 'fa-eye' : 'fa-eye-slash'"
                @click="showPassword1=!showPassword1"></i>

              </div>

              <div class="mb-3 form_input">

                <label for="password" class="form-label">Confirm Password</label>
                <input  v-model="form.password_confirmation" 
                :type="showPassword2 ? 'text':'password'" 
                class="form-control" id="password" placeholder="Password">

                <i class="fa-regular fa-eye-slash icon_s" 
                :class="showPassword2 ? 'fa-eye' : 'fa-eye-slash'"
                @click="showPassword2=!showPassword2"></i>

              </div>

              <button 
              :disabled="validation() || formsubmiting"
              type="submit" class="btn btn-success w-100">{{ 
              formsubmiting ? 'Loading...':'Register'
              }}</button>

              <div class="text-center mt-3">
                Have an account? <router-link to="/">Login</router-link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { register } from "../services/api.js";
import { isValidEmail } from "../utlit/index.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default{
    data(){
        return {
            form:{
                name:"",
                email:"",
                password:"",
                password_confirmation:""
            },
            formsubmiting:false,
            errorMessage:"",
            showPassword1:false,
            showPassword2:false,
        }
    },
    methods:{
        async registerForm(){
            this.formsubmiting=true;
            this.errorMessage="";
            try {
                const response = await register(this.form);
                this.formsubmiting=false;
                this.resetForm();
                this.toastMessageSuccess("Register successfully");
            } catch (error) {
                this.formsubmiting=false;
                this.errorMessage = "Email has been taken";
            }
        },
        validation(){
            if(this.form.name && 
                this.form.email && 
                this.form.password && 
                this.form.password.length>5 &&
                isValidEmail(this.form.email) &&
                this.form.password === this.form.password_confirmation
            ){
                return false;
            }
            return true
        },
        toastMessageSuccess(message){
            toast.success(message, {
                autoClose: 3000,
            });
        },
        resetForm(){
            this.form.name = "";
            this.form.email = "";
            this.form.password = "";
            this.form.password_confirmation = "";
        }
    }
}
</script>