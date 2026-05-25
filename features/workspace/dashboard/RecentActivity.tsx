interface ActivityItem {
  title: string
  description: string
  time: string
}

const activities: ActivityItem[] = [
  {
    title: 'New QR submission',
    description: 'Amara Okafor just filled your QR form.',
    time: '2m ago',
  },
  {
    title: 'Task overdue',
    description: 'Follow-up call with David Mensah is overdue.',
    time: '1h ago',
  },
  {
    title: 'Stage change',
    description: 'Grace Mwangi moved to Discipleship.',
    time: '3h ago',
  },
  {
    title: 'Weekly digest ready',
    description: 'Your team added 47 contacts this week.',
    time: '1d ago',
  },
  {
    title: 'New team member',
    description: 'Sister Joy joined the Grace workspace.',
    time: '2d ago',
  },
]

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col" style={{ border: '1px solid #f0f0f0' }}>
      <h3 className="font-bold mb-4" style={{ fontSize: 16, color: '#111827' }}>
        Recent activity
      </h3>
      <div className="flex flex-col gap-0">
        {activities.map((item, i) => (
          <div key={i} className="flex gap-3 py-3" style={{ borderBottom: i < activities.length - 1 ? '1px solid #f9fafb' : 'none' }}>
            <div className="flex-shrink-0 mt-1">
              <span
                className="block rounded-full"
                style={{ width: 8, height: 8, backgroundColor: '#2E9E52' }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold" style={{ fontSize: 14, color: '#111827' }}>
                {item.title}
              </p>
              <p style={{ fontSize: 13, color: '#6b7280' }}>{item.description}</p>
              <p className="mt-0.5" style={{ fontSize: 12, color: '#9ca3af' }}>
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
