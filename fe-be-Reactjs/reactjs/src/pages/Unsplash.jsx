import { useEffect, useState, createRef } from "react";
import unsplash from "../lib/unsplash";

export default function UnsplashSearch() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const imgRefs = photos.map(() => createRef()); // buat refs per image

  const fetchRandomPhotos = async () => {
    try {
      const res = await unsplash.get("/photos/random", { params: { count: 5 } });
      setPhotos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const searchPhotos = async (q) => {
    try {
      const res = await unsplash.get("/search/photos", {
        params: { query: q, per_page: 20 },
      });
      setPhotos(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRandomPhotos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      fetchRandomPhotos();
    } else {
      searchPhotos(query);
    }
  };

  return (
    <div className="text-center mt-5">
      <h2 className="text-xl font-bold mb-4">Foto Unsplash</h2>

      <form onSubmit={handleSubmit} className="mb-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari gambar..."
          className="border px-3 py-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Cari
        </button>
      </form>

      {/* pakai CSS masonry layout biar grid auto sesuai aspect ratio */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 px-5">
        {photos.map((p, i) => (
          <div
            key={p.id}
            className="mb-4 break-inside-avoid shadow rounded-lg overflow-hidden"
          >
            <img
              ref={imgRefs[i]}
              src={p.urls.small}
              alt={p.alt_description}
              className="w-full h-auto object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
