import PrimaryButton from '@/components/atoms/PrimaryButton'
import React from 'react'

type Props = {}

const MemberBenefitsSection = (props: Props) => {
  return (
    <section className="bg-white flex items-center justify-center py-12 w-full h-auto flex-col">
      <h2 className="font-bold text-[#222941]  text-7xl py-5">
        Not-For-Profit <br /> Means <br /> More-For-Members
      </h2>

      <p className="text-[#222941] w-1/2 text-2xl text-left">
        As a not-for-profit organization, Octachase is committed to giving more
        to its members. Whatever your goal may be, we have a account to help you
        get there. Find the right account for your future.
      </p>

      <div className="my-10">
        <PrimaryButton
          text={'Explore Options'}
          href="/dashboard/explore-options"
          sx="w-full !bg-[#52afee] mx-auto rounded-[10px] lg:w-96 text-lg"
        />
      </div>
    </section>
  )
}

export default MemberBenefitsSection
