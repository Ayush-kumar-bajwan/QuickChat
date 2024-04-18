import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';
import notificationSound from "../assets/sound/message-incoming-2-199577.mp3"


const useListenMessage = () => {
const {socket} = useSocketContext();
const {messages, setMessages} = useConversation();

useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
        const sound  = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage]);
    });

    return ()=> socket?.off("newMEssage");
},[socket, messages ,setMessages]);
}

export default useListenMessage