export interface Event {
  id: string
  title: string
  description: string
  imageUrl: string
  date: string
  time: string
  location: string
  venue: string
  organizer: string
  category: string
  price: string
  tags: string[]
  ticketTypes: {
    name: string
    price: number
    available: number
  }[]
}

export const events: Event[] = [
  {
    id: "1",
    title: "Electronic Music Festival 2025",
    description:
      "Experience the biggest electronic music festival of the year featuring world-renowned DJs and producers.",
    imageUrl: "/electronic-music-festival-crowd.jpg",
    date: "October 15, 2025",
    time: "6:00 PM - 2:00 AM",
    location: "Addis Ababa, Ethiopia",
    venue: "Addis Ababa Stadium",
    organizer: "Pulse Events",
    category: "Music",
    price: "300 Birr",
    tags: ["Featured", "Popular"],
    ticketTypes: [
      { name: "General Admission", price: 300, available: 500 },
      { name: "VIP", price: 499, available: 100 },
    ],
  },
  {
    id: "2",
    title: "Tech Innovation Summit",
    description: "Join industry leaders and innovators for a day of insights into the future of technology.",
    imageUrl: "/tech-conference-presentation.png",
    date: "July 22, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Bahir Dar, Ethiopia",
    venue: "Moscone Center",
    organizer: "TechForward",
    category: "Tech",
    price: "299 Birr",
    tags: ["Featured"],
    ticketTypes: [
      { name: "Standard", price: 299, available: 1000 },
      { name: "Premium", price: 499, available: 200 },
    ],
  },
  {
    id: "3",
    title: "Indie Rock Concert",
    description: "An intimate evening with emerging indie rock bands from around the country.",
    imageUrl: "/indie-rock-concert-stage.jpg",
    date: "August 5, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "Addis Ababa, Ethiopia",
    venue: "The Mohawk",
    organizer: "Live Nation",
    category: "Music",
    price: "45 Birr",
    tags: [],
    ticketTypes: [{ name: "General Admission", price: 45, available: 300 }],
  },
  {
    id: "4",
    title: "Startup Networking Mixer",
    description: "Connect with fellow entrepreneurs, investors, and startup enthusiasts.",
    imageUrl: "/business-networking-event.png",
    date: "September 10, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "New York, NY",
    venue: "WeWork Times Square",
    organizer: "Startup Hub",
    category: "Business",
    price: "Free",
    tags: ["Popular"],
    ticketTypes: [{ name: "Free Entry", price: 0, available: 150 }],
  },
  {
    id: "5",
    title: "Art & Design Expo",
    description: "Explore contemporary art and design from local and international artists.",
    imageUrl: "/art-gallery-exhibition.jpg",
    date: "October 18, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "Miami, FL",
    venue: "Miami Design District",
    organizer: "Art Collective",
    category: "Art",
    price: "$25",
    tags: ["Featured"],
    ticketTypes: [
      { name: "Day Pass", price: 25, available: 800 },
      { name: "Weekend Pass", price: 40, available: 300 },
    ],
  },
  {
    id: "6",
    title: "Food & Wine Festival",
    description: "Savor exquisite dishes and wines from award-winning chefs and sommeliers.",
    imageUrl: "/food-festival-gourmet-dining.jpg",
    date: "November 12, 2025",
    time: "12:00 PM - 10:00 PM",
    location: "Napa Valley, CA",
    venue: "Napa Valley Expo",
    organizer: "Culinary Events Inc",
    category: "Food",
    price: "$125",
    tags: ["Popular"],
    ticketTypes: [
      { name: "Tasting Pass", price: 125, available: 400 },
      { name: "VIP Experience", price: 250, available: 100 },
    ],
  },
]

export const categories = [
  { name: "Music", icon: "🎵", count: 234 },
  { name: "Tech", icon: "💻", count: 156 },
  { name: "Business", icon: "💼", count: 189 },
  { name: "Art", icon: "🎨", count: 98 },
  { name: "Food", icon: "🍽️", count: 145 },
  { name: "Sports", icon: "⚽", count: 203 },
]

interface UserTicket {
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
  status: string
  nftTokenId: string
}

export const userTickets: UserTicket[] = [
  {
    id: "ticket-1",
    ticketId: "TKT12345",
    eventId: "1",
    eventTitle: "Electronic Music Festival 2025",
    eventDate: "2025-10-15T18:00:00Z",
    eventTime: "6:00 PM - 2:00 AM",
    eventLocation: "Addis Ababa, Ethiopia",
    eventImage: "/electronic-music-festival-crowd.jpg",
    quantity: 1,
    purchaseDate: "2025-09-20T10:00:00Z",
    totalPaid: 300,
    status: "Confirmed",
    nftTokenId: "0.0.12345",
  },
  {
    id: "ticket-2",
    ticketId: "TKT67890",
    eventId: "3",
    eventTitle: "Indie Rock Concert",
    eventDate: "2025-08-05T19:00:00Z",
    eventTime: "7:00 PM - 11:00 PM",
    eventLocation: "Addis Ababa, Ethiopia",
    eventImage: "/indie-rock-concert-stage.jpg",
    quantity: 2,
    purchaseDate: "2025-07-15T14:30:00Z",
    totalPaid: 90,
    status: "Used",
    nftTokenId: "0.0.67890",
  },
]
