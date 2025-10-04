export interface UserTicket {
  id: string
  ticketId: string
  eventId: string
  eventTitle: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventImage: string
  quantity: number
  purchaseDate: string
  totalPaid: number
  status: "upcoming" | "past"
  nftTokenId: string
}
