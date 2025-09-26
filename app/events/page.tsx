"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Edit, Trash2 } from "lucide-react"
import { useState } from "react"
import Navbar from "../components/Navbar"
import { useGetEventsQuery, useDeleteEventMutation } from "../redux/services/eventsApi"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function AllEventsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const categoryParam = searchParams.get('category')
  const initialCategory = categoryParam === 'work' || categoryParam === 'personal' ? categoryParam : 'All'
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation()

  const handleEdit = (eventId: string | number) => {
    window.location.href = `/create?edit=${eventId}`
  }

  const handleDelete = async (eventId?: string | number) => {
    const idToDelete = eventId ?? selectedEvent?.id
    if (!idToDelete) return
    try {
      await deleteEvent(idToDelete).unwrap()
      closeModal()
      toast({ title: 'Deleted', description: 'Event deleted successfully.' })
    } catch (e) {
      console.error('Failed to delete event', e)
      toast({ title: 'Error', description: 'Failed to delete event.', variant: 'destructive' })
    }
  }

  const handleViewDetails = (event: any) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  const { data: events = [], isLoading, isError } = useGetEventsQuery(
    selectedCategory === 'All' ? undefined : { category: selectedCategory as 'work' | 'personal' }
  )

  // Filter events based on selected category
  const filteredEvents = events

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return dateString
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const displayedEvents = [...filteredEvents].sort((a: any, b: any) => {
    const aTime = new Date(a?.date ?? 0).getTime()
    const bTime = new Date(b?.date ?? 0).getTime()
    if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) return bTime - aTime
    if (typeof b?.id === 'number' && typeof a?.id === 'number') return b.id - a.id
    return 0
  })

  const getId = (e: any): string | number | undefined => e?.id ?? e?._id

  const updateCategory = (newCategory: string) => {
    setSelectedCategory(newCategory)
    const params = new URLSearchParams(searchParams.toString())
    if (newCategory === 'All') {
      params.delete('category')
    } else {
      params.set('category', newCategory)
    }
    router.push(`/events?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">All Events</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover and manage all your upcoming events in one place.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex gap-2 mb-8">
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              onClick={() => updateCategory("All")}
            >
              All Events
            </Button>
            <Button
              variant={selectedCategory === "work" || selectedCategory === "Work" ? "default" : "outline"}
              onClick={() => updateCategory("work")}
            >
              Work
            </Button>
            <Button
              variant={selectedCategory === "personal" || selectedCategory === "Personal" ? "default" : "outline"}
              onClick={() => updateCategory("personal")}
            >
              Personal
            </Button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && <div className="text-muted-foreground">Loading events...</div>}
            {isError && <div className="text-destructive">Failed to load events.</div>}
            {!isLoading && !isError && displayedEvents.map((event) => (
              <Card key={String(getId(event))} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{event.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="truncate">{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.date)}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      className="flex-1" 
                      variant="outline"
                      onClick={() => handleViewDetails(event)}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEdit(getId(event) as any)}
                      className="px-3"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDelete(getId(event) as any)}
                      className="px-3 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription className="text-base">
              {selectedEvent?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {selectedEvent?.category}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Event Date</p>
                  <p className="text-muted-foreground">{selectedEvent?.date}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={() => {
                  closeModal()
                  handleEdit(selectedEvent?.id)
                }}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Event
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  handleDelete(selectedEvent?.id as number)
                }}
                className="flex-1 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
