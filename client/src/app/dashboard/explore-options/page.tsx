import React from 'react'
import dynamic from 'next/dynamic'
import { FaChartLine, FaUsers, FaRocket, FaCrown } from 'react-icons/fa'
import Navbar from '@/components/molecules/Navbar'
import Link from 'next/link'

interface AccountTypeProps {
  title: string
  icon: React.ReactNode
  features: string[]
  recommended: boolean
}

// Create a non-animated version of AccountType for SSR
const StaticAccountType: React.FC<AccountTypeProps> = ({
  title,
  icon,
  features,
  recommended,
}) => (
  <div
    className={`bg-white rounded-lg shadow-xl p-6 flex flex-col items-center ${
      recommended ? 'border-4 border-yellow-400' : ''
    }`}
  >
    {/* <div className="text-4xl mb-4 text-blue-600 border h-10 w-10">{icon}</div> */}
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
    <Link href="/signup" passHref>
      <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">
        Choose Plan
      </button>
    </Link>
  </div>
)

// Dynamically import the animated version
const AnimatedAccountType = dynamic(
  () => import('../../../components/pages/NonProfit/AnimatedAccountType'),
  {
    ssr: false,
  }
)

interface Account {
  title: string
  icon: React.ReactNode
  features: string[]
  recommended: boolean
}

const TradingAccounts: React.FC = () => {
  const accounts: Account[] = [
    {
      title: 'Basic',
      icon: <FaChartLine />,
      features: ['Standard spreads', 'Basic analysis tools', '24/5 support'],
      recommended: false,
    },
    {
      title: 'Pro',
      icon: <FaUsers />,
      features: [
        'Tight spreads',
        'Advanced charting',
        'Dedicated account manager',
      ],
      recommended: true,
    },
    {
      title: 'Elite',
      icon: <FaRocket />,
      features: [
        'Ultra-tight spreads',
        'Premium analysis tools',
        'Priority support',
      ],
      recommended: false,
    },
    {
      title: 'VIP',
      icon: <FaCrown />,
      features: [
        'Institutional-grade execution',
        'Customized solutions',
        'Personal market analyst',
      ],
      recommended: false,
    },
  ]

  return (
    <>
      <Navbar />
      <section className="py-16 px-4 lg:px-8 flex items-center justify-center flex-col h-full  md:h-screen bg-gradient-to-b from-[#222941] to-[#1a2035]">
        <h3 className="text-4xl text-center font-bold md:mt-0 mt-10 mb-12 text-white">
          Our Trading Account Types
        </h3>
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {accounts.map((account, index) => (
            <React.Fragment key={index}>
              {typeof window === 'undefined' ? (
                <StaticAccountType {...account} />
              ) : (
                <AnimatedAccountType {...account} />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </>
  )
}

export default TradingAccounts
