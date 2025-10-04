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
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Minus, Plus, Ticket, CreditCard } from "lucide-react"
import type { Event } from "@/lib/types"

interface ReservationDialogProps {
  event: Event
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function ReservationDialog({ event, isOpen, onClose, onSuccess }: ReservationDialogProps) {
  const [quantity, setQuantity] = useState(1)
  const [step, setStep] = useState<"quantity" | "payment" | "confirmation">("quantity")
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)

  const maxTickets = Math.min(10, event.capacity - event.attendees)
  const subtotal = event.price * quantity
  const serviceFee = subtotal * 0.05
  const gasFee = 2.5
  const total = subtotal + serviceFee + gasFee

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= maxTickets) {
      setQuantity(newQuantity)
    }
  }

  const handleContinueToPayment = () => {
    setStep("payment")
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) {
      alert("Please accept the terms and conditions")
      return
    }
    // Simulate payment processing
    setTimeout(() => {
      setStep("confirmation")
    }, 1500)
  }

  const handleClose = () => {
    setStep("quantity")
    setQuantity(1)
    setPaymentData({ cardNumber: "", expiryDate: "", cvv: "", name: "" })
    setAcceptTerms(false)
    onClose()
  }

  const handleFinish = () => {
    handleClose()
    onSuccess()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        {step === "quantity" && (
          <>
            <DialogHeader>
              <DialogTitle>Reserve Tickets</DialogTitle>
              <DialogDescription>Select the number of tickets you'd like to reserve</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
                <p className="text-lg font-bold">${event.price}</p>
              </div>

              <div className="space-y-2">
                <Label>Number of Tickets</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="bg-transparent"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 text-center">
                    <span className="text-2xl font-bold">{quantity}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= maxTickets}
                    className="bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">Maximum {maxTickets} tickets per order</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee (5%)</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gas Fee (Blockchain)</span>
                  <span>${gasFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose} className="bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleContinueToPayment}>
                <CreditCard className="mr-2 h-4 w-4" />
                Continue to Payment
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "payment" && (
          <>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>Enter your payment information to complete the reservation</DialogDescription>
            </DialogHeader>

            <form onSubmit={handlePayment} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  placeholder="John Doe"
                  value={paymentData.name}
                  onChange={(e) => setPaymentData({ ...paymentData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Separator />

              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tickets ({quantity}x)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="payment-terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <label htmlFor="payment-terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                  I agree to the terms and conditions and understand that my tickets will be minted as NFTs on the
                  Ethereum blockchain
                </label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setStep("quantity")} className="bg-transparent">
                  Back
                </Button>
                <Button type="submit">Complete Payment</Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === "confirmation" && (
          <>
            <DialogHeader>
              <DialogTitle>Reservation Confirmed!</DialogTitle>
              <DialogDescription>Your NFT tickets have been successfully minted</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Ticket className="h-10 w-10 text-primary" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="font-medium">Successfully reserved {quantity} ticket(s)</p>
                <p className="text-sm text-muted-foreground">Your NFT tickets have been sent to your wallet</p>
              </div>

              <div className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Event</span>
                  <span className="font-medium">{event.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tickets</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Paid</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your registered email address. You can view your tickets in your
                  profile.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleFinish} className="w-full">
                View My Tickets
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
