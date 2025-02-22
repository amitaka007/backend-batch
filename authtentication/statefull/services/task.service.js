import { Task } from "../models/task.model.js";


export const createTask = async(userId , title , description)=>{
    const task = new Task({userId , title , description});
    return await task.save()
}

export const getTasks = async(userId)=>{
 return await Task.find({userId}).sort({createdAt:-1})   
}