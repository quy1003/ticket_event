import ServerTable from '@/components/admin/server-table'
import { UserService } from '@/service/user.service'

export default async function AdminUsersPage() {
  const users = await UserService.getAllUsers()
  return (
    <div>
      <ServerTable entity="users" data={users.data} />
    </div>
  )
}
