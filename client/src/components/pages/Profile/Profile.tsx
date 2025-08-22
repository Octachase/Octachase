import React from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { useUserSlice } from '@/slices/user.slice'
import createDateFromString from '@/utils/createDate'
import formatNumberIntoMoney from '@/utils/formatNumberIntoMoney'

const Profile = () => {
  // Get User Metrics

  const user = useSelector(useUserSlice)

  // useCreateErrorFromApiRequest(error);
  return (
    <div className="">
      <h3 className="uppercase text-md font-bold py-2">Profile</h3>

      <div className=" w-full h-auto">
        <div className="border-b-[1px] p-3">
          <p className="text-[13px] opacity-80">
            Currency: <span className="opacity-100">$</span>
          </p>
        </div>
        <div className="border-b-[1px] p-3">
          <p className="text-[13px] opacity-80">Date Joined:</p>
          <p className="opacity-100 text-[13px]">
            {createDateFromString(user?.createdAt)}
          </p>
        </div>
        <div className="border-b-[1px] p-3">
          <p className="text-[13px] opacity-80">Phone Number:</p>
          <p className="opacity-100 text-[13px]">
            {user?.phone || 'Not provided'}
          </p>
        </div>
        <div className="p-3">
          <p className="text-[13px] opacity-80">Profit:</p>
          <p className="opacity-100 text-sm">
            ${formatNumberIntoMoney(user?.profit)}
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Profile
