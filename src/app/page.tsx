'use client'
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import './page.css'
export default function Home() {
  const router = useRouter();
  return (
    <div className='Main'>
      <div className='mainButton'>
        <Button onClick={() => { router.push('/OrderBook') }} variant='contained'>ORDERBOOK</Button>
      </div>
      <div className='mainButton'>
        <Button onClick={() => { router.push('/ApexChart') }} variant='contained'>APEXCHART</Button>
      </div>
    </div>
  )
}
