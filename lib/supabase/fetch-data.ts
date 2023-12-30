"use server"

import { supabase } from "@/lib/supabase/Supabase-client-instance"

// function to fetch session data from supabase 
// and return data and error 
export const fetchSessionData = async () => {
    try {
        const { data, error } = await supabase.auth.getSession()
        if (data.session) {
            return { data: data.session, error, status: 200 }
        } else {
            throw new Error("No session found")
        }
    } catch (error) {
        return { data: null, error, status: 401 }
    }
}






export const FetchUserProfile = async () => {

    const {
        data: session,
        error,
        status
    } = await fetchSessionData()

    if (session && session.user?.id) {

        const { data, error, status } = await supabase
            .from('profiles')
            .select(`*`)
            .eq('id', session?.user?.id as string)
            .single()

        return { data, error, status }
    }

    return { data: null, error, status }
}

// fetch user Boards data from supabase
export const FetchUserBoards = async () => {

    const {
        data: session,
        error,
        status
    } = await fetchSessionData()
    if (session && session.user?.id) {

        const { data, error, status } = await supabase
            .from('board_users')
            .select('boards(*)')
            .eq('user_id', session?.user?.id as string)
        
        return { data, error, status }
    }
    return { data: null, error, status }
}