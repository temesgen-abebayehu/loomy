"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function TicketPage({ params }: { params: { id: string } }) {
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchTicket = async () => {
            if (!user) {
                router.push('/auth');
                return;
            }

            try {
                const res = await fetch(`/api/tickets/${params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch ticket');
                }

                const data = await res.json();
                setTicket(data.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTicket();
    }, [params.id, user, router]);

    if (error) {
        return <div className="container mx-auto py-10">Error: {error}</div>;
    }

    if (!ticket) {
        return <div className="container mx-auto py-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Your Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center">
                        <img src={ticket.qrCode} alt="Ticket QR Code" />
                        <p className="mt-4">Scan this QR code to validate your ticket.</p>
                    </div>
                    <div className="mt-6">
                        <p><strong>Event:</strong> {ticket.event.name}</p>
                        <p><strong>Date:</strong> {new Date(ticket.event.date).toLocaleDateString()}</p>
                        <p><strong>NFT ID:</strong> {ticket.nftId}</p>
                        <p><strong>Hedera Account:</strong> {ticket.hederaAccountId}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => window.print()}>Print Ticket</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
