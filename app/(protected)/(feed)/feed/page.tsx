'use client'
import ProtectedRoute from '@/components/protected-route/protected-route'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/stores/authStore'
import { useRouter } from 'next/navigation'
import { AnyAaaaRecord } from 'node:dns'
import React from 'react'
import { toast } from 'sonner'

const Feed = () => {
    const route = useRouter()
    const {logout} = useAuthStore()
    const handlelogout = async () => {
        try {
          await logout()
          route.push("/login")
          toast.success("logout successfully")

        } catch (error: any) {
          toast.error("logout failed")
        }
    }
  return (
   <ProtectedRoute>
     <div className='py-24 px-24'>
        <Button
        onClick={handlelogout}
        variant={'destructive'}>
            Logout
        </Button>
    </div>
   </ProtectedRoute>
  )
}

export default Feed