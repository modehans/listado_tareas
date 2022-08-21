// Fichero src/components/App.js
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import ls from '../services/localStorage';
import '../styles/App.scss';

function App() {
  //Variables de estado
  const [tasks, setTasks] = useState(
    ls.get('lstasks', [
      {
        id: uuid(),
        task: 'Dejar de procastinar y hacer lista de tareas',
        completed: false,
      },
    ])
  );
  const [newTask, setNewTask] = useState('');
  const [isFormHidden, setFormHidden] = useState(true);

  useEffect(() => {
    ls.set('lstasks', tasks);
  }, [tasks]);

  const handleClickShowForm = () => {
    setFormHidden(!isFormHidden);
  };
  const handleChangeNewTask = (ev) => {
    setNewTask(ev.currentTarget.value);
  };

  const handleClickSaveNewTask = (ev) => {
    const newTaskobj = { id: uuid(), task: newTask, completed: false };
    setTasks([...tasks, newTaskobj]);
    setNewTask('');
    handleClickShowForm();
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
              placeholder="Procastinando no se llega a ningún lado"
              onChange={handleChangeNewTask}
              value={newTask}
            ></textarea>
            <input
              className="button"
              type="button"
              value="Guardar"
              onClick={handleClickSaveNewTask}
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
      <header className="header">
        <h1 className="header__title">Lista de tareas</h1>
      </header>
      <main className="main">
        <ul className="list">{renderTask()}</ul>
        <button className="button" onClick={handleClickShowForm}>
          Añadir tarea
        </button>
        {renderFormNewTask()}
      </main>
    </div>
  );
}

export default App;
