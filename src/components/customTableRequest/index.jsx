import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import { useRequests } from "../../context/RequestContext";
import styles from "../../styles/customTable.module.css";
import { useAuth } from "../../context/AuthContext";
import { deleteRequestById } from "../../services/api";
import { useNotification } from "../toastNotifier";

const RequestTable = ({ refreshRequests, onOpenModal }) => {
  const { requests, currentPage, setCurrentPage, totalPages } = useRequests();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { notify } = useNotification();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return requests.filter((req) =>
      searchTerm
        ? req.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.summary.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );
  }, [requests, searchTerm]);

  const handleDeleteRequest = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar esta solicitud?"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteRequestById(id, token);

      if (!response.ok) {
        console.log("TCL: deleteRequest -> error");
      }

      refreshRequests();
      notify("success", "Solicitud eliminada con éxito.");
    } catch (error) {
      console.error("Error eliminando la solicitud:", error);
      notify("error", "No se pudo eliminar la solicitud.");
    }
  };

  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Código", accessorKey: "code" },
      { header: "Descripción", accessorKey: "description" },
      { header: "Resumen", accessorKey: "summary" },
      {
        header: "Empleado",
        accessorKey: "Employee",
        cell: ({ row }) => row.original.Employee?.name || "N/A",
      },
      {
        header: "Acciones",
        accessorKey: "Detalles",
        cell: ({ row }) => (
          <button
            className={styles.detailsButton}
            onClick={() => handleDeleteRequest(row.original.id)}
          >
            Eliminar
          </button>
        ),
      },
    ],
    [navigate]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.tableContainer}>
      <div className={styles.filterContainer}>
        <div>
          <label>Buscar por código o resumen: </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Escribe algo..."
            className={styles.searchInput}
          />
        </div>
        <div>
          <button className={styles.createButton} onClick={onOpenModal}>
            Crear Solicitud
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default RequestTable;

RequestTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      Employee: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ).isRequired,
  refreshRequests: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
