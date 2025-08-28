import { Routes, Route } from "react-router-dom"
import Layouts from "./layouts/layouts"

// contoh pages
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import CommentClass from "./pages/commentClass"
import Comment from "./pages/commentFunction"
import Unsplash from "./pages/Unsplash"
import Youtube from "./pages/Youtube"
import Player from "./pages/Player"
import Hooks from "./pages/Hokks"
import RealTimeClock from "./pages/ClockPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="commentClass" element={<CommentClass />} />
        <Route path="commentFunction" element={<Comment />} />
        <Route path="unsplash" element={<Unsplash />} />
        <Route path="youtube" element={<Youtube />} />
        <Route path="youtube/watch/:id" element={<Player />} />
        <Route path="hooks" element={<Hooks />} />
        <Route path="clock" element={<RealTimeClock />} />
      </Route>
    </Routes>
  )
}
