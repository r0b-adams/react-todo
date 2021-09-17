import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../Header';
import Form from '../Form';
import ListBox from '../ListBox';
import Footer from '../Footer';

export default function App() {

  const [input, setInput] = useState(''); // form input
  const [todos, setTodos] = useState([]); // stores todo objects

  // on first render, check if todos exist in local storage
  // if so, set that to be component state
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('react-todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    };
  }, []);

  // if todos array changes, save those changes to local storage
  useEffect(() => {
    localStorage.setItem('react-todos', JSON.stringify(todos));
  }, [todos]);

  // handles form text input change
  const handleInputChange = e => {
    setInput(e.target.value)
  }

  // handles form submit
  const handleSubmit = e => {
    e.preventDefault(); // prevent page refresh

    const newTodo = {
      id: uuidv4(),    // assign unique id for ordering and updating state
      text: input,
      complete: false,
    }

    // create a new array and concat todos to it
    const updatedTodos = [newTodo].concat(todos);

    setTodos(updatedTodos); // set todos state to new array
    setInput('');           // clear text input field
  }

  // toggle todo as complete or incomplete
  const handleComplete = (id) => {
    const updatedTodos = [...todos];
    const completedTodo = updatedTodos.find(item => item.id === id);

    completedTodo.complete = !completedTodo.complete;
    setTodos(updatedTodos);
  }

  // mark all todos as complete
  const handleCompleteAll = () => {
    const completedTodos = [...todos];
    completedTodos.forEach(item => item.complete = true);
    setTodos(completedTodos);
  }

  // remove all completed todos
  const handleClearComplete = () => {
    const incompleteTodos = todos.filter(item => !item.complete);
    setTodos(incompleteTodos);
  }

  return (
    <>
      <Header />

      <Form handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            value={input}>
      </Form>

      <ListBox complete={false}
               handleComplete={handleComplete}
               handleAll={handleCompleteAll}
               todos={todos.filter(item => !item.complete)}
>
      </ListBox>

      <br></br>
      <hr></hr>
      <br></br>

      <ListBox complete={true}
               handleComplete={handleComplete}
               handleAll={handleClearComplete}
               todos={todos.filter(item => item.complete)}>
      </ListBox>

      <Footer />
    </>
  )
}

