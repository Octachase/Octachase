import Link from 'next/link'
import React from 'react'

type Props = {}

const Logo = (props: Props) => {
  return (
    <Link href="/">
      <div className="flex items-center gap-3 group cursor-pointer">
        {/* Icon Container */}
        <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-blue-500/40">
          {/* Glass effect overlay */}
          <div className="absolute inset-0.5 bg-gradient-to-br from-white/30 to-transparent rounded-xl"></div>

          {/* Lightning bolt icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-white relative z-10 drop-shadow-sm"
          >
            <path d="M13 3L4 14h7v7l9-11h-7V3z" />
          </svg>
        </div>

        {/* Text */}
        <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-slate-800 bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-blue-600">
          Dextachase
        </span>
      </div>
    </Link>
  )
}

export default Logo
