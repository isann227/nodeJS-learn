import { Link } from "react-router-dom";
import { useYoutubeTrending } from "../hooks/useYoutube";
import { formatNumber } from "../utils/formatNumbers";
import { formatUpload } from "../utils/formatUpload";

export default function Home() {
  const { videos, loading } = useYoutubeTrending("ID", 12);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {videos.map((video) => (
        <Link
          key={video.id}
          to={`/youtube/watch/${video.id}`}
          className="border rounded-lg shadow hover:scale-105 transition overflow-hidden"
        >
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="w-full"
          />
          <div className="flex gap-2 p-2">
            <img
              src={video.channelThumbnail}
              alt={video.snippet.channelTitle}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-sm line-clamp-2 text-black">
                {video.snippet.title}
              </h3>
              <p className="text-xs text-gray-500">{video.snippet.channelTitle}</p>
              <p className="text-xs text-gray-400">
                {formatNumber(video.statistics.viewCount)} views •{" "}
                {formatUpload(video.snippet.publishedAt)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
