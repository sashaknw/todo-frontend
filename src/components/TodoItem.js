import React, { useState } from 'react';

const TodoItem = ({ todo, index, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleSave = () => {
    editTodo(todo._id, { text: editedText });
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="edit-input"
          />
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
        </div>
      ) : (
        <>
          <span onClick={() => toggleTodo(todo._id)}>
            {index + 1}. {todo.text}
          </span>
          <div className="buttons">
            <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
            <button onClick={() => deleteTodo(todo._id)} className="delete-btn">×</button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
