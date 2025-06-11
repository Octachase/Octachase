//@ts-nocheck
import { useState, useEffect, useRef } from 'react'

export default function GoalSection() {
  const [isSticky, setIsSticky] = useState(false)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const leftElement = leftRef.current
      const rightElement = rightRef.current
      const containerElement = containerRef.current

      if (!leftElement || !rightElement || !containerElement) return

      // Only apply sticky behavior on desktop (lg breakpoint and up)
      const isDesktop = window.innerWidth >= 1024

      if (!isDesktop) {
        setIsSticky(false)
        return
      }

      const containerRect = containerElement.getBoundingClientRect()
      const leftRect = leftElement.getBoundingClientRect()
      const rightRect = rightElement.getBoundingClientRect()

      // Calculate the natural scroll position where left content would end
      const leftContentHeight = leftElement.scrollHeight
      const rightContentHeight = rightElement.scrollHeight
      const containerTop = containerRect.top

      // The left side should become sticky when it would naturally scroll out of view
      // This happens when the container has scrolled enough that the left content
      // would be above the viewport, but the right content still has more to show
      const leftContentEndPosition = leftContentHeight - window.innerHeight

      // Make sticky when:
      // 1. We've scrolled past the point where left content would naturally end
      // 2. But right content still has more to show
      // 3. And container is still in view
      const shouldBeSticky =
        containerTop <= 0 && // Container has started scrolling
        Math.abs(containerTop) >= leftContentEndPosition && // Left would naturally end
        rightRect.bottom > window.innerHeight && // Right still has content
        leftContentHeight < rightContentHeight // Left is actually shorter

      setIsSticky(shouldBeSticky)
    }

    const handleResize = () => {
      handleScroll() // Re-evaluate on resize
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Section container */}
      <div
        ref={containerRef}
        className="px-4 sm:px-6 lg:px-[88px] flex flex-col lg:flex-row items-start gap-6 lg:gap-8 relative"
      >
        {/* Left side - Dynamic sticky behavior */}
        <div
          ref={leftRef}
          className={`w-full lg:w-1/3 flex-shrink-0 transition-all duration-300 ${
            isSticky ? 'lg:sticky lg:top-8 lg:self-start' : 'relative'
          }`}
        >
          <div className="lg:pr-8 mb-8 lg:mb-0">
            <h6 className="text-[13px] text-[#264653] mb-2">
              Our Goal and Purpose
            </h6>
            <div className="mb-[20px]">
              <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] text-black leading-tight">
                Our common Goal and Purpose is Creating opportunities to rise.
              </h2>
            </div>
            <div className="border-[3px] border-[#264653] h-[5px] w-[50px] mb-6 lg:mb-8" />

            {/* Additional left content to demonstrate the scroll behavior */}
            <div className="space-y-4 lg:space-y-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                We believe in empowering individuals and institutions through
                innovative financial solutions and strategic investment
                opportunities.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our comprehensive approach combines cutting-edge technology with
                time-tested investment principles to deliver exceptional
                results.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Always scrollable */}
        <div ref={rightRef} className="w-full lg:flex-1">
          <div className="space-y-6 lg:space-y-8">
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  width="1080"
                  height="721"
                  src="https://theokxglobalink.com/asset/temp/wp-content/uploads/sites/56/2021/07/at-the-meeting-with-finance-advisor.jpg"
                  className="w-full h-40 sm:h-48 object-cover"
                  alt="At the meeting with finance advisor."
                  loading="lazy"
                />
                <div className="p-4 lg:p-6">
                  <h3 className="text-[16px] lg:text-[18px] text-[#111D29] mb-3 lg:mb-4 text-center font-semibold">
                    Explore With Us
                  </h3>
                  <div className="text-[12px] lg:text-[13px] text-center text-[#111D29] leading-relaxed">
                    Seize the opportunity to grow your capital in the
                    cryptocurrency market by copying the trades of top
                    performing traders in our investment programme
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  width="1080"
                  height="721"
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
                  className="w-full h-40 sm:h-48 object-cover"
                  alt="Investment management dashboard"
                  loading="lazy"
                />
                <div className="p-4 lg:p-6">
                  <h3 className="text-[16px] lg:text-[18px] text-[#111D29] mb-3 lg:mb-4 text-center font-semibold">
                    Investment Management
                  </h3>
                  <div className="text-[12px] lg:text-[13px] text-center text-[#111D29] leading-relaxed">
                    We deliver active bitcoin investment strategies across
                    public and private markets and custom solutions to
                    institutional and individual investors.
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  width="1080"
                  height="721"
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop"
                  className="w-full h-40 sm:h-48 object-cover"
                  alt="Wealth management consultation"
                  loading="lazy"
                />
                <div className="p-4 lg:p-6">
                  <h3 className="text-[16px] lg:text-[18px] text-[#111D29] mb-3 lg:mb-4 text-center font-semibold">
                    Wealth Management
                  </h3>
                  <div className="text-[12px] lg:text-[13px] text-center text-[#111D29] leading-relaxed">
                    We help people, businesses and institutions build, preserve
                    and manage wealth so they can pursue their financial goals.
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  width="1080"
                  height="721"
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop"
                  className="w-full h-40 sm:h-48 object-cover"
                  alt="High frequency trading setup"
                  loading="lazy"
                />
                <div className="p-4 lg:p-6">
                  <h3 className="text-[16px] lg:text-[18px] text-[#111D29] mb-3 lg:mb-4 text-center font-semibold">
                    High Frequency Trading
                  </h3>
                  <div className="text-[12px] lg:text-[13px] text-center text-[#111D29] leading-relaxed">
                    Global institutions, leading hedge funds and industry
                    innovators turn to The Okx Global ink for bitcoin
                    cryptocurrency trading advice and market-making services.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
