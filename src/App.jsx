import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { AuthProvider } from "./context/authContext";
import NotificationContainer from "./components/toastNotifier";

function App() {
  return (
    <Suspense fallback={<h1>Cargando...</h1>}>
    <NotificationContainer />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Suspense>
  );
}

export default App;
