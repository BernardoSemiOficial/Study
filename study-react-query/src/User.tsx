import { useEffect, useState } from 'react'
interface ResponseAPIUser {
  data: {
    first_name: string
    last_name: string
    avatar: string
  }
}

interface User {
  first_name: string
  last_name: string
  avatar: string
}

export const User = () => {
  const baseURL = 'https://reqres.in/api/users/'

  const [currentUserId, setCurrentUserId] = useState(1)
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const getAllPokemon = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(baseURL + currentUserId)
        const { data } = (await response.json()) as ResponseAPIUser
        setUser(data)
      } catch (error) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    getAllPokemon()
  }, [currentUserId])

  const isRenderUser = !!user

  return (
    <div className='App'>
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
