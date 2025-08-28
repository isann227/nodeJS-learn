import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import youtube from "../lib/youtube";
import { formatNumber } from "../utils/formatNumbers";
import { formatUpload } from "../utils/formatUpload";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        // ambil trending video Indonesia
        const res = await youtube.get("/videos", {
          params: {
            part: "snippet,statistics,contentDetails",
            chart: "mostPopular",
            maxResults: 12,
            regionCode: "ID",
          },
        });

        const videoItems = res.data.items;

        // ambil semua channelId unik
        const channelIds = videoItems.map((v) => v.snippet.channelId).join(",");

        // ambil data channel (buat foto profil)
        const channelRes = await youtube.get("/channels", {
          params: {
            part: "snippet",
            id: channelIds,
          },
        });

        // bikin map channelId -> thumbnail
        const channelMap = {};
        channelRes.data.items.forEach((ch) => {
          channelMap[ch.id] = ch.snippet.thumbnails.default.url;
        });

        // gabungkan channel thumbnail ke video
        const merged = videoItems.map((v) => ({
          ...v,
          channelThumbnail: channelMap[v.snippet.channelId],
        }));

        setVideos(merged);
      } catch (err) {
        console.error(err);
      }
    }

    fetchVideos();
  }, []);

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
            {/* foto profil channel */}
            <img
              src={video.channelThumbnail}
              alt={video.snippet.channelTitle}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-sm line-clamp-2 text-black">
                {video.snippet.title}
              </h3>
              <p className="text-xs text-gray-500">
                {video.snippet.channelTitle}
              </p>
              <p className="text-xs text-gray-400">
                {formatNumber(video.statistics.viewCount).toLocaleString()} views •{" "}
                {formatUpload(video.snippet.publishedAt)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
