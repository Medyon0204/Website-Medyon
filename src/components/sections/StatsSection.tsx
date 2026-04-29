import { STATS } from "@/lib/constants";

export function StatsSection() {
  return (
    <section className="py-20 px-6 bg-night-50 border-y border-white/6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-black mb-2 text-gradient-dual">
                {stat.value}
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
