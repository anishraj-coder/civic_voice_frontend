import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L from "leaflet";

export default function IssueForm() {
    const [selectedCity, setSelectedCity] = useState("")
    const [, setSelectedLocality] = useState("")
    const [position, setPosition] = useState<[number, number]>([23.36, 85.33])

    const cities = [
        { id: 1, name: "Ranchi", localities: ["Harmu", "Lalpur", "Doranda"] },
        { id: 2, name: "Jamshedpur", localities: ["Bistupur", "Sakchi", "Sonari"] },
    ]
    const categories = ["ROADS", "SANITATION", "LIGHTING", "WASTE", "WATER"]

    return (
        <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6">
            {/* Main Container */}
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                        Report an Issue
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Help make your city better, one report at a time
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-[#111] rounded-2xl shadow-2xl border border-[#222] overflow-hidden">
                    {/* Form Grid Layout */}
                    <div className="p-8 space-y-8">
                        {/* Location Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* City */}
                            <div className="space-y-2.5">
                                <label className="text-sm font-medium text-gray-300">City</label>
                                <Select onValueChange={setSelectedCity}>
                                    <SelectTrigger className="bg-[#1a1a1a] text-white border-[#333] h-12">
                                        <SelectValue className={`text-white`} placeholder="Select your city" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1a1a] text-white border-[#333]">
                                        {cities.map((city) => (
                                            <SelectItem key={city.id} value={city.name}>
                                                {city.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Locality */}
                            <div className="space-y-2.5">
                                <label className="text-sm font-medium text-gray-300">Locality</label>
                                <Select disabled={!selectedCity} onValueChange={setSelectedLocality}>
                                    <SelectTrigger className="bg-[#1a1a1a] text-white border-[#333] h-12">
                                        <SelectValue
                                            placeholder={selectedCity ? "Choose locality" : "Select city first"}
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1a1a] border-[#333] text-white">
                                        {selectedCity &&
                                            cities
                                                .find((c) => c.name === selectedCity)
                                                ?.localities.map((loc) => (
                                                <SelectItem key={loc} value={loc}>
                                                    {loc}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="space-y-2.5">
                            <label className="text-sm font-medium text-gray-300">Issue Category</label>
                            <Select>
                                <SelectTrigger className="bg-[#1a1a1a] text-white border-[#333] h-12">
                                    <SelectValue placeholder="What type of issue?" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1a1a] text-white border-[#333]">
                                    {categories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Description */}
                        <div className="space-y-2.5">
                            <label className="text-sm font-medium text-gray-300">Description</label>
                            <Input
                                placeholder="Describe the issue in detail..."
                                className="bg-[#1a1a1a] border-[#333] text-gray-50 h-12 placeholder:text-gray-500"
                            />
                        </div>

                        {/* Photo Upload */}
                        <div className="space-y-2.5">
                            <label className="text-sm font-medium text-gray-300">Photo Evidence</label>
                            <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4">
                                <Input
                                    type="file"
                                    className="bg-transparent border-0 p-0 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700"
                                />
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="space-y-2.5">
                            <label className="text-sm font-medium text-gray-300">Location on Map</label>
                            <div className="rounded-xl overflow-hidden border border-[#333]">
                                <MapContainer
                                    center={position}
                                    zoom={14}
                                    style={{ height: "400px", width: "100%" }}
                                    className="z-0"
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker
                                        position={position}
                                        draggable={true}
                                        icon={L.icon({
                                            iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
                                            iconSize: [38, 38],
                                            iconAnchor: [19, 38],
                                        })}
                                        eventHandlers={{
                                            dragend: (e) => {
                                                const marker = e.target;
                                                const { lat, lng } = marker.getLatLng();
                                                setPosition([lat, lng]);
                                            },
                                        }}
                                    />
                                </MapContainer>
                            </div>
                            <p className="text-sm text-gray-400">
                                Drag the marker to pinpoint the exact location
                            </p>
                        </div>

                        {/* Submit Button */}
                        <Button className="w-full h-12 text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 rounded-xl">
                            Submit Report
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}