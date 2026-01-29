import React from "react";

const ContactPage = () => {
  return (
    <div className="container mx-auto px-6 py-24 text-white">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6 text-lg">
        Have questions, feedback, or suggestions about RetroMovie? We'd love to hear from you!
      </p>
      <div className="bg-neutral-800 rounded-lg p-6 max-w-lg">
        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <ul className="mb-4 text-lg">
          <li>
            <span className="font-semibold">Email:</span>{" "}
            <a href="mailto:support@retromovie.com" className="text-orange-400 hover:underline">
              support@retromovie.com
            </a>
          </li>
          <li>
            <span className="font-semibold">Twitter:</span>{" "}
            <a href="https://twitter.com/retromovie" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
              @retromovie
            </a>
          </li>
        </ul>
        <p className="text-lg">
          This site uses the <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">OMDb API</a> for all movie and TV show data.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
