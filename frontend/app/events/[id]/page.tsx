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
import { ConfirmationDialog } from "@/components/confirmation-dialog"

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { user, updateBalance } = useAuth()
  const [isConfirming, setIsConfirming] = useState(false)
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

  const handlePurchase = async () => {
    if (!user) return;

    const ticketPrice = event.ticketTypes[0].price;
    if (user.walletBalance < ticketPrice) {
      // This case is handled in the dialog, but as a safeguard
      alert("Insufficient balance.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/events/${event.id}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ eventId: event.id })
      });

      if (!res.ok) {
        throw new Error("Ticket purchase failed");
      }

      await res.json();
      updateBalance(-ticketPrice); // Deduct from balance
      setIsConfirming(false);
      router.push(`/profile`);
    } catch (error) {
      console.error(error);
      // Handle error, maybe show a toast
    }
  };

  const openConfirmation = () => {
    if (!user) {
      router.push("/auth");
      return;
    }
    setIsConfirming(true);
  };

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
          <img src={event.imageUrl || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
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
                      <AvatarImage src={"/placeholder.svg"} />
                      <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Organized by</p>
                      <p className="text-sm text-muted-foreground">{event.organizer}</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    <div className="space-y-1">
                      <Calendar className="h-6 w-6 mx-auto text-primary" />
                      <p className="text-sm font-medium">Date</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                    <div className="space-y-1">
                      <MapPin className="h-6 w-6 mx-auto text-primary" />
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-xs text-muted-foreground">{event.location}</p>
                    </div>
                    <div className="space-y-1">
                      <Ticket className="h-6 w-6 mx-auto text-primary" />
                      <p className="text-sm font-medium">Price</p>
                      <p className="text-xs text-muted-foreground">{event.price}</p>
                    </div>
                    <div className="space-y-1">
                      <Clock className="h-6 w-6 mx-auto text-primary" />
                      <p className="text-sm font-medium">Time</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h2 className="text-2xl font-bold mb-4">About this event</h2>
                    <div
                      className="prose prose-stone dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-2">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Reserve Your Spot</h2>
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-medium">Ticket Price</p>
                    <p className="text-2xl font-bold">{event.price}</p>
                  </div>
                  <Button size="lg" className="w-full" onClick={openConfirmation}>
                    Reserve Ticket
                  </Button>
                  <div className="flex items-center justify-center mt-4 gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${isFavorited ? "text-red-500 fill-current" : ""}`} />
                      Favorite
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={handleShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {user && (
        <ConfirmationDialog
          open={isConfirming}
          onOpenChange={setIsConfirming}
          onConfirm={handlePurchase}
          eventName={event.title}
          ticketPrice={event.ticketTypes[0].price}
          userBalance={user.walletBalance}
        />
      )}

      <Footer />
    </div>
  )
}
