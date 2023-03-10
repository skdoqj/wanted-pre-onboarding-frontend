import '../style/todo.css'

import { useEffect, useState } from "react";
import Item from "./TodoItem";
import { getTodo, createTodo, deleteTodoAPI , updateTodoAPI} from "../api/api_module";
import { useNavigate } from "react-router-dom";

function Todo() {
  const movePage = useNavigate();
  
  // 로그인 판별
  useEffect (()=>{
    if (localStorage.getItem('signin_token') == null){
      movePage("/signin");
      console.log('로컬 값 없음')
    }
  },[])
  
  
  const [todoList, setTodoList] = useState([]);

  const getTodoList = ()=> {
    getTodo()
    .then(res => {
      const getData = res.data
      setTodoList(getData)
    })
  };
  
  useEffect(()=> {
    getTodoList()
  },[])


  const onSubmit = (event) => {
    event.preventDefault();
    if (event.target[0].value == "") {
      return alert("텍스트를 입력해주세요");
    } else {
      let todo = event.target[0].value;
      const todoItem = {
        id: '',
        todo,
        isCompleted: false,
      };
      setTodoList([...todoList, todoItem]);
      
      //axios post
      createTodo(todoItem.todo).then((res)=>{
        console.log('todo 추가 완료')
        // axios get
        getTodoList()
      }).catch((err) => {console.log(err)})
      event.target[0].value = "";
    }
  };

  // 투두 삭제
  const deleteTodo = (id) => {
    console.log(id);
    setTodoList(todoList.filter((item) => item.id !== id));

    deleteTodoAPI(id)
    .then(console.log('투두삭제'))
    .catch(err => console.log(err));
  };

  // 체크박스 변경
  const onChecked = (id, checked) => {
    const todo = todoList.find(item => item.id == id).todo
    console.log(id, todo, checked)
    //체크박스 바뀌면 업데이트 axios
    updateTodoAPI(id, todo, checked).then(console.log('체크 업데이트')).catch(err=> console.log(err))

  }


  // 투두 수정
  const updateTodo = (id, updateText, checkBox) => {
    const todo = updateText
    const isCompleted = checkBox

    setTodoList(
      todoList.map((item) =>
        item.id == id ? { ...item, todo: todo, isCompleted: isCompleted} : item
      )
    );

    //업데이트 axios
    updateTodoAPI(id , todo, isCompleted)
    .catch(err => console.log(err));
  };


  

  //로그아웃
  const onLogout = () => {
  // 데이터 삭제
  localStorage.removeItem('signin_token')

  // 모든 것 삭제
  movePage("/signin");
  };

  return (
    <>
      {/* 투두 입력 */}
      <button className='logout_btn'
      onClick={onLogout}>Logout</button>
      <div className="todo_page">
      <h1>TODO LIST</h1>
      <form onSubmit={onSubmit}>
        <input className='todo_iput'
        data-testid="new-todo-input"></input>
        <button className='add_btn'
        data-testid="new-todo-add-button">ADD</button>
      </form>

      
      <ul>
        {todoList.map((item, index) => (
          <Item
            key={item.id}
            id={item.id}
            text={item.todo}
            isCompleted={item.isCompleted}
            onChecked={onChecked}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
      </div>
    </>
  );
}

export default Todo;
