<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>

    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Insert A Task"
                    v-model="task.title"
                    class="form-control"
                  >
                </div>
                <div class="form-group">
                  <textarea
                    v-model="task.description"
                    cols="30"
                    rows="10"
                    class="form-control"
                    placeholder="Insert A Description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <template v-if="edit === false">
                    <button class="btn btn-primary btn-block">Send</button>
                  </template>
                  <template v-else>
                    <button class="btn btn-warning btn-block">Update</button>
                  </template>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <th>Title</th>
              <th>Description</th>
              <th width="20%">Options</th>
            </thead>
            <tbody>
              <tr v-for="task of tasks ">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>
                  <button class="btn btn-danger" v-on:click="deleteTask(task._id)">&#x1F5D1;</button>
                  <button class="btn btn-info" v-on:click="editTask(task._id)">&#x1F589;</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//MODEL
class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

export default {
  data() {
    return {
      tasks: [],
      task: new Task(),
      edit: false,
      taskToEdit: null
    };
  },

  created() {
    this.getTasks();
  },

  methods: {
    //GET ALL TASKS
    getTasks() {
      fetch("/api/tasks", {
        method: "GET"
      })
        .then(res => res.json())
        .then(data => (this.tasks = data))
        .catch(err => console.error(err));
    },

    //ADD A NEW TASK OR UPDATE
    sendTask() {
      if (this.edit === false) {
        fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => this.getTasks())
          .catch(err => console.error(err));
      } else {
        fetch("/api/tasks/" + this.taskToEdit, {
          method: "PUT",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTasks();
            this.edit = false;
            this.taskToEdit = null;
          })
          .catch(err => console.error(err));
      }
      //CLEAR TASK
      this.task = new Task();
    },

    //DELETE ONE TASK
    deleteTask(task) {
      fetch("/api/tasks/" + task, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => this.getTasks())
        .catch(err => console.error(err));
    },

    //EDIT ONE TASK
    editTask(task) {
      fetch("/api/tasks/" + task, {
        method: "GET"
      })
        .then(res => res.json())
        .then(data => {
          this.task = new Task(data.title, data.description);
          this.taskToEdit = data._id;
          this.edit = true;
        })
        .catch(err => console.error(err));
    },

    //UPDATE ONE TASK
    updateTask(task) {
      console.log("Editing");
    }
  }
};
</script>