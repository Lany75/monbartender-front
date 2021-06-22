import React from 'react';

import './LoadingMessage.css';

const LoadingMessage = ({ message }) => {
  return (<div className='loading-message'>{message}</div>)
}

export default LoadingMessage;