// src/data/mockData.ts

import type { City, IssueCollection } from '@/types'

// src/data/mockData.ts

export const mockCities: City[] = [
    {
        id: 1,
        name: "Ranchi",
        area: 17500,
        population: 1200000,
        issueCount: 45,
        status: 'ACTIVE',
        localities: [
            { id: 1, name: "Harmu", issueCount: 12, status: 'ACTIVE' },
            { id: 2, name: "Lalpur", issueCount: 15, status: 'ACTIVE' },
            { id: 3, name: "Doranda", issueCount: 8, status: 'INACTIVE' },
            { id: 4, name: "Kanke", issueCount: 10, status: 'ACTIVE' }
        ]
    },
    {
        id: 2,
        name: "Jamshedpur",
        area: 15000,
        population: 1500000,
        issueCount: 38,
        status: 'ACTIVE',
        localities: [
            { id: 5, name: "Bistupur", issueCount: 8, status: 'ACTIVE' },
            { id: 6, name: "Sakchi", issueCount: 12, status: 'INACTIVE' },
            { id: 7, name: "Sonari", issueCount: 10, status: 'ACTIVE' },
            { id: 8, name: "Kadma", issueCount: 8, status: 'ACTIVE' }
        ]
    },
    // ... other cities with status
]

export const mockIssues: IssueCollection = {
    cities: {
        1: [ // Ranchi issues
            {
                id: 1,
                description: "Large pothole near Main Road",
                status: "IN_PROGRESS",
                category: "ROADS",
                createdAt: "2024-03-15T10:30:00"
            },
            {
                id: 2,
                description: "Street light not working",
                status: "SUBMITTED",
                category: "LIGHTING",
                createdAt: "2024-03-16T15:20:00"
            }
        ],
        2: [ // Jamshedpur issues
            {
                id: 3,
                description: "Garbage collection delayed",
                status: "RESOLVED",
                category: "WASTE",
                createdAt: "2024-03-14T09:15:00"
            }
        ]
    },
    localities: {
        1: [ // Harmu issues
            {
                id: 4,
                description: "Water supply interruption",
                status: "IN_PROGRESS",
                category: "WATER",
                createdAt: "2024-03-17T11:45:00"
            }
        ],
        2: [ // Lalpur issues
            {
                id: 5,
                description: "Broken sidewalk",
                status: "SUBMITTED",
                category: "ROADS",
                createdAt: "2024-03-16T14:30:00"
            }
        ]
    }
}