import React from 'react'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import CreateNewBoardForm from './create-new-board-form'

type Props = {}

export default function CreateNewBoard({ }: Props) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={"outline"} className='gap-2 mb-2 font-semibold capitalize' >
                    <PlusIcon className='w-4 h-4 md:w-5 md:h-5 text-primary'  /> <span className='hidden md:inline-block'>Create new board</span>
                    <span className="inline md:hidden">New Board</span>
                </Button>

            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <CreateNewBoardForm />

            </DrawerContent>
        </Drawer>

    )
}