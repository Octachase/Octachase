'use client'

import { transactions } from '@/utils/mockTransactions'
import { useEffect, useState } from 'react'

export default function FloatingTransaction() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const loop = (initial = false) => {
      const delayBeforeShow = initial
        ? 10000
        : Math.floor(Math.random() * 8000) + 5000 // 5s–13s
      const visibleDuration = Math.floor(Math.random() * 4000) + 3000 // 3s–7s

      timeoutId = setTimeout(() => {
        setVisible(true) // show popup

        setTimeout(() => {
          setVisible(false) // hide popup
          setCurrent((prev) => (prev + 1) % transactions.length) // move to next
          loop() // continue loop
        }, visibleDuration)
      }, delayBeforeShow)
    }

    loop(true) // start with initial 10s delay

    return () => clearTimeout(timeoutId)
  }, [])

  const transaction = transactions[current]

  return (
    <div
      className={`fixed z-[90] bottom-[45%] right-[50px] bg-white px-[27px] py-[10px] rounded-[7px] shadow-[0px_5px_13px_0px_rgba(0,0,0,0.3)] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <span className="text-[14px] text-[#000000] font-[500]">
        Someone from{' '}
        <b className="font-bold text-[#000000]">{transaction.country}</b> just{' '}
        <b className="text-[#000000] font-bold">{transaction.action}</b>
        <br />
        <span className="text-[#3facff] font-bold">{transaction.amount}</span>
      </span>
    </div>
  )
}
