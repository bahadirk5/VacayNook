"use client"

import Link from "next/link"
import { SafeUser } from "@/types"
import { signOut } from "next-auth/react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "./icons"
import { UserAvatar } from "./user-avatar"

interface NavbarProps {
  currentUser?: SafeUser | null
}

export function UserAccountNav({ currentUser }: NavbarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {currentUser ? (
          <UserAvatar
            user={{
              name: currentUser.name || null,
              image: currentUser.image || null,
            }}
            className="h-8 w-8"
          />
        ) : (
          <Avatar>
            <AvatarFallback>
              <Icons.user className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currentUser ? (
          <>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {currentUser.name && (
                  <p className="font-medium">{currentUser.name}</p>
                )}
                {currentUser.email && (
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {currentUser.email}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            {currentUser.role === "ADMIN" ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/admin-dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin-dashboard/category">Category</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin-dashboard/settings">Settings</Link>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/user-dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user-dashboard/settings">Settings</Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register">Sign up</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
