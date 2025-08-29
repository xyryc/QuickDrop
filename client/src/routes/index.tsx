import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItem";
import { receiverSidebarItems } from "./receiverSideItem";
import { createBrowserRouter, Navigate } from "react-router";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import { TRole } from "@/type";
import ErrorPage from "../pages/ErrorPage";
import { withPublicRoute } from "@/utils/withPublicRoute";
import ProfilePage from "@/pages/MyProfile/ProfilePage";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Careers from "@/pages/Careers";
import TermsOfService from "@/pages/TermsService";
import FAQ from "@/pages/FAQ";
import HELP from "@/pages/HelpCenter";

export const router = createBrowserRouter([

    {
        Component: App,
        path: "/",
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "about",
                Component: About,
            },
            {
                path: "contact",
                Component: Contact,
            },
            {
                path: "careers",
                Component: Careers,
            },
            {
                path: "terms-service",
                Component: TermsOfService,
            },
            {
                path: "frequently-asked-questions",
                Component: FAQ,
            },
            {
                path: "help-center",
                Component: HELP,
            },
            
        ],
    },

    {
        Component: withAuth(DashboardLayout, role.Admin as TRole),
        path: "/admin",
        children: [
            { index: true, element: <Navigate to="/admin/analytics" /> },
            ...generateRoutes(adminSidebarItems),
            {
                path: "myprofile",
                Component: withAuth(ProfilePage),
            },


        ],

    },
    {
        Component: withAuth(DashboardLayout, role.Sender as TRole),
        path: "/sender",
        children:

            [
                { index: true, element: <Navigate to="/sender/parcelcreate" /> },
                ...generateRoutes(senderSidebarItems),

                {
                    path: "myprofile",
                    Component: withAuth(ProfilePage),
                },

            ]
    },
    {
        Component: withAuth(DashboardLayout, role.Receiver as TRole),
        path: "/receiver",
        children: [
            { index: true, element: <Navigate to="/receiver/viewincomingparcels" /> },
            ...generateRoutes(receiverSidebarItems),
            {
                path: "myprofile",
                Component: withAuth(ProfilePage),
            },

        ]
    },

    {
        Component: withPublicRoute(Login),
        path: "/login",
    },
    {
        Component: withPublicRoute(Register),
        path: "/register",
    },
    {
        Component: Unauthorized,
        path: "/unauthorized",
    }

]);

