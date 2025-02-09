import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import NotificationContainer from "./components/toastNotifier";

function App() {
  return (
    <Suspense fallback={<h1>Cargando...</h1>}>
      <NotificationContainer />
      <AuthProvider>
        <EmployeeProvider>
          <RouterProvider router={router} />
        </EmployeeProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
