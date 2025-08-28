import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatNumber } from "../utils/formatNumbers";
import { ThumbsUp, ThumbsDown, Share2, X, Copy } from "lucide-react";

export default function Player() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
          params: { part: "snippet,statistics", id, key: import.meta.env.VITE_YOUTUBE_API_KEY },
        });
        const videoData = res.data.items[0];
        setVideo(videoData);

        const channelRes = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
          params: { part: "snippet,statistics", id: videoData.snippet.channelId, key: import.meta.env.VITE_YOUTUBE_API_KEY },
        });
        setChannel(channelRes.data.items[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideo();
  }, [id]);

  // Tambahkan di bagian atas Player.jsx
const dummySuggest = [
  {
    id: "a1b2c3d4",
    title: "Belajar React untuk Pemula",
    channelTitle: "CodingID",
    thumbnail: "https://i.ytimg.com/vi/a1b2c3d4/mqdefault.jpg",
    views: 123456,
  },
  {
    id: "e5f6g7h8",
    title: "Tips JavaScript Modern",
    channelTitle: "JSChannel",
    thumbnail: "https://i.ytimg.com/vi/e5f6g7h8/mqdefault.jpg",
    views: 98765,
  },
  {
    id: "i9j0k1l2",
    title: "Tailwind CSS Crash Course",
    channelTitle: "Frontend Master",
    thumbnail: "https://i.ytimg.com/vi/i9j0k1l2/mqdefault.jpg",
    views: 54321,
  },
    {
    id: "oiuytrew",
    title: "Aku bermain game roblox",
    channelTitle: "Windah Basudara",
    thumbnail: "https://i.ytimg.com/vi/i9j0k1l2/mqdefault.jpg",
    views: 54321,
  },
    {
    id: "i9j0k1l2",
    title: "Tailwind CSS Crash Course",
    channelTitle: "Frontend Master",
    thumbnail: "https://i.ytimg.com/vi/i9j0k1l2/mqdefault.jpg",
    views: 54321,
  },
    {
    id: "i9j0k1l2",
    title: "Tailwind CSS Crash Course",
    channelTitle: "Frontend Master",
    thumbnail: "https://i.ytimg.com/vi/i9j0k1l2/mqdefault.jpg",
    views: 54321,
  },
    {
    id: "i9j0k1l2",
    title: "Tailwind CSS Crash Course",
    channelTitle: "Frontend Master",
    thumbnail: "https://i.ytimg.com/vi/i9j0k1l2/mqdefault.jpg",
    views: 54321,
  },
];

  if (!video || !channel) return <p className="p-4">Loading...</p>;

  const { snippet, statistics } = video;
  const videoUrl = window.location.href;

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };
  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(videoUrl);
    alert("Link berhasil disalin!");
  };

  return (
    <div className="p-6 flex justify-center gap-6">
      {/* Left: Video Player & Info */}
      <div className="flex-1 max-w-[900px]">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${id}`}
          title={snippet.title}
          style={{ border: "0" }}
          allowFullScreen
          className="rounded-lg shadow"
        ></iframe>

        <div className="mt-4">
          <h1 className="text-xl font-semibold">{snippet.title}</h1>

          {/* Channel Info */}
          <div className="flex items-start mt-2 justify-between">
            <div className="flex">
              <img
                src={channel.snippet.thumbnails.default.url}
                alt={channel.snippet.title}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div className="leading-tight">
                <p className="font-semibold text-gray-900">{channel.snippet.title}</p>
                <p className="text-sm text-gray-500">
                  {formatNumber(channel.statistics.subscriberCount)} subscribers
                </p>
              </div>
            </div>

            {/* Like, Dislike, Share */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
                  liked ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                }`}
              >
                <ThumbsUp size={18} /> {formatNumber(statistics.likeCount)}
              </button>

              <button
                onClick={handleDislike}
                className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
                  disliked ? "bg-red-500 text-white" : "hover:bg-gray-100"
                }`}
              >
                <ThumbsDown size={18} />
              </button>

              <button
                onClick={() => setIsShareOpen(true)}
                className="flex items-center gap-1 px-3 py-1 rounded-full border hover:bg-gray-100"
              >
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>

          {/* Views */}
          <div className="mt-3 text-gray-600 text-sm">
            {parseInt(statistics.viewCount).toLocaleString()} views
          </div>
        </div>
      </div>

      {/* Right: Suggested Videos */}
<div className="w-80 flex-shrink-0 space-y-3">
  {dummySuggest.map((v) => (
    <Link
      key={v.id}
      to={`/youtube/watch/${v.id}`}
      className="flex gap-2 hover:bg-gray-100 p-2 rounded"
    >
      <img
        src={v.thumbnail}
        alt={v.title}
        className="w-32 h-20 object-cover rounded"
      />
      <div className="flex flex-col justify-between text-sm">
        <p className="font-semibold line-clamp-2 text-gray-900">{v.title}</p>
        <p className="text-gray-500">{v.channelTitle}</p>
        <p className="text-gray-400">{formatNumber(v.views)} views</p>
      </div>
    </Link>
  ))}
</div>


      {/* Share Modal */}
      {isShareOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              onClick={() => setIsShareOpen(false)}
              className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded-full"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-3">Share</h2>
            <input
              type="text"
              readOnly
              value={videoUrl}
              className="w-full border rounded px-2 py-1 mb-3"
            />
            <Copy
              onClick={handleCopy}
              className="w-full bg-blue-500 text-white py-1 rounded mb-3 hover:bg-blue-600"
            >
              Copy link
            </Copy>

            <div className="flex justify-around">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(videoUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1"
              >
                <img src="/icons/WhatsApp.svg" alt="WA" className="w-6 h-6" />
                <span className="text-xs">WhatsApp</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1"
              >
                <img src="/icons/Twitter.svg" alt="X" className="w-6 h-6" />
                <span className="text-xs">X</span>
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(snippet.title)}&body=${encodeURIComponent(videoUrl)}`}
                className="flex flex-col items-center gap-1"
              >
                <img src="/icons/Mail.svg" alt="Email" className="w-6 h-6" />
                <span className="text-xs">Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
