import { EditProfileButton } from "@/components/edit-profile";
import TaskTimeTrackerLogo from "@/components/t3-logo"
import { ModeToggle } from "@/components/theme-toggle"



export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {

  
  return (
    <section className="flex flex-col min-h-screen 2xl:container 2xl:mx-auto ">
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className="border-b-2 drop-shadow-2xl" aria-label="Main">
        <div className="container flex items-center justify-between p-6">
          <TaskTimeTrackerLogo />
          <nav className="flex items-center gap-2" aria-label="Controls">
            <EditProfileButton />
            <ModeToggle />
          </nav>
        </div>
      </nav>
      <main className="grid flex-grow">{children}</main>

    </section>
  )
}