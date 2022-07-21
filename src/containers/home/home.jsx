import React from 'react'
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import barsIcon from "../../assets/icons/bars.svg";
import organizerIcon from "../../assets/icons/organizer.svg";
import Button from '@mui/material/Button';
import ArtistList from '../../components/artist-list/artist-list';

const Home = () => {
    return (
        <Container maxWidth="xl">
            <Box className={classess.page}> 
                <Box className={classess.page__title_bar}>
                    <Typography variant="h5" gutterBottom component="div" className={classess.page__title_bar__title}>Trending</Typography>
                    <Box className={classess.page__title_bar__icons}>
                        <img src={organizerIcon} alt="organizer icon" />
                        <img src={barsIcon} alt="bars icons" />
                    </Box>
                </Box>
                <Box variant="div" component="div" className={classess.page__banner}>
                    <Typography variant="h5" gutterBottom component="div" className={classess.page__banner__title}>Playlist</Typography>
                    <Box className={classess.page__banner__content}>
                        <Box>
                            <Typography variant="h3" fontWeight="bolder" gutterBottom component="div" sx={{ margin: 0 }} className={classess.page__banner__content__title}>Top Songs <br /> Of The Week</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" gutterBottom component="div" className={classess.page__banner__content__description}>
                                Lorem ipsum dolor sit amet, consec tetur, adipisicing elit, laborum iste praesentium cupiditate ea! delectus optio iste voluptatem magnam, laudantium unde adipisci eos.
                            </Typography>
                        </Box>
                        <Box>
                        <Button variant="contained" sx={{ background: '#1A1A1A !important' }}>Trending Now</Button>
                        </Box>
                    </Box>
                </Box>
                <ArtistList />
            </Box >
        </Container>
    )
}

export default Home;