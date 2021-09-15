import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  // useState returns an array that we destructure
    // todos => our state array
    // setTodos => call this function to update todos
  // notice that we pass a param to useState
    // in this case, we initialize state with empty array
  const [todos, setTodos] = useState([]);

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
        <h2>
          To Do
        </h2>
        <p>
          (X) Items Remaining
        </p>
      </section>

      <section className='complete'>
        <h2>
          Completed
        </h2>
        <p>
          (Y) Items Completed
        </p>
      </section>
    </>
  )
}

