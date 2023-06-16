import React, { useState,useEffect } from 'react'
// import todo from "./images/todo.png";
import "./style.css"

//Get local storage data back
const getLocalData=()=>{
    const lists=localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists)
    } else{
        return [];
    }
}


const Todo = () => {

    const [inputData,setInputData]=useState("");
    const [items,setItems]=useState(getLocalData);
    const [isEditItem,setIsEditItem]=useState("");
    const [toggleButton,setToggleButton]=useState(false);

// add items
    const addItem=()=>{
        if(!inputData){
            alert("plz fill the data");
        } else if(inputData && toggleButton){
            setItems(
                items.map((currElem)=>{
                    if(currElem.id===isEditItem){
                        return {...currElem,name:inputData}
                    }
                    return currElem
                })
            )
            setInputData("[]");
            setIsEditItem("");
            setToggleButton(false);
        }
        
        else{
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:inputData,
            }
            setItems([...items,myNewInputData])
            setInputData("");
        }
    }


//edit items

const editItem=(index)=>{
     const item_to_edited=items.find((currElem)=>{
        return currElem.id===index;
     });
     setInputData(item_to_edited.name);
     setIsEditItem(index);
     setToggleButton(true);
}

//delete item
    const deleteItem=(index)=>{
        const updatedItem=items.filter((currElem)=>{
            return currElem.id!==index;
        })
        setItems(updatedItem)
    }

    //delte all

    const removeAll=()=>{
        setItems([]);
    }

    //local storage
  
    useEffect(() => {
        localStorage.setItem("mytodolist",JSON.stringify(items))
    }, [items])
    
 
  return (
    <>

    <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/todo.png" alt="todologo" />
                <figcaption> Add your list Here ✌️</figcaption>
            </figure>


            <div className="additems">
                <input type="text" placeholder='✍️ Add Item'
                 className='form-control'
                 value={inputData }
                 onChange={(event)=>setInputData(event.target.value)}
                />
                {
                    toggleButton ?(
                        <i className='fa fa-edit add-btn' onClick={addItem}></i>
                    ): (
                        <i className='fa fa-plus add-btn' onClick={addItem}></i>
                    )
                }
                

            </div>

            <div className="showItems">

                {items.map((currElem) => {
                    return(
                        <div className="eachItem" key={currElem.id}>
                    <h3>{currElem.name}</h3>
                    <div className="todo-btn">
                    <i className='far fa-edit add-btn'
                    onClick={()=>editItem(currElem.id)}></i>
                    <i className='far fa-trash-alt add-btn' onClick={()=>
                        deleteItem(currElem.id)}></i>
                    </div>
                </div>

                    )
                })}
                
            </div>
            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove All"
                onClick={removeAll}>
                    <span>CHECK LIST</span></button>
            </div>
        </div>
    </div>

    </>
  )
}

export default Todo