// src/components/cities/CityCard.tsx

import { Button } from "@/components/ui/button"
import type {City} from "@/types"

interface CityCardProps {
    city: City
    maxIssueCount: number
    onViewLocalities: (city: City) => void
    onViewIssues: (city: City) => void
}

export function CityCard({
                             city,
                             maxIssueCount,
                             onViewLocalities,
                             onViewIssues
                         }: CityCardProps) {
    return (
        <div className="bg-[#111] rounded-xl border border-[#222] p-6 hover:border-[#333] transition-colors">
            {/* Header with Name and Status */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-white">{city.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium
              ${city.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'}`}>
              {city.status}
            </span>
                    </div>
                    <p className="text-sm text-gray-400">
                        {(city.area / 100).toFixed(2)} km² • {new Intl.NumberFormat().format(city.population)} residents
                    </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {city.issueCount} issues
        </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#222] rounded-full h-2 mb-4">
                <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(city.issueCount / maxIssueCount) * 100}%` }}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-[#222] text-white border-[#333] hover:bg-[#333] transition-colors"
                    onClick={() => onViewLocalities(city)}
                >
                    View Localities
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-[#222] text-white border-[#333] hover:bg-[#333] transition-colors"
                    onClick={() => onViewIssues(city)}
                >
                    View Issues
                </Button>
            </div>
        </div>
    )
}