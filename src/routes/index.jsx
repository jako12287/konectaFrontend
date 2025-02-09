import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../components/layout";

const Login = lazy(() => import("../views/login"));
const DashboardEmployee = lazy(() =>
  import("../views/employee/employeeDashboard")
);
const Wellcome = lazy(() => import("../views/admin/wellcome"));
const ListEmployees = lazy(() => import("../views/admin/listEmployee"));
const DetailEmployee = lazy(() => import("../views/admin/detailsEmployee"));
const ListRequest = lazy(() => import("../views/admin/listRequest"));
const NotFound = lazy(() => import("../views/NoFound"));

const Router = [
  {
    id: "login",
    path: "/",
    element: <Login/>,
  },
  {
    id: "dashboardEmployee",
    path: "/dashboard-employee",
    element: <DashboardEmployee />,
  },
  {
    id: "wellcome",
    path: "/wellcome",
    element: (
      <Layout>
        <Wellcome />
       </Layout>
    ),
  },
  {
    id: "list-employees",
    path: "/list-employees",
    element: (
      <Layout>
        <ListEmployees />
      </Layout>
    ),
  },
  {
    id: "detail-employee",
    path: "/detail-employee/:id",
    element: (
      <Layout>
        <DetailEmployee />
      </Layout>
    ),
  },
  {
    id: "list-request",
    path: "/list-request",
    element: (
      <Layout>
        <ListRequest />
      </Layout>
    ),
  },
  {
    id: "notFound",
    path: "*",
    element: <NotFound />,
  },
];

export default createBrowserRouter(Router);
