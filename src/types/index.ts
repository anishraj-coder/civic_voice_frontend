// src/types/index.ts



export interface Issue {
    id: number;
    description: string;
    status: "SUBMITTED" | "IN_PROGRESS" | "RESOLVED";
    category: "ROADS" | "SANITATION" | "LIGHTING" | "WASTE" | "WATER";
    createdAt: string;
}

// Add this interface for the issues structure
export interface IssueCollection {
    cities: Record<number, Issue[]>;
    localities: Record<number, Issue[]>;
}
// src/types/index.ts

export interface Locality {
    id: number;
    name: string;
    issueCount: number;
    status: 'ACTIVE' | 'INACTIVE';  // Added status
}

export interface City {
    id: number;
    name: string;
    area: number;
    population: number;
    issueCount: number;
    status: 'ACTIVE' | 'INACTIVE';  // Added status
    localities: Locality[];
}

// ... rest of the types remain same