import '../styles/components/ModalForm.scss'
import { useState} from 'react';
import { v4 as uuid } from 'uuid';

const ModalForm = (props) => {
  const [wordCounter, setWordCounter] = useState(0);
  const [chartCounter, setChartCounter] = useState(0);
  const [newTask, setNewTask] = useState('');

  const isFormHidden=props.isFormHidden;


  const handleClickShowForm=()=>{
       props.handleClickShowForm()
  }
  const handleClickSaveNewTask = (ev) => {
    ev.preventDefault()
    const newTaskObj = { id: uuid(), task: newTask, completed: false };
    props.handleClickSaveNewTask(newTaskObj)
    setNewTask('');
   
  };

  const handleChangeNewTask=(ev)=>{
    setNewTask(ev.currentTarget.value);
    setChartCounter(ev.currentTarget.value.split('').length);
    setWordCounter(
      wordCounter === [] ? 0 : ev.currentTarget.value.split(' ').filter(word=>word!==' ').length
    );
    }

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
            placeholder="Por ej: Procastinando, no se llega a ningún lado. Aunque tampoco quiero ir a ningún otro sitio..."
            onChange={handleChangeNewTask}
            value={newTask}
          ></textarea>
          <p>
            {chartCounter} caracteres y {wordCounter} palabras
          </p>
          <input
            className="button"
            type="button"
            value="Guardar"
            onClick={handleClickSaveNewTask}          ></input>
        </form>
      </div>
    );
  }
};

export default ModalForm