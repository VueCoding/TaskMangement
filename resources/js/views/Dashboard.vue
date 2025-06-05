<template>
  <div>
    <Navbar></Navbar>
    <div class="container my-4">
    <div class="alert alert-primary text-center">
        <p v-if="quoteError" class="text-danger m-0">{{quoteError}}</p>
        <div v-else>
            <h6 class="m-0">{{ quote }}</h6>
            <small>- {{ author }}</small>
        </div>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <button class="btn btn-success" @click="createTask">+ Create New Task</button>

      <div>
       <select v-model="selectedFilter" class="form-select" @change="getAllTask(1)">
            <option value="All">All</option>
            <option value="0">Pending</option>
            <option value="2">In Progress</option>
            <option value="1">Completed</option>
        </select>
      </div>
    </div>
    <p v-if="taskError" class="text-center text-danger m-0">{{taskError}}</p>
    <div v-else>
         <table class="table table-bordered">
        <thead class="table-light">
            <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Due Date</th>
            <th>Actions</th>
            </tr>
        </thead>
            <tbody v-if="taskloading">
                 <tr>
                    <td colspan="4" class="text-center">Loading...</td>
                </tr> 
            </tbody>
            <tbody v-else-if="tasks.length">
                <tr v-for="(task, index) in tasks" :key="task.id">
                <!-- <td>{{ index + 1 }}</td> -->
                 <td>{{ task.id }}</td>
                <td>
                <p class="titlecs">
                    📝 {{ task.title }}
                </p> 
                    <div class="mt-1">
                        Status : 
                        <span v-if="task.status == 1" class="badge bg-success">Complete</span>
                        <span v-else-if="task.status == 0" class="badge bg-warning text-dark">Pending</span>
                        <span v-else class="badge bg-info text-dark">In Progress</span>
                    </div>
                </td>
                <td>{{ task.due_date || 'N/A' }}</td>
                <td>
                    <button class="btn btn-primary btn-sm me-2" @click="editTask(task.id)"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn btn-danger btn-sm" @click="removeTask(task.id)"><i class="fa-solid fa-trash"></i></button>
                </td>
                </tr>
            </tbody>
             <tbody v-else>
                 <tr>
                    <td colspan="4" class="text-center">No task found...</td>
                </tr> 
            </tbody>
    </table>

    <nav v-if="total>4">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: !taskpagi.prev_page_url }">
            <a class="page-link" href="#" @click.prevent="getAllTask(taskpagi.current_page - 1)">Previous</a>
            </li>

            <li class="page-item" v-for="page in taskpagi.last_page" :key="page"
                :class="{ active: taskpagi.current_page === page }">
            <a class="page-link" href="#" @click.prevent="getAllTask(page)">{{ page }}</a>
            </li>

            <li class="page-item" :class="{ disabled: !taskpagi.next_page_url }">
            <a class="page-link" href="#" @click.prevent="getAllTask(taskpagi.current_page + 1)">Next</a>
            </li>
        </ul>
        </nav>
    </div>
  </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { getTask,deleteTask } from '../services/api';
import Navbar from '../components/Navbar.vue';
export default {
  data() {
    return {
      quote: '',
      author: '',
      selectedFilter: 'All',
      tasks: [],
      total:0,
      quoteError:'',
      taskError:'',
      taskloading:false,
      taskpagi:[]
    }
  },
  components: {
    Navbar
  },
  methods: {
    createTask() {
      this.$router.push('/create-task');
    },
    editTask(id) {
      this.$router.push(`/edit-task/${id}`);
    },
    async removeTask(id) {
        try{
          await deleteTask(id);
          this.tasks = this.tasks.filter(item=>item.id!=id);
          this.toastMessageSuccess('Task deleted');
        }
        catch(err){
          this.toastMessage('Something went wrong');
        }
    },
    async getAllTask(page){
        this.taskError="";
        this.taskloading= true;
        try{
            const response = await getTask(page, this.selectedFilter);
            this.taskpagi = response.data;
            let tasks = JSON.stringify(response.data)
            let item = JSON.parse(tasks);
            this.tasks = item.data;
            this.total = item.total;
            this.taskloading= false;
        }
        catch(errr){
            this.taskError="Something went wrong";
            this.taskloading= false;
        }
    },
    async getQuotes(){
        this.quoteError="";
        try{
            const response = await fetch('https://dummyjson.com/quotes/random')
            const result = await response.json();
            this.quote = result.quote
            this.author = result.author;
        }
        catch(error){
            this.quoteError = "Something went wrong";
        }
    },
    toastMessage(message){
      toast.error(message, {
          autoClose: 1500,
      });
    },
    toastMessageSuccess(message){
      toast.warning(message, {
          autoClose: 1500,
      });
    }
  },

  mounted() {
    this.getAllTask(1);
    this.getQuotes();
  }
}
</script>

<style>
select.form-select {
  width: 200px;
  display: inline-block;
}
.badge{
    display: block;
}
.titlecs{
    font-weight: 500;
    margin: 0;
}
</style>
