import { render, screen, waitFor } from "@testing-library/react";
import { useNotification } from "../../src/components/toastNotifier";
import { ToastContainer } from "react-toastify";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-toastify", () => ({
  ...jest.requireActual("react-toastify"),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

describe("useNotification", () => {
  it("debe mostrar un mensaje de éxito al llamar a notify con 'success'", async () => {
    const { notify } = useNotification();

    notify("success", "¡Operación exitosa!");

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "¡Operación exitosa!",
        expect.any(Object)
      );
    });
  });

  it("debe mostrar un mensaje de error al llamar a notify con 'error'", async () => {
    const { notify } = useNotification();

    notify("error", "¡Algo salió mal!");

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "¡Algo salió mal!",
        expect.any(Object)
      );
    });
  });

  it("debe renderizar el ToastContainer", () => {
    render(<ToastContainer />);
    const toastContainer = screen.getByTestId("toast-container");
    expect(toastContainer).toBeInTheDocument();
  });
});
