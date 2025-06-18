import { useDispatch } from "react-redux"

import { logout } from "@/slices/user.slice"
import { deleteCookie } from "@/utils/cookies"

const useLogout = () => {
  const dispatch = useDispatch()

  function logoutUser() {
    // Clear cookie
    deleteCookie('login')

    // Clear session
    dispatch(logout())


    window.location.href = '/'

  }
  return logoutUser
}

export default useLogout