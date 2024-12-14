'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { bookingStore } from '@/utils/store/booking.store';

const timeSlots = [
  {
    type: "specific",
    time: "Flexible",
    value: 0,
  },
  {
    type: "standard",
    time: "08:00am",
    value: 8,
  },
  {
    type: "standard",
    time: "08:30am",
    value: 8.5,
  },
  {
    type: "standard",
    time: "09:00am",
    value: 9,
  },
  {
    type: "standard",
    time: "09:30am",
    value: 9.5,
  },
  {
    type: "standard",
    time: "10:00am",
    value: 10,
  }
];

const Step_3 = () => {
  const [timeSelected, setTimeSelected] = useState<number>(0);
  const bookingUpdate = bookingStore((state: any) => state.updateBookingData)
  const router = useRouter();

  const handleRouteExit = () => {
    router.push('/');
  }
  const handleRoute = () => {
    router.push('/booking/step-4')
  }
  
  const handleClick = (time: number) => {
    setTimeSelected(time);
    bookingUpdate({ bookingTiming: timeSelected });
  }

  return (
    <div className="h-full w-full">
      <div className='sm:hidden w-full h-[70px] flex flex-row bg-white justify-end items-end pr-10'>
        <div className='h-full w-[5.2%]'>
          <div className='h-full w-full flex justify-center items-center hover:cursor-pointer' onClick={handleRouteExit}>
              <Image src='/images/ProgressBar/Group.svg' alt='exitButton' width={20} height={20}/>
          </div>
        </div>
      </div>
      <div className="w-3/4 sm:w-1/2 max-sm:pl-10 sm:m-auto mb-[35px]">
        <div className="justify-center text-left sm:text-center h-[80px]">
          <p className="text-4xl font-Averta-Bold mb-2 mt-[50px] ">
            Book Timing
          </p>
          <p className="text-[20px] text-[#88939D] font-Averta-Regular leading-[25px]">
            Save even more by booking off-peak dates and times.
          </p>
        </div>
    </div>
    <div className="grid w-3/4 m-auto justify-center gap-4 mt-[40px]">
    {timeSlots.map((slot) => (
      slot.type === "specific" ? (
        <Button
          key={slot.time}
          className={`bg-white h-[73px] w-[400px] rounded-[10px] font-Averta-Semibold text-xl border-2 hover:text-white ${timeSelected === slot.value ? "border-[#1A78F2] text-[#1A78F2]" : "bg-white text-[#4F6071]"}`}
          onClick={() => handleClick(slot.value)}>
          <div className="grid grid-cols-2">
            <p className="text-base font-Averta-Semibold leading-[23px] tracking-tight text-left">{slot.time}</p>
            <p className="text-xs font-Averta-Semibold leading-[14px] tracking-tight text-right self-center">Save $8.10 off</p>
            <p className="text-sm font-Averta-Regular leading-[19px] tracking-tight text-left">Cleaner will arrive between 9am-4pm</p>
          </div>
        </Button>
      ) : (
        <Button 
          key={slot.time}
          className={`bg-white h-[73px] w-[400px] rounded-[10px] font-Averta-Semibold text-base leading-[23px] tracking-tight border-2 hover:text-white ${timeSelected === slot.value ? "border-[#1A78F2] text-[#1A78F2]" : "bg-white text-[#4F6071]"}`}
          onClick={() => handleClick(slot.value)}>
          {slot.time}
        </Button>
      )
    ))}
    </div>

    <div className="max-sm:hidden flex justify-center items-center mt-[35px]">
      <Button className="w-[165px] h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold" onClick={handleRoute}>Next</Button>
    </div>
</div>

  )
}

export default Step_3