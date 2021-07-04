<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a href="/" class="navbar-brand">MEVN</a>
        </nav>

        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card border-primary mb-3">
                        <div class="card-boby">
                            <form @submit.prevent="sendTask">
                                <div class="form-group">
                                    <input type="text" v-model="task.title" placeholder="Insert a Task" class="form-control">
                                </div>

                                <div class="form-group">
                                    <textarea cols="30" rows="10" v-model="task.description" placeholder="Insert a Description" class="form-control" ></textarea>
                                </div>

                                <button class="btn btn-outline-primary btn-block">Send</button>

                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>
                                    Task
                                </th>

                                <th>
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks">
                                <td>
                                    {{ task.title }}
                                </td>

                                <td>
                                    {{ task.description }}
                                </td>

                                <td>
                                    <button @click="deleteTask(task._id)" class="btn btn-outline-danger btn-sm">Delete</button>
                                    <button @click="editTask(task._id)" class="btn  btn-outline-info btn-sm">Edit</button>
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
    class Task {
        constructor(title = '', description = '') {
            this.title = title;
            this.description = description;
        }
    }

    export default {
        data() {
            return {
                task: new Task(),
                tasks: []
            }
        },
        created() {
            this.getTasks();
        },
        methods: {
            sendTask() {
                fetch('/api/tasks', {
                    method: 'POST',
                    body: JSON.stringify(this.task),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTasks();
                    this.task = new Task();
                });
            },
            getTasks() {
                fetch('/api/tasks')
                .then(res => res.json())
                .then(data => {
                    this.tasks = data;
                    console.log(this.tasks)
                });
            },
            deleteTask(id) {
                fetch('/api/tasks/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTasks();
                })
            },
            editTask(id) {
                fetch('/api/tasks' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.task = new Task(data.title, data.description)
                    })
            }
        }
}
</script>
