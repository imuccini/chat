import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { User, Message, Gender } from '@/types';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { Trash2 } from 'lucide-react';

interface GlobalChatProps {
  user: User;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onRemoveMessage?: (messageId: string) => void;
  onlineCount: number;
  isOnline: boolean;
  hideHeader?: boolean;
  headerTitle?: string;
  showBottomNavPadding?: boolean;
  isFocused?: boolean;
  onInputFocusChange?: (isFocused: boolean) => void;
  isSyncing?: boolean;
  isReadOnly?: boolean;
  canModerate?: boolean;
  onBack?: () => void;
  showOnlineCount?: boolean;
  keyboardContentStyle?: React.CSSProperties;  // Applied to content area, NOT header
}

const GenderIcon = memo(({ gender, className }: { gender: Gender; className?: string }) => {
  if (gender === 'male') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    );
  }
  if (gender === 'female') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"></path>
        <path d="M18 22H6c0-4 4-3 6-3s6-1 6 3Z"></path>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="10" r="3"></circle>
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
    </svg>
  );
});

const ChatInput = memo(({ onSendMessage, showBottomNavPadding, onFocusChange, isReadOnly }: {
  onSendMessage: (text: string) => void,
  showBottomNavPadding?: boolean,
  onFocusChange?: (isFocused: boolean) => void,
  isReadOnly?: boolean
}) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Removed unnecessary blur on mount that could interfere with initial user interaction

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text.trim());
      setText('');
      inputRef.current?.blur();
    }
  };

  // With KeyboardResize.None, padding should be CONSTANT - transform handles keyboard
  // No padding changes = no flicker. Always include safe-area for home indicator.
  const footerPadding = showBottomNavPadding
    ? 'pb-[calc(70px+env(safe-area-inset-bottom,0px)+8px)] md:pb-[90px] pt-3'
    : 'pb-[calc(env(safe-area-inset-bottom,0px)+12px)] pt-2';

  if (isReadOnly) {
    return (
      <footer className={`px-3 py-4 md:p-4 bg-[#e5ddd5] shrink-0 text-center text-gray-500 text-sm italic ${showBottomNavPadding ? 'pb-[calc(70px+env(safe-area-inset-bottom,0px)+8px)]' : 'pb-safe'}`}>
        Solo gli amministratori possono scrivere qui.
      </footer>
    );
  }

  return (
    <footer className={`px-3 py-2 md:p-4 bg-[#e5ddd5] shrink-0 ${footerPadding}`}>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 md:gap-3 max-w-5xl mx-auto">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => onFocusChange?.(true)}
          onBlur={() => onFocusChange?.(false)}
          placeholder="Messaggio alla stanza..."
          className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base placeholder-gray-400"
          style={{ fontSize: '16px' }}
        />
        <button
          type="submit"
          className="p-2 flex items-center justify-center text-emerald-600 hover:text-emerald-700 active:scale-95 transition-transform"
          onMouseDown={(e) => e.preventDefault()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M19.4999 2.00098C20.0944 2.00063 20.6989 2.15072 21.2499 2.46875C22.924 3.43525 23.4977 5.57598 22.5312 7.25001L15.0311 20.2403C14.0646 21.9142 11.9238 22.488 10.2498 21.5215C9.41372 21.0387 8.85157 20.2605 8.61994 19.3975L7.1209 13.8028L15.8905 8.73927C16.3687 8.46311 16.5327 7.85126 16.2567 7.37306C15.9805 6.89505 15.3686 6.73096 14.8905 7.00685L6.12089 12.0713L2.02515 7.97462C0.658428 6.60771 0.658787 4.39204 2.02515 3.02539C2.65731 2.39319 3.53383 2.00021 4.49978 2L19.4999 2.00098Z" />
          </svg>
        </button>
      </form>
    </footer>
  );
});

const GlobalChat = memo<GlobalChatProps>(({
  user,
  messages,
  onSendMessage,
  onRemoveMessage,
  onlineCount,
  isOnline,
  hideHeader,
  headerTitle,
  showBottomNavPadding,
  onInputFocusChange,
  isFocused,
  isSyncing,
  isReadOnly,
  canModerate,
  onBack,
  showOnlineCount = true,
  keyboardContentStyle
}) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  // Synchronize scroll with keyboard opening
  useEffect(() => {
    if (isFocused && messages.length > 0) {
      // Use requestAnimationFrame to align with the layout change/keyboard animation
      const scroll = () => {
        virtuosoRef.current?.scrollToIndex({
          index: messages.length - 1,
          align: 'end',
          behavior: 'auto' // Instant to 'stick' to the rising keyboard
        });
      };

      requestAnimationFrame(scroll);
      // Double trigger to ensure it catches the end of the animation as well
      const timeout = setTimeout(scroll, 100);
      return () => clearTimeout(timeout);
    }
  }, [isFocused, messages.length]);

  const getAvatarColor = (gender: string) => {
    switch (gender) {
      case 'male': return 'bg-blue-500';
      case 'female': return 'bg-pink-500';
      default: return 'bg-purple-500';
    }
  };

  const renderMessage = useCallback((index: number, msg: Message) => {
    const isMe = msg.senderId === user.id;
    const showSenderInfo = index === 0 || messages[index - 1].senderId !== msg.senderId;

    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-message pb-4 px-4 group/msg`}>
        <div className={`flex flex-col max-w-[85%] ${isMe ? 'items-end' : 'items-start'}`}>
          {showSenderInfo && (
            <span className={`text-[10px] font-bold mb-1 px-2 uppercase tracking-tight flex items-center gap-1.5 ${isMe ? 'text-emerald-700' : 'text-gray-600'}`}>
              {!isMe && (
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${getAvatarColor(msg.senderGender)}`}>
                  <GenderIcon gender={msg.senderGender} className="w-2 h-2 text-white" />
                </div>
              )}
              {isMe ? 'Tu' : msg.senderAlias}
            </span>
          )}
          <div className="relative">
            <div className={`px-3 py-2 rounded-2xl shadow-sm ${isMe ? 'bg-emerald-500 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
              <p className="whitespace-pre-wrap break-words leading-relaxed text-[15px]">{msg.text}</p>
            </div>
            {canModerate && (
              <button
                onClick={() => onRemoveMessage?.(msg.id)}
                className={`absolute top-0 ${isMe ? '-left-8' : '-right-8'} p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover/msg:opacity-100 transition-opacity`}
                title="Elimina messaggio"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
          <span className="text-[9px] text-gray-400 px-1 mt-0.5 opacity-70">
            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  }, [user.id, messages, canModerate, onRemoveMessage]);

  return (
    <div className="w-full h-full flex flex-col bg-[#e5ddd5]">
      {!hideHeader && (
        <header className="bg-white pt-safe sticky top-0 z-10 shrink-0">
          <div className="h-[60px] px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {onBack && (
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-extrabold text-2xl text-gray-900 leading-tight tracking-tight">{headerTitle || 'Stanza'}</h2>
                {showOnlineCount && (
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">
                      {isOnline ? `${onlineCount} persone qui` : 'Disconnesso'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {isSyncing && (
              <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 animate-pulse">
                <svg className="animate-spin h-3 w-3 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-[10px] font-bold text-emerald-700 tracking-wide uppercase">Sincronizzazione</span>
              </div>
            )}
          </div>
        </header>
      )}

      {/* Content wrapper - this moves with keyboard, header stays fixed */}
      <div className="flex-1 flex flex-col overflow-hidden" style={keyboardContentStyle}>
        <div className="flex-1 overflow-hidden relative chat-bg">
          <Virtuoso
            ref={virtuosoRef}
            data={messages}
            initialTopMostItemIndex={messages.length - 1}
            itemContent={renderMessage}
            followOutput={true}
            className="h-full w-full"
            alignToBottom={true}
          />
        </div>

        <ChatInput
          onSendMessage={onSendMessage}
          showBottomNavPadding={showBottomNavPadding}
          onFocusChange={onInputFocusChange}
          isReadOnly={isReadOnly}
        />
      </div>
    </div>
  );
});

export default GlobalChat;
