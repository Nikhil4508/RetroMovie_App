import React from 'react'

const AboutPage = () => {
  return (
    <div className='py-20 px-6 min-h-[90vh] container mx-auto'>
      <h1 className='text-4xl font-bold text-white mb-6'>About RetroMovie</h1>
      
      <div className='text-neutral-300 space-y-4 max-w-3xl'>
        <p className='text-lg'>
          Welcome to <span className='text-white font-semibold'>RetroMovie</span>, your ultimate destination for discovering and exploring the world of movies and TV shows.
        </p>
        
        <h2 className='text-2xl font-bold text-white mt-8 mb-3'>Our Mission</h2>
        <p>
          Our mission is to provide movie and TV show enthusiasts with a comprehensive platform to explore, discover, and get detailed information about their favorite entertainment content.
        </p>
        
        <h2 className='text-2xl font-bold text-white mt-8 mb-3'>What We Offer</h2>
        <ul className='list-disc list-inside space-y-2'>
          <li>Browse trending movies and TV shows</li>
          <li>Discover now playing and top-rated content</li>
          <li>Search across our extensive database</li>
          <li>View detailed information about cast, crew, and ratings</li>
          <li>Watch trailers and similar content recommendations</li>
        </ul>
        
        <h2 className='text-2xl font-bold text-white mt-8 mb-3'>Data Source</h2>
        <p>
          RetroMovie is powered by <span className='text-white font-semibold'>The Open Movie Database (OMDB)</span> API, ensuring we provide you with accurate information about movies and TV shows worldwide.
        </p>
        
        <h2 className='text-2xl font-bold text-white mt-8 mb-3'>Contact Us</h2>
        <p>
          Have questions or feedback? We'd love to hear from you! Visit our contact page to get in touch with our team.
        </p>
      </div>
    </div>
  )
}

export default AboutPage