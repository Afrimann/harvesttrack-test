'use client'

import { ArrowUpRight } from 'lucide-react'
import {
  BarChart,
  Bar,
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
  { name: 'Otieno', contacts: 135, conversions: 14 },
  { name: 'Mwangi', contacts: 95, conversions: 10 },
  { name: 'Adeyemi', contacts: 78, conversions: 8 },
  { name: 'Banda', contacts: 62, conversions: 6 },
  { name: 'Nkomo', contacts: 86, conversions: 11 },
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
      <p style={{ fontSize: 13, color: '#2E9E52' }}>
        Contacts: <span className="font-semibold">{payload[0]?.value}</span>
      </p>
      <p style={{ fontSize: 13, color: '#d97706' }}>
        Conversions: <span className="font-semibold">{payload[1]?.value}</span>
      </p>
    </div>
  )
}

export default function TeamPerformanceChart() {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col" style={{ border: '1px solid #f0f0f0' }}>
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-bold" style={{ fontSize: 16, color: '#111827' }}>
          Team performance
        </h3>
        <button
          className="flex items-center gap-1 font-semibold text-[13px] text-gray-900 hover:text-[#2E9E52] transition-colors duration-150"
        >
          All teams <ArrowUpRight size={14} />
        </button>
      </div>
      <div className="flex-1 mt-3" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }} barGap={4} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="4 4" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              domain={[0, 160]}
              ticks={[0, 40, 80, 120, 160]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
            <Bar dataKey="contacts" fill="#2E9E52" radius={[4, 4, 0, 0]} maxBarSize={36} />
            <Bar dataKey="conversions" fill="#d97706" radius={[4, 4, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
