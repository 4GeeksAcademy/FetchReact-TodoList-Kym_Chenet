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

  const addTodo = (user, task) => {
	fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
		method: "POST", 
		body: JSON.stringify(task),
		headers: {
			"Content-Type": "application/json"
		}
	}).then((response) => response.json()).then((data) => {
		console.log(data)
		task.id = data.id
		setTasks([...tasks, task])
		setInputValue("") 
	})
  }

	const handlePress = (e) => {
		if(e.key === "Enter") {
			let newTask = { "label": inputValue, "is_done": false}
			addTodo(user, newTask)
		
		}
	}

	const deleteTodo = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE", 
			headers: {
				"Content-Type": "application/json"
			}
			})
	}

	const deleteTask = (id) => {
		const newTask = tasks.filter((task) => task.id !== id)
		deleteTodo(id)
		setTasks(newTask)
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
								tasks.map((task) => (
								
								<Task task={task} key={task.id} deleteTask={() => deleteTask(task.id)} />
								)
									
								)
							)}			
			</ul>
		</div>
	)
};

export default Home;

