import '../styles/App.scss';

import { useState, useEffect } from 'react';

import ls from '../services/localStorage';
import Header from './Header';
import Button from './Button';
import Footer from './Footer';
import ModalForm from './ModalForm';

function App() {
  const INITIAL_TASK = {
    id: 'initialTask',
    task: 'Dejar de procastinar y hacer la lista de tareas',
    completed: false,
  };
  //Variables de estado
  const [tasks, setTasks] = useState(ls.get('lstasks', [INITIAL_TASK]));

  const [isFormHidden, setFormHidden] = useState(true);

  useEffect(() => {
    ls.set('lstasks', tasks);
  }, [tasks]);

  const handleClickShowForm = () => {
    setFormHidden(!isFormHidden);
  };

  const handleClickReset = () => {
    setTasks([INITIAL_TASK]);
  };

  const calculateTaskClass = (eachTask) => {
    if (eachTask.completed === true) {
      return 'completed';
    } else {
      return '';
    }
  };

  const handleClickComplete = (ev) => {
    console.log(ev.currentTarget.id);
    const clickedTaskId = ev.currentTarget.id;
    const foundTask = tasks.find((eachTask) => eachTask.id === clickedTaskId);
    foundTask.completed = !foundTask.completed;
    setTasks([...tasks]);
  };

  const handleDelete = (ev) => {
    const deleteTask = ev.currentTarget.id.split(':');
    const filterTasks = tasks.filter((task) => task.id !== deleteTask[1]);
    setTasks([...filterTasks]);
  };

  const handleClickSaveNewTask = (newTaskObj) => {
    if (tasks.length === 0 || tasks[0].id === 'initialTask') {
      setTasks([newTaskObj]);
    } else {
      setTasks([...tasks, newTaskObj]);
    }
    handleClickShowForm();
  };

  const renderTask = () => {
    return tasks.map((eachTask) => (
      <li key={eachTask.id} id={`task-${eachTask.id}`} className="task">
        <input
          type="checkbox"
          name={`task-${eachTask.id}`}
          id={eachTask.id}
          checked={eachTask.completed}
          onChange={handleClickComplete}
        />
        <p className={calculateTaskClass(eachTask)}>{eachTask.task}</p>
        <i
          className="fa-regular fa-trash-can"
          id={`delete:${eachTask.id}`}
          onClick={handleDelete}
        ></i>
      </li>
    ));
  };
  return (
    <div className="container">
      <Header />
      <main className="main">
        <ul className="list">{renderTask()}</ul>
        <section>
          <Button handleClick={handleClickShowForm}>Añadir Tarea</Button>
          <Button handleClick={handleClickReset}>
            Eliminar todas las tareas
          </Button>
        </section>
      </main>
      <ModalForm
        isFormHidden={isFormHidden}
        handleClickShowForm={handleClickShowForm}
        handleClickSaveNewTask={handleClickSaveNewTask}
      />
      <Footer />
    </div>
  );
}

export default App;
