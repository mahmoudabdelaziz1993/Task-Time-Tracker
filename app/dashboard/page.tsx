import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FetchUserBoards, FetchUserProfile } from "@/lib/supabase/fetch-data"
import { getGreeting } from "@/lib/greating-data-helper"
import CreateNewBoard from "@/components/create-new-board"
import { use } from "react"



export default async function DashBoard() {
  const { data: user, error, status } = await FetchUserProfile()
  const { formattedDate, greeting } = getGreeting()
  const { data: userBoards, error: boardError, status: boardStatus } = await FetchUserBoards()
  const  boards  = userBoards ? userBoards.map((board: any) => board.boards) :[]
console.log('boards', userBoards)
  console.log("fetch user" + JSON.stringify(user) + error + status)

  return (
   
      <Card className="container p-2 my-2 shadow-lg md:mx-auto drop-shadow-lg md:p-6">
        <CardHeader>
          <CardTitle>Hello, {user?.full_name} 👋🏽</CardTitle>
          <CardDescription><strong>{formattedDate}</strong> {greeting.message} {greeting.icon}</CardDescription>
        </CardHeader>
        <CardContent className="container flex-grow mx-auto md:p-6">
          <Card className="h-full shadow-lg drop-shadow-lg ">
           
            <CardHeader  >
              <CardTitle>Boards</CardTitle>
              <CardDescription>{boards?.length ? "you have " + boards?.length + " boards" : "you have no boards created yet !" }</CardDescription>
            </CardHeader>
          
            
            <CardContent>
            <CreateNewBoard/>
              {
                boards.map((board,i) => (
                  <Card key={board.id}>
                    <CardHeader>
                      <CardTitle>{board.title}</CardTitle>
                      <CardDescription>{board.description}</CardDescription>
                    
                    </CardHeader>
                  </Card>
                ))
              }
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    
  )
}