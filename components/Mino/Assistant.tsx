'use client'
import React from 'react'
import { useMino } from './MinoContext'
import MinoCharacter from './Character'
import MinoDialog from './Dialog'

export default function MinoAssistant() {
  const {
    isAwake,
    isTyping,
    displayedText,
    showOptions,
    skipTyping,
    close,
    nextMessage,
    goBack,
    currentFrameImage,
    currentMessage,
    toggleGuide,
    isGuideOpen,
  } = useMino()

  const handleClick = () => {
    if (isTyping) skipTyping()
    else nextMessage()
  }

  return (
    <div className="relative z-50">
      <div className="pointer-events-none">
        <MinoCharacter isAwake={isAwake} isTalking={isTyping} currentImage={currentFrameImage} />
      </div>

      {isAwake && (
        <div>
          <MinoDialog
            text={displayedText}
            isTyping={isTyping}
            showOptions={showOptions}
            onClick={handleClick}
            onClose={close}
            currentMessageId={currentMessage?.id ?? ''}
            onGuideClick={toggleGuide}
            isGuideOpen={isGuideOpen}
            onGuideSelect={() => {}}
          />
          <div className="fixed bottom-0 left-[30px] z-50 flex gap-2 lg:left-[475px]">
            <button
              onClick={(e) => {
                e.stopPropagation()
                goBack()
              }}
              className="rounded px-3 py-1 text-sm text-white"
            >
              Back
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextMessage()
              }}
              className="rounded px-3 py-1 text-sm text-white"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
