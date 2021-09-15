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
        React Todo List
      </header>

      <form onSubmit={handleSave}>
        <input type='text'
               onChange={e => setInput(e.target.value)}>
        </input>
        <button type='submit'>Save</button>
      </form>

    </>
  )
}

