"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { events } from "@/lib/data"
import { Calendar, MapPin, Users, Clock, Share2, Heart, Ticket } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { ReservationDialog } from "@/components/reservation-dialog"

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { user } = useAuth()
  const [isReservationOpen, setIsReservationOpen] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const event = events.find((e) => e.id === resolvedParams.id)

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
            <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
            <Button onClick={() => router.push("/events")}>Browse Events</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleReserve = () => {
    if (!user) {
      router.push("/auth")
      return
    }
    setIsReservationOpen(true)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-muted">
          <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-2">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{event.category}</Badge>
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{event.title}</h1>

                  <div className="flex items-center gap-4 mb-6">
                    <Avatar>
                      <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Organized by</p>
                      <p className="text-sm text-muted-foreground">{event.organizer.name}</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Capacity</p>
                        <p className="text-sm text-muted-foreground">
                          {event.attendees} / {event.capacity} attendees
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-sm text-muted-foreground">3 hours</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">{event.description}</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Join us for an unforgettable experience that brings together passionate individuals from around
                      the world. This event promises to deliver exceptional content, networking opportunities, and
                      memories that will last a lifetime.
                    </p>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Engaging presentations from industry leaders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Networking opportunities with like-minded individuals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Interactive workshops and hands-on activities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Complimentary refreshments and meals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Exclusive NFT ticket as a digital collectible</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 border-2">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold">${event.price}</span>
                      <span className="text-muted-foreground">per ticket</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Minted as NFT on blockchain</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button size="lg" className="w-full" onClick={handleReserve} disabled={event.status !== "upcoming"}>
                      <Ticket className="mr-2 h-5 w-5" />
                      {event.status === "upcoming" ? "Reserve Ticket" : "Event Ended"}
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setIsFavorited(!isFavorited)}
                      >
                        <Heart className={`mr-2 h-4 w-4 ${isFavorited ? "fill-current text-red-500" : ""}`} />
                        Save
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" onClick={handleShare}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Availability</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Tickets remaining</span>
                        <span className="font-semibold">{event.capacity - event.attendees}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Event Status</p>
                      <Badge variant={event.status === "upcoming" ? "default" : "secondary"} className="capitalize">
                        {event.status}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Blockchain</p>
                      <p className="text-sm text-muted-foreground">Ethereum (ERC-721)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ReservationDialog
        event={event}
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onSuccess={() => {
          setIsReservationOpen(false)
          router.push("/profile")
        }}
      />
    </div>
  )
}
