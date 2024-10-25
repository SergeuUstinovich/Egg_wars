import React from 'react'
import { classNames } from '../../utils/classNames'

interface CurvedProgressBarProps {
  value: number
  max: number
  className?: string
  colorFill?: string
}

const CurvedProgressBar: React.FC<CurvedProgressBarProps> = ({
  value,
  max,
  className = '',
  colorFill = '#F7A31A',
}) => {
  const radius = 90
  const centerX = 110
  const centerY = 110
  const circumference = 2 * Math.PI * radius
  const progress = (value / max) * circumference
  const strokeDashoffset = circumference - progress

  const angle = (value / max) * Math.PI
  const cx = centerX + radius * Math.cos(angle + Math.PI)
  const cy = centerY + radius * Math.sin(angle - Math.PI)

  return (
    <svg
      className={classNames('curved-progress-bar', {}, [className])}
      width="100%"
      height="170"
      viewBox="0 0 210 110"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#F7A31A', stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: '#F7A31A', stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <path
        stroke="#e0e0e0"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        d="M 10,100 A 90 90 0 0 1 200,100"
      />
      <path
        stroke="url(#gradient)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        d="M 10,100 A 90 90 0 0 1 200,100"
        style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
      />
      <circle
        cx={cx}
        cy={cy}
        r="5"
        fill={colorFill}
        style={{
          transition: 'cx 0.5s ease-in-out, cy 0.5s ease-in-out',
        }}
      />
    </svg>
  )
}

export default CurvedProgressBar
