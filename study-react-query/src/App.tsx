import './App.css'
import { User } from './User'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserWithReactQuery } from './UserWithReactQuery'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60, // 1 minuto
    },
  },
})

function App() {
  return (
    <>
      Without React Query
      <User />
      <br />
      <br />
      <QueryClientProvider client={queryClient}>
        With React Query
        <UserWithReactQuery />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
