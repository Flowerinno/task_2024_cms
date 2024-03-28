'use client'

import { editUserSchema, EditUserSchema } from 'utils/validation/user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { updateUser } from 'utils'
import { useEffect, useState } from 'react'
import LoadingDots from '@/components/loading-dots'
import fetcher from '@/lib/fetcher'
import useSWR from 'swr'
import { GetUserResponse } from 'utils/users/types'

export default function EditUsers({ params }: { params: { user_id: string } }) {
  const [user, setUser] = useState<EditUserSchema | null>(null)

  const form = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: user?.email,
      role: user?.role,
      is_blocked: user?.is_blocked,
      is_deleted: user?.is_deleted,
    },
  })

  async function onSubmit(values: EditUserSchema) {
    const updatedUser = await updateUser({
      ...values,
      id: params.user_id,
    })

    if (updatedUser) {
      setUser(updatedUser)
    }
  }

  const { data, isLoading } = useSWR<GetUserResponse>(
    `/api/admin/users/${params.user_id}`,
    fetcher,
    {
      refreshInterval: 50,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
    },
  )

  useEffect(() => {
    if (data) {
      setUser(data)
      Object.keys(data).forEach((key: any) => {
        form.setValue(key, data[key as keyof EditUserSchema])
      })
    }
  }, [data])

  if (isLoading) {
    return <LoadingDots />
  }

  return (
    <div className='w-11/12 flex flex-col items-center justify-start p-0'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-11/12 md:w-6/12  p-10 m-0 rounded-md space-y-8'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field: { value, ...rest } }) => (
              <FormItem>
                <FormLabel>Email ({user?.id ?? ''})</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder='test@gmail.com'
                    {...rest}
                    defaultValue={user?.email}
                    value={user?.email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role'
            render={({ field: { value, ...rest } }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input {...rest} placeholder={user?.role} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-5 md:flex-row md:gap-10'>
            <Controller
              control={form.control}
              name='is_blocked'
              render={({ field: { onChange, onBlur, value, name } }) => {
                return (
                  <FormItem className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      onBlur={onBlur}
                      onChange={onChange}
                      checked={value}
                      name={name}
                      id='is_blocked'
                      className='accent-black'
                    />

                    <label
                      htmlFor='is_blocked'
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      style={{ padding: 0, margin: 0 }}
                    >
                      {user?.is_blocked
                        ? 'User blocked (uncheck to undo)'
                        : 'User NOT blocked (check to block)'}
                    </label>
                  </FormItem>
                )
              }}
            />
            <Controller
              control={form.control}
              name='is_deleted'
              render={({ field: { onChange, onBlur, value, name } }) => {
                return (
                  <FormItem className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      onBlur={onBlur}
                      onChange={onChange}
                      checked={value}
                      name={name}
                      id='is_deleted'
                      className='accent-black'
                    />

                    <label
                      htmlFor='is_deleted'
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      style={{ padding: 0, margin: 0 }}
                    >
                      {user?.is_deleted
                        ? 'User deleted (uncheck to undo)'
                        : 'User NOT deleted (check to delete)'}
                    </label>
                  </FormItem>
                )
              }}
            />
          </div>

          <Button type='submit'>Update user</Button>
        </form>
      </Form>
    </div>
  )
}
