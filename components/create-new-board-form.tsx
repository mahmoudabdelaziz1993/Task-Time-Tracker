"use client"

import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ArchiveIcon } from '@radix-ui/react-icons'
import { Database } from '@/supabase'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createUserBoards } from '@/lib/supabase/insert-data'

type Props = {
   
}

export default function CreateNewBoardForm({ }: Props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Database['public']['Tables']['boards']['Insert']>()

    const onSubmit: SubmitHandler<Database['public']['Tables']['boards']['Insert']> = async (data) => {
        const {data:newBoard,error,status} = await createUserBoards(data.title, data.description)
        console.log('newBoard', newBoard)
        console.log('error', error)
        console.log('status', status)
    }

    return (
        <form className="grid w-full max-w-md gap-4 p-4" onSubmit={handleSubmit(onSubmit)}  >
            {/*  title    */}
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">
                    Title
                </Label>
                <Input id="title" type="text" {...register("title")} />
            </div>
            {/*  description    */}
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">
                    description
                </Label>
                <Input id="description" type="text" {...register("description")} />
            </div>
            <Button className="gap-2" type="submit">
                <ArchiveIcon /> Create
            </Button>
        </form>
    )
}