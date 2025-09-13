// src/components/cities/CityStats.tsx

// src/components/cities/CityStats.tsx
import type {City} from "@/types"

interface CityStatsProps {
    cities: City[] | undefined
    isLoading: boolean
}

export function CityStats({ cities, isLoading }: CityStatsProps) {
    const totalIssues = cities?.reduce((sum, city) => sum + city.issueCount, 0) || 0
    const activeCities = cities?.filter(city => city.status === 'ACTIVE').length || 0
    const avgIssuesPerCity = cities?.length ? (totalIssues / cities.length).toFixed(1) : '0'
    const mostActiveCity = cities?.sort((a, b) => b.issueCount - a.issueCount)[0]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Issues */}
            <div className="bg-[#111] rounded-xl border border-[#222] p-6">
                <p className="text-gray-400 text-sm font-medium">Total Issues</p>
                <p className="text-3xl font-bold text-white mt-2">
                    {isLoading ? "..." : totalIssues}
                </p>
            </div>

            {/* Active Cities */}
            <div className="bg-[#111] rounded-xl border border-[#222] p-6">
                <p className="text-gray-400 text-sm font-medium">Active Cities</p>
                <p className="text-3xl font-bold text-white mt-2">
                    {isLoading ? "..." : `${activeCities}/${cities?.length || 0}`}
                </p>
            </div>

            {/* Most Active City */}
            <div className="bg-[#111] rounded-xl border border-[#222] p-6">
                <p className="text-gray-400 text-sm font-medium">Most Active City</p>
                <div className="flex items-center gap-2 mt-2">
                    <p className="text-3xl font-bold text-white">
                        {isLoading ? "..." : mostActiveCity?.name || "N/A"}
                    </p>
                    {mostActiveCity && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium
              ${mostActiveCity.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'}`}>
              {mostActiveCity.status}
            </span>
                    )}
                </div>
            </div>

            {/* Average Issues */}
            <div className="bg-[#111] rounded-xl border border-[#222] p-6">
                <p className="text-gray-400 text-sm font-medium">Avg Issues/City</p>
                <p className="text-3xl font-bold text-white mt-2">
                    {isLoading ? "..." : avgIssuesPerCity}
                </p>
            </div>
        </div>
    )
}