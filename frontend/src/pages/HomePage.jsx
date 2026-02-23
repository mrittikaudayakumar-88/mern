import { useState, useEffect} from "react";
import NavBar from "../components/NavBar";
import RateLimiterui from "../components/RateLimiterui";
import api from "../lib/axios";
import toast from "react-hot-toast";  
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]); // always array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/");

        console.log(res.data);

        setNotes(res.data);

        setIsRateLimited(false);
      } catch (error) {

        console.log("Error fetching notes");
        console.log(error.response);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />

      {isRateLimited && <RateLimiterui />}

      <div className="max-w-7xl mx-auto px-4 mt-6">

        {loading && (
           <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && (
          <NotesNotFound />
        )}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
               key={note._id}
                note={note}
                setNotes={setNotes} />
            ))}
          </div>
        )}

       
          </div>
        </div>
        );
      };
      
export default HomePage;