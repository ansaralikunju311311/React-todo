import React, { useState } from 'react';
import './Todo.css';

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleInput = (event) => {
        setNewTask(event.target.value);
    };

    const handleAdd = () => {
        if (newTask.trim() === "") {
            alert("Please enter a valid task.");
        } else if (tasks.some(task => task.toLowerCase() === newTask.toLowerCase())) {
            alert("This task has already been added.");
        } else if (tasks.length < 5) {
            setTasks((tasks) => [...tasks, newTask]);
            setNewTask("");
        } else {
            alert("You can only add up to 5 tasks.");
        }
    };

    const handleEdit = (index) => {
        setNewTask(tasks[index]);
        setIsEditing(true);
        setEditIndex(index);
    };
    const handleUpdate = () => {
        if (newTask.trim() === "") {
            alert("Please enter a valid task.");
        } else if (
            tasks.some(
                (task, index) =>
                    task.toLowerCase() === newTask.toLowerCase() && index !== editIndex
            )
        ) {
            alert("This task already exists.");
        } else {
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = newTask;
            setTasks(updatedTasks);
            setNewTask("");
         setIsEditing(false);
            setEditIndex(null);
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div className="TodoContainer">
            <h2 className='head'>To-Do List</h2>
            <input
                type="text"
                value={newTask}
                onChange={handleInput}
                placeholder="Enter a task..." />
            {isEditing ? (
                <button className="updateTaskButton" onClick={handleUpdate}>
                    Update
                </button>) : (
                <button className="addTaskButton" onClick={handleAdd}>
                    Add
                </button> )}
            <p>{tasks.length}</p>
            <ol className="taskList">
                {tasks.map((task, index) => (
                    <div key={index} className="taskItem">
                        <li>{task}</li>
          <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
                    </div>))}
        </ol>
        </div>
    );
};
export default Todo;
