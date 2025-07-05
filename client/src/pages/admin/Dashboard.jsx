import React from 'react';
import { useSelector } from 'react-redux';

function Dashboard(props) {
    const {user} = useSelector(store => store.auth)
    return (
        <>
         {/* <h1>Dashboard</h1> */}
         <div className='flex md:h-screen bg-gray-100'>

            {/* Main content */}
            <div className='flex-1 flex flex-col'>

            {/* Dashboard content */}
            <main className='p-6 space-y-6'>

                {/* Welcome section */}
                <section className='bg-blue-500 text-white rounded-lg p-6'>
                    <h1 className='text-2xl font-bold'>Welcome back, {user.name}! </h1>

                </section>

            </main>

            </div>

         </div>
        </>
    );
}

export default Dashboard;