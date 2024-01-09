import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import Main from "components/layout/Main";
import Banner from "components/banner/Banner";
// import HomePage from "pages/HomePage";
// import MovieDetailsPage from "pages/MovieDetailsPage";
// import MoviePage from "pages/MoviePage";

// dynamic import
const HomePage = lazy(() => import("./pages/HomePage"));
// const MoviePage = lazy(() => import("./pages/MoviePage"));
const MoviePageV2 = lazy(() => import("./pages/MoviePageV2"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            {/* <Route path="/movie" element={<MoviePage></MoviePage>}></Route> */}
            <Route path="/movie" element={<MoviePageV2></MoviePageV2>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
    //
  );
}

export default App;
