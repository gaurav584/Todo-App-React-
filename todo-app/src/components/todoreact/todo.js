import React, {useState , useEffect} from 'react'
import "./style.css"

const Todo = () => {

  // get the local storage data back
  const getLocalData = () => {
    const lists =localStorage.getItem("mytodolist")

    if(lists){
      return JSON.parse(lists);
    }
    else{
      return [];
    }
  }

    // manage input tag value(hook)
   const [inputdata , setInputdata] =useState("");

    // adding previous values in array.
   const [items , setItems] =useState(getLocalData());

   //add the items function
    const addItem = () => {
    if(!inputdata){
      alert('plz fill the data')
    }
    else{
      const myNewInputData ={
        id: new Date().getTime().toString(),
        name: inputdata,
      }
      setItems([...items,myNewInputData])
      setInputdata("");
    }
   }

   // delete item function
   const deleteItem = (index) => {
     const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
     })
     setItems(updatedItems);
   }

   // delete all in checkout
   const removeAll = () => {
    setItems([]);
   }

   // adding local storage 
   useEffect(() => {
    localStorage.setItem("mytodolist",JSON.stringify(items))
   },[items])
    
  return (
    <>
    <div className="main-div">
      <div className="child-div">
        <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here 👌</figcaption>
        </figure>
        <div className="addItems">
            <input type="text"
            placeholder='✍️ Add Item'
            className="form-control"
            value={inputdata}
            onChange={(event) => setInputdata(event.target.value)} 
            />
            <i className='fa fa-plus add-btn' onClick={addItem}></i>
        </div>
            {/*show our items*/}
            <div className="showItems">
              {items.map( (curElem, index) => {
                return(
                  <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i className="fa fa-edit add-btn"></i>
                    <i className="far fa-trash-alt add-btn" onClick={() =>deleteItem(curElem.id)}></i>
                  </div>
                  </div>
                );
              })}
            </div>
            {/*Remove all buttons */}
        <div className="showItems">
          <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
            <span>Check List</span>
            </button> 
          </div>
      </div>  
    </div> 
    </>
  )
}

export default Todo
