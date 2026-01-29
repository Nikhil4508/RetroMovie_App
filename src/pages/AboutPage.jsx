import React from "react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 pt-24 pb-16 text-white">
      <h1 className="text-3xl font-bold mb-4">About RetroMovie</h1>
      <p className="text-lg mb-6">
        RetroMovie is your ultimate destination for exploring movies and TV
        shows from various genres and eras. Whether you're looking for the
        latest releases or timeless classics, RetroMovie provides a seamless
        experience to discover and enjoy your favorite entertainment.
      </p>
      <p className="text-lg mb-6">
        Our platform is designed to bring together movie enthusiasts and TV show
        lovers, offering curated lists, trending content, and detailed
        information about your favorite titles. Dive into the world of
        entertainment and explore the magic of storytelling with RetroMovie.
      </p>
      <p className="text-lg">
        Created by <span className="text-orange-400 hover:underline">Nikhil Rathod</span>, RetroMovie is built with passion and
        dedication to provide users with an engaging and user-friendly
        experience. Thank you for being a part of our journey!
      </p>
    </div>
  );
};

export default AboutPage;
