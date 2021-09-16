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
    if (savedTodos) {
      setTodos(savedTodos);
    };
  }, []);

  // this useEffect fires whenever there is a change to the todos state
  // saves changes to local storage AND updates counts
  useEffect(() => {
    localStorage.setItem('react-todos', JSON.stringify(todos));
  }, [todos]);

  const complete = todos.filter(item => item.complete).length;
  const incomplete = todos.filter(item => !item.complete).length;

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

    setTodos(updatedTodos);                 // set new state
    setInput('');                           // clear input field
  }

  // mark an incomplete todo as complete
  // or revert a completed todo as incomplete
  const handleComplete = (id) => {
    const updatedTodos = [...todos];
    const completedTodo = updatedTodos.find(item => item.id === id);

    completedTodo.complete = !completedTodo.complete;
    setTodos(updatedTodos);
  }

  // sets all todo items to 'complete'
  const handleCompleteAll = () => {
    const completedTodos = [...todos];
    completedTodos.forEach(item => item.complete = true);
    setTodos(completedTodos);
  }

  // clear all todo items marked 'complete'
  const handleClearComplete = () => {
    const incompleteTodos = todos.filter(item => !item.complete);
    setTodos(incompleteTodos);
  }

  return (
    <>
      <Header />

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
        <p>{incomplete} Items Remaining</p>

        <ul>
          {todos.filter(todoItem => !todoItem.complete).map(todo => {
            return (
              <li key={todo.id}>
                <p>{todo.text}</p>
                <button type='button' onClick={() => handleComplete(todo.id)}>Mark Complete</button>
              </li>
            );
          })}
        </ul>

        <button type='button' onClick={handleCompleteAll}>Complete All</button>
      </section>

      <section className='complete'>
        <h2>Completed</h2>
        <p>{complete} Items Completed</p>

        <ul>
          {todos.filter(todoItem => todoItem.complete).map(todo => {
            return (
              <li key={todo.id}>
                <p>{todo.text}</p>
                <button type='button' onClick={() => handleComplete(todo.id)}>Mark Incomplete</button>
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

