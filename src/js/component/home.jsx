import React, { useEffect, useState } from "react";
import Task from "./Task";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const user = "kymberlyn_chenet"
//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("")	
	const [tasks, setTasks] = useState([])
	
  useEffect(() => {
	loadTodos(user)
  },[])

  const loadTodos = (user) => {
	fetch(`https://playground.4geeks.com/todo/users/${user}`, {
			method: "GET"
	}).then((response) => response.json()).then((data) => {
		setTasks(data.todos)
		console.log(data);
		
	})
  }

  const updateTodos = (user, updateTasks) => {
	fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
		method: "POST",
		body: JSON.stringify(updateTasks),
		headers: {
			"Content-Type": "application/json"
		}
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log("Updated tasks.", data);
		
	})
  }

  	const deleteTodos = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(() => {
			const updateTasks = tasks.filter((task) => task.id !== id)
			setTasks(updateTasks)})
		.then((data) => { 
			console.log("Updated tasks.", data);
			
		})

	}
   

  const addTodo = () => {
	if(inputValue.trim() === "") return; 
	const newTask = {label: inputValue, is_done: false}
	const updateTasks = [...tasks, newTask]
	setTasks(updateTasks)
	setInputValue("")
	updateTodos(user, newTask)
  }

	const handlePress = (e) => {
		if(e.key === "Enter") {
			addTodo()
		
		}
	}

	// const deleteTask = (id) => {
	// 	const updateTasks = tasks.filter((task, index) => index !== id)
	// 	setTasks(updateTasks)
	// 	updateTodos(user, updateTasks)
	// }


	const clearTodos = () => {
		setTasks([])
		updateTodos(user, [])
	}

	return ( 
		<div className="container text-center">
			<h1 >todos</h1>
				<ul className="list-group mt-3"> 
					<li className="list-group-item">  
						<input 
							type= "text"
							className="input-item"
							onChange={(e) => setInputValue(e.target.value)}
							value={inputValue}
							placeholder="What will you do today?"
							onKeyDown={handlePress}
						></input>
					</li>
							{tasks.length === 0 ? (
								<li className="list-group-item" >No tasks, add tasks</li>
							) : (
								tasks.map((task,index) => (
								
								<Task task={task} key={index} deleteTask={() => deleteTodos(task.id)} />
								)
									
								)
							)}			
			</ul>
							{tasks.length > 0 && (
								<button className="btn btn-danger mt-3" onClick={clearTodos}>
									Clear All Tasks
								</button>
							)}
		</div>
	)
};

export default Home;

