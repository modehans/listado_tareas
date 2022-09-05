import '../styles/App.scss';

import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import ls from '../services/localStorage';
import Header from './Header';
import Button from './Button';

function App() {
  const INITIAL_TASK = {
    id: 'initialTask',
    task: 'Dejar de procastinar y hacer lista de tareas',
    completed: false,
  };
  //Variables de estado
  const [tasks, setTasks] = useState(ls.get('lstasks', [INITIAL_TASK]));
  const [newTask, setNewTask] = useState('');
  const [isFormHidden, setFormHidden] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    ls.set('lstasks', tasks);
  }, [tasks]);

  const handleClickShowForm = () => {
    setFormHidden(!isFormHidden);
  };

  const handleClickReset = () => {
    setTasks([INITIAL_TASK]);
  };

  const handleChangeNewTask = (ev) => {
    setNewTask(ev.currentTarget.value);
    if (newTask !== '') {
      setIsDisable(false);
    }
  };

  const handleClickSaveNewTask = (ev) => {
    ev.preventDefault();
    const newTaskObj = { id: uuid(), task: newTask, completed: false };
    if (tasks[0].id === 'initialTask') {
      setTasks([newTaskObj]);
    } else {
      setTasks([...tasks, newTaskObj]);
    }
    setNewTask('');
    handleClickShowForm();
    setIsDisable(true);
  };

  const renderFormNewTask = () => {
    if (isFormHidden === false) {
      return (
        <div className="modal">
          <form className="form" action="">
            <button className="form__btnClose" onClick={handleClickShowForm}>
              Cerrar
            </button>
            <label className="form__title" htmlFor="newText">
              Añade una nueva tarea
            </label>
            <textarea
              className="form__input-textarea"
              name="newText"
              id="newText"
              cols="30"
              rows="5"
              placeholder="Procastinando, no se llega a ningún lado. Aunque tampoco quiero ir a ningún otro sitio..."
              onChange={handleChangeNewTask}
              value={newTask}
            ></textarea>
            <input
              className="button"
              type="button"
              value="Guardar"
              onClick={handleClickSaveNewTask}
              disabled={isDisable}
            ></input>
          </form>
        </div>
      );
    }
  };

  const calculateTaskClass = (eachTask) => {
    if (eachTask.completed === true) {
      return 'completed';
    } else {
      return '';
    }
  };

  const handleClick = (ev) => {
    const clickedTaskId = ev.currentTarget.id;
    const foundTask = tasks.find((eachTask) => eachTask.id === clickedTaskId);
    foundTask.completed = !foundTask.completed;
    setTasks([...tasks]);
  };

  const renderTask = () => {
    return tasks.map((eachTask) => (
      <li key={eachTask.id} id={`task-${eachTask.id}`}>
        <p className={calculateTaskClass(eachTask)}>
          <input
            type="checkbox"
            name={`task-${eachTask.id}`}
            id={eachTask.id}
            checked={eachTask.completed}
            onChange={handleClick}
          />{' '}
          {eachTask.task}
        </p>
      </li>
    ));
  };
  return (
    <div className="container">
      <Header />
      <main className="main">
        <ul className="list">{renderTask()}</ul>
        <Button handleClick={handleClickShowForm}>Añadir Tarea</Button>
        <Button handleClick={handleClickReset}>
          Eliminar todas las tareas
        </Button>
        {renderFormNewTask()}
      </main>
    </div>
  );
}

export default App;
