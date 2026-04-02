import React from 'react'
import Sidebar from '../components/Sidebar'
import Dashboard from './Dashboard'
const NewDashboard = () => {
return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar - Handles its own responsiveness */}
      <Sidebar />

      {/* Main Content Area */}
      <main className='flex-1 flex flex-col min-w-0 overflow-hidden'>
        <div className='flex-1 overflow-y-auto'>
          <Dashboard />
        </div>
      </main>
    </div>
  )
}

export default NewDashboard