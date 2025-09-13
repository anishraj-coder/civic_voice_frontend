// src/components/cities/IssuesModal.tsx

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { Issue } from "@/types"

interface IssuesModalProps {
    title: string
    issues: Issue[] | undefined
    isLoading: boolean
    isOpen: boolean
    onClose: () => void
}

export function IssuesModal({
                                title,
                                issues,
                                isLoading,
                                isOpen,
                                onClose
                            }: IssuesModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#111] text-white border-[#222] max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-[#333]">
                                <TableHead className="text-gray-400">Description</TableHead>
                                <TableHead className="text-gray-400">Category</TableHead>
                                <TableHead className="text-gray-400">Status</TableHead>
                                <TableHead className="text-gray-400">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-gray-500">
                                        Loading issues...
                                    </TableCell>
                                </TableRow>
                            ) : issues?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-gray-500">
                                        No issues found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                issues?.map((issue) => (
                                    <TableRow key={issue.id} className="border-[#333]">
                                        <TableCell className="font-medium text-gray-200">
                                            {issue.description}
                                        </TableCell>
                                        <TableCell className="text-gray-300">
                                            {issue.category}
                                        </TableCell>
                                        <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${issue.status === 'RESOLVED'
                          ? 'bg-green-100 text-green-800'
                          : issue.status === 'IN_PROGRESS'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'}`}>
                        {issue.status}
                      </span>
                                        </TableCell>
                                        <TableCell className="text-gray-300">
                                            {new Date(issue.createdAt).toLocaleDateString()}
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