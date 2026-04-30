import express from "express";
import authmiddleware from "../middleware/auth.js";
import {createTask,deleteTask, getTaskById,getTasks,updateTask} from '../controllers/taskController.js';

const taskRouter =express.Router();

// Standard REST routes
taskRouter.route('/')
    .get(authmiddleware,getTasks)
    .post(authmiddleware,createTask);

taskRouter.route('/:id')
    .get(authmiddleware,getTaskById)
    .put(authmiddleware,updateTask)
    .delete(authmiddleware,deleteTask);

// Legacy /gp routes (kept for backwards compatibility)
taskRouter.route('/gp')
    .get(authmiddleware,getTasks)
    .post(authmiddleware,createTask);

taskRouter.route('/:id/gp')
    .get(authmiddleware,getTaskById)
    .put(authmiddleware,updateTask)
    .delete(authmiddleware,deleteTask)


export default taskRouter;