import '../styles/components/Button.scss';

const Button = (props) => {
  const handleClickShowForm = (ev) => {
    ev.preventDefault();
    props.handleClickShowForm();
  };
  return (
    <button className="button" onClick={handleClickShowForm}>
      Añadir tarea
    </button>
  );
};

export default Button;
