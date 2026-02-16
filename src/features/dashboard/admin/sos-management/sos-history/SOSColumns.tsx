import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Phone, CheckCircle, AlertTriangle, ShieldAlert, Stethoscope, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Data Type
export type SOSRequest = {
  id: string
  userPhoto: string | null
  userName: string
  userType: 'TRAINER' | 'TRAINEE'
  phone: string
  location: string
  type: 'MEDICAL' | 'SECURITY' | 'OTHER'
  details: string
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED'
  timestamp: string
}

// Helper: Request Type Icon & Color
const getTypeBadge = (type: string) => {
  switch (type) {
    case 'MEDICAL':
      return <Badge variant="destructive" className="flex gap-1 items-center bg-red-600"><Stethoscope className="w-3 h-3" /> Medical</Badge>
    case 'SECURITY':
      return <Badge variant="destructive" className="flex gap-1 items-center bg-orange-600"><ShieldAlert className="w-3 h-3" /> Security</Badge>
    default:
      return <Badge variant="secondary" className="flex gap-1 items-center"><AlertTriangle className="w-3 h-3" /> Other</Badge>
  }
}

// Helper: Status Color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING': return 'text-red-600 bg-red-50 border-red-200'
    case 'IN_PROGRESS': return 'text-blue-600 bg-blue-50 border-blue-200'
    case 'RESOLVED': return 'text-green-600 bg-green-50 border-green-200'
    default: return ''
  }
}

export const SOSColumns: ColumnDef<SOSRequest>[] = [
  // 1. User Info (Who sent the SOS?)
  {
    accessorKey: 'userName',
    header: 'Sender',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9 border border-gray-200">
          <AvatarImage src={row.original.userPhoto || ''} />
          <AvatarFallback className="font-bold bg-red-50 text-red-600">
            {row.original.userName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-bold text-sm text-gray-900">{row.original.userName}</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
            {row.original.userType}
          </span>
        </div>
      </div>
    ),
  },

  // 2. Emergency Type
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => getTypeBadge(row.original.type),
  },

  // 3. Location & Time
  {
    accessorKey: 'location',
    header: 'Location / Time',
    cell: ({ row }) => (
      <div className="flex flex-col text-xs">
        <span className="font-medium text-gray-700">{row.original.location}</span>
        <span className="text-gray-500">{row.original.timestamp}</span>
      </div>
    ),
  },

  // 4. Contact
  {
    accessorKey: 'phone',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Phone className="w-3 h-3" /> {row.original.phone}
      </div>
    ),
  },

  // 5. Status Badge
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant="outline" className={`${getStatusColor(row.original.status)}`}>
        {row.original.status.replace('_', ' ')}
      </Badge>
    ),
  },

  // 6. Actions
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Emergency Actions</DropdownMenuLabel>
            <DropdownMenuItem className="text-blue-600">
               <Phone className="mr-2 h-4 w-4" /> Call User
            </DropdownMenuItem>
            <DropdownMenuItem>
               <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="text-green-600 font-bold">
               <CheckCircle className="mr-2 h-4 w-4" /> Mark Resolved
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]