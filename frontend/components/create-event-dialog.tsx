"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories } from "@/lib/data"

interface CreateEventDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateEventDialog({ isOpen, onClose }: CreateEventDialogProps) {
  const [step, setStep] = useState<"basic" | "details" | "tickets">("basic")
  const [eventData, setEventData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    venue: "",
    description: "",
    capacity: "",
    price: "",
  })

  const handleNext = () => {
    if (step === "basic") setStep("details")
    else if (step === "details") setStep("tickets")
  }

  const handleBack = () => {
    if (step === "tickets") setStep("details")
    else if (step === "details") setStep("basic")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Event created successfully!")
    onClose()
    setStep("basic")
    setEventData({
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      venue: "",
      description: "",
      capacity: "",
      price: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            {step === "basic" && "Let's start with the basics"}
            {step === "details" && "Add more details about your event"}
            {step === "tickets" && "Set up ticketing information"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {step === "basic" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Summer Music Festival 2024"
                  value={eventData.title}
                  onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={eventData.category}
                  onValueChange={(value) => setEventData({ ...eventData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name}>
                        {cat.icon} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={eventData.date}
                    onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={eventData.time}
                    onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {step === "details" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA"
                  value={eventData.location}
                  onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue">Venue *</Label>
                <Input
                  id="venue"
                  placeholder="e.g., Golden Gate Park"
                  value={eventData.venue}
                  onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event..."
                  value={eventData.description}
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                  rows={5}
                  required
                />
              </div>
            </>
          )}

          {step === "tickets" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="capacity">Event Capacity *</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="e.g., 500"
                  value={eventData.capacity}
                  onChange={(e) => setEventData({ ...eventData, capacity: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">Maximum number of attendees</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Ticket Price (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 50"
                  value={eventData.price}
                  onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">Price per ticket (enter 0 for free events)</p>
              </div>

              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm font-medium">NFT Minting</p>
                <p className="text-xs text-muted-foreground">
                  All tickets will be automatically minted as NFTs on the Ethereum blockchain. A small gas fee will be
                  added to each ticket purchase.
                </p>
              </div>
            </>
          )}

          <DialogFooter className="flex gap-2">
            {step !== "basic" && (
              <Button type="button" variant="outline" onClick={handleBack} className="bg-transparent">
                Back
              </Button>
            )}
            <Button type="button" variant="outline" onClick={onClose} className="bg-transparent">
              Cancel
            </Button>
            {step !== "tickets" ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit">Create Event</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
