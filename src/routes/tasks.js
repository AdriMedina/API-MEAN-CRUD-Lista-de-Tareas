const router = require('express').Router();
const mongojs = require('mongojs');

const db = mongojs('mean-db', ['tasks']);     // Solo poniendo el nombre, indicamos que es base de datos local, pero si la base de datos está con un servicio, por ejemplo MLab o Amazon, indicamos directamente la URL del servicio.

// con GET obtenemos los datos de la db
router.get('/tasks', (req, res, next) => {
    db.tasks.find((err, tasks) => {
        if (err) return next(err);
        res.json(tasks);
    });
});

router.get('/tasks/:id', (req, res, next) => {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, tasks) => {
        if (err) return next(err);
        res.json(tasks);
    });
});

// con POST añadimos datos nuevos a la db
router.post('/tasks', (req, res, next) => {
    const task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.tasks.save(task, (err, task) => {
            if (err) return next(err);
            res.json(task);
        });
    }
});

// con DELETE borramos un elemento
router.delete('/tasks/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});

// con PUT modificamos un elementos
router.put('/tasks/:id', (req, res, next) => {
    const task = req.body;
    const updateTask = {};
    
    if(task.isDone){
        updateTask.isDone = task.isDone;
    }

    if(task.title){
        updateTask.title = task.title;
    }

    if(!updateTask){
        res.status(400).json({
            error: 'Bad request'
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updateTask, (err, task) => {
            if (err) return next(err);
            res.json(task);
        });
    }

});


module.exports = router;