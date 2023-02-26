import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface ResponseAPIUser {
  data: User
}

interface User {
  first_name: string
  last_name: string
  avatar: string
}

const getAllUsers = async (currentUserId: number) => {
  const baseURL = 'https://reqres.in/api/users/'
  try {
    const response = await fetch(baseURL + currentUserId)
    const { data } = (await response.json()) as ResponseAPIUser
    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const UserWithReactQuery = () => {
  const [currentUserId, setCurrentUserId] = useState(1)
  const client = useQueryClient()

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery(['users', { id: currentUserId }], () =>
    getAllUsers(currentUserId)
  )

  const mutationUpdateUsers = useMutation({
    mutationFn() {
      return Promise.resolve(setCurrentUserId(1))
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: ['users'], exact: false })
    },
  })

  const handleClickUpdateUsers = () => {
    mutationUpdateUsers.mutate()
  }

  const isRenderUser = !!user

  return (
    <div className='App'>
      <button onClick={handleClickUpdateUsers}>atualizar usuários</button>
      <p>error: {String(isError)}</p>
      <p>loading: {String(isLoading)}</p>
      {isRenderUser && (
        <div>
          <img
            src={user.avatar}
            alt={user.first_name}
            title={user.first_name}
          />
          <p>
            {user.first_name} {user.last_name}
          </p>
        </div>
      )}
      <div>
        <button
          disabled={isLoading}
          onClick={() => setCurrentUserId(currentUserId - 1)}
        >
          anterior
        </button>
        <button
          disabled={isLoading}
          onClick={() => setCurrentUserId(currentUserId + 1)}
        >
          próximo
        </button>
      </div>
    </div>
  )
}
