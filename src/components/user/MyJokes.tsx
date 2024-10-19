import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

interface Creator {
    _id: string;    // Unique identifier for the creator
    name: string;   // Name of the creator
    email: string;  // Email of the creator
    role: string;   // Role of the creator
    createdAt: string;  // Creation date
    updatedAt: string;  // Update date
}

interface Joke {
    _id: string;          // Assuming you have an _id field from MongoDB
    joke: string;         // The joke text
    impressed: number;    // Number of impressions
    unimpressed: number;  // Number of unimpressed reactions
    displeased: number;   // Number of displeased reactions
    creator: Creator;   // Update to reflect the creator as an object
    createdAt: string;     // Date the joke was created
}

const MyJokes = () => {
    const [jokes, setJokes] = useState([]);
    const userContext = useContext(UserContext);
    const user = userContext?.user;

    const fetchJokes = async () => {
        const response = await axios.get(`http://localhost:5000/api/jokes/${user?._id}`);
        console.log(response.data)
        setJokes(response.data);
    };

    useEffect(() => {
        if (user) {
            fetchJokes();
        }
    }, [user]);

    return (
        <section>
            {jokes.length > 0 ? (
                jokes.map((joke: Joke) => (
                    <Card key={joke._id} sx={{ maxWidth: '100%', margin: '1rem auto' }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {joke.creator ? joke.creator.name.charAt(0).toUpperCase() : '?'} {/* Display first letter of creator's name or '?' if not available */}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={`${joke.creator ? joke.creator.name : 'Somebody in the Universe'}`} // Use the creator's name or 'Somebody in the Universe'
                            subheader={new Date(joke.createdAt).toLocaleDateString()} // Display created date
                        />
                        <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {joke.joke} {/* Display the joke text */}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <IconButton aria-label="Like">
                                <SentimentVerySatisfiedIcon /> {joke.impressed}
                            </IconButton>
                            <IconButton aria-label="Neutral">
                                <SentimentNeutralIcon /> {joke.unimpressed}
                            </IconButton>
                            <IconButton aria-label="Dislike">
                                <SentimentVeryDissatisfiedIcon /> {joke.displeased}
                            </IconButton>
                            <IconButton aria-label="Favorite">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))
            ) : (
                <p>No jokes available.</p>
            )}

        </section>
    );
}

export default MyJokes;