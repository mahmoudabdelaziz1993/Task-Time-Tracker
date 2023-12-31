import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { EditProfileButton } from "./edit-profile"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { FetchUserProfile } from "@/lib/supabase/fetch-data"


type Props = {}

export default async function AvatarDropdown({ }: Props) {
    const { data: profile, error: profileError, status: profileStatus } = await FetchUserProfile()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger  className="p-4 rounded-full">
            <Avatar className="w-6 h-6">
            <AvatarImage src={profile?.avatar_url ?? 'https://api.dicebear.com/7.x/micah/svg'} />
            <AvatarFallback>{profile?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel> <EditProfileButton /></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <form action="/auth/signout"  method="post">
                        <Button variant={'destructive'} type="submit">
                            Sign out
                        </Button>
                    </form>
                </DropdownMenuItem>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}