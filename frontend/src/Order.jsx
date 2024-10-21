import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Order({searchTerm}){
   

    const[items,setItems] = useState([]);
    const[filteredItems, setFilteredItems] = useState([]);

    //Fetch data from api
    useEffect (()=>{
    axios.get('http://localhost:3001/api/sales/orders').then(response =>{
        setItems(response.data);
        setFilteredItems(response.data);

    }).catch(error=>{
        console.error('Error fetching data', error);
    })
    

}, []);


const OrderRowCount = items.length;
const OrderPerfRange=Math.round(OrderRowCount/10);
const OrderGreenMinValue=0;
const OrderGreenMaxValue=OrderPerfRange;
const OrderRedMinValue= (OrderRowCount-OrderPerfRange);
const OrderRedMaxValue=OrderRowCount;
//console.log(OrderRowCount,"   ",OrderPerfRange,OrderGreenMinValue,OrderGreenMaxValue,OrderRedMinValue,OrderRedMaxValue);

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

<div key={item.ProductID} className="bg-white shadow-md flex items-center space-x-5 rounded-lg p-6 h-2 w-full" >
<h2 className={ `text-xl font-semibold font-sans mb-2 ${ item.OrderRank>OrderGreenMinValue && item.OrderRank <=OrderGreenMaxValue ? 'text-green-500' : (item.OrderRank>OrderRedMinValue && item.OrderRank<=OrderRedMaxValue? 'text-red-500': 'text-gray-700' )}`}>{item.OrderRank} . &nbsp;&nbsp;&nbsp;&nbsp; {item.WineName} &nbsp; {item.WineVintage}  &nbsp; - &nbsp; {item.OrderCount}</h2>

</div>
            ))

        )
          
        : <p>No data found</p> }
 

        </div>
    </div>
)

}



export default Order;