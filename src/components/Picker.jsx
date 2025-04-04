import React from 'react';

const Picker = () => {
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('componentType', type);
  };

  return (
    <div>
      {/* {['Header', 'Banner', 'Footer'].map((type) => ( */}
      

      {['Header',  'Footer'].map((type) => (
        <div
          key={type}
          style={boxStyle}
          draggable

          onDragStart={(e) => handleDragStart(e, type.toLowerCase())}
        >
          {type}
        </div>
      ))}
    </div>
  );
};

const boxStyle = {
  border: '2px dotted #adb5bd',
  backgroundColor: '#dee2e6',
  color: '#212529',
  padding: '12px',
  marginBottom: '10px',
  cursor: 'grab',
  textAlign: 'center',
  borderRadius: '4px',
  fontWeight: 'bold',
};

export default Picker;
