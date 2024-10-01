import { useEffect, useState } from "react";
import LayoutPage from "../Layout/LayoutPage"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlane } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export const Messages = () => {
    const [messages, setMessages] = useState([]);
    const isAuth = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${isAuth}`
            await axios.post(`${import.meta.env.VITE_REACT_API_URL}/messages`, {
                receiver_id: 6,
                message: message
            }).then((response) =>{
                console.log(response.data);
                setMessage("");
                getMessages();
            })
        } catch (error) {
           setError(error);
        }
    }
    const getMessages = async () =>{
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${isAuth}`
            await axios.get(`${import.meta.env.VITE_REACT_API_URL}/user/messages`).then((response) =>{
                setMessages(Object.values(response.data.data));
            })
        } catch (error) {
           if(error.response.status === 401 || error){
            localStorage.removeItem('token');
            navigate("/", { replace: true });
           }
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            getMessages();
        }, 5000); // Mengambil pesan setiap 5 detik
    
        return () => clearInterval(intervalId);
    }, [messages]);
    
    return (
        <LayoutPage>
        <div className="w-full min-h-[80vh] flex flex-col justify-between rounded-lg bg-white">
            <div className="w-full p-3">
            {loading ? (
                        <div className="flex min-h-[70vh] justify-center items-center">
                            <span className="loading loading-ring loading-lg"></span>
                            <p className="ml-2">Loading messages...</p>
                        </div> // Indikator loading
                    ) : error ? (
                        <p>Error loading messages: {error.message}</p> // Tampilkan error jika ada
                    ) : messages.length > 0 ? (
                        messages.map((message) => (
                            <div key={message.id} className={message.sender_id === 4 ? "chat chat-start" : "chat chat-end"}>
                                <div className="chat-bubble">
                                    {message.message}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No messages found.</p>
                    )}
            {/* <div className="chat chat-start">
                <div className="chat-bubble">
                Hi, how are you?
                </div>
            </div>
            <div className="chat chat-end">
                <div className="chat-bubble">You underestimate my power!</div>
            </div> */}
            
            
            </div>
            <div className="">
                <form onSubmit={handleSendMessage} method="post">
                <div className="relative p-2">
                <label className="p-3 sr-only"> Message </label>
                    <input
                        type="text"
                        id="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type Here..."
                        className="w-full p-2 py-3 border-gray-200 rounded-md shadow-sm pe-10 sm:text-sm"
                    />
                    <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
                        <button type="submit" className="text-gray-600 hover:text-gray-700">
                        <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </span>
                </div>
                </form>
            </div>
        </div>
        </LayoutPage>
    )
}