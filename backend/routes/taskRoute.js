import express from "express";
import authmiddleware from "../middleware/auth.js";
import {createTask,deleteTask, getTaskById,getTasks,updateTask} from '../controllers/taskController.js';

const taskRouter =express.Router();

// List and create tasks
taskRouter.route('/gp')
    .get(authmiddleware,getTasks)
    .post(authmiddleware,createTask);

taskRouter.route('/')
    .get(authmiddleware,getTasks)
    .post(authmiddleware,createTask);

// Parameterized routes (order doesn't matter between these two)
taskRouter.route('/:id/gp')
    .get(authmiddleware,getTaskById)
    .put(authmiddleware,updateTask)
    .delete(authmiddleware,deleteTask);

taskRouter.route('/:id')
    .get(authmiddleware,getTaskById)
    .put(authmiddleware,updateTask)
    .delete(authmiddleware,deleteTask);

export default taskRouter;