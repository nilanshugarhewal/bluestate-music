import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMPONENTS & LAYOUTS (Loaded immediately)
import Nav from "./layouts/Navbar/Navbar";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Footer from "./layouts/Footer/Footer";
import Loading from "./components/Loading/Loading";

// PAGES / ROUTES (Lazy Loaded)
const Home = lazy(() => import("./pages/Routes/home/Home"));
const Tracks = lazy(() => import("./pages/Routes/track/Tracks"));
const TrackInfo = lazy(() => import("./pages/Routes/show_track/TrackInfo"));
const Admin = lazy(() => import("./pages/admin/SecurityCheck"));
const EditBeat = lazy(() => import("./pages/CRUD/UpdatePage"));
const CreatePage = lazy(() => import("./pages/CRUD/CreatePage"));

// MAIN APP
const App = () => {
  return (
    <BrowserRouter>
      {/* ROUTES */}

      {/* LAYOUTS */}
      <Nav />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/tracks" element={<Tracks />}></Route>

          <Route path="/track/:id" element={<TrackInfo />}></Route>

          <Route path="/admin" element={<Admin />}></Route>

          <Route path="/edit/:id" element={<EditBeat />}></Route>

          <Route path="/create" element={<CreatePage />}></Route>
        </Routes>
      </Suspense>

      <Footer />

      <MusicPlayer />

      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
