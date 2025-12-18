import { Button, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

function InputTodo({inputTodo, setInputTodo, createTodo}) {
  return (
    <div className="input-container">

          <Input 
          placeholder="Input here" 
          type="text"
          value={inputTodo}
          onChange={ e => setInputTodo(e.target.value)} 
          onPressEnter={createTodo}
          />

          <Button 
          type="primary" 
          icon={<PlusCircleOutlined />} 
          onClick={createTodo}>
            Add</Button>
        </div>
 
  )
}

export default InputTodo