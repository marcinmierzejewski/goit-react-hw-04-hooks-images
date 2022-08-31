import styles from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ text, func }) => {
  const { Button } = styles;

  return (
    <>
      <button className={Button} type="button" onClick={func}>
        {text}
      </button>
    </>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};
