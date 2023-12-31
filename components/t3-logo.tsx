import React from 'react'
import { Button } from '@/components/ui/button'
type Props = {}

export default function TaskTimeTrackerLogo({ }: Props) {
    return (
        <Button variant="ghost" size="icon" className="rounded-full">
            <svg width="24" height="24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 0H30H60H120V30H60V120H30V30H0V0Z" fill="currentColor" fillOpacity="1" />
            </svg>
        </Button>
    )
}