
import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { User, Message, Gender } from '../types';

interface ChatRoomProps {
  user: User;
  onLogout: () => void;
}

const STORAGE_KEY = 'quickchat_fallback_msgs';

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

/**
 * Componente Input totalmente incontrollato.
 * Usiamo useRef invece di useState per il valore del testo.
 * In questo modo React non tocca MAI l'attributo 'value' del DOM dopo il primo render,
 * impedendo al browser (soprattutto su iOS/Safari) di triggerare focus automatici
 * o aperture della tastiera indesiderate durante i re-render del genitore.
 */
const ChatInput = memo(({ onSendMessage }: { onSendMessage: (text: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Safeguard: forza il blur al montaggio per evitare che iOS apra la tastiera
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      const val = inputRef.current.value.trim();
      if (val) {
        onSendMessage(val);
        inputRef.current.value = '';
        // Non forziamo il focus dopo l'invio per evitare glitch su alcuni browser mobile
      }
    }
  };

  return (
    <footer className="p-3 md:p-4 bg-gray-50 border-t border-gray-200 shrink-0 pb-safe">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 md:gap-3 max-w-5xl mx-auto">
        <input
          ref={inputRef}
          type="text"
          id="main-chat-message-input"
          name="chat_message"
          autoFocus={false}
          autoComplete="off"
          inputMode="text"
          enterKeyHint="send"
          placeholder="Scrivi un messaggio..."
          className="flex-1 px-4 py-2.5 md:px-5 md:py-3 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-gray-800 shadow-sm"
          style={{ fontSize: '16px' }}
        />
        <button
          type="submit"
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-md active:scale-95 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </footer>
  );
});

const ChatRoom: React.FC<ChatRoomProps> = ({ user, onLogout }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeUsersCount, setActiveUsersCount] = useState(1);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'local'>('online');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isAtBottom = useRef(true);
  const lastMessageIdRef = useRef<string | null>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      isAtBottom.current = scrollHeight - scrollTop - clientHeight < 100;
    }
  };

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      // Usiamo requestAnimationFrame per assicurarci che lo scroll avvenga 
      // dopo che il DOM è stato effettivamente aggiornato e stabilizzato.
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
      });
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    if (document.visibilityState !== 'visible') return;

    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data: Message[] = await res.json();
        const lastMsg = data[data.length - 1];

        // Aggiorna lo stato solo se l'ID dell'ultimo messaggio è cambiato
        if (lastMsg?.id !== lastMessageIdRef.current) {
          setMessages(data);
          lastMessageIdRef.current = lastMsg?.id || null;
        }
        setConnectionStatus(prev => prev !== 'online' ? 'online' : prev);
      }
    } catch (err) {
      setConnectionStatus(prev => prev !== 'local' ? 'local' : prev);
    }
  }, []);

  const syncPresence = useCallback(async () => {
    if (document.visibilityState !== 'visible') return;
    try {
      const res = await fetch('/api/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, alias: user.alias })
      });
      if (res.ok) {
        const { activeCount } = await res.json();
        setActiveUsersCount(activeCount);
      }
    } catch (err) { }
  }, [user.id, user.alias]);

  useEffect(() => {
    fetchMessages();
    syncPresence();
    const msgInterval = setInterval(fetchMessages, 3000);
    const presenceInterval = setInterval(syncPresence, 10000);
    return () => {
      clearInterval(msgInterval);
      clearInterval(presenceInterval);
    };
  }, [fetchMessages, syncPresence]);

  useEffect(() => {
    if (isAtBottom.current) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(async (text: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: user.id,
      senderAlias: user.alias,
      senderGender: user.gender,
      text,
      timestamp: Date.now(),
    };

    isAtBottom.current = true;
    setMessages(prev => {
      const updated = [...prev, newMessage];
      lastMessageIdRef.current = newMessage.id;
      return updated;
    });

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      });
    } catch (err) {
      setConnectionStatus('local');
    }
  }, [user.id, user.alias, user.gender]);

  const getAvatarColor = (gender: string) => {
    switch (gender) {
      case 'male': return 'bg-blue-500';
      case 'female': return 'bg-pink-500';
      default: return 'bg-purple-500';
    }
  };

  return (
    <div className="w-full h-full max-w-4xl bg-white flex flex-col md:rounded-2xl overflow-hidden md:my-4 border border-gray-200">
      <header className="bg-emerald-600 pt-safe text-white shadow-md z-10 shrink-0">
        <div className="p-3 md:p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">Salotto Pubblico</h2>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${connectionStatus === 'online' ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                <p className="text-[10px] text-emerald-100 uppercase font-bold">
                  {connectionStatus === 'online' ? `${activeUsersCount} online` : 'Offline'}
                </p>
              </div>
            </div>
          </div>
          <button onClick={onLogout} className="p-2 rounded-full hover:bg-emerald-700 transition-colors text-emerald-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      <main
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 chat-bg"
      >
        {messages.map((msg, index) => {
          const isMe = msg.senderId === user.id;
          const showSenderInfo = index === 0 || messages[index - 1].senderId !== msg.senderId;

          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-message`}>
              <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
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
                <div className={`px-3 py-2 rounded-2xl shadow-sm ${isMe ? 'bg-emerald-500 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                  <p className="whitespace-pre-wrap break-words leading-relaxed text-[15px]">{msg.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;
