import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  // useState returns an array that we destructure
    // todos => our state array
    // setTodos => call this function to update todos
  // notice that we pass a param to useState
    // in this case, we initialize state with empty array
  const [todos, setTodos] = useState([]);

  // this useEffect fires once on render
  // it looks for saved todos in local storage
  // if an array exists there, it will update state with this info
  // this is one way to persist data
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('react-todos'));
    if (savedTodos) { setTodos(savedTodos); };
  }, []);

  // this useEffect fires whenever there is a change to the todos state
  useEffect(() => {
    localStorage.setItem('react-todos', JSON.stringify(todos));
  }, [todos]);

  // handles form text input
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh on form submit

    // create a new todo object with unique id
    const newTodo = {
      id: uuidv4(),
      text: input,
      complete: false,
    }

    // create new array with newTodo and concat prev state
    // this makes the newest element appear first
    const updatedTodos = [newTodo].concat(todos);
    setTodos(updatedTodos); // set new state
    setInput('');           // clear input field
  }

  // sets all todo items to 'complete'
  const handleCompleteAll = () => {
    const completeAll = [...todos];
    completeAll.forEach(item => item.complete = true);
    setTodos(completeAll);
  }

  // clear all todo items marked 'complete'
  const handleClearComplete = () => {
    const incomplete = todos.filter(item => !item.complete);
    setTodos(incomplete);
  }

  return (
    <>
      <header>
        <h1>
          React Todo List
        </h1>
      </header>

      <form onSubmit={handleSubmit}>
        <input type='text'
               placeholder='Enter Todo Item'
               value={input}
               onChange={e => setInput(e.target.value)}>
        </input>
        <button type='submit'>Save</button>
      </form>

      <section className='incomplete'>
        <h2>To Do</h2>
        <p>(X) Items Remaining</p>

        <ul>
          {todos.filter(todoItem => !todoItem.complete).map(todo => {
            return (
              <li key={todo.id}>
                <p>{todo.text}</p>
                <button type='button'>Mark Complete</button>
              </li>
            );
          })}
        </ul>

        <button type='button' onClick={handleCompleteAll}>Complete All</button>
      </section>

      <section className='complete'>
        <h2>Completed</h2>
        <p>(Y) Items Completed</p>

        <ul>
          {todos.filter(todoItem => todoItem.complete).map(todo => {
            return (
              <li>
                <p>{todo.text}</p>
                <button type='button'>Mark Incomplete</button>
              </li>
            );
          })}
        </ul>

        <button type='button' onClick={handleClearComplete}>Clear All Completed</button>
      </section>

      <footer>
        <nav>
          <a href='https://github.com/comatosino'><img src='https://github.githubassets.com/apple-touch-icon-114x114.png' height='50px' alt='GitHub Logo'></img></a>
        </nav>
      </footer>
    </>
  )
}

