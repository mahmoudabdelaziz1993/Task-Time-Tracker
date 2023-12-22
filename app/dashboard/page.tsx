import AccountForm from "@/components/account-form"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers';

type Props = {}

export default async function DashBoard({}: Props) {
    const supabase = createServerComponentClient<any>({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()
  
  return (
    <div>DashBoard
        <AccountForm session={session}/>
    </div>
  )
}