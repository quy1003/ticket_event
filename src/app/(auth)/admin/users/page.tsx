import ServerTable from '@/components/admin/server-table'
import { UserService } from '@/service/user.service'
import { ParamsList } from '@/types/params-list.types'

export default async function AdminUsersPage({ searchParams }: { searchParams: ParamsList }) {
  const params = await searchParams

  const users = await UserService.getAllUsers(params)

  return (
    <div>
      <ServerTable entity="users" data={users} />
    </div>
  )
}
