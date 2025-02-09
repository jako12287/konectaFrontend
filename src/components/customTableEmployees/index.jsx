import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import { useEmployees } from "../../context/EmployeeContext";
import styles from "../../styles/customTable.module.css";

const EmployeeTable = ({ data, onOpenModal }) => {
  const { currentPage, setCurrentPage, totalPages } = useEmployees();
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return data
      .filter((emp) => (roleFilter ? emp.role === roleFilter : true))
      .filter((emp) =>
        searchTerm
          ? emp.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      );
  }, [data, roleFilter, searchTerm]);

  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Nombre", accessorKey: "name" },
      {
        header: "Salario",
        accessorKey: "salary",
        cell: ({ row }) =>
          new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
          }).format(row.original.salary),
      },
      {
        header: "Rol",
        accessorKey: "role",
        cell: ({ row }) =>
          row.original.role === "admin" ? "Administrador" : "Empleado",
      },
      { header: "Email", accessorKey: "email" },
      {
        header: "Detalles",
        accessorKey: "Detalles",
        cell: ({ row }) => (
          <button
            className={styles.detailsButton}
            onClick={() => navigate(`/detail-employee/${row.original.id}`)}
          >
            Ver detalles
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
          <label>Filtrar por rol: </label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="admin">Administrador</option>
            <option value="employee">Empleado</option>
          </select>
        </div>
        <div>
          <label>Buscar por nombre: </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Escribe un nombre..."
            className={styles.searchInput}
          />
        </div>
        <div>
          <button className={styles.createButton} onClick={onOpenModal}>
            Crear Usuario
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

export default EmployeeTable;

EmployeeTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      salary: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
