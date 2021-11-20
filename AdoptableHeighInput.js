import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function AdoptableHeightInput({ input, inputHandler, handleCtrlEnter, className, placeholder, ...rest }) {
  const inputRef = useRef(null);
  const handleKeyboardSubmit = useCallback((event) => {
    if (event.ctrlKey && event.key === 'Enter') {
      handleCtrlEnter();
    }
  }, [handleCtrlEnter]);

  useEffect(() => {
    inputRef.current.style.height = '';
    const newHeight = inputRef.current.scrollHeight + inputRef.current.clientTop * 2;
    inputRef.current.style.height = `${newHeight}px`;
  }, [input]);

  return (
    <textarea
      {...rest}
      ref={inputRef}
      onKeyDown={handleKeyboardSubmit}
      value={input}
      onChange={inputHandler}
      placeholder={placeholder}
      className={`form-control ${className}`}
    />
  );
}

AdoptableHeightInput.propTypes = {
  input: PropTypes.string.isRequired,
  className: PropTypes.string,
  inputHandler: PropTypes.func.isRequired,
  handleCtrlEnter: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

AdoptableHeightInput.defaultProps = {
  placeholder: 'text',
  className: '',
};
