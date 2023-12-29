import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FetchUserProfile } from "@/lib/fetch-data"
import { getGreeting } from "@/lib/greating-data-helper"
import { User } from "@supabase/supabase-js"



export default async function DashBoard() {
  const { data: user, error, status } = await FetchUserProfile()
  const { formattedDate, greeting } = getGreeting()

  console.log("fetch user" + JSON.stringify(user) + error + status)

  return (
    <div className="container p-2 ">
      <Card className="h-full shadow-lg drop-shadow-lg">
        <CardHeader>
          <CardTitle>Hello, {user?.full_name} 👋🏽</CardTitle>
          <CardDescription><strong>{formattedDate}</strong> {greeting.message} {greeting.icon}</CardDescription>
        </CardHeader>
        <CardContent>
          Card content
        </CardContent>
        <CardFooter>
          Card footer
        </CardFooter>
      </Card>
    </div>
  )
}