<template>
    <div>
        <nav class="navbar navbar-dark bg-dark">
            <a href="/" class="navbar-brand">TAREAS</a>
        </nav>
        
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="agregarTarea">
                                <div class="form-group">
                                    <input type="text" v-model="tarea.titulo" placeholder="Agregar tarea" class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea v-model="tarea.descripcion" cols="30" rows="10" class="form-control" placeholder="Agregue una descripcion"></textarea>
                                </div>
                                <button class="btn btn-primary btn-block">Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Tarea</th>
                                <th>Descripcion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="tarea of tareas"> 
                                <td>{{tarea.titulo}}</td>
                                <td>{{tarea.descripcion}}</td>
                                <td> <button @click="borrarTarea(tarea._id)" class="btn btn-danger">Eliminar</button>
                                    <button @click="actualizarTarea(tarea._id)" class="btn btn-secondary">Actualizar</button>
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

    class Tarea {
        constructor(titulo, descripcion){
            this.titulo = titulo;
            this.descripcion = descripcion;
        }
    }

export default {
    data(){
        return{
            tarea: new Tarea(),
            tareas: [],
            actualizar: false
        }
    },
    created(){
        this.obtenerTarea();
    },
    methods: {

        obtenerTarea(){
            fetch('/api/tareas')
            .then(res => res.json())
            .then(data =>{
                this.tareas = data;
                console.log(this.tareas)
            });
        },
        agregarTarea() { //enviar datos al servidor
            fetch('/api/tareas', {
                method: 'POST',
                body: JSON.stringify(this.tarea),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.obtenerTarea();
            })
            this.tarea = new Tarea();
        },
        borrarTarea(id){
            fetch('/api/tareas' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.obtenerTarea()
            });
        },
        actualizarTarea(id){
            fetch('/api/tareas/' + id)
            .then(res => res.json())
            .then(data => {
                this.tarea = new Tarea(data.titulo, data.descripcion);
            });
        }
    }
}
</script>