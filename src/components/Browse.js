import React from 'react';
import Banner from './Banner';
import Navbar from './Navbar';
import Footer from './Footer';
import Row from './Row';
import "../css/Browse.css"
import {useLocation} from 'react-router-dom'

function Browse() {
    const {state} = useLocation()

    return (
        <div className="browse__wrapper">
            <Navbar />
            <Banner />
            <Row title="Trending Now" profileId={state?state.profileId:""}/>
            <Row title="Netflix originals" isLargeRow isNetflixOriginals={true} profileId={state?state.profileId:""}/>
            <Row title="Comedy" genre="comedy" profileId={state?state.profileId:""}/>
            <Row title="Fantasy" genre="fantasy"profileId={state?state.profileId:""}/>
            <Footer backColor="black" />
        </div>
    )
}

export default Browse;
