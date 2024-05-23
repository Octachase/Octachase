import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: `"Octachase has been a game-changer for me as a trader. Their all-in-one platform has made it incredibly convenient to trade across multiple markets, from cryptocurrencies to forex, without having to juggle different platforms. The user interface is intuitive, and the execution speed is lightning-fast, ensuring I never miss an opportunity. Highly recommended!"`,
      name: 'Jason Turner',
      title: 'Professional Trader, New York',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    {
      id: 2,
      quote: `"As someone who loves to diversify their portfolio, Octachase has been a godsend. Their platform allows me to seamlessly trade stocks, commodities, and cryptocurrencies alongside my forex positions. The educational resources and analytical tools they provide have been instrumental in helping me make informed trading decisions. I'm truly impressed with the level of service and support they offer."`,
      name: 'Sophia Kim',
      title: 'Investor, Seoul',
      image: 'https://randomuser.me/api/portraits/women/42.jpg',
    },
    {
      id: 3,
      quote: `"Octachase's commitment to innovation and cutting-edge technology is truly remarkable. Their platform is not only feature-rich but also incredibly user-friendly. I appreciate the attention to detail and the constant updates they provide to ensure a seamless trading experience. As a crypto enthusiast, I'm particularly impressed with their cryptocurrency offerings and the depth of their market analysis."`,
      name: 'Alejandro Rodriguez',
      title: 'Cryptocurrency Trader, Madrid',
      image: 'https://randomuser.me/api/portraits/men/28.jpg',
    },
    {
      id: 4,
      quote: `"Octachase has been a game-changer for my trading firm. Their platform's robust risk management tools and advanced order types have allowed us to execute complex trading strategies with ease. The customer support team is also top-notch, always available to assist with any queries or concerns. We're thrilled to have found a reliable partner in Octachase."`,
      name: 'Emily Thompson',
      title: 'Portfolio Manager, Trading Firm, London',
      image: 'https://randomuser.me/api/portraits/women/89.jpg',
    },
  ]

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Testimonials
          </h2>
        </div>
        <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700"
            >
              <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {testimonial.quote.split('\n')[0]}
                </h3>
                {testimonial.quote
                  .split('\n')
                  .slice(1)
                  .map((paragraph, index) => (
                    <p key={index} className="my-4">
                      {paragraph}
                    </p>
                  ))}
              </blockquote>
              <figcaption className="flex justify-center items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src={testimonial.image}
                  alt="Profile"
                />
                <div className="space-y-0.5 font-medium dark:text-white text-left">
                  <div>{testimonial.name}</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {testimonial.title}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
