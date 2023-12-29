'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import UpdateProfile from "./update-profile-form"
import { Session } from "@supabase/supabase-js"
import { useCallback, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Database } from "@/supabase"

type props = {
  session: Session | null;
}
export function EditProfileButton({ session }: props) {
  const [profile, setProfile] = useState<Database['public']['Tables']['profiles']['Update']>()
  const supabase = createClientComponentClient<Database>()
  const user = session?.user
  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id!)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProfile(data)
      }
    } catch (error) {
      alert('Error loading user data!')
    }
  }, [user, supabase])
  useEffect(() => {
    getProfile()
  }, [user, getProfile])
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="p-4 rounded-full">
          <Avatar className="w-6 h-6">
            <AvatarImage src={profile?.avatar_url??'https://api.dicebear.com/7.x/micah/svg'} />
            <AvatarFallback>{profile?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <UpdateProfile session={session} values={profile} />
      </SheetContent>
    </Sheet>
  )
}