import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  // useState returns an array that we destructure
    // todos => our state array
    // setTodos => call this function to update todos
  // notice that we pass a param to useState
    // in this case, we initialize state with empty array
  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      text: 'do some coding',
      completed: true,
      completedDate: new Date(),
    },
    {
      id: uuidv4(),
      text: 'kick some butt',
      completed: false,
      completedDate: null,
    },
    {
      id: uuidv4(),
      text: 'love on Jeanna',
      completed: false,
      completedDate: null,
    },
    {
      id: uuidv4(),
      text: 'get a cat!',
      completed: false,
      completedDate: null,
    },
  ]);

  // this will be used for the text input
  const [input, setInput] = useState('');

  // we will need to call useEffect
    // once on page load to retrieve todos
    // anytime todos is updated

  const handleSave = (e) => {
    e.preventDefault();
    console.log('SAVE');
  }

  return (
    <>
      <header>
        <h1>
          React Todo List
        </h1>
      </header>

      <form onSubmit={handleSave}>
        <input type='text'
               placeholder='Enter Todo Item'
               onChange={e => setInput(e.target.value)}>
        </input>
        <button type='submit'>Save</button>
      </form>

      <section className='incomplete'>
        <h2>To Do</h2>
        <p>(X) Items Remaining</p>

        {/*ADD LIST ITEMS HERE*/}
        <ul>
          {todos.filter(todoItem => todoItem.completed).map(todo => {
            return (
              <li>
                <p>{todo.text}</p>
                <input type='checkbox'></input>
              </li>
            );
          })}
        </ul>

        <button type='button'>
          Complete All
        </button>
      </section>

      <section className='complete'>
        <h2>Completed</h2>
        <p>(Y) Items Completed</p>

        {/*ADD LIST ITEMS HERE*/}
        <ul>
          {todos.filter(todoItem => !todoItem.completed).map(todo => {
            return (
              <li>
                <p>{todo.text}</p>
                <input type='checkbox'></input>
              </li>
            );
          })}
        </ul>

        <button type='button'>
          Clear All Completed
        </button>
      </section>

      <footer>
        <nav>
          <a href='https://github.com/comatosino'><img src='https://github.githubassets.com/apple-touch-icon-114x114.png' height='50px' alt='GitHub Logo'></img></a>
        </nav>
      </footer>
    </>
  )
}

