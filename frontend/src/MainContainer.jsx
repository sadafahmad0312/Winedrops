import  React, { useState } from 'react'
import Revenue from "./Revenue";
import Bottles from './Bottles';
import Order from './Order';



function MainContainer(){
 

  const[showBottleButtonComponent, setShowBottleButtonComponent] = useState(false);
  const[showRevenueButtonComponent,setShowRevenueButtonComponent] = useState(true);
  const [showOrderButtonComponent, setShowOrderButtonComponent] = useState(false);
  const[searchTerm, setSearchTerm]= useState('');
  const[ActiveButton, setActiveButton] = useState('revenue');


  const displayRevenue=()=>{
  setShowRevenueButtonComponent(true);
 setShowBottleButtonComponent(false);
 setShowOrderButtonComponent(false);
 setActiveButton('revenue');
  }

 const displayBottles=()=>{
  setShowBottleButtonComponent(true);
  setShowRevenueButtonComponent(false);
  setShowOrderButtonComponent(false);
  setActiveButton('# bottles sold');

 }

 const displayOrder =()=>{
  setShowOrderButtonComponent(true);
  setShowRevenueButtonComponent(false);
  setShowBottleButtonComponent(false);
  setActiveButton('# orders');
 }



  // Function to handle search input changes
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value); // Update search term state

  };

    return(
    <div className=' container h-auto  top-20 w-auto '>

<div className='flex w-auto h-auto justify-center items-center '>
<p className='text-4xl text-center text-gray-500'>Best Selling Wine - Ranked by  {ActiveButton}</p> 

</div>
  
           
           <div   className='flex items-center h-auto w-auto  justify-start mx-4 '>

      

{/*Start of search */}
<div className="  p-2 w-1/4 ">
  <div className="relative  max-w-md">
    <input 
      type="text" 
      value={searchTerm}
      placeholder="Search your wine / vintage..." 
      onChange={handleSearch}
      className="w-full p-4 pl-10 h-12 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <button 
      className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
      type="submit"
    >
     
      <svg className="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"></path>
      </svg>
    </button>
  </div>
</div>

{/*End of search*/}

<div className="flex space-x-1 p-10 ">
  
      {/* Button 1 */}
      <button onClick={displayRevenue}  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-64 ">
        Revenue
      </button>

      {/* Button 2 */}
      <button onClick={displayBottles} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-64">
        Bottles
      </button>

      {/* Button 3 */}
      <button onClick={displayOrder} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-64">
        Orders
      </button>
    </div>


           </div>
           {!showBottleButtonComponent && !showOrderButtonComponent && showRevenueButtonComponent && <Revenue searchTerm={searchTerm} />}
      {!showOrderButtonComponent && !showRevenueButtonComponent && showBottleButtonComponent && <Bottles searchTerm={searchTerm} />}
      {!showBottleButtonComponent && !showRevenueButtonComponent && showOrderButtonComponent && <Order searchTerm={searchTerm} />}
        </div>
    )

}

export default MainContainer;