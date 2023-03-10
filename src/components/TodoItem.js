import '../style/todo.css'

import { useEffect, useState } from "react";

function Item({ id, text, isCompleted, onChecked, deleteTodo, updateTodo ,}) {
  // console.log(text);

  // 체크박스  
  const [checkBox, setCheckBox] = useState(isCompleted)
  
  //투두 업데이트
  const onUpdateSubmit = () => {
    updateTodo(id, updateText, checkBox);
    modifyTodo();
  }

  // 체크박스 클릭
  const onChangeCheck = (event) => {
    const checked = event.target.checked 
    onChecked(id, checked);    
    setCheckBox(checked);

  };


  const [modify, setModify] = useState(false);
  // 투두 수정
  const modifyTodo = () => {
    setModify(!modify);
  };

  const [updateText, setUpdateText] = useState();
  const changeText = (e) => {
    const text = e.target.value;
    setUpdateText(text);
  };
  //엔터로 제출
  const onEnter = (e) => {
    // console.log(e.key)
    if(e.key == 'Enter'){
      console.log('엔터')
      onUpdateSubmit();
    }
  }


  return (
    <li>
      <label>
      <i className={`${checkBox ?'circle_checked circle':'circle'}`}></i>
        <input className='checkbox' type="checkbox" checked={checkBox} onChange={onChangeCheck} />
        {modify ? (
          <input className="modify-input"
          onChange={changeText} onKeyUp={onEnter}
          data-testid="modify-input"></input>
        ) : (
          <span className={`${checkBox ? "todo_text checked" : "todo_text"}`}>{text}</span>
        )}
        <div className="btns">
        {modify ? (
          <>
            <button
              onClick={onUpdateSubmit}
              data-testid="submit-button"
            >
              제출
            </button>
            <button 
              onClick={modifyTodo} 
              data-testid="cancel-button">
              취소
            </button>
          </>
        ) : (
          <>
            <button 
            onClick={modifyTodo} 
            data-testid="modify-button">
              수정
            </button>
            <button 
            onClick={() => deleteTodo(id)} 
            data-testid="delete-button">
              삭제
            </button>
          </>
        )}
        </div>
      </label>
    </li>
  );
}
export default Item;
