import React from 'react';
import axios from 'axios';



function App() {
   const [data, setData] = React.useState([]);
   const fetchdata = async () => {
      const response = await axios.get('http://localhost:8000/burgers');
      const data = Object.keys(response.data.data).map
      (burger => {
         return response.data.data[burger]
      }
      )
      setData(data)
   }
   React.useEffect(() => {
      fetchdata()
   }, [])
   console.log(data)
     
  return (
     <div>
        <h1 className='burger-lover'>Burger Lover</h1>
         <div className='burger-container'>
             {data.map((burger) => {
               return (
                   <div className='burger-card'>
                     <div className='burger-name'><h2>🍔{burger.name}🍔</h2></div>
                     <div className='burger-description'><p>📃{burger.description}</p></div>
                     <div className='burger-location'><p>🏨{burger.location}</p></div>
                   </div>
               )
             })}
             </div>
     </div>
  );
}

export default App;
