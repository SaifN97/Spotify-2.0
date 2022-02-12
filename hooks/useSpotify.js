import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import spotifyApi from '../lib/spotify'

const useSpotify = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      //If refresh access token fails, direct the use to login..
      if (session.error === 'RefreshAccessTokenError') {
        signIn()
      }
      spotifyApi.setAccessToken(session.user.accessToken)
    }
    return spotifyApi
  }, [session])
  return spotifyApi
}

export default useSpotify
