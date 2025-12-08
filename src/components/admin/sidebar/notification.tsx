"use client"

import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useNotificationStatus } from "@/hooks/useDashboard"

export interface NotificationItem {
  id: number
  user: string
  action: string
  target: string
  timestamp: string
  unread: boolean
}

interface NotificationComponentProps {
  notifications?: NotificationItem[]
  hasNextPage?: boolean
  fetchNextPage?: () => void
  isFetchingNextPage?: boolean
}

export default function NotificationComponent({
  notifications = [],
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: NotificationComponentProps) {
//   const [notifications, setNotifications] = useState(propNotifications || [])
  const { mutate: markAsRead } = useNotificationStatus()

  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllAsRead = () => {
    notifications.forEach((notification) => {
      if (notification.unread) {
        markAsRead(notification.id)
      }
    })
  }

  const handleNotificationClick = (id: number) => {
    const notification = notifications.find((n) => n.id === id)
    if (notification?.unread) {
      markAsRead(id)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="relative h-8 w-8 md:h-9 md:w-9">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-xs">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1" align="end">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
          {unreadCount > 0 && (
            <Button variant="link" size="sm" className="text-xs font-medium" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <div className="bg-border -mx-1 my-1 h-px" />
        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn("hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors border-b")}
            >
              <div className="relative flex items-start pe-3 cursor-pointer">
                <div className="flex-1 space-y-1  ">
                  <button
                    className="text-foreground/80 text-left after:absolute after:inset-0 cursor-pointer"
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <span className="text-foreground font-medium hover:underline">{notification.user}</span>{" "}
                    {notification.action}{" "}
                    <span className="text-foreground font-medium hover:underline">{notification.target}</span>.
                  </button>
                  <div className="text-muted-foreground text-xs">{notification.timestamp}</div>
                </div>
                {notification.unread && (
                  <div className="absolute end-0 self-center">
                    <div className="h-2 w-2 rounded-full bg-black" />
                  </div>
                )}
              </div>
            </div>
          ))}
          {hasNextPage && (
            <div className="p-2 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fetchNextPage && fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
