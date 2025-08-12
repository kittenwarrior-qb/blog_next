export interface Message {
  id: string;
  text: string;
}

export interface UseMinoReturn {
  isAwake: boolean;
  isTyping: boolean;
  displayedText: string;
  showOptions: boolean;
  wake: () => void;
  skipTyping: () => void;
  close: () => void;
  nextMessage: () => void;
  goBack: () => void;
  currentMessage?: Message;
  currentFrameImage: string;
  isGuideOpen: boolean;
  toggleGuide: () => void;
}