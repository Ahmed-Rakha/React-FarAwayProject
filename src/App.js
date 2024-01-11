import { useState } from 'react';

function App() {
  const [myitems, setItems] = useState([]);
  console.log(myitems);
  function hanldeItems(items) {
    setItems((ele) => [...ele, items]);
  }

  function handleDeleteItems(id) {
    setItems(myitems.filter((ele) => ele.id !== id));
  }

  // function hanblePackedItems() {
  //   const x = items.filter((ele) => ele.packed);
  //   return x.length;
  // }
  return (
    <div className="App">
      <FarAway />
      <Form onAdditems={hanldeItems} />
      <TripList items={myitems} onDelete={handleDeleteItems} />
      <Footer items={myitems} />
    </div>
  );
}

function FarAway() {
  return (
    <div className="far-away">
      <h1>🏝️ Far Away 🧳</h1>
    </div>
  );
}
function Form({ onAdditems }) {
  const [input, setInput] = useState('');
  const [select, setSelect] = useState();

  function handleForm(e) {
    e.preventDefault();
    if (!input) return;
    const collectItems = { input, select, packed: false, id: Date.now() };
    onAdditems(collectItems);
    setSelect(1);
    setInput('');
  }
  return (
    <div className="form">
      <form onSubmit={handleForm}>
        <h3>What do your need for your trip 🏝️?</h3>
        <select value={select} onChange={(e) => setSelect(e.target.value)}>
          {Array.from({ length: 20 }, (itemCount, index) => (
            <option key={index + 1}>{index + 1}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>ADD</button>
      </form>
    </div>
  );
}
function TripList({ items, onDelete }) {
  const [check, setChecked] = useState(false);
  function handleChek(id) {
    setChecked(items.forEach((item) => (item.id === id ? !item.packed : '')));
  }
  return (
    <div className="trip-list">
      {items.map((item) => (
        <div className="list" key={item.id}>
          <span className="myspan">
            <input
              type="checkbox"
              value={check}
              onChange={() => handleChek(item.id)}
            />
            <span style={check ? { textDecoration: 'line-through' } : {}}>
              {item.select} {item.input}
            </span>
          </span>
          <span onClick={() => onDelete(item.id)} className="delete">
            ❌
          </span>
        </div>
      ))}
    </div>
  );
}

function Footer({ items }) {
  // console.log(items);
  // function hanblePackedItems() {
  //   const x = items.filter((ele) => ele.packed);
  //   console.log(x);
  // }
  return (
    <div className="foot-bar">
      <h3>
        🧳 You have {items.length} items on your list, and your already packed x
        (X%)
      </h3>
    </div>
  );
}
export default App;
