import { EditProfileButton } from "@/components/edit-profile";
import TaskTimeTrackerLogo from "@/components/t3-logo"
import { ModeToggle } from "@/components/theme-toggle"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers';


export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {

  const supabase = createServerComponentClient<any>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <section className="min-h-screen 2xl:container 2xl:mx-auto ">
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className="flex items-center justify-between p-2 border-b-2 drop-shadow-2xl" aria-label="Main">
        <TaskTimeTrackerLogo />
        <nav className="flex items-center gap-2" aria-label="Controls">
          <EditProfileButton session={session} />
          <ModeToggle />
        </nav>
      </nav>

      {children}
    </section>
  )
}