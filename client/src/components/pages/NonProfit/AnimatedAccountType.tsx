import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedAccountTypeProps {
  title: string
  icon: React.ReactNode
  features: string[]
  recommended: boolean
}

const AnimatedAccountType: React.FC<AnimatedAccountTypeProps> = ({
  title,
  icon,
  features,
  recommended,
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-white rounded-lg shadow-xl p-6 flex flex-col items-center ${
      recommended ? 'border-4 border-yellow-400' : ''
    }`}
  >
    <div className="text-4xl mb-4 text-blue-600">{icon}</div>
    <h4 className="text-xl font-bold mb-3 text-black">{title}</h4>
    <ul className="text-sm">
      {features.map((feature, index) => (
        <li key={index} className="mb-2 flex items-center">
          <span className="mr-2 text-green-500">✓</span>
          <span className="text-black">{feature}</span>
        </li>
      ))}
    </ul>
    {recommended && (
      <span className="mt-4 bg-yellow-400 text-black text-xs font-bold py-1 px-2 rounded-full">
        RECOMMENDED
      </span>
    )}
    <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">
      Choose Plan
    </button>
  </motion.div>
)

export default AnimatedAccountType
