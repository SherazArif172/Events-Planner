import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, Users, MapPin } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose us ?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Organize your personal and work events with ease. Keep everything in one place.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Personal Events</CardTitle>
              <CardDescription>
                Plan birthdays, weddings, parties, and family gatherings with simple tools.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Work Events</CardTitle>
              <CardDescription>
                Manage meetings, conferences, team building, and professional gatherings.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Easy Organization</CardTitle>
              <CardDescription>
                Categorize and filter your events by type. Never miss an important date.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}
