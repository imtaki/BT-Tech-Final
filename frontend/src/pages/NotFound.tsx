import { useEffect } from "react"
import { useNavigate } from 'react-router'

export default function NotFound() {
  const navigate = useNavigate()


  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }, [])

  return (
    <div className="flex flex-col justify-center items-center m-48">
    <h1 className="text-orange-400 text-9xl">404</h1>
    <h1 className="text-orange-400 text-5xl">Page Not Found...</h1>
    </div>
  )
}