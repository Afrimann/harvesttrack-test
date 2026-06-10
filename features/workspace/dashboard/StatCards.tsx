import { Users, QrCode, TrendingUp, CheckCircle, type LucideIcon } from 'lucide-react'

interface StatCard {
  label: string
  value: string
  subtext: string
  subtextColor: string
  icon: LucideIcon
  iconColor: string
  iconBg: string
}

const stats: StatCard[] = [
  {
    label: 'TOTAL CONTACTS',
    value: '30',
    subtext: '+12 this week',
    subtextColor: '#2E9E52',
    icon: Users,
    iconColor: '#2E9E52',
    iconBg: '#e8f5ee',
  },
  {
    label: 'QR SCANS (30D)',
    value: '1,601',
    subtext: '+34%',
    subtextColor: '#2E9E52',
    icon: QrCode,
    iconColor: '#2E9E52',
    iconBg: '#e8f5ee',
  },
  {
    label: 'SUBMISSIONS',
    value: '987',
    subtext: '62% conv.',
    subtextColor: '#2E9E52',
    icon: TrendingUp,
    iconColor: '#2E9E52',
    iconBg: '#e8f5ee',
  },
  {
    label: 'JOINED CHURCH',
    value: '3',
    subtext: '+3 this month',
    subtextColor: '#6b7280',
    icon: CheckCircle,
    iconColor: '#9ca3af',
    iconBg: '#f3f4f6',
  },
]

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl p-4 sm:p-5"
          style={{ border: '1px solid #f0f0f0' }}
        >
          <div className="flex items-start justify-between mb-3">
            <p
              className="font-semibold tracking-wide leading-tight"
              style={{ fontSize: 11, color: '#6b7280', letterSpacing: '0.06em' }}
            >
              {stat.label}
            </p>
            <div
              className="flex items-center justify-center rounded-xl shrink-0 ml-2"
              style={{ width: 36, height: 36, backgroundColor: stat.iconBg }}
            >
              <stat.icon size={18} color={stat.iconColor} />
            </div>
          </div>
          <p className="font-bold mb-1" style={{ fontSize: 28, color: '#111827', lineHeight: 1 }}>
            {stat.value}
          </p>
          <p className="font-medium" style={{ fontSize: 13, color: stat.subtextColor }}>
            {stat.subtext}
          </p>
        </div>
      ))}
    </div>
  )
}
