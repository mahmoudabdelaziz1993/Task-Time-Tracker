"use server"

import { supabase } from "./Supabase-client-instance"
import { fetchSessionData } from "./fetch-data"

export const createUserBoards = async ( title: string, description: string) => {

    const {
        data: session,
        error,
        status
    } = await fetchSessionData()
    if (session && session.user?.id) {

        const { data, error, status } = await supabase
            .from('boards')
            .insert([{ user_id: session?.user?.id as string , title: title, description: description }])

        return { data, error, status }
    }
    return { data: null, error, status }
}