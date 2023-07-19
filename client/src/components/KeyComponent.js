import React from 'react';
import './KeyComponent.css';

const KeyComponent = () => {
  return (
    <div className="key-container">
      <div className="key-item yellow">
        <div className="color-box"></div>
        <span>Drums</span>
      </div>
      <div className="key-item green">
        <div className="color-box"></div>
        <span>Samples</span>
      </div>
      <div className="key-item red">
        <div className="color-box"></div>
        <span>Vocals</span>
      </div>
    </div>
  );
};

export default KeyComponent;
