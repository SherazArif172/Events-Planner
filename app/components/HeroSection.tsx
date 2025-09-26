import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
      
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
          Organize Your <span className="text-primary">Life Events</span>
        </h1>
        <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
          Keep track of your personal celebrations and work commitments in one place. 
          Never miss an important date again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/create">
              Start Planning <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/events">Browse Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
