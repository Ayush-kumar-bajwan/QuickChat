import {useAuthContext} from "../../context/AuthContext"
import useConversation from "../../zustand/useConversation";
import {extractTime} from "../../utils/extractTime"

const Message = ({message}) => {

  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatBubbleClr = fromMe? "bg-blue-500" : "bg-gray-400";
  const chatClassName = fromMe? "chat-end" : "chat-start";
  const chatProfile = fromMe? authUser.profilePic : selectedConversation.profilePic;
  const chatName = fromMe? "You" : selectedConversation.fullname;
  const formattedTime = extractTime(message.createdAt);
  return (
    <>
 
<div className={`chat  ${chatClassName}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src={chatProfile} />
    </div>
  </div>
  <div className="chat-header">
    {chatName}
  </div>
  <div className={`chat-bubble ${chatBubbleClr} text-white flex flex-col`}>{message.message}
  <div><time className="text-xs opacity-50  float-end">{formattedTime}</time></div>
  </div>
</div></>
  )
}

export default Message