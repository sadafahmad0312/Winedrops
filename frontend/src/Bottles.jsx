import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function bottles({searchTerm}){
    const[items,setItems] = useState([]);
    const[filteredItems, setFilteredItems] = useState([]);

    //Fetch data from api
    useEffect (()=>{
    axios.get('http://localhost:3001/api/sales/bottles').then(response =>{
        setItems(response.data);
        setFilteredItems(response.data);

    }).catch(error=>{
        console.error('Error fetching data', error);
    })

}, []);


const BottlesRowCount = items.length;
const BottlesPerfRange=Math.round(BottlesRowCount/10);
const BottlesGreenMinValue=0;
const BottlesGreenMaxValue=BottlesPerfRange;
const BottlesRedMinValue= (BottlesRowCount-BottlesPerfRange);
const BottlesRedMaxValue=BottlesRowCount;
//console.log(BottlesRowCount,"   ",BottlesPerfRange,BottlesGreenMinValue,BottlesGreenMaxValue,BottlesRedMinValue,BottlesRedMaxValue);

useEffect(() => {
    const filtered = items.filter(item =>
      item.WineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.WineVintage && item.WineVintage.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

return(
    <div >

    <div className="grid grid-cols-1grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
  

     {filteredItems.length > 0 ? (
   filteredItems.map((item) => (   

<div key={item.ProductID} className="bg-white shadow-md flex items-center space-x-3 rounded-lg p-6 h-2" >
<h2 className={ `text-xl font-semibold font-sans mb-2 ${ item.BottleRank>BottlesGreenMinValue && item.BottleRank <=BottlesGreenMaxValue ? 'text-green-500' : (item.BottleRank>BottlesRedMinValue && item.BottleRank<=BottlesRedMaxValue? 'text-red-500': 'text-gray-700' )}`}>{item.BottleRank}  . &nbsp;&nbsp;&nbsp;&nbsp; {item.WineName} &nbsp; {item.WineVintage} &nbsp; - &nbsp;{item.BottleSold}</h2>

</div>
            ))

        )
          
        : <p>No data found</p> }
 

        </div>
    </div>
)

}



export default bottles;