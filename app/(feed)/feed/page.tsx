'use client'

import ProtectedRoute from '@/components/protected-route/protected-route'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/stores/authStore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Feed = () => {
    const route = useRouter()
    const { logout, user, isLoading, fetchProfile } = useAuthStore()
    const [fetchCount, setFetchCount] = useState(0)
    
    // Test: See how many times fetchProfile is called
    useEffect(() => {
        console.log("🟢 Feed page mounted, fetchProfile called:", fetchCount + 1)
        fetchProfile()
        setFetchCount(prev => prev + 1)
    }, []) // Empty array = runs only once
    
    // Log whenever user or loading state changes
    useEffect(() => {
        console.log("📊 State update:", { 
            hasUser: !!user, 
            isLoading, 
            userEmail: user?.email,
            fetchCount 
        })
    }, [user, isLoading, fetchCount])
    
    const handlelogout = async () => {
        try {
            await logout()
            route.push("/login")
            toast.success("logout successfully")
        } catch (error: any) {
            toast.error("logout failed")
        }
    }
    
    // Show loading state
    if (isLoading) {
        return (
            <ProtectedRoute>
                <div className='py-24 px-24'>
                    <p>Loading user data...</p>
                </div>
            </ProtectedRoute>
        )
    }
    
    return (
        <ProtectedRoute>
            <div className='py-24 px-24'>
                <h1 className="text-2xl mb-4">Feed Page</h1>
                
                {/* Debug info */}
                <div className="mb-4 p-4  rounded">
                  
                    <p><strong>User:</strong> {(String(user?.displayName)) || "Not loaded"}</p>
                    <p><strong>Email:</strong> {(String(user?.email)) || "Not loaded"}</p>
                    <p><strong>Loading:</strong> {isLoading ? "Yes" : "No"}</p>
                    <p><strong>Fetch count:</strong> {fetchCount}</p>
                </div>
                
                <Button onClick={handlelogout} variant={'destructive'}>
                    Logout
                </Button>
            </div>
        </ProtectedRoute>
    )
}

export default Feed