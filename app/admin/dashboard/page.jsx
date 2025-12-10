import React from 'react'
import CountOverview from './CouuntOverview';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { OrderOverview } from './orderOverView';
import { OrderStatusOverView } from './orderStatusOverView';
import LatestOrder from './latestOrder';
import ProductRatingTable from './dashboardRating';
  
const AdminDashboard = () => {
  return (
    <div className='py-6'>
      <CountOverview/>
      <div className='mt-10 flex lg:flex-nowrap flex-wrap gap-10'>
        <Card className='rounded-lg lg:w-[70%] w-full'>
          <CardHeader className='flex justify-between items-center px-4 py-2 rounded-t-lg'>
            <h3>Orders View</h3>
            <button className='bg-primary text-white font-semibold p-2 rounded-md'>
              <Link href='#'>View All</Link>
            </button>
          </CardHeader>
          <CardContent>
            <OrderOverview />
          </CardContent>
        </Card>
        <Card className='rounded-lg lg:w-[30%] w-full'>
          <CardHeader className='flex justify-between items-center px-4 py-2 rounded-t-lg'>
            <h3>Orders Status</h3>
            <button className='bg-primary text-white font-semibold p-2 rounded-md'>
              <Link href='#'>View All</Link>
            </button>
          </CardHeader>
          <CardContent>
            <OrderStatusOverView />
          </CardContent>
        </Card>
      </div>
      <div className='mt-10 flex lg:flex-nowrap flex-wrap gap-10'>
        <Card className='rounded-lg lg:w-[70%] w-full'>
          <CardHeader className='flex justify-between items-center px-4 py-2 rounded-t-lg'>
            <h3>Orders View</h3>
            <button className='bg-primary text-white font-semibold p-2 rounded-md'>
              <Link href='#'>View All</Link>
            </button>
          </CardHeader>
          <CardContent>
            <LatestOrder />
          </CardContent>
        </Card>
        <Card className='rounded-lg lg:w-[30%] w-full'>
          <CardHeader className='flex justify-between items-center px-4 py-2 rounded-t-lg'>
            <h3>Orders Status</h3>
            <button className='bg-primary text-white font-semibold p-2 rounded-md'>
              <Link href='#'>View All</Link>
            </button>
          </CardHeader>
          <CardContent>
            <ProductRatingTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard;