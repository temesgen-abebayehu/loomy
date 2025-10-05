import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { EventCard } from "@/components/event-card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search, Sparkles, Ticket, CheckCircle } from "lucide-react"
import { events, categories } from "@/lib/data"

export default function HomePage() {
  const featuredEvents = events.filter((event) => event.tags.includes("Featured"))

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/20" />
        <div className="absolute inset-0 opacity-20">
          <img
            src="/energetic-concert-crowd-with-stage-lights.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-lg" />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
              <Sparkles className="h-4 w-4" />
              Powered by Hedra Hashgraph Protocol
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
              Discover Events.
              <br />
              <span className="text-primary">Own Your Tickets.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Experience the future of event management with secure, blockchain-powered NFT tickets. Find your next
              unforgettable experience.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search events, artists, venues..."
                    className="pl-10 h-12 bg-card border-primary/20 focus:border-primary"
                  />
                </div>
                <Button size="lg" className="h-12 px-8 btn-glow bg-primary hover:bg-primary/90 text-primary-foreground">
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button size="lg" asChild className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/events">Browse All Events</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary/30 hover:bg-primary/10 bg-transparent"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
            <p className="text-muted-foreground text-lg">Find events that match your interests</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.name} href={`/events?category=${category.name.toLowerCase()}`}>
                <Card className="hover:border-primary transition-all cursor-pointer group hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} events</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events</h2>
              <p className="text-muted-foreground text-lg">Don't miss these popular experiences</p>
            </div>
            <Button
              variant="outline"
              asChild
              className="hidden md:inline-flex bg-transparent border-primary/30 hover:bg-primary/10"
            >
              <Link href="/events">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button variant="outline" asChild className="border-primary/30 hover:bg-primary/10 bg-transparent">
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-white/80 text-lg">Get started in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-4 border border-white/20">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-white">1. Discover</h3>
              <p className="text-white/80">
                Browse thousands of events across music, tech, art, and more. Find experiences that match your
                interests.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-4 border border-white/20">
                <Ticket className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-white">2. Reserve as NFT</h3>
              <p className="text-white/80">
                Secure your spot with blockchain-powered NFT tickets. Own your tickets with complete transparency and
                security.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-4 border border-white/20">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-white">3. Attend</h3>
              <p className="text-white/80">
                Show your NFT ticket at the venue and enjoy the event. Transfer or resell tickets securely on the
                blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
