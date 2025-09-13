// src/components/cities/LocalitiesModal.tsx

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type{ City, Locality } from "@/types"

interface LocalitiesModalProps {
    city: City | null
    localities: Locality[] | undefined
    isLoading: boolean
    isOpen: boolean
    onClose: () => void
    onViewIssues: (locality: Locality) => void
}

export function LocalitiesModal({
                                    city,
                                    localities,
                                    isLoading,
                                    isOpen,
                                    onClose,
                                    onViewIssues
                                }: LocalitiesModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#111] text-white border-[#222] max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <span>Localities in {city?.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium
              ${city?.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'}`}>
              {city?.status}
            </span>
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-[#333]">
                                <TableHead className="text-gray-400">Locality Name</TableHead>
                                <TableHead className="text-gray-400">Status</TableHead>
                                <TableHead className="text-gray-400 text-right">Issues</TableHead>
                                <TableHead className="text-gray-400 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-gray-500">
                                        Loading localities...
                                    </TableCell>
                                </TableRow>
                            ) : localities?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-gray-500">
                                        No localities found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                localities?.map((locality) => (
                                    <TableRow key={locality.id} className="border-[#333]">
                                        <TableCell className="font-medium text-gray-200">
                                            {locality.name}
                                        </TableCell>
                                        <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${locality.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'}`}>
                        {locality.status}
                      </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {locality.issueCount}
                      </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="bg-[#222] text-white border-[#333] hover:bg-[#333]"
                                                onClick={() => onViewIssues(locality)}
                                            >
                                                View Issues
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    )
}