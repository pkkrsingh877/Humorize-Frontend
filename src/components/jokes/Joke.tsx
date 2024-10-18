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

interface Joke {
    _id: string;  // Assuming you have an _id field from MongoDB
    joke: string;
    impressed: number;
    unimpressed: number;
    displeased: number;
    creatorId: string;  // Assuming the creatorId is a string
    createdAt: string;  // Assuming createdAt is returned as a string
}

const Joke = () => {
    const [joke, setJoke] = useState<Joke | null>(null); // Use null for an initial empty state
    const { id } = useParams();

    const fetchJoke = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/joke/${id}`);
            setJoke(response.data);
        } catch (error) {
            console.error("Error fetching joke", error);
        }
    };

    useEffect(() => {
        fetchJoke();
    }, [id]);

    if (!joke) {
        return <p>Joke not available.</p>;
    }

    return (
        <section>
            <Card key={joke._id} sx={{ maxWidth: '50%', margin: '1rem auto' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {joke.creatorId.charAt(0).toUpperCase()} {/* Display first letter of creator */}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={`Created by: ${joke.creatorId}`} // Adjust title based on data
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
