import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Users, Lock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Revolutionizing Event Management with Blockchain
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
              Loomy is the next-generation event management platform that combines the power of blockchain technology
              with seamless user experience to create a transparent, secure, and innovative ticketing ecosystem.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Vision</h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-muted-foreground leading-relaxed">
                We believe that event ticketing should be transparent, secure, and put control back in the hands of
                attendees and organizers. Traditional ticketing systems are plagued by fraud, scalping, and lack of
                transparency. Loomy leverages blockchain technology to solve these problems while creating new
                opportunities for event creators and attendees alike.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                By minting tickets as NFTs, we ensure authenticity, enable secure peer-to-peer transfers, and give
                attendees true ownership of their tickets. Event organizers gain powerful tools to manage their events,
                track attendance, and build lasting relationships with their communities.
              </p>
            </div>
          </div>
        </section>

        {/* Why Blockchain Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Blockchain?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Authenticity & Security</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Every ticket is a unique NFT on the blockchain, making counterfeiting impossible. Attendees can
                        verify authenticity instantly, and organizers can prevent fraud.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">True Ownership</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Ticket holders truly own their tickets as digital assets. Transfer, resell, or keep them as
                        collectibles—all with complete transparency and security.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Instant Transactions</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Blockchain enables near-instant ticket transfers and purchases without intermediaries, reducing
                        fees and processing times.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Community Building</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        NFT tickets create lasting connections between organizers and attendees, enabling exclusive
                        perks, loyalty programs, and community engagement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-balance">
              To empower event creators and attendees with cutting-edge blockchain technology, creating a transparent,
              secure, and innovative ecosystem where everyone benefits. We're building the future of events, one NFT
              ticket at a time.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
