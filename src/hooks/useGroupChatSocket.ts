import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

const WS_URL = import.meta.env.VITE_WEBSOCKET_URL || "http://localhost:4000";

export interface GroupChatMessage {
  userId: string;
  userName: string;
  message: string;
  roomId: string;
  timestamp: Date;
  isAI?: boolean;
}

export function useGroupChatSocket(token: string | null) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<GroupChatMessage[]>([]);

  useEffect(() => {
    if (!token) return;

    const socket = io(`${WS_URL}/chat`, {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    socket.on("connected", () => {
      setConnected(true);
    });

    socket.on("message", (payload: GroupChatMessage) => {
      setMessages((prev) => [...prev, payload]);
    });

    socket.on("ai-message", (payload: GroupChatMessage) => {
      setMessages((prev) => [...prev, payload]);
    });

    socket.on("user-joined", () => {
      // Optionally show join notification
    });

    socket.on("user-left", () => {
      // Optionally show leave notification
    });

    socket.on("error", (err: { message?: string }) => {
      console.error("Socket error:", err);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setConnected(false);
    };
  }, [token]);

  const joinRoom = useCallback(
    (roomId: string, userName: string) => {
      socketRef.current?.emit("join-room", { roomId, userName });
    },
    []
  );

  const leaveRoom = useCallback((roomId: string) => {
    socketRef.current?.emit("leave-room", { roomId });
  }, []);

  const sendMessage = useCallback(
    (
      roomId: string,
      message: string,
      options?: {
        groupChatId?: string;
        courseId?: string;
      }
    ) => {
      socketRef.current?.emit("send-message", {
        roomId,
        message,
        isGroupChat: !!options?.groupChatId,
        groupChatId: options?.groupChatId,
        courseId: options?.courseId,
      });
    },
    []
  );

  const setMessagesFromHistory = useCallback((msgs: GroupChatMessage[]) => {
    setMessages(msgs);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    connected,
    messages,
    setMessagesFromHistory,
    clearMessages,
    joinRoom,
    leaveRoom,
    sendMessage,
    socket: socketRef.current,
  };
}
