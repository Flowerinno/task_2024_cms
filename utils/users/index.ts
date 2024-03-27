import toast from 'react-hot-toast'
import { EditUserSchema } from 'utils/validation/user.schema'

const base = process.env.NEXT_PUBLIC_API_URL

export async function registerUser(email: string, password: string, is_admin: boolean) {
  try {
    const res = await fetch(base + '/admin/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, is_admin }),
    })

    const data = await res.json()

    if (res.status === 200) {
      toast.success('User registered successfully')
      return true
    }

    toast.error(data?.message)
  } catch (error: { message: string } | any) {
    toast.error('Failed to create new user')
    return false
  }
}

export async function removeUser(id: string) {
  try {
    const url = base + `/admin/users/delete`
    const res = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })

    if (res.status === 200) {
      toast.success('User removed successfully')
    }
  } catch (error) {
    toast.error('An error occurred while removing user')
    return null
  }
}

export async function undoDeletion(id: string) {
  try {
    const url = base + `/admin/users/delete/undo`
    const res = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })

    if (res.status === 200) {
      toast.success('Removed user from deleted')
    }
  } catch (error) {
    toast.error('An error occurred while removing user from deleted')
    return null
  }
}

export async function updateUser({
  id,
  email,
  role,
  is_blocked,
  is_deleted,
}: EditUserSchema): Promise<EditUserSchema | undefined> {
  try {
    const res = await fetch(base + '/admin/users/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, email, role, is_blocked, is_deleted }),
    })

    const data = await res.json()

    if (res.status === 200) {
      toast.success(data?.message)
      return data?.user
    }

    toast.error(data?.message)
  } catch (error: { message: string } | any) {
    toast.error('Failed to update user')
  }
}
