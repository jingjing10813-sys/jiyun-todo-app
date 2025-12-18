import { CheckOutlined, CloseOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Input } from "antd";

function Todoitem({
    todo, 
    updateId, 
    updateText, 
    setUpdatedText, 
    cancelUpdate, 
    updateTodo, 
    handleToggle, 
    startUpdate, 
    deleteTodo
}) {
  return (
    <li className="todo-item">
        {updateId === todo.id 
        ? (  <>
       {/*수정모드*/} 
       <Input value={updateText} onChange={ e => setUpdatedText(e.target.value)}/>
       <Button icon={<CloseOutlined />} onClick={cancelUpdate}></Button>
       <span className="blind">취소</span>
       <Button icon={<CheckOutlined />} onClick={updateTodo}></Button>
       <span className="blind">저장</span>
        </>
        ) 
        : (
        <>
        {/*일반모드*/}
          <div className="contents">
          <strong 
           className={`todo-text ${todo.isDone ? "isDone" : ""}`}
           onClick={ () => handleToggle(todo.id)}>
            {todo.text}
            {todo.isDone ? '' : ''}
            </strong>
          <p>{todo.datetime}</p>
          </div>

          <div className="btn-group">
        <Button 
         color="default" 
         ariant="filled" 
         icon={<EditFilled />}
         onClick={ () => startUpdate(todo)}>
         Edit
         </Button>

         <Button 
         color="danger" 
         variant="filled" 
         icon={<DeleteFilled />} 
         onClick={ () => deleteTodo(todo.id)}>
         Delete
         </Button>
         </div>
        </>)}
    </li>
  )
}

export default Todoitem