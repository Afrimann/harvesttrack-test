
import { ArrowUpRight } from 'lucide-react'

type StatusType = 'New Contact' | 'Contacted' | 'Interested'

interface Contact {
  initials: string
  name: string
  phone: string
  city: string
  status: StatusType
  timeAgo: string
}

const contacts: Contact[] = [
  { initials: 'AO', name: 'Amara Okafor', phone: '+254 709360662', city: 'Nairobi', status: 'New Contact', timeAgo: 'about 2 months ago' },
  { initials: 'DM', name: 'David Mensah', phone: '+254 733573129', city: 'Accra', status: 'New Contact', timeAgo: '5 days ago' },
  { initials: 'GM', name: 'Grace Mwangi', phone: '+254 705734339', city: 'Lagos', status: 'Contacted', timeAgo: '20 days ago' },
  { initials: 'JB', name: 'Joseph Banda', phone: '+254 788627227', city: 'Kampala', status: 'Contacted', timeAgo: '3 days ago' },
  { initials: 'EA', name: 'Esther Adeyemi', phone: '+254 710829951', city: 'Lusaka', status: 'Interested', timeAgo: 'about 2 months ago' },
  { initials: 'SN', name: 'Samuel Nkomo', phone: '+254 748823568', city: 'Kigali', status: 'Interested', timeAgo: '6 days ago' },
]

const statusStyles: Record<StatusType, { bg: string; dot: string; text: string }> = {
  'New Contact': { bg: '#f3f4f6', dot: '#6b7280', text: '#374151' },
  'Contacted':   { bg: '#fefce8', dot: '#d97706', text: '#92400e' },
  'Interested':  { bg: '#f0fdfa', dot: '#0d9488', text: '#0f766e' },
}

export default function RecentContacts() {
  return (
    <div className="bg-white rounded-2xl" style={{ border: '1px solid #f0f0f0' }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <h3 className="font-bold" style={{ fontSize: 16, color: '#111827' }}>
          Recent contacts
        </h3>
        <button className="flex items-center gap-1 font-semibold text-[13px] text-gray-900 hover:text-[#2E9E52] transition-colors duration-150">
          View all <ArrowUpRight size={14} />
        </button>
      </div>
      <div>
        {contacts.map((c, i) => {
          const s = statusStyles[c.status]
          return (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-4 transition-colors duration-150 cursor-pointer hover:bg-gray-50"
              style={{ borderBottom: i < contacts.length - 1 ? '1px solid #f9fafb' : 'none' }}
            >
              {/* Avatar */}
              <div
                className="flex items-center justify-center rounded-full font-bold shrink-0"
                style={{ width: 40, height: 40, backgroundColor: '#e8f5ee', color: '#2E9E52', fontSize: 13 }}
              >
                {c.initials}
              </div>

              {/* Name + contact */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold" style={{ fontSize: 14, color: '#111827' }}>
                  {c.name}
                </p>
                <p style={{ fontSize: 13, color: '#6b7280' }}>
                  {c.phone} · {c.city}
                </p>
              </div>

              {/* Status + time */}
              <div className="flex items-center gap-4 shrink-0">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium"
                  style={{ backgroundColor: s.bg, color: s.text, fontSize: 12 }}
                >
                  <span
                    className="rounded-full"
                    style={{ width: 6, height: 6, backgroundColor: s.dot, display: 'inline-block' }}
                  />
                  {c.status}
                </span>
                <p className="text-right" style={{ fontSize: 13, color: '#9ca3af', minWidth: 120 }}>
                  {c.timeAgo}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
