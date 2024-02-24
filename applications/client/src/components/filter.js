

import React, {useState, useEffect, useRef} from 'react';
import "./filter.css"

function AppFilter() {

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  return (
    <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <ul>
            <DropdownItem  text = {"Electronics"}/>
            <DropdownItem   text = {"Furniture"}/>
            <DropdownItem  text = {"Clothing"}/>
            <DropdownItem text = {"Kitchen"}/>
            <DropdownItem text = {"Sports"}/>
            <DropdownItem  text = {"Fitness"}/>
            <DropdownItem  text = {"Automobiles"}/>
            <DropdownItem  text = {"Pets"}/>
            <DropdownItem  text = {"Healthcare"}/>
            <DropdownItem  text = {"Other"}/>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}

export default AppFilter;