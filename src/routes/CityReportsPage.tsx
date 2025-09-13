import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// Types
interface City {
    id: number
    name: string
    area: number
    population: number
    issueCount: number
}

// API setup
const api = axios.create({
    baseURL: "http://localhost:8081/api"
})

export default function CityReportsPage() {
    // Single query for all cities - we'll sort/filter in the UI
    const { data: cities, isLoading, error } = useQuery<City[]>({
        queryKey: ['cities'],
        queryFn: () => api.get('/cities').then(res => res.data),
        // Add error handling
        retry: 1,
        staleTime: 30000, // Consider data fresh for 30 seconds
    })

    // Derived values
    const totalIssues = cities?.reduce((sum, city) => sum + city.issueCount, 0) || 0
    const avgIssuesPerCity = cities?.length ? (totalIssues / cities.length).toFixed(1) : '0'
    const mostActiveCity = cities?.sort((a, b) => b.issueCount - a.issueCount)[0]

    // Handle error state
    if (error) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-red-400">Failed to load city data. Please try again later.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                        City Reports Overview
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Monitor and track civic issues across cities
                    </p>
                </div>

                {/* Stats Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Issues Card */}
                    <div className="bg-[#111] rounded-xl border border-[#222] p-6">
                        <p className="text-gray-400 text-sm font-medium">Total Issues</p>
                        <p className="text-3xl font-bold text-white mt-2">
                            {isLoading ? "..." : totalIssues}
                        </p>
                    </div>

                    {/* Active Cities Card */}
                    <div className="bg-[#111] rounded-xl border border-[#222] p-6">
                        <p className="text-gray-400 text-sm font-medium">Active Cities</p>
                        <p className="text-3xl font-bold text-white mt-2">
                            {isLoading ? "..." : cities?.length || 0}
                        </p>
                    </div>

                    {/* Most Active City */}
                    <div className="bg-[#111] rounded-xl border border-[#222] p-6">
                        <p className="text-gray-400 text-sm font-medium">Most Active City</p>
                        <p className="text-3xl font-bold text-white mt-2">
                            {isLoading ? "..." : mostActiveCity?.name || "N/A"}
                        </p>
                    </div>

                    {/* Average Issues */}
                    <div className="bg-[#111] rounded-xl border border-[#222] p-6">
                        <p className="text-gray-400 text-sm font-medium">Avg Issues/City</p>
                        <p className="text-3xl font-bold text-white mt-2">
                            {isLoading ? "..." : avgIssuesPerCity}
                        </p>
                    </div>
                </div>

                {/* Cities Table */}
                <div className="bg-[#111] rounded-xl border border-[#222] p-6 mb-8">
                    <h2 className="text-xl font-semibold text-white mb-6">
                        Cities Overview
                    </h2>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-[#333]">
                                    <TableHead className="text-gray-400">City Name</TableHead>
                                    <TableHead className="text-gray-400">Population</TableHead>
                                    <TableHead className="text-gray-400">Area (km²)</TableHead>
                                    <TableHead className="text-gray-400 text-right">Issues</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                                            Loading cities data...
                                        </TableCell>
                                    </TableRow>
                                ) : cities?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                                            No cities data available
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    cities?.sort((a, b) => b.issueCount - a.issueCount)
                                        .map((city) => (
                                            <TableRow key={city.id} className="border-[#333]">
                                                <TableCell className="font-medium text-gray-200">
                                                    {city.name}
                                                </TableCell>
                                                <TableCell className="text-gray-300">
                                                    {new Intl.NumberFormat().format(city.population)}
                                                </TableCell>
                                                <TableCell className="text-gray-300">
                                                    {(city.area / 100).toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {city.issueCount}
                          </span>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* City Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="bg-[#111] rounded-xl border border-[#222] p-6 animate-pulse">
                                <div className="h-4 bg-[#222] rounded w-3/4 mb-4"></div>
                                <div className="h-3 bg-[#222] rounded w-1/2"></div>
                            </div>
                        ))
                    ) : (
                        cities?.slice(0, 6).map((city) => (
                            <div key={city.id}
                                 className="bg-[#111] rounded-xl border border-[#222] p-6 hover:border-[#333] transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{city.name}</h3>
                                        <p className="text-sm text-gray-400">
                                            {(city.area / 100).toFixed(2)} km² • {new Intl.NumberFormat().format(city.population)} residents
                                        </p>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {city.issueCount} issues
                  </span>
                                </div>
                                {/* Progress bar */}
                                <div className="w-full bg-[#222] rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                                        style={{
                                            width: `${(city.issueCount / Math.max(...cities.map(c => c.issueCount))) * 100}%`
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}