"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface ConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    eventName: string;
    ticketPrice: number;
    userBalance: number;
}

export function ConfirmationDialog({
    open,
    onOpenChange,
    onConfirm,
    eventName,
    ticketPrice,
    userBalance,
}: ConfirmationDialogProps) {
    const canAfford = userBalance >= ticketPrice;

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Your Purchase</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to purchase a ticket for <strong>{eventName}</strong>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="my-4 space-y-2">
                    <div className="flex justify-between">
                        <span>Ticket Price:</span>
                        <strong>{ticketPrice.toLocaleString()} Birr</strong>
                    </div>
                    <div className="flex justify-between">
                        <span>Your Balance:</span>
                        <span>{userBalance.toLocaleString()} Birr</span>
                    </div>
                    <div className={`flex justify-between font-bold pt-2 border-t ${canAfford ? '' : 'text-destructive'}`}>
                        <span>Remaining Balance:</span>
                        <span>{(userBalance - ticketPrice).toLocaleString()} Birr</span>
                    </div>
                </div>
                {!canAfford && (
                    <p className="text-sm text-destructive text-center">You have insufficient funds for this purchase.</p>
                )}
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} disabled={!canAfford}>
                        Confirm & Pay
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
