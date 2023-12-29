
'use client'
import { useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, SubmitHandler } from "react-hook-form"
import { Database } from '@/supabase'



export type Props = {
  session: Session | null
  values?: Database['public']['Tables']['profiles']['Update']
}

export default function UpdateProfile({ session, values }: Props) {
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient<any>()
  const user = session?.user
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Database['public']['Tables']['profiles']['Update']>({
    defaultValues: values,
  })

  async function updateProfileData({
    username,
    full_name,
    avatar_url,
  }: Database['public']['Tables']['profiles']['Update']) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit: SubmitHandler<Database['public']['Tables']['profiles']['Update']> = async (data) => { await updateProfileData(data) }
  console.log('Session', session)

return (
  <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="full_name" >
        Full Name
      </Label>
      <Input id="full_name" className="col-span-3" {...register("full_name")} />
    </div>

    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="username" >
        Username
      </Label>
      <Input id="username" className="col-span-3"   {...register("username", { required: true })} />
    </div>

    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="avatar_url" >
        Avatar url
      </Label>
      <Input id="avatar_url" className="col-span-3" {...register("avatar_url")} />
    </div>
    <Button type="submit">Save changes</Button>
  </form>
)
}