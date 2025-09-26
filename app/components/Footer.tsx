import { Sparkles } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Event Planner</span>
            </div>
            <p className="text-muted-foreground">
              Organize your personal and work events with simple, effective planning tools.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Event Categories</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Work Events</li>
              <li>Personal Events</li>
              <li>Other Events</li>
              <li>All Categories</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>About Us</li>
              <li>Contact</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Support</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 EventCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
