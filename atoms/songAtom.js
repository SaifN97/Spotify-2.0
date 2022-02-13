import { atom } from 'recoil'

export const currentTrackIdState = atom({
  //Unique ID (with respect to our other atoms/selectors)
  key: 'currentTrackIdState',
  //  Default/Initial Value
  default: null,
})

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
})
