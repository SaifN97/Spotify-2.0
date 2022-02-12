import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

const Center = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => setPlaylist(data.body))
      .catch((error) => console.log('Something went wrong..', error))
  }, [spotifyApi, playlistId])
  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 opacity-90 hover:opacity-80">
          {/* //Spotify Api dose'nt live update hence, static username and image */}
          <img
            src={`https://avatars.githubusercontent.com/u/60750929?v=4`}
            alt="user-image"
            className="h-10 w-10 rounded-full"
          />
          <h2>Saif Narpali</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>
    </div>
  )
}

export default Center