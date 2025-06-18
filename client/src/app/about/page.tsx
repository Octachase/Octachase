import Staticpage from '@/components/layouts/Staticpage'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { FaSearch } from 'react-icons/fa'
import { IoDiamondOutline } from 'react-icons/io5'
import { RiCheckboxMultipleBlankFill } from 'react-icons/ri'
import { MdOutlineSecurity } from 'react-icons/md'
import { MdLockOutline } from 'react-icons/md'
import { FaArtstation } from 'react-icons/fa'

const aboutData = [
  {
    title: 'Clients',
    description:
      ' Providing best customer service is our primary value. More than 100 account managers are focused on needs of our clients',
  },
  {
    title: 'Reliablity',
    description:
      ' Being industry leader we provide our clients with extra solidity. We are doing more than anyone else to satisfy needs of our clients.',
  },
  {
    title: 'Simplicity',
    description:
      ' Everybody can become a trader with our easiest to use trading platform. ExpertOption is available on all modern platforms: Web, Windows, MacOS, iPhone, iPad and Android.',
  },
  {
    title: 'Speed',
    description:
      'We provide fastest trading using cutting-edge technologies. No delays in order executions and lags in user interface.',
  },
]

const AboutDataCard = ({ item, index }: any) => {
  return (
    <div className="flex flex-col lg:flex-row item-center gap-[10px] my-[40px] w-full lg:w-[400px]">
      <p className="font-bold text-2xl lg:text-[32px]">0{index + 1}</p>
      <p className="text-[14px]">
        <strong>{item.title}</strong>:{' '}
        <span className="text-[#75ace7]">{item.description}</span>
      </p>
    </div>
  )
}
const page = () => {
  return (
    <Staticpage>
      <div className="h-[50vh] flex items-center justify-center bg-[url('/assets/bg-about-header.jpg')] bg-cover bg-[]">
        <h2 className="w-4/5 text-xl lg:text-[36px] text-center">
          " We make trading available for everybody"
        </h2>
      </div>
      {/* 2 columns section */}
      <div className="w-full lg:w-auto flex flex-col lg:flex-row gap-4 lg:gap-[30px] lg:p-[30px]  bg-[#222941] px-2 lg:px-[88px]">
        <div className="flex flex-col w-full lg:w-[565px]">
          <div className="w-full px-4 lg:px-0 lg:w-[400px] h-[300px] relative -mt-[60px] rounded-lg">
            <Image
              src="/assets/about-building.jpg"
              fill
              alt="about building"
              className="rounded-2xl"
            />
          </div>

          <div className="mt-4 flex items-center px-4 mb-[20px]">
            <FaSearch className="w-6 lg:w-[40px] h-6 lg:h-[40px] mr-[20px]" />
            <h2 className="text-2xl font-bold lg:text-[36px]">About</h2>
          </div>
          <article className="w-full px-4 lg:w-[400px]">
            <p className="text-[14px] text-[#75ace7]">
              Dextachase is founded with vision to create 100% transparent
              digital trading experience for its clients.
              <br />
              <br />
              We provide easy to use trading platform and spend lots of time
              providing education for our customers.
              <br />
              <br />
              Our company is interested in successful and prosperous traders who
              will create high trading volume. We are proud that we helped many
              customers to make revenue.
            </p>
          </article>
        </div>
        {/* right column */}
        <div className="flex px-4 flex-col ">
          <div className="flex items-center mt-[20px]">
            <IoDiamondOutline className="w-6 h-6 lg:w-[40px] lg:h-[40px] mr-[20px]" />
            <h2 className="text-2xl font-bold lg:text-[36px]">Our values</h2>
          </div>
          <div>
            {aboutData.map((item, index) => {
              return <AboutDataCard item={item} key={index} index={index} />
            })}
          </div>
        </div>
      </div>
      <section className="pt-8 lg:pt-[100px] bg-[#222941] pb-12 px-4 lg:px-[88px]">
        <h1 className="lg:text-center font-bold text-3xl lg:text-[40px]">
          About Our Company
        </h1>
        <p className="lg:text-center my-4 lg:my-[30px] lg:px-[100px] text-[14px] leading-[30px] lg:leading-[40px]">
          Dextachase is an Optimal Wealth Management Company with emphasis on
          Wealth Management, Wealth Creation, Trades and Digital Assets usage.
          We offer various insured services capable of generating and returning
          good profit yield on crypto assets in the Blockchain through trading
          on a wide range of Instrument Categories. Dextachase has qualified
          financiers/traders that manage and provide financial consulting
          services to her investors. We pride ourselves with a world class
          professional customer service, unique trading strategies, optimum
          transparency and fidelity. Funds Invested with Dextachase can with
          Withdrawn, Transfered or Reinvested at will.
        </p>
        {/* feature assurance */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between mb-[50px]">
          <div>
            <h3 className="font-bold mb-[4px] text-[24px]">
              <RiCheckboxMultipleBlankFill className="inline-flex mr-[8px]" />
              Multiplatform
            </h3>
            <p className="text-[14px]">
              Our trading platform is available on all devices
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-[4px] text-[24px]">
              <MdOutlineSecurity className="inline-flex mr-[8px]" />
              Security standards
            </h3>
            <p className="text-[14px]">
              Verified by Visa and MasterCard All data is encrypted with <br />{' '}
              strongest cryptographic algorithm
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-[4px] text-[24px]">
              <MdLockOutline className="inline-flex mr-[8px]" />
              Accurate quotes
            </h3>
            <p className="text-[14px]">
              Real-time market data provided by leading analytical agencies
            </p>
          </div>
        </div>
        {/* certificate section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:py-[50px]">
          <button className="w-full lg:w-[160px] order-2 lg:order-1 py-5 font-bold lg:h-[36px] mt-[15px] text-[15px] rounded-md self-center text-center bg-[#52afee] hover:bg-opacity-70 ">
            View Broker Licence
          </button>
          <div className="flex flex-col order-1 lg:order-2">
            <div className="flex flex-col w-full lg:w-[600px] mb-[40px]">
              <h4 className="text-xl lg:text-[32px] mb-2 font-bold">
                <FaArtstation className="inline-flex mr-[8px] text-sec" />
                Client oriented
              </h4>
              <p className="text-[14px]">
                We serve as if we are serving ourselves, we value the feedback
                and use it to improve our work.
              </p>
            </div>
            <div className="flex flex-col w-full lg:w-[600px] mb-[40px]">
              <h4 className="text-xl lg:text-[32px] mb-2 font-bold">
                <FaArtstation className="inline-flex mr-[8px] text-sec" />
                Good RIO Oriented
              </h4>
              <p className="text-[14px]">
                We carefully chose the best and most profitable trading methods
                to get amazing results.
              </p>
            </div>
            <div className="flex flex-col w-full lg:w-[600px] mb-[40px]">
              <h4 className="text-xl lg:text-[32px] mb-2 font-bold">
                <FaArtstation className="inline-flex mr-[8px] text-sec" />
                Expansion / Growth
              </h4>
              <p className="text-[14px]">
                We make ourselves known in the community; we create long term
                relations, while constantly expanding. Therefore, we are always
                bringing in more people to work for us.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Staticpage>
  )
}

export default page
