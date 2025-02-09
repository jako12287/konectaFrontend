import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import NotificationContainer from "./components/toastNotifier";
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import { RegisterProvider } from "./context/RegisterContext";
import { RequestProvider } from "./context/RequestContext";
import { RequestCreateProvider } from "./context/RequestCreateContext";

function App() {
  return (
    <Suspense fallback={<h1>Cargando...</h1>}>
      <NotificationContainer />
      <AuthProvider>
        <EmployeeProvider>
          <RegisterProvider>
            <RequestProvider>
              <RequestCreateProvider>
              <RouterProvider router={router} />
              </RequestCreateProvider>
            </RequestProvider>
          </RegisterProvider>
        </EmployeeProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
