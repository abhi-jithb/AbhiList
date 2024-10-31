// src/components/TodoList.js
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig'; // Import Firebase config
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
// import './TodoList.css'; // Import the CSS file for styling

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editTodoId, setEditTodoId] = useState(null); // Track the todo being edited
    const [editTodoText, setEditTodoText] = useState('');
    const user = auth.currentUser; 

    const fetchTodos = async () => {
        if (user) {
            const todosRef = collection(db, 'todos');
            const q = query(todosRef, where('userId', '==', user.uid)); // Query todos for the current user
            const snapshot = await getDocs(q);
            const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTodos(todosData);
        }
    };

    useEffect(() => {
        fetchTodos(); // Call fetchTodos when the component mounts
    }, [user]);

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (newTodo.trim() === '' || !user) return; // Prevent adding empty todos

        try {
            await addDoc(collection(db, 'todos'), {
                text: newTodo,
                userId: user.uid, // Store the user's ID with the todo
            });
            setNewTodo('');
            await fetchTodos(); // Fetch updated todos after adding a new one
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const handleEditTodo = async (id, text) => {
        setEditTodoId(id);
        setEditTodoText(text);
    };

    const handleUpdateTodo = async (e) => {
        e.preventDefault();
        if (editTodoText.trim() === '') return;

        try {
            const todoDoc = doc(db, 'todos', editTodoId);
            await updateDoc(todoDoc, {
                text: editTodoText,
            });
            setEditTodoId(null);
            setEditTodoText('');
            await fetchTodos(); // Fetch updated todos after editing
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteDoc(doc(db, 'todos', id));
            await fetchTodos(); // Fetch updated todos after deleting
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div className="todo-container">
            <h2>✨LoveToDo✨</h2>
            <form onSubmit={editTodoId ? handleUpdateTodo : handleAddTodo} className="todo-form">
                <input
                    type="text"
                    placeholder={editTodoId ? "Edit your todo" : "Add a new todo"}
                    value={editTodoId ? editTodoText : newTodo}
                    onChange={(e) => editTodoId ? setEditTodoText(e.target.value) : setNewTodo(e.target.value)}
                    required
                    className="todo-input"
                />
                <button type="submit" className="todo-button">{editTodoId ? "Update Todo" : "Add Todo"}</button>
            </form>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} className="todo-item">
                         <div className="todo-text">{todo.text}</div>
                    <div className="todo-actions">
                        <button onClick={() => handleEditTodo(todo.id, todo.text)} className="edit-button">Edit</button>
                        <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">Delete</button>
                    </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
