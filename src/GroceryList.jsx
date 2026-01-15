import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
import "@fontsource/balsamiq-sans";
import './GroceryList.css';
import pencil from './pencilhd.png'
import vegbg from './vegbg.png';
import capsicum from './capsicum.png';
import onion from './onion.png';
import carrot from './carrot.png';
import garlic from './garlic.png';
import chicken from './chicken.png';
import ghee from './ghee.png';
import ginger from './ginger.png';
import milk from './milk.png';
import salt from './salt.png';
import strike from './et.png';


function GroceryList() {
  const [inputText, setInputText] = useState('');
  const [groceryList, setGroceryList] = useState(JSON.parse(localStorage.getItem('groceryList')) || []);
  const [isAutoscroll, setIsAutoscroll] = useState(true);   //to controll the autoscroll because when submit and checkout, both are scrolling
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [bought, setBought] = useState(0);
  const [remained, setRemained] = useState(0);

  let boughtItem = 0;
  let remainedItem = 0;

  const ref = useRef(null);

  /*  async function getGroceryList() {
    const response = await axios.get('http://localhost:3000/groceryList');
    setGroceryList(response.data);
    }
    
    useEffect(() => {
      getGroceryList();
      }, []) */

  useEffect(() => {
    if (ref.current && isAutoscroll) {
      // console.log(ref.current);
      const listRef = ref.current;
      // console.log(listRef.scrollHeight);
      listRef.scrollTop = listRef.scrollHeight;
    }
    const handleQuantity = () => {
      const quantity = groceryList.length;
      setTotalQuantity(quantity);
    }

    const handleBought = () => {
      groceryList.forEach((value) => {
        if (value.status === 'done') {
          boughtItem += 1;
        }
      })
      setBought(boughtItem);
    }

    const handleRemained = () => {
      groceryList.forEach((value) => {
        if (value.status === 'notDone') {
          remainedItem += 1;
        }
      });
      setRemained(remainedItem);
    }

    handleQuantity();
    handleBought();
    handleRemained();

  }, [groceryList]);

  const handleLocalStorage = (groceryList) => {
    const groceryListString = JSON.stringify(groceryList);
    localStorage.setItem('groceryList', groceryListString);
  }

  const matchingGroceryList = (id) => {
    return groceryList.find((listItem) => {
      return listItem.id === id
    })
  }

  /* const matchingGroceryListIndex = (id) => {
    return groceryList.findIndex((listItem)=>{
      return listItem.id === id
    })
  }
 */

  const handleInput = (event) => {
    // console.log(event.target.value.charAt(0).toUpperCase())
    setInputText(event.target.value);
  }

  const handleEnter = (event) => {
    // console.log(event.key)
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSubmit = async () => {
    if (inputText) {
      setIsAutoscroll(true);
      // console.log(inputText);
      const body = {
        id: crypto.randomUUID(),
        name: inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase(),
        status: 'notDone'
      }

      const inputList = [...groceryList, body];

      setGroceryList(inputList);

      handleLocalStorage(inputList);

      setInputText('');

      /* await axios.post('http://localhost:3000/groceryList', body);
      // console.log(groceryList);
      getGroceryList(); */
    }
  }

  const handleEdit = async (name, id) => {
    setIsAutoscroll(false)

    console.log(id);

    const matchingList = matchingGroceryList(id);

    const updateValue = prompt('Update the value', name);
    // console.log(updateValue);

    const alterName = updateValue === null ? name : updateValue;

    matchingList.name = alterName.charAt(0).toUpperCase() + alterName.slice(1).toLowerCase();

    const updatedList = [...groceryList];

    setGroceryList(updatedList);

    handleLocalStorage(updatedList);

    /*const body = {
      // name: updateValue
      status: status,
      name: updateValue === null ? name : updateValue //this is for validation if we write name: updatevalue , if the value is null it still runs 
    }
    // await axios.put(`http://localhost:3000/groceryList/${id}`, body);
    // getGroceryList(); */
  }

  const handleDelete = async (index,name) => {
    setIsAutoscroll(false);

    const value = prompt('you want to remove it!',name);

    if(value){
      const currentList = [...groceryList];
      currentList.splice(index, 1);
      console.log(currentList);
      setGroceryList(currentList);
      handleLocalStorage(currentList)
    }

    // console.log('delete');
    // await axios.delete(`http://localhost:3000/groceryList/${id}`);
    // getGroceryList()
  }

  const handleCheck = async (id) => {
    setIsAutoscroll(false);

    const matchingList = matchingGroceryList(id);

    // const matchingListIndex = matchingGroceryListIndex(id);  //I thought that , we will manually update the object but the object is call by reference when you update it also updated in the same reference address

    // console.log(matchingList);

    matchingList.status = 'done';

    // console.log(matchingList);

    const updatedList = [...groceryList];  //in this groceryList it has the object that is updated 

    setGroceryList(updatedList);

    handleLocalStorage(updatedList);

    /* // console.log('checked');
    const body = {
      name: name,
      status: 'done'
    }
    // await axios.put(`http://localhost:3000/groceryList/${id}`, body);
    // getGroceryList(); */
  }


  return (
    <>
      <img className="pencil-image" src={pencil} />
      <img className="veggies-image" src={vegbg} />
      <img className="capsicum-image" src={capsicum} />
      <img className="carrot-image" src={carrot} />
      <img className="onion-image" src={onion} />
      <img className="garlic-image" src={garlic} />
      <img className="chicken-image" src={chicken} />
      <img className="ghee-image" src={ghee} />
      <img className="ginger-image" src={ginger} />
      <img className="milk-image" src={milk} />
      <img className="salt-image" src={salt} />

      <div className='background-image'>
        <div className="notification-label">
          <p className="quantity-label">Items : {totalQuantity}</p>
          <p className="bought-label">Bought : {bought}</p>
          <p className="balance-label">Buy : {remained}</p>
        </div>
        <input className="enter-grocery"
          placeholder="Enter Grocery"
          value={inputText}
          autoFocus
          onChange={handleInput}
          onKeyDown={handleEnter} />
        <a className="submit-button"
          onClick={handleSubmit} />

        <div ref={ref} className="listed-item">
          {groceryList.map((value, index) => {
            // console.log(value)
            return (
              <div key={index} className={`item-container `}>
                <img className={`strikeout-line ${value.status === 'notDone' ? '' : 'strikeout-active'}`} src={strike} />
                <img className={`strikeout-line2 ${value.status === 'notDone' ? '' : 'strikeout-active'}`} src={strike} />
                <div className={`list-div ${value.status === 'notDone' ? '' : 'checked'}`}>
                  {/* {console.log(value.id)} */}
                  <p style={{ display: 'inline-block', marginLeft: '13px', marginTop: '-2px' }}>{`${index + 1}. ${value.name}`}</p>
                </div>
                <div className="update">
                  <a className={`edit-button ${value.status === 'notDone' ? '' : 'checked'}`} onClick={() => { if (value.status === 'notDone') { handleEdit(value.name, value.id) } }}></a>
                  <a className="delete-button" onClick={() => { handleDelete(index,value.name) }}></a>
                  <a className={`check-button ${value.status === 'notDone' ? '' : 'checked'}`} onClick={() => { if (value.status === 'notDone') { handleCheck(value.id) } }}></a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default GroceryList