"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Download, Share2, QrCode } from "lucide-react"
import type { UserTicket } from "@/lib/types"

interface TicketCardProps {
  ticket: UserTicket
}

export function TicketCard({ ticket }: TicketCardProps) {
  const handleDownload = () => {
    alert("Downloading NFT ticket...")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: ticket.eventTitle,
        text: `Check out my ticket for ${ticket.eventTitle}!`,
      })
    } else {
      alert("Ticket link copied to clipboard!")
    }
  }

  const handleViewQR = () => {
    alert("Displaying QR code for venue entry...")
  }

  return (
    <Card className="overflow-hidden hover:border-primary transition-colors">
      <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5">
        <img
          src={ticket.eventImage || "/placeholder.svg"}
          alt={ticket.eventTitle}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={ticket.status === "upcoming" ? "default" : "secondary"} className="capitalize">
            {ticket.status}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{ticket.eventTitle}</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{ticket.eventDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{ticket.eventLocation}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-muted-foreground">Ticket ID</p>
            <p className="font-mono font-medium">#{ticket.ticketId}</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">Quantity</p>
            <p className="font-medium">{ticket.quantity}x</p>
          </div>
        </div>

        <div className="flex gap-2">
          {ticket.status === "upcoming" && (
            <Button size="sm" className="flex-1" onClick={handleViewQR}>
              <QrCode className="mr-2 h-4 w-4" />
              QR Code
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={handleDownload} className="flex-1 bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button size="sm" variant="outline" onClick={handleShare} className="bg-transparent">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
