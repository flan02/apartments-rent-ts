import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict } from "date-fns"
import { UserResource } from "@clerk/types";
import { User } from "@clerk/nextjs/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

// TODO: using date-fns
export function relativeData(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true })
}

// * without date-fns
export function distanceTimeFromNow(from: Date) {
  const now = new Date()
  const diff = now.getTime() - from.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`
  }

  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`
  }

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  }

  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }

  return `${seconds} second${seconds > 1 ? 's' : ''} ago`
}

export function toSlug(value: string) {
  return value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
}

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === "admin";
}