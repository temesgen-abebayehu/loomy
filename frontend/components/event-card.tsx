import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

interface EventCardProps {
  id: string
  imageUrl: string
  title: string
  date: string
  location: string
  price: string
  tags?: string[]
}

export function EventCard({ id, imageUrl, title, date, location, price, tags = [] }: EventCardProps) {
  return (
    <Link href={`/events/${id}`}>
      <Card className="overflow-hidden hover:border-primary transition-colors group">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {tags.length > 0 && (
            <div className="absolute top-3 left-3 flex gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-background/90 backdrop-blur">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-3 line-clamp-2 text-balance">{title}</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-muted-foreground">From</span>
            <span className="font-semibold text-lg text-primary">{price}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
