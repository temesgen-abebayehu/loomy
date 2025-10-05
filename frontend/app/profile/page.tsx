"use client"

import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Ticket, Calendar, QrCode, Wallet, Copy, Eye, EyeOff } from "lucide-react"
import { TicketCard } from "@/components/ticket-card"
import { userTickets, events } from "@/lib/data"
import { useState } from "react"

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false)

  if (!user) {
    router.push("/auth")
    return null
  }

  // Combine static ticket and event data
  const tickets = userTickets.map(ticket => {
    const event = events.find(e => e.id === ticket.eventId);
    const isUpcoming = new Date(ticket.eventDate) >= new Date();
    return {
      ...ticket,
      _id: ticket.id,
      event: {
        ...event,
        date: ticket.eventDate,
      },
      status: isUpcoming ? 'upcoming' : 'past',
      eventTitle: ticket.eventTitle,
      eventImage: ticket.eventImage,
      eventLocation: ticket.eventLocation,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.nftTokenId}`
    };
  });

  const upcomingTickets = tickets.filter((t) => t.status === 'upcoming')
  const pastTickets = tickets.filter((t) => t.status === 'past')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  }

  const privateKey = "302e0201010420a8b4b0b4b0b4b0b4b0b4b0b4b0b4b0b4b0b4b0b4b0b4b0b4b0b4b0b4b0b4b0b4";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                  <Badge variant="secondary" className="mt-2 capitalize">
                    {user.role}
                  </Badge>
                </div>
              </div>

              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming ({upcomingTickets.length})</TabsTrigger>
                <TabsTrigger value="past">Past ({pastTickets.length})</TabsTrigger>
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Tickets</p>
                        <p className="text-3xl font-bold">{tickets.length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Ticket className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Upcoming Events</p>
                        <p className="text-3xl font-bold">{upcomingTickets.length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Events Attended</p>
                        <p className="text-3xl font-bold">{pastTickets.length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <QrCode className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Tickets */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Upcoming Events</h2>
                  <Button variant="outline" asChild className="bg-transparent">
                    <a href="/events">Browse More Events</a>
                  </Button>
                </div>

                {upcomingTickets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {upcomingTickets.map((ticket) => (
                      <TicketCard key={ticket.id} ticket={ticket as any} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold">No Upcoming Tickets</h3>
                    <p className="text-muted-foreground mt-2">
                      You haven't reserved any tickets for upcoming events yet.
                    </p>
                    <Button onClick={() => router.push("/events")} className="mt-4">
                      Browse Events
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="past">
              {/* Past Tickets */}
              {pastTickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {pastTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket as any} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold">No Past Tickets</h3>
                  <p className="text-muted-foreground mt-2">You have no tickets from past events.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="wallet">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-muted-foreground">Total Balance</p>
                      <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-3xl font-bold">{user.walletBalance.toLocaleString()} Birr</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-muted-foreground">User ID</p>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(user.id)}>
                        <Copy className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-lg font-mono break-all">68e24958f4072b4ec815e18a</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-muted-foreground">Hedera Public Key</p>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard("302a300506032b657003210011a214a63b7a378884438189d2f943f8bc356632d5574438a1094c9a584a79")}>
                        <Copy className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-sm font-mono break-all">302a300506032b657003210011a214a63b7a378884438189d2f943f8bc356632d5574438a1094c9a584a79</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-muted-foreground">Hedera Private Key</p>
                      <div>
                        <Button variant="ghost" size="icon" onClick={() => setIsPrivateKeyVisible(!isPrivateKeyVisible)}>
                          {isPrivateKeyVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(privateKey)}>
                          <Copy className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm font-mono break-all">
                      {isPrivateKeyVisible ? privateKey : "•".repeat(64)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">My Ticket NFTs</h2>
                {tickets.length > 0 ? (
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <Card key={ticket.id} className="flex items-center p-4">
                        <img src={ticket.eventImage} alt={ticket.eventTitle} className="w-16 h-16 rounded-md object-cover mr-4" />
                        <div className="flex-grow">
                          <p className="font-semibold">{ticket.eventTitle}</p>
                          <p className="text-sm text-muted-foreground">Token ID: {ticket.nftTokenId}</p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`https://hashscan.io/mainnet/token/${ticket.nftTokenId}`} target="_blank" rel="noopener noreferrer">
                            View on HashScan
                          </a>
                        </Button>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold">No Ticket NFTs Found</h3>
                    <p className="text-muted-foreground mt-2">
                      Your purchased ticket NFTs will appear here.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
