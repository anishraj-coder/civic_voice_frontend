// src/services/dataService.ts

import { mockCities, mockIssues } from '@/data/mockData'
import type { City, Issue, Locality } from '@/types'

// Add artificial delay to simulate network
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const dataService = {
    getCities: async (): Promise<City[]> => {
        await delay(800) // Simulate network delay
        return mockCities
    },

    getCityLocalities: async (cityId: number): Promise<Locality[]> => {
        await delay(500)
        const city = mockCities.find(c => c.id === cityId)
        return city?.localities || []
    },

    getCityIssues: async (cityId: number): Promise<Issue[]> => {
        await delay(600)
        return mockIssues.cities[cityId] || []
    },

    getLocalityIssues: async (localityId: number): Promise<Issue[]> => {
        await delay(600)
        return mockIssues.localities[localityId] || []
    }
}