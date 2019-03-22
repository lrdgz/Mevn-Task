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
              <form @submit.prevent="addTask">
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
                  <button class="btn btn-primary btn-block">Send</button>
                </div>
              </form>
            </div>
          </div>
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
      task: new Task()
    };
  },
  methods: {
    addTask() {
      console.log(this.task);
      this.task = new Task();
    }
  }
};
</script>