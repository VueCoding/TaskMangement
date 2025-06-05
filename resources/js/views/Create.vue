<template>
  <div>
     <Navbar></Navbar>
  <div class="container my-4">
    <div class="card">
      <div class="card-header">
          <h5>{{ isEdit ? 'Edit Task' : 'Create New Task' }}</h5>
      </div>
      <div class="card-body">
          <form @submit.prevent="actionTask()">
        <div class="card p-4">
        <div class="mb-3">
            <label class="form-label">Task Title: <span class="text-danger">*</span> </label>
            <input type="text" class="form-control" v-model="task.title" placeholder="Enter task title">
            <p v-if="validatObj.title" class="text-danger m-0">Task title is required</p>
        </div>

        <div class="mb-3">
            <label class="form-label">Description:</label>
            <textarea class="form-control" v-model="task.description" placeholder="Task description"></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Status:</label>
            <select class="form-select" v-model="task.status">
            <option value="Selected" disabled>Selected</option>
            <option value="0">Pending</option>
            <option value="2">In Progress</option>
            <option value="1">Completed</option>
            </select>
        </div>

        <div class="mb-3">
            <label class="form-label">Due Date:</label>
            <input type="date" class="form-control" v-model="task.due_date">
        </div>

        <button 
        :disabled="submitForm"
        class="btn btn-success" type="submit" 
          v-if="isEdit">
            {{ submitForm ? 'Updating task...':'Update task'}}
        </button>

          <button 
          :disabled="submitForm || validate()"
          v-else class="btn btn-success" type="submit">
            {{ submitForm ? 'Creating task...':'Create task'   }}
        </button>
    </div>
    </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { createTask,showTask,editTask } from "../services/api.js";
import Navbar from '../components/Navbar.vue';
export default {
  data() {
    return {
      isEdit: false,
      task: {
        title: '',
        description: '',
        status: 'Selected',
        due_date: ''
      },
      submitForm:false,
      validatObj:{
        title:false
      }
    }
  },
  components: {
    Navbar
  },
  created() {
    if (this.$route.params.id) {
      this.isEdit = true
      this.getSInleData(this.$route.params.id);
    }
  },
  methods: {
    actionTask(){
        this.submitForm=true;
        if (this.$route.params.id) {
            this.updateTask(this.$route.params.id);
        }else{
            this.saveTask();
        }
    },
    async saveTask() {
     try {
        const response = await createTask(this.task);
        if(response.data.status){
            this.submitForm=false;
            this.toastMessageSuccess(response.data.message);
            this.resestform();
        }
     } catch (error) {
        this.submitForm=false;
        console.log(error);
        this.toastMessage("Unable to create");
     }
    },
    toastMessageSuccess(message){
        toast.success(message, {
            autoClose: 2000,
        });
    },
    toastMessage(message){
        toast.error(message, {
            autoClose: 2000,
        });
    },
    resestform(){
        this.task.status="Selected";
        this.task.title="";
        this.task.description="";
        this.task.due_date="";
    },
    async getSInleData(id){
      try {
          const response = await showTask(id);
          let {due_date,status ,title,description } = response.data.data;
          this.task.due_date = due_date;
          this.task.status = status;
          this.task.title = title;
          this.task.description = description; 
      } catch (error) {
        
      }
    },
    async updateTask(id){
      try {
        const response = await editTask(id,this.task);
        if(response.data.status){
          this.submitForm=true;
            this.toastMessageSuccess(response.data.message);
            this.resestform();
        }
     } catch (error) {
        this.submitForm=false;
        this.toastMessage("Unable to update");
     }
    },
    validate(){
      if(this.task.title) return false;
      return true;
    }
  }
}
</script>
