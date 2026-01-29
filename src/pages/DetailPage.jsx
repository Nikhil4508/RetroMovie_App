
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import Divider from "../components/Divider";

const DetailPage = () => {
  const params = useParams();
  // OMDb: Use ?i=imdbID for details
  const { data } = useFetchDetails(`/?i=${params?.id}`);

  return (
    <div className="">
      <div className="w-full h-[360px] relative hidden lg:block">
        <div className="w-full h-full ">
          <img
            src={
              data?.Poster && data?.Poster !== "N/A"
                ? data.Poster
                : "/no-image.png"
            }
            alt={data?.Title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-800/95 to-transparent "></div>
      </div>

      <div className="container mx-auto px-6 py-16 lg:py-0 mt-4 flex flex-col lg:flex-row lg:gap-10 gap-6">
        <div className="lg:-mt-36 mx-auto lg:mx-0 w-fit relative">
          <img
            src={
              data?.Poster && data?.Poster !== "N/A"
                ? data.Poster
                : "/no-image.png"
            }
            alt={data?.Title}
            className="w-80 max-w-[240px] h-96 object-cover rounded-md"
          />
        </div>

        <div>
          <h1 className="text-white text-3xl lg:text-5xl font-bold mb-1">
            {data?.Title}
          </h1>
          <p className="text-neutral-500 text-md">{data?.Genre}</p>

          <Divider />

          <div className="flex items-center gap-3 text-center">
            <p>Rating : {data?.imdbRating || "N/A"}</p>
            <span>|</span>
            <p>Year : {data?.Year || "N/A"}</p>
            <span>|</span>
            <p>Duration : {data?.Runtime || "N/A"}</p>
          </div>

          <Divider />

          <div className="">
            <h2 className="text-white font-bold text-xl mb-1">Overview</h2>
            <p>{data?.Plot}</p>

            <Divider />

            <div className="flex gap-3 text-center">
              <p>Released: {data?.Released}</p>
              <span>|</span>
              <p>Language: {data?.Language}</p>
              <span>|</span>
              <p>Country: {data?.Country}</p>
            </div>

            <Divider />
          </div>

          <div className="">
            <p>
              <span className="text-white">Director</span> : {data?.Director}
            </p>
            <Divider />
            <p>
              <span className="text-white">Writer</span> : {data?.Writer}
            </p>
            <Divider />
            <p>
              <span className="text-white">Cast</span> : {data?.Actors}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
