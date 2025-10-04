"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Plus, Calendar, Users, DollarSign, TrendingUp, MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CreateEventDialog } from "@/components/create-event-dialog"
import { organizerEvents, organizerStats } from "@/lib/organizer-data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const ticketSalesData = [
  { date: "Week 1", sales: 45 },
  { date: "Week 2", sales: 78 },
  { date: "Week 3", sales: 125 },
  { date: "Week 4", sales: 156 },
  { date: "Week 5", sales: 198 },
  { date: "Week 6", sales: 234 },
]

export default function OrganizerDashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)

  if (!user || user.role !== "organizer") {
    router.push("/")
    return null
  }

  const upcomingEvents = organizerEvents.filter((e) => e.status === "upcoming")
  const pastEvents = organizerEvents.filter((e) => e.status === "past")
  const draftEvents = organizerEvents.filter((e) => e.status === "draft")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Organizer Dashboard</h1>
              <p className="text-muted-foreground">Manage your events and track performance</p>
            </div>
            <Button
              onClick={() => setIsCreateEventOpen(true)}
              className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Events</p>
                    <p className="text-3xl font-bold">{organizerStats.totalEvents}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-primary">+{organizerStats.eventsThisMonth}</span> this month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Attendees</p>
                    <p className="text-3xl font-bold">{organizerStats.totalAttendees.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-primary">+{organizerStats.attendeesThisMonth}</span> this month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold">${organizerStats.totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-primary">+${organizerStats.revenueThisMonth.toLocaleString()}</span> this
                      month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Avg. Ticket Price</p>
                    <p className="text-3xl font-bold">${organizerStats.avgTicketPrice}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-primary">+12%</span> vs last month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ticket Sales Analytics Card */}
          <Card className="mb-8 border-primary/20 bg-primary">
            <CardHeader>
              <CardTitle className="text-white">Ticket Sales Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ticketSalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255, 255, 255, 0.8)" />
                  <YAxis stroke="rgba(255, 255, 255, 0.8)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="white"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--accent))", r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Events Tabs */}
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList>
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Upcoming ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Past ({pastEvents.length})
              </TabsTrigger>
              <TabsTrigger
                value="drafts"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Drafts ({draftEvents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant="secondary">{event.category}</Badge>
                                <Badge variant="outline" className="capitalize">
                                  {event.status}
                                </Badge>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => router.push(`/events/${event.id}`)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Event
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Event
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Event
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground mb-1">Date</p>
                              <p className="font-medium">{event.date}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Location</p>
                              <p className="font-medium">{event.location}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Tickets Sold</p>
                              <p className="font-medium">
                                {event.attendees} / {event.capacity}
                              </p>
                              <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                                <div
                                  className="bg-primary h-1.5 rounded-full"
                                  style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                                />
                              </div>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Revenue</p>
                              <p className="font-medium">${(event.attendees * event.price).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No upcoming events</p>
                    <Button onClick={() => setIsCreateEventOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Event
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastEvents.length > 0 ? (
                pastEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant="secondary">{event.category}</Badge>
                                <Badge variant="outline" className="capitalize">
                                  {event.status}
                                </Badge>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              View Analytics
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground mb-1">Date</p>
                              <p className="font-medium">{event.date}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Location</p>
                              <p className="font-medium">{event.location}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Total Attendees</p>
                              <p className="font-medium">{event.attendees}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Total Revenue</p>
                              <p className="font-medium">${(event.attendees * event.price).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No past events</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="drafts" className="space-y-4">
              {draftEvents.length > 0 ? (
                draftEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">Last edited: {event.lastEdited}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="bg-transparent">
                            <Edit className="mr-2 h-4 w-4" />
                            Continue Editing
                          </Button>
                          <Button>Publish</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No draft events</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />

      <CreateEventDialog isOpen={isCreateEventOpen} onClose={() => setIsCreateEventOpen(false)} />
    </div>
  )
}
