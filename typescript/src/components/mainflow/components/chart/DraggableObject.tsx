import React from 'react';
import { DraggableObjectProps } from '../../types';

const DraggableObject: React.FC<DraggableObjectProps> = ({ label, onDragStart }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    onDragStart(event, label);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="draggable-object"
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      {label}
    </div>
  );
};

export default DraggableObject;