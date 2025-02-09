import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import NotificationContainer from "./components/toastNotifier";
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import { RegisterProvider } from "./context/RegisterContext";
import { RequestProvider } from "./context/RequestContext";
import { RequestCreateProvider } from "./context/RequestCreateContext";
import { EmployeeRequestProvider } from "./context/EmployeeRequestContext";
import Loader from "./components/loader";

function App() {
  return (
    <Suspense fallback={<Loader/>}>
      <NotificationContainer />
      <AuthProvider>
        <EmployeeProvider>
          <RegisterProvider>
            <RequestProvider>
              <RequestCreateProvider>
                <EmployeeRequestProvider>
                  <RouterProvider router={router} />
                </EmployeeRequestProvider>
              </RequestCreateProvider>
            </RequestProvider>
          </RegisterProvider>
        </EmployeeProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
