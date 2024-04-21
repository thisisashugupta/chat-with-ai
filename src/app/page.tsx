// a client chat component that shows a list of chat messages and provides a user message input.
'use client';
 
import { useChat } from 'ai/react';
 
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}
 
      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

/**
This component utilizes the useChat hook, which will, by default, use the POST route handler we created earlier. The hook provides functions and state for handling user input and form submission. The useChat hook provides multiple utility functions and state variables:

messages - The current chat messages, an array of objects with id, role, and content properties (among others).
input - This is the current value of the user's input field.
handleInputChange and handleSubmit - These functions handle user interactions such as typing into the input field and submitting the form, respectively.
isLoading This boolean indicates whether the API request is in progress or not.

 */