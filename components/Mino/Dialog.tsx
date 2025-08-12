import React from "react";

interface Props {
  text: string;
  onClick: () => void;
  showOptions: boolean;
  isTyping: boolean;
  onClose: () => void;
  currentMessageId: string;
  onGuideClick: () => void;
  isGuideOpen: boolean;
  onGuideSelect: (option: string) => void;
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
    <div className="fixed bottom-0 left-0 right-0 z-40 h-[180px] bg-black/80 px-4 pb-4 sm:pb-6">
      <div
        className="relative mx-auto max-w-3xl h-full shadow-xl px-6 py-4 flex flex-col justify-between"
        onClick={onClick}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3 right-4 text-white text-xl"
        >
          &times;
        </button>

        <div className="text-base md:text-lg font-medium text-white overflow-y-auto min-h-[4rem]">
          {text}
        </div>

        {isTyping && (
          <div className="mt-2 text-right">
            <span className="text-sm text-white font-semibold">
              Click to skip...
            </span>
          </div>
        )}

        {showOptions && currentMessageId === "intro" && (
          <div className="mt-4 flex flex-wrap gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onGuideClick();
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
          <div className="absolute top-[-160px] left-0 right-0 bg-black/90 px-4 py-4 rounded-md shadow-md">
            <div className="flex flex-col gap-3 text-sm text-white font-medium">
              <button
                className="text-left hover:underline"
                onClick={() => onGuideSelect("creator")}
              >
                Ai tạo ra bạn?
              </button>
              <button
                className="text-left hover:underline"
                onClick={() => onGuideSelect("projects")}
              >
                Các project của trang web
              </button>
              <button
                className="text-left hover:underline"
                onClick={() => onGuideSelect("deeper")}
              >
                Hỏi sâu hơn
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}