import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { CategoriaBar } from "./components/CategoriaBar";
import { MainBanner } from "./components/MainBanner";
import { Login } from "./components/Login";
import { Registro } from "./components/Registro";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <CategoriaBar />
                <main className="container mx-auto max-w-[1400px] px-4 pb-20">
                  <MainBanner />
                  <section className="mt-12">
                    <div className="flex items-center gap-2 mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Aqui pondre los productos
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10"></div>
                  </section>
                </main>
              </>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
