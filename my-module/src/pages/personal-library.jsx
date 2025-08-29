import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import AppHeader from "@/components/AppHeader";
import { BookOpen, Clock } from "lucide-react";

export default function LibraryPage() {
    return (
        <div className="min-h-screen w-screen bg-white flex flex-col">
            {/* Reusable header */}
            <AppHeader  />

            {/* Main content */}
            <main className="flex-1 px-4 md:px-8 py-6">
                {/* Title */}
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-xl">⬅</span>
                    <h1 className="text-3xl font-bold">La tua libreria</h1>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                    <Input placeholder="Cerca nella tua libreria" className="max-w-sm" />

                    <div className="flex gap-4 flex-1 justify-end">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Show</span>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="reading">Reading</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="wishlist">Wishlist</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Sort By</span>
                            <Select defaultValue="recent">
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Sort" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">Recently added</SelectItem>
                                    <SelectItem value="title">Title</SelectItem>
                                    <SelectItem value="rating">Rating</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {[...Array(12)].map((_, i) => (
                        <Card key={i} className="p-2 flex flex-col items-center justify-between">
                            <div className="relative w-full h-40 bg-purple-50 rounded-md flex items-center justify-center">
                                {i === 1 && (
                                    <div className="absolute top-2 left-2 flex items-center gap-1 text-xs text-gray-700">
                                        <Clock className="h-3 w-3" />
                                        2 days
                                    </div>
                                )}
                                {(i === 1 || i === 10) && <BookOpen className="h-6 w-6 text-gray-600" />}
                            </div>
                            <div className="mt-2 text-center">
                                <p className="font-medium">Book name</p>
                                <p className="text-yellow-500">★★★★★</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>

            {/* Pagination */}
            <div className="bg-beige-100 py-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">6</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">7</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
