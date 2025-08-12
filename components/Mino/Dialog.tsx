import React from 'react'

interface Props {
  text: string
  onClick: () => void
  showOptions: boolean
  isTyping: boolean
  onClose: () => void
  currentMessageId: string
  onGuideClick: () => void
  isGuideOpen: boolean
  onGuideSelect: (option: string) => void
}

export default function MinoDialog({
  text,
  onClick,
  showOptions,
  isTyping,
  onClose,
  currentMessageId,
  onGuideClick,
  isGuideOpen,
  onGuideSelect,
}: Props) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 h-[180px] bg-black/80 px-4 pb-4 sm:pb-6">
      <div
        className="relative mx-auto flex h-full max-w-3xl flex-col justify-between px-6 py-4 shadow-xl"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick()
          }
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute top-3 right-4 text-xl text-white"
        >
          &times;
        </button>

        <div className="min-h-[4rem] overflow-y-auto text-base font-medium text-white md:text-lg">
          {text}
        </div>

        {isTyping && (
          <div className="mt-2 text-right">
            <span className="text-sm font-semibold text-white">Click to skip...</span>
          </div>
        )}

        {showOptions && currentMessageId === 'intro' && (
          <div className="mt-4 flex flex-wrap gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onGuideClick()
              }}
              className="text-white underline transition"
            >
              Guide
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="text-white underline transition"
            >
              Chat
            </button>
          </div>
        )}

        {isGuideOpen && (
          <div className="absolute top-[-160px] right-0 left-0 rounded-md bg-black/90 px-4 py-4 shadow-md">
            <div className="flex flex-col gap-3 text-sm font-medium text-white">
              <button
                className="text-left hover:underline"
                onClick={() => onGuideSelect('creator')}
              >
                Ai tạo ra bạn?
              </button>
              <button
                className="text-left hover:underline"
                onClick={() => onGuideSelect('projects')}
              >
                Các project của trang web
              </button>
              <button className="text-left hover:underline" onClick={() => onGuideSelect('deeper')}>
                Hỏi sâu hơn
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
