// All components mapping with path for internal routes

import { lazy } from "react";
import Assistants from "../pages/protected/Assistants";
import PhoneNumbers from "../pages/protected/PhoneNumbers";
import Files from "../pages/protected/Files";
import Tools from "../pages/protected/Tools";
import Blocks from "../pages/protected/Blocks";
import Squads from "../pages/protected/Squads";
import VoiceLibrary from "../pages/protected/VoiceLibrary";
import CallLogs from "../pages/protected/CallLogs";
import Payments from "../pages/protected/Payments";
import AdminDashboard from "../AdminDashboard";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const Charts = lazy(() => import("../pages/protected/Charts"));
const Leads = lazy(() => import("../pages/protected/Leads"));
const Integration = lazy(() => import("../pages/protected/Integration"));
const Calendar = lazy(() => import("../pages/protected/Calendar"));
const Team = lazy(() => import("../pages/protected/Team"));
const Transactions = lazy(() => import("../pages/protected/Transactions"));
const Bills = lazy(() => import("../pages/protected/Bills"));
const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings")
);
const GettingStarted = lazy(() => import("../pages/GettingStarted"));
const DocFeatures = lazy(() => import("../pages/DocFeatures"));
const DocComponents = lazy(() => import("../pages/DocComponents"));

const routes = [
  {
    path: "/", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/assistants",
    component: Assistants,
  },
  {
    path: "/phone-numbers",
    component: PhoneNumbers,
  },
  {
    path: "/files",
    component: Files,
  },
  {
    path: "/tools",
    component: Tools,
  },
  {
    path: "/blocks",
    component: Blocks,
  },
  {
    path: "/squads",
    component: Squads,
  },
  {
    path: "/voice-library",
    component: VoiceLibrary,
  },
  {
    path: "/call-logs",
    component: CallLogs,
  },
  {
    path: "/payments",
    component: Payments,
  },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/leads",
    component: Leads,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
  },
];

export default routes;
