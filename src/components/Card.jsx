import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
  // OMDb: Use imdbID for routing, Poster for image, Title for name
  const mediaType = media_type || "movie";

  // OMDb: Use Year for date, imdbRating for rating
  const year = data?.Year || "N/A";
  const rating =
    data?.imdbRating && data.imdbRating !== "N/A" ? data.imdbRating : "N/A";

  return (
    <Link
      to={`/${mediaType}/${data.imdbID}`}
      className="w-full min-w-[240px] max-w-[240px] h-80 overflow-hidden rounded-md block relative hover:scale-105 duration-300"
    >
      {data?.Poster && data.Poster !== "N/A" ? (
        <img
          src={data.Poster}
          alt={data?.Title || "Poster"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/no-image.png";
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-neutral-700">
          no image found
        </div>
      )}

      <div className="absolute top-3 ">
        {trending && (
          <div className="py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden">
            #{index} Trending
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full h-16 p-2 backdrop-blur-3xl bg-black/65 ">
        <h1 className="text-lg text-ellipsis line-clamp-1 font-bold">
          {data?.Title || "No Title"}
        </h1>

        <div className="text-sm text-neutral-500 flex items-center justify-between">
          <p>{year}</p>
          <p className="bg-black rounded-full px-1 text-sm text-white">
            Rating: {rating}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
