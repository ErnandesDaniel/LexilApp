'use client'

import {useRef, useLayoutEffect} from 'react';
import '@/modules/chats/components/textarea/index.scss';

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  isSendDisabled?: boolean;
  className?: string;
}

const Textarea= ({
  value,
  onChange,
  onSend,
  placeholder = 'Type your message here...',
  disabled = false,
  isSendDisabled = false
}:TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  useLayoutEffect(() => {
    if (textareaRef.current) {
      // Reset height to get correct scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set height to scrollHeight (content height) but not exceeding max-height
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 230; // Same as CSS max-height
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [value]);

  return (
    <div className='message_input_container'>
      <textarea
        name='message_input_area'
        ref={textareaRef}
        className='message_input_area'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <div className='message_input_action_bar'>
          <button
              className="send_button"
              onClick={onSend}
              disabled={isSendDisabled || disabled}
              aria-label="Send message"
          >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
          </button>

      </div>
    </div>
  );
};

export default Textarea;
