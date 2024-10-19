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
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Creator {
    _id: string;    // Unique identifier for the creator
    name: string;   // Name of the creator
    email: string;  // Email of the creator
    role: string;   // Role of the creator
}

interface Joke {
    _id: string;          // Unique identifier for the joke
    joke: string;         // The joke text
    impressed: number;    // Number of impressed reactions
    unimpressed: number;  // Number of unimpressed reactions
    displeased: number;   // Number of displeased reactions
    creatorId: string;    // ID of the creator
    createdAt: string;    // Date the joke was created
}

const Joke = () => {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [creator, setCreator] = useState<Creator | null>(null); // State for the creator
    const { id } = useParams();

    const fetchJoke = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/joke/${id}`);
            setJoke(response.data);
            // Fetch creator details using creatorId
            const creatorResponse = await axios.get(`http://localhost:5000/api/creator/${response.data.creatorId}`);
            setCreator(creatorResponse.data);
        } catch (error) {
            console.error("Error fetching joke", error);
        }
    };

    useEffect(() => {
        fetchJoke();
    }, [id]);

    if (!joke || !creator) {
        return <p>Joke or creator not available.</p>;
    }

    return (
        <section>
            <Card key={joke._id} sx={{ maxWidth: '50%', margin: '1rem auto' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {creator.name.charAt(0).toUpperCase()} {/* Display first letter of creator's name */}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={`Created by: ${creator.name}`} // Use the creator's name
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
        </section>
    );
}

export default Joke;
