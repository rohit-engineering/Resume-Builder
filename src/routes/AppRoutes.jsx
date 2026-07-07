import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  lazy,
  Suspense,
} from "react";

import MainLayout from "../layouts/MainLayout";

const Home = lazy(() =>
  import("../pages/Home")
);

const CareerStage = lazy(() =>
  import("../pages/CareerStage")
);

const Templates = lazy(() =>
  import("../pages/Templates")
);

const Builder = lazy(() =>
  import("../pages/Builder")
);

const ATSChecker = lazy(() =>
  import("../pages/ATSChecker")
);

const Editor = lazy(() =>
  import("../pages/Editor")
);

const ThumbnailGenerator = lazy(() =>
  import("../pages/ThumbnailGenerator")
);

const PageTransition = ({
  children,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      duration: 0.2,
    }}
  >
    {children}
  </motion.div>
);

const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
  </div>
);

function AppRoutes() {
  const location = useLocation();

  return (
    <MainLayout>
      <Suspense
        fallback={<PageLoader />}
      >
        <AnimatePresence mode="wait">
          <Routes
            location={location}
            key={location.pathname}
          >
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />

            <Route
              path="/career-stage"
              element={
                <PageTransition>
                  <CareerStage />
                </PageTransition>
              }
            />

            <Route
              path="/templates"
              element={
                <PageTransition>
                  <Templates />
                </PageTransition>
              }
            />

            <Route
              path="/builder"
              element={
                <PageTransition>
                  <Builder />
                </PageTransition>
              }
            />

            <Route
              path="/editor"
              element={
                <PageTransition>
                  <Editor />
                </PageTransition>
              }
            />

            <Route
              path="/ats-checker"
              element={
                <PageTransition>
                  <ATSChecker />
                </PageTransition>
              }
            />

            <Route
              path="/thumbnail"
              element={
                <ThumbnailGenerator />
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </MainLayout>
  );
}

export default AppRoutes;