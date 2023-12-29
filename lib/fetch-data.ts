"use server"
import { Database } from "@/supabase"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers';

const supabase = createServerComponentClient<Database>({ cookies })
export const FetchUserProfile = async () => {

    const {
        data: { session },
error,
    } = await supabase.auth.getSession()

    if (session && session.user?.id) {
        const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', session?.user?.id as string)
        .single()

    return { data, error, status }
    }
   return { data: null, error, status: 406 }
}