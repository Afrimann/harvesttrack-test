'use client'

import { ArrowUpRight } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface TooltipEntry {
  value: number
  name: string
  color: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string
}

const data = [
  { date: '04-26', scans: 48, submissions: 32 },
  { date: '04-28', scans: 55, submissions: 22 },
  { date: '04-30', scans: 75, submissions: 50 },
  { date: '05-02', scans: 60, submissions: 38 },
  { date: '05-04', scans: 62, submissions: 42 },
  { date: '05-06', scans: 72, submissions: 40 },
  { date: '05-08', scans: 43, submissions: 20 },
  { date: '05-10', scans: 38, submissions: 16 },
  { date: '05-11', scans: 25, submissions: 15 },
  { date: '05-12', scans: 30, submissions: 18 },
  { date: '05-14', scans: 78, submissions: 30 },
  { date: '05-16', scans: 68, submissions: 35 },
  { date: '05-18', scans: 65, submissions: 36 },
  { date: '05-20', scans: 70, submissions: 40 },
  { date: '05-22', scans: 50, submissions: 25 },
  { date: '05-23', scans: 24, submissions: 14 },
  { date: '05-25', scans: 82, submissions: 50 },
]

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-xl px-4 py-3"
      style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
    >
      <p className="font-semibold mb-1" style={{ fontSize: 13, color: '#111827' }}>
        {label}
      </p>
      <p style={{ fontSize: 13, color: '#111827' }}>
        scans :{' '}
        <span className="font-semibold">{payload[0]?.value}</span>
      </p>
      <p style={{ fontSize: 13, color: '#14b8a6' }}>
        submissions :{' '}
        <span className="font-semibold">{payload[1]?.value}</span>
      </p>
    </div>
  )
}

export default function QRScansChart() {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col" style={{ border: '1px solid #f0f0f0' }}>
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="font-bold" style={{ fontSize: 16, color: '#111827' }}>
            QR scans &amp; submissions
          </h3>
          <p style={{ fontSize: 13, color: '#9ca3af' }}>Last 30 days</p>
        </div>
        <button
          className="flex items-center gap-1 font-semibold text-[13px] text-gray-900 hover:text-[#2E9E52] transition-colors duration-150"
        >
          View report <ArrowUpRight size={14} />
        </button>
      </div>
      <div className="flex-1 mt-3" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scansGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E9E52" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2E9E52" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="submissionsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="scans"
              stroke="#1a6b3c"
              strokeWidth={2}
              fill="url(#scansGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#1a6b3c' }}
            />
            <Area
              type="monotone"
              dataKey="submissions"
              stroke="#14b8a6"
              strokeWidth={2}
              fill="url(#submissionsGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#14b8a6' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
