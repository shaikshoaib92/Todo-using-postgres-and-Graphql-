import React, {  useState } from 'react';
import InputComponent from './components/inputFeild';
import './App.css';
import { useQuery, gql } from '@apollo/client';

function App() {




  const GET_TODOS = gql`
  mutation updateTask{
  updateTask(task:"Shoaib is a good boy",id:2){
    task
    id
  }
}`
  

  const [todo,setTodo] = useState<string>("");





  return (
<div className='hero'>
<InputComponent  todo={todo} setTodo={setTodo}/>
{

}
</div>
  );
}

export default App;
