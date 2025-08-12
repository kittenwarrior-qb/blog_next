// useMino.ts (hook)
import { useReducer, useEffect, useRef } from 'react'
import { Message, UseMinoReturn } from './types'
import { DEFAULT_MESSAGES, TALK_FRAMES } from './constants'

const TYPING_INTERVAL = 40
const FRAME_INTERVAL = 150

type State = {
  isAwake: boolean
  isTyping: boolean
  currentIndex: number
  displayedText: string
  showOptions: boolean
  frameIndex: number
  isGuideOpen: boolean
  messages: Message[]
}

type Action =
  | { type: 'WAKE'; payload?: { messages?: Message[] } }
  | { type: 'START_TYPING' }
  | { type: 'SET_FULL_TEXT' }
  | { type: 'ADVANCE' }
  | { type: 'SKIP' }
  | { type: 'CLOSE' }
  | { type: 'GO_BACK' }
  | { type: 'TICK_FRAME' }
  | { type: 'TOGGLE_GUIDE' }
  | { type: 'SET_DISPLAYED_TEXT'; payload: string }

const initialState: State = {
  isAwake: false,
  isTyping: false,
  currentIndex: 0,
  displayedText: '',
  showOptions: false,
  frameIndex: 0,
  isGuideOpen: false,
  messages: DEFAULT_MESSAGES,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'WAKE':
      return {
        ...state,
        isAwake: true,
        currentIndex: 0,
        displayedText: '',
        isTyping: true,
        showOptions: false,
        frameIndex: 0,
        isGuideOpen: false,
        messages: action.payload?.messages ?? DEFAULT_MESSAGES,
      }
    case 'START_TYPING':
      return { ...state, isTyping: true, displayedText: '', showOptions: false }
    case 'SET_DISPLAYED_TEXT':
      return { ...state, displayedText: action.payload }
    case 'SET_FULL_TEXT':
      return {
        ...state,
        displayedText: state.messages[state.currentIndex].text,
        isTyping: false,
        showOptions: true,
      }
    case 'ADVANCE': {
      const next = state.currentIndex + 1
      if (next >= state.messages.length) {
        return { ...state, isTyping: false, showOptions: true }
      }
      return {
        ...state,
        currentIndex: next,
        isTyping: true,
        displayedText: '',
        showOptions: false,
        frameIndex: 0,
        isGuideOpen: false,
      }
    }
    case 'GO_BACK': {
      const prev = state.currentIndex - 1
      if (prev < 0) return state
      return {
        ...state,
        currentIndex: prev,
        isTyping: true,
        displayedText: '',
        showOptions: false,
        frameIndex: 0,
        isGuideOpen: false,
      }
    }
    case 'SKIP':
      return {
        ...state,
        isTyping: false,
        displayedText: state.messages[state.currentIndex].text,
        showOptions: true,
      }
    case 'CLOSE':
      return { ...initialState }
    case 'TOGGLE_GUIDE':
      return { ...state, isGuideOpen: !state.isGuideOpen }
    case 'TICK_FRAME':
      return {
        ...state,
        frameIndex: (state.frameIndex + 1) % TALK_FRAMES.talking.length,
      }
    default:
      return state
  }
}

export const useMino = (customMessages?: Message[]): UseMinoReturn => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    messages: customMessages ?? DEFAULT_MESSAGES,
  })
  const frameIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (!state.isAwake || !state.isTyping) return
    const full = state.messages[state.currentIndex].text
    let i = 0
    const typingInterval = setInterval(() => {
      i++
      dispatch({ type: 'SET_DISPLAYED_TEXT', payload: full.slice(0, i) })
      if (i >= full.length) {
        clearInterval(typingInterval)
        dispatch({ type: 'SET_FULL_TEXT' })
      }
    }, 40)
    return () => clearInterval(typingInterval)
  }, [state.isAwake, state.isTyping, state.currentIndex, state.messages])

  useEffect(() => {
    if (!state.isTyping) return
    frameIntervalRef.current = window.setInterval(() => {
      dispatch({ type: 'TICK_FRAME' })
    }, FRAME_INTERVAL)
    return () => {
      if (frameIntervalRef.current) window.clearInterval(frameIntervalRef.current)
    }
  }, [state.isTyping])

  return {
    isAwake: state.isAwake,
    isTyping: state.isTyping,
    displayedText: state.displayedText,
    showOptions: state.showOptions,
    wake: () => dispatch({ type: 'WAKE', payload: { messages: customMessages } }),
    skipTyping: () => dispatch({ type: 'SKIP' }),
    close: () => dispatch({ type: 'CLOSE' }),
    nextMessage: () => dispatch({ type: 'ADVANCE' }),
    goBack: () => dispatch({ type: 'GO_BACK' }),
    toggleGuide: () => dispatch({ type: 'TOGGLE_GUIDE' }),
    isGuideOpen: state.isGuideOpen,
    currentMessage: state.messages[state.currentIndex],
    currentFrameImage: state.isTyping ? TALK_FRAMES.talking[state.frameIndex] : TALK_FRAMES.idle,
  }
}
