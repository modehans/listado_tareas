import '../styles/components/Button.scss';

const Button = (props) => {
  const handleClick = (ev) => {
    ev.preventDefault();
    props.handleClick();
  };
  return (
    <button className="button" onClick={handleClick}>
      {props.children}
    </button>
  );
};

export default Button;
