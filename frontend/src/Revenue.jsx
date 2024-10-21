import React, { useEffect, useState } from "react";
import axios from 'axios';

function Revenue({searchTerm}){

   const[items,setItems] = useState([]);
  const[filteredItems, setFilteredItems] = useState([]);

    //Fetch data from api.
    useEffect (()=>{
    axios.get('http://localhost:3001/api/sales/revenue').then(response =>{
        setItems(response.data);
        setFilteredItems(response.data);

    }).catch(error=>{
        console.error('Error fetching data', error);
    })
    

}, []);


const RevenueRowCount = items.length;
const RevenuePerfRange=Math.round(RevenueRowCount/10);
const GreenMinValue=0;
const GreenMaxValue=RevenuePerfRange;
const RedMinValue= (RevenueRowCount-RevenuePerfRange);
const RedMaxValue=RevenueRowCount;
// console.log(RevenueRowCount,"   ",RevenuePerfRange,GreenMinValue,GreenMaxValue,RedMinValue,RedMaxValue);
// console.log(searchTerm);

//filter the item whenever the search term changes

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
<h2 className={ `text-xl font-semibold font-sans mb-2 ${ item.RevenueRank>GreenMinValue && item.RevenueRank <=GreenMaxValue ? 'text-green-500' : (item.RevenueRank>RedMinValue && item.RevenueRank<=RedMaxValue? 'text-red-500': 'text-gray-700' )}`}>{item.RevenueRank} . &nbsp;&nbsp;&nbsp;&nbsp; {item.WineName} &nbsp; {item.WineVintage} &nbsp; - &nbsp; &pound; {item.Revenue}</h2>

</div>
            ))

        )
          
        : <p>No data found</p> }
 

        </div>
    </div>
)

}

export default Revenue;