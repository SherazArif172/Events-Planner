"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Calendar } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useCreateEventMutation, useGetEventQuery, useUpdateEventMutation } from "../redux/services/eventsApi"
import { useToast } from "@/hooks/use-toast"

export default function CreateEventPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const editId = searchParams.get('edit')
  const isEditMode = !!editId

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: ''
  })

  const { data: eventToEdit } = useGetEventQuery(editId!, { skip: !isEditMode })

 
  useEffect(() => {
    if (isEditMode && eventToEdit) {
      setFormData({
        title: eventToEdit.title ?? '',
        description: eventToEdit.description ?? '',
        category: (eventToEdit.category ?? '').toString().toLowerCase(),
        date: (eventToEdit.date ?? '').toString().slice(0, 10),
      })
    }
  }, [isEditMode, eventToEdit])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const [createEvent, { isLoading }] = useCreateEventMutation()
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditMode && editId) {
      try {
        const payload = {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          category: formData.category.toLowerCase() as 'work' | 'personal' | 'other',
        }
        await updateEvent({ id: editId, data: payload }).unwrap()
        toast({ title: 'Success', description: 'Event updated successfully.' })
        router.push('/events')
      } catch (err) {
        console.error(err)
        alert('Failed to update event')
      }
    } else {
      try {
        const payload = {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          category: formData.category.toLowerCase() as 'work' | 'personal' | 'other',
        }
        await createEvent(payload).unwrap()
        toast({ title: 'Success', description: 'Event created successfully.' })
        router.push('/events')
      } catch (err) {
        console.error(err)
        toast({ title: 'Error', description: 'Failed to create event', variant: 'destructive' })
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
    
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">EventCraft</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/create" className="text-foreground hover:text-primary transition-colors font-medium">
                Create Events
              </Link>
            </div>
            <Button asChild>
              <Link href="/events">All Events</Link>
            </Button>
          </div>
        </div>
      </nav>

      
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 text-center">
            {isEditMode ? 'Edit Event' : 'Create New Event'}
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-8">
            {isEditMode 
              ? 'Update your event details below.' 
              : 'Add your event details to get started.'
            }
          </p>
        </div>
      </section>

      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Event Details
              </CardTitle>
              <CardDescription>
                {isEditMode ? 'Update your event information' : 'Fill in the basic information about your event'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter your event title" 
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your event..." 
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Work">Work</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Event Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1" disabled={isLoading || isUpdating}>
                    {isEditMode ? (isUpdating ? 'Updating...' : 'Update Event') : (isLoading ? 'Creating...' : 'Create Event')}
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/events">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
