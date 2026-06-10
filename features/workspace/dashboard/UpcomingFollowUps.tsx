interface FollowUp {
  task: string
  person: string
  date: string
}

const followUps: FollowUp[] = [
  { task: 'Invite to service', person: 'Michael Dlamini', date: 'May 22' },
  { task: 'Pray together', person: 'Joseph Banda', date: 'May 24' },
  { task: 'Send Bible passage', person: 'Ruth Achieng', date: 'May 25' },
  { task: 'Pray together', person: 'Hannah Osei', date: 'May 25' },
  { task: 'Home visit', person: 'Lydia Ofori', date: 'May 25' },
]

export default function UpcomingFollowUps() {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col" style={{ border: '1px solid #f0f0f0' }}>
      <h3 className="font-bold mb-4" style={{ fontSize: 16, color: '#111827' }}>
        Upcoming follow-ups
      </h3>
      <div className="flex flex-col gap-2">
        {followUps.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{ border: '1px solid #f3f4f6' }}
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate" style={{ fontSize: 14, color: '#111827' }}>
                {item.task}
              </p>
              <p className="truncate" style={{ fontSize: 13, color: '#2E9E52' }}>{item.person}</p>
            </div>
            <p className="font-medium shrink-0 ml-4" style={{ fontSize: 13, color: '#9ca3af' }}>
              {item.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
