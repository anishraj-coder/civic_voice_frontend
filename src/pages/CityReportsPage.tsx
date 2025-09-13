// src/routes/CityReportsPage.tsx
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { dataService } from "@/services/dataService"
import type { City, Locality } from "@/types"
import { CityCard } from "@/components/cities/CityCard"
import { CityStats } from "@/components/cities/CityStats"
import { LocalitiesModal } from "@/components/cities/LocalitiesModal"
import { IssuesModal } from "@/components/cities/IssuesModal"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function CityReportsPage() {
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState<City | null>(null)
    const [selectedLocality, setSelectedLocality] = useState<Locality | null>(null)
    const [showLocalities, setShowLocalities] = useState(false)
    const [showCityIssues, setShowCityIssues] = useState(false)
    const [showLocalityIssues, setShowLocalityIssues] = useState(false)

    const { data: cities, isLoading: loadingCities } = useQuery({
        queryKey: ['cities'],
        queryFn: dataService.getCities
    })

    const { data: cityIssues, isLoading: loadingCityIssues } = useQuery({
        queryKey: ['cityIssues', selectedCity?.id],
        queryFn: () => selectedCity ? dataService.getCityIssues(selectedCity.id) : Promise.resolve([]),
        enabled: !!selectedCity && showCityIssues
    })

    const { data: localityIssues, isLoading: loadingLocalityIssues } = useQuery({
        queryKey: ['localityIssues', selectedLocality?.id],
        queryFn: () => selectedLocality ? dataService.getLocalityIssues(selectedLocality.id) : Promise.resolve([]),
        enabled: !!selectedLocality && showLocalityIssues
    })

    const maxIssueCount = cities ? Math.max(...cities.map(c => c.issueCount)) : 0

    return (
        <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                            City Reports Overview
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Monitor and track civic issues across cities
                        </p>
                    </div>
                    <Button
                        onClick={() => navigate('/form')}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
                    >
                        Report New Issue
                    </Button>
                </div>

                {/* Stats */}
                <CityStats cities={cities} isLoading={loadingCities} />

                {/* City Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loadingCities ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="bg-[#111] rounded-xl border border-[#222] p-6 animate-pulse">
                                <div className="h-4 bg-[#222] rounded w-3/4 mb-4"></div>
                                <div className="h-3 bg-[#222] rounded w-1/2"></div>
                            </div>
                        ))
                    ) : (
                        cities?.map((city) => (
                            <CityCard
                                key={city.id}
                                city={city}
                                maxIssueCount={maxIssueCount}
                                onViewLocalities={() => {
                                    setSelectedCity(city)
                                    setShowLocalities(true)
                                }}
                                onViewIssues={() => {
                                    setSelectedCity(city)
                                    setShowCityIssues(true)
                                }}
                            />
                        ))
                    )}
                </div>

                {/* Modals */}
                <LocalitiesModal
                    city={selectedCity}
                    localities={selectedCity?.localities}
                    isLoading={false}
                    isOpen={showLocalities}
                    onClose={() => setShowLocalities(false)}
                    onViewIssues={(locality) => {
                        setSelectedLocality(locality)
                        setShowLocalityIssues(true)
                        setShowLocalities(false)
                    }}
                />

                <IssuesModal
                    title={`Issues in ${selectedCity?.name}`}
                    issues={cityIssues}
                    isLoading={loadingCityIssues}
                    isOpen={showCityIssues}
                    onClose={() => setShowCityIssues(false)}
                />

                <IssuesModal
                    title={`Issues in ${selectedLocality?.name}`}
                    issues={localityIssues}
                    isLoading={loadingLocalityIssues}
                    isOpen={showLocalityIssues}
                    onClose={() => setShowLocalityIssues(false)}
                />
            </div>
        </div>
    )
}