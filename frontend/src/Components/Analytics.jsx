import React from 'react';
import Laptop from '../assets/laptop.jpg';
import homepage from '../assets/homepage.png';
import dashboard from '../assets/dashboard.png';
import seller from '../assets/seller.png';
import borrowing from '../assets/borrowing.png';
const Analytics = () => {
  return (
    <div className='w-full bg-black py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
      <img className='w-[500px] mx-auto my-4 hover:scale-105 duration-300' src={homepage} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>HOMEPAGE</p>
            
          <p className='text-white'>
          Homepage features a user-friendly calendar that allows you to quickly select any date and see list of all transactions made on that day, including the date, amount, shop or vendor, and category of expense made on that day. This powerful feature makes it easy to keep track of your expenses and monitor your spending habits over time
          </p>
          <div className='flex justify-end'><button className='-m-2 bg-black w-[200px] border border-[#00df9a]-800 rounded-md font-medium my-6  py-3 text-[#00df9a] ml-auto hover:bg-[#00df9a] hover:text-black hover:border-black'>Get Started</button></div>
        </div>
       
      </div>
      <br></br>
      <br></br>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
      
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>SELLER'S PAGE</p>
         
          <p className='text-white'>
          Our seller's page is designed  user-friendly to help shopkeepers track outstanding debts. It allows you to easily input customer information,borrowing date and track whether or not customers have paid their debts. With all outstanding debts in one place, you can stay on top of your cash flow.
          </p>
          <button className='-m-2 bg-black w-[200px] border border-[#00df9a]-800 rounded-md font-medium my-6  py-3 text-[#00df9a] hover:bg-[#00df9a] hover:text-black hover:border-black'>Get Started</button>
        </div>
        <img className='w-[500px] mx-auto my-4 hover:scale-105 duration-300' src={seller} alt='/' />
      </div>
      <br></br>
      <br></br>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4 hover:scale-105 duration-300' src={borrowing} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>BORROWING PAGE</p>
          
          <p className ='text-white'>
          With clean and organized layout our app's Borrowings page provides an easy and intuitive way to track all of your borrowings in one place.You can quickly see who you owe money to and how much you owe each month.
          </p>
          <div className='flex justify-end'><button className='-m-2 bg-black w-[200px] border border-[#00df9a]-800 rounded-md font-medium my-6  py-3 text-[#00df9a] ml-auto hover:bg-[#00df9a] hover:text-black hover:border-black'>Get Started</button></div>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
       
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>DATA ANALYTICS DASHBOARD</p>
         
          <p className ='text-white'>
          Visualize your data in meaningful ways, including graphs and charts that provide a clear picture of your spending habits.
    Track your progress over time and set goals for yourself. Our view analytics feature allows you to set budgets for different categories, so you can track your spending against your goals. By seeing how you're progressing towards your goals, you can stay motivated and on track.
          </p>
          <button className='-m-2 hover:bg-gradient-to-r from-[#19A7CE] to-[#146C94]  w-[200px] border border-[#00df9a] rounded-md font-medium my-6  py-3 text-[#00df9a] hover:bg-[#00df9a] hover:text-black hover:border-black'>Get Started</button>
        </div>
        <img className='w-[500px] mx-auto my-4 hover:scale-105 duration-300' src={dashboard} alt='/' />
      </div>
      
      <hr className=' h-0.5 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700'/>
    </div>
  );
};

export default Analytics;
