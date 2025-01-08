import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";


//create your first component
const Home = () => {

	const url = 'https://playground.4geeks.com/todo';
	const [username, setUsername] = useState('KarollGuzman');
	const [task, setTask] = useState('');
	const [userData, setUserData] = useState({});




	const getDataAsync = async () => {
		try {
			const resp = await fetch(url + '/users/' + username);
			if (resp.status == 404) return createUser('something went wrong')
			if (!resp.ok) throw new Error('something went wrong')
			const data = await resp.json();
			setUserData(data)
		} catch (error) {
			console.error(error)

		}

	}

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const resp = await fetch(url + '/todos/' + username, {
				method: 'POST',
				headers: {
					'content-Type': 'application/json'
				},
				body: JSON.stringify({
					label: task,
					is_done: false
				})
			});

			if (!resp.ok) throw new Error('something went wrong adding task')
			const data = await resp.json();
			getDataAsync();
			setTask('')
		} catch (error) {
			console.error(error);

		}

	}
	const createUser = async () => {
		try {
			const resp = await fetch(url + '/users/' + username, {
				method: 'POST',
				headers: {
					'content-Type': 'application/json'
				},

			});

			if (!resp.ok) throw new Error('something went wrong adding task');
			getDataAsync();
		} catch (error) {
			console.error(error);

		}


	}
	const handleDelete = async (todo_id) => {
		try {
			const resp = await fetch(url + '/todos/' + todo_id, {
				method: 'DELETE',
			});
			if (!resp.ok) throw new Error('something went wrong adding task');
			getDataAsync();
		} catch (error) {
			console.error(error);

		}
	}


	useEffect(() => {
		getDataAsync()
	}, [])

	return (
		<div className="container">
			<div className="todolist-header">
				<h1 className="todos" >TODOS</h1>
				<img className="todolist" src="https://as2.ftcdn.net/jpg/04/94/73/51/1000_F_494735191_XkF54jySktX3LfAz1LtQhdBK9BNTB7ef.jpg" alt="todolist" />

				<div className="wrapper">
					<form onSubmit={handleSubmit}>
						<input className="placetodos" type="text" onChange={e => setTask(e.target.value)}
							value={task} placeholder="Add a new todo"
						/>
					</form>
					<ul>
						{userData.todos?.map(el => <li className="text-item" key={el.id}>{el.label}
							-------------<span className="imcross" onClick={() => handleDelete(el.id)}><ImCross /></span>
						</li>)}
					</ul>
				</div>
			</div>
		</div>
	);
};



export default Home;