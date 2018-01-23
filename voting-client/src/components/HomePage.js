import React, {Component} from 'react';
import  {Link} from 'react-router-dom';



const HomePage = ()=> (
  <div className='homepage-full'>
    <div id='homepage-main-div'>
    <h1 id='homepage-main-header'>Pollzter</h1>
    <h3 id='homepage-main-tagline'> Find Insight Anywhere</h3>
    <div id='homepage-main-text'>Pollzter is a service that allows businesses, indivduals, and users to receive direct insight and feedback through polling that can be shared anywhere with one simple link.</div>
    </div>
    <div className='homepage-second-block'>
    <div id='homepage-login' className='hompage-links-div'>
    <Link className='hompage-links' to='/login'>Login</Link>
    </div>
    <div id='homepage-register' className='hompage-links-div'>
    <Link className='hompage-links' to='/register'>Sign Up</Link>
    </div>
    </div>
    <div className ='homepage-third-block'>
      <h2 id='homepage-third-header'>How it Works</h2>
      <p id='homepage-third-text'>
          <div className='homepage-third-div'>
            <em>1.</em>
            <p></p>
            <div className='homepage-third-text-text'>
            Sign up for a free Pollzter account
            </div>
          </div>
          <div className='homepage-third-div'>
           <em>2.</em>
           <p></p>
           <div className='homepage-third-text-text'>
           Create  unlimited single answer polls for free
           </div>
          </div>
          <div className='homepage-third-div'>
          <em>3.</em>
          <p></p>
          <div className='homepage-third-text-text'>
        Share polls anywhere with a simple link
        </div>
          </div>
          <div className='homepage-third-div'>
          <em>4.</em>
          <p></p>
          <div className='homepage-third-text-text'>
        Track all your polls with our costume designed dashboard
        </div>
          </div>

      </p>


    </div>

  </div>


)


export default HomePage;
