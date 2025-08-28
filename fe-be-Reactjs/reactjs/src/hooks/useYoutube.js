import { useEffect, useState } from "react";
import youtube from "../lib/youtube";

export function useYoutubeTrending(region = "ID", maxResults = 12) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        // ambil trending video
        const res = await youtube.get("/videos", {
          params: {
            part: "snippet,statistics,contentDetails",
            chart: "mostPopular",
            maxResults,
            regionCode: region,
          },
        });
        const videoItems = res.data.items;

        // ambil channelId unik
        const channelIds = videoItems.map((v) => v.snippet.channelId).join(",");

        // ambil data channel
        const channelRes = await youtube.get("/channels", {
          params: { part: "snippet", id: channelIds },
        });

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
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [region, maxResults]);

  return { videos, loading, error };
}
