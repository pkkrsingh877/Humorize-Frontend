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

interface Joke {
    _id: string;  // Assuming you have an _id field from MongoDB
    joke: string;
    impressed: number;
    unimpressed: number;
    displeased: number;
    creatorId: string;  // Assuming the creatorId is a string
    createdAt: string;  // Assuming createdAt is returned as a string
}

const Jokes = () => {
    const [jokes, setJokes] = useState([]);

    const fetchJokes = async () => {
        const response = await axios.get('http://localhost:5000/api/jokes/');
        setJokes(response.data);
    };

    useEffect(() => {
        fetchJokes();
    }, []);

    return (
        <section>
            {jokes.length > 0 ? (
                jokes.map((joke: Joke) => (
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
                ))
            ) : (
                <p>No jokes available.</p>
            )}
        </section>
    );
}

export default Jokes;