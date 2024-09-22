import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState([])	
	const [tasks, setTasks] = useState("")
	const user = "kymber_lyn"

  useEffect(() => {
	loadTodos(user)
  },[])

  const loadTodos = (user) => {
	fetch(`https://playground.4geeks.com/todo/users/${user}`, {
			method: "GET"
	}).then((response) => response.json()).then((data) => {
		setTasks(data.todos)
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
		task.id = data.id
		setTasks([...tasks, task])
		setInputValue("") 
	})
  }

	const handlePress = (e) => {
		if(e.key === "Enter") {
			let newTasks = { "label": inputValue, "is_done": false}
			addTodo(user, newTasks)
		}
	}

	const deleteTask = (indexToRemove) => {
		const newTasks = tasks.filter((_, index) => index !== indexToRemove)
		setTasks(newTasks)
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
								tasks.map((task, i) => (
								
								<li key={i} className="list-group-item">{task.label}
								 <span className="delete-icon" onClick={() => deleteTask(i)}>
									 X
								 </span>
								</li>)
									
								)
							)}			
			</ul>
		</div>
	)
};

export default Home;

