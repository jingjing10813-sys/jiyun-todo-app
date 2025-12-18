
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import InputTodo from "./components/InputTodo";
import Todoitem from "./components/Todoitem";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import TodoStats from "./components/TodoStats";
dayjs.extend(relativeTime);
dayjs.locale("ko");

function App() {
  const [todos, setTodos] = useState( () => {
    const getTodos = localStorage.getItem('stTodos');
    return getTodos ? JSON.parse(getTodos) : []
  });
  const [inputTodo, setInputTodo] = useState("");
  const [updateId, setUpdatedId] = useState(null);
  const [updateText, setUpdatedText] = useState("");

  useEffect( () => {
    localStorage.setItem("stTodos", JSON.stringify(todos))
    console.log("setstorage 실행")
  }, [todos]);



  const createTodo = () => {
    if (!inputTodo.trim()) return;
    const newTodo = {
      id : Date.now(),
      text : inputTodo, 
      isDone : false,
      datetime : dayjs().format('MM.DD.YYYY / hh:mm a')

    };
    const updatedTodos = [newTodo, ...todos]
    setTodos(updatedTodos);
    setInputTodo("");
  };

  const deleteTodo = (selectedId) => {
    const updatedTodos = todos.filter( (todo) => todo.id !== selectedId);
    setTodos(updatedTodos);
  };
  //수정모드 시작
  const startUpdate = (selectedTodo) => {
    setUpdatedId(selectedTodo.id);
    setUpdatedText(selectedTodo.text);
  };
 //수정모드 취소
  const cancelUpdate = () => {
    setUpdatedId(null);
    setUpdatedText("");
  };

  // 수정한것 저장하기(update)
  const updateTodo = () => {
    const updateTodos = todos.map((todo) => todo.id === updateId 
      ? {...todo, text: updateText,  datetime : dayjs().format('MM.DD.YYYY / hh:mm a'),}
      : todo);
    setTodos(updateTodos)
    setUpdatedId(null);
  };

  //토글가능(완료여부)
  const handleToggle = (isDoneId) => {
    const updateTodos = todos.map( (todo) => 
      todo.id === isDoneId ? {...todo, isDone: !todo.isDone} : todo)
    setTodos(updateTodos);
  }

  const inputProps = {inputTodo, setInputTodo, createTodo}
  const itemProps = {  updateId, 
    updateText, 
    setUpdatedText, 
    cancelUpdate, 
    updateTodo, 
    handleToggle, 
    startUpdate, 
    deleteTodo
  };

  return (
    <>
      <div className="todo-container">
        <Title level={1}>Jiyun To-do</Title>

        <InputTodo {...inputProps} />

        <TodoStats todos={todos} />

       
      <ul>
      {todos.map((todo) => (
       <Todoitem key={todo.id} todo={todo} {...itemProps} />
  ))}
</ul>
      </div>
    </>
  );
}

export default App;
