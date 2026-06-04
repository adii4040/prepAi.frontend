const stats = [
  { value: '< 60s', label: 'Analysis Time' },
  { value: '6 Sections', label: 'Detailed Report Output' },
  { value: '100%', label: 'Real Market Data' },
]

export const StatsSection = () => {
  return (
    <section className="bg-app py-16 border-y border-border">
      <div className="max-w-3xl mx-auto px-6">
        <div className="grid grid-cols-3 divide-x divide-border">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-8">
              <p className="font-label text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="font-label text-xs text-neutral tracking-widest uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}