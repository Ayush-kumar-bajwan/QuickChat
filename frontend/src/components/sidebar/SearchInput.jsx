import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import {toast} from "react-hot-toast";
const SearchInput = () => {
	const [ search, setSearch] = useState("");
	const {conversations}  = useGetConversations();
	const {setSelectedConversation} = useConversation();

	const handleSubmit = (e)=>{
		e.preventDefault();
		if(!search) return;
		if(search.length <3) toast.error("search term must be atleast of length 3")
		const conversation = conversations.find((c)=>c.fullname.toLowerCase().includes(search.toLowerCase()));
		if(conversation){
			setSelectedConversation(conversation);
			setSearch("");
		}else{
			toast.error("No such user found")
		}
	}
	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				 <IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;