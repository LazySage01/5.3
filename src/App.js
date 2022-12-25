import Button from "./Button";
import Table from "./Table";
// import List from "./List";
import { useState, useEffect } from "react";


function App() {
  const API_URL = 'https://jsonplaceholder.typicode.com/';

  const [reqType, setReqType] = useState('users');
  const [items, setItems ] = useState([]);

  useEffect(()=> {

    const fetchItems = async () => {
      try{
        const response = await fetch(`${API_URL}${reqType}`);
        const data = await response.json();
        setItems(data);
      } catch(err) {
        console.log(err);
      }
    }
  
    fetchItems();

  }, [reqType])

  return (
    <div>
      <Button 
        setReqType={setReqType} 
      />
      <Table 
        items={items}
      />
      {/* <List items={items} /> */}
    </div>
  );
}

export default App;
