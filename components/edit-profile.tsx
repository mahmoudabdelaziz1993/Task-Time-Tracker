
import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import UpdateProfile from "./update-profile-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FetchUserProfile, fetchSessionData } from "@/lib/supabase/fetch-data"


export async function EditProfileButton() {

  const { data: session, error, status } = await fetchSessionData()
  const { data: profile, error: profileError, status: profileStatus } = await FetchUserProfile()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="p-4 rounded-full">
          <Avatar className="w-6 h-6">
            <AvatarImage src={profile?.avatar_url ?? 'https://api.dicebear.com/7.x/micah/svg'} />
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
        {profile && <UpdateProfile session={session} values={profile} />}
      </SheetContent>
    </Sheet>
  )
}
