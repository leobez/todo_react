import styles from "./App.module.css"

// Components
import Header from './components/Header'
import Footer from './components/Footer'
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import Modal from "./components/Modal"

// Interface
import { ITask } from "./interfaces/Task"
import { useState } from "react"

function App() {

	const [taskList, setTaskList] = useState<ITask[]>([])

	const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

	const deleteTask = (id: number) => {

		setTaskList(
			taskList.filter(task => task.id !== id)
		)

	}

	const hideOrShowModal = (display: boolean):void => {
		const modal = document.querySelector("#modal")
		if (display) {
			modal!.classList.remove("hide")
		} else {
			modal!.classList.add("hide")
		}
	}

	const editTask = (task: ITask):void => {
		hideOrShowModal(true)
		setTaskToUpdate(task)
	}

	const updateTask = (id: number, title: string, difficulty: number): void => {

		const updatedTask:ITask = {id, title, difficulty}

		const updatedItems = taskList.map(task => {
			return task.id === updatedTask.id ? updatedTask : task
		})

		setTaskList(updatedItems)

		hideOrShowModal(false)
	}

	return (
		<div>

			<Modal children={<TaskForm btnText="Editar tarefa" task={taskToUpdate}  taskList={taskList} handleUpdate={updateTask}></TaskForm>}></Modal>

			<Header></Header>

			<main className={styles.main}>
				<div>
					<h2>O que você vai fazer?</h2>
					<TaskForm btnText="Criar tarefa" taskList={taskList} setTaskList={setTaskList}></TaskForm>
				</div>

				<div>
					<h2>Suas tarefas: </h2>
					<TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}></TaskList>
				</div>
			</main>

			<Footer></Footer>
		</div>
	)
}

export default App
