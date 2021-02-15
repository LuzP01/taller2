const express = require('express');
const router = express.Router(); //crea un objeto para recibir rutas

const Tarea = require('../models/Tarea');

router.get('/', async (req, res) =>{
    const tareas = await Tarea.find();
    res.json(tareas);
});

router.get('/:id', async(req, res) => {
   const tarea =  await Tarea.findById(req, params.id);
   res.json(tarea);
});

router.post('/', async (req, res) => {
   const tareas = new Tarea(req.body);
    await tareas.save();
    res.json({
        status: 'Tarea guardada'
    });
});

router.put('/:id', async (req, res) => {
    await Tarea.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Tarea actualizada'
    });
});

router.delete('/:id', async (req, res) => {
    await Tarea.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Tarea eliminada'
    });
});

module.exports = router;
