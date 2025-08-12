import { Message } from './types'

export const DEFAULT_MESSAGES: Message[] = [
  {
    id: 'greet',
    text: "Hi there~ I'm Mino-chan, your little companion on this journey! It's so nice to meet you.",
  },
  {
    id: 'intro',
    text: "I'll be here to guide you through everything. Just sit back, relax, and choose what you'd like to explore!",
  },
  {
    id: 'creator',
    text: "It's kwarrior.dev !",
  },
]

export const TALK_FRAMES = {
  idle: 'talk1a.png',
  talking: ['talk2a.png', 'talk2b.png'],
}
