/** Icons are imported separately to reduce build time */
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import ChartPie from "@heroicons/react/24/outline/ChartPieIcon";
import CpuChipIcon from "@heroicons/react/24/outline/CpuChipIcon";
import PhoneIcon from "@heroicons/react/24/outline/PhoneIcon";
import ToolsIcon from "@heroicons/react/24/outline/WrenchScrewdriverIcon";
import MicrophoneIcon from "@heroicons/react/24/outline/MicrophoneIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/",
    icon: <ChartPie className={iconClasses} />,
    name: "Overview",
  },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <CpuChipIcon className={`${iconClasses} inline`} />,
  //   name: "Platform",
  // },
  {
    path: "/assistants",
    icon: <UserIcon className={submenuIconClasses} />,
    name: "Assistants",
  },
  {
    path: "/phone-numbers",
    icon: <PhoneIcon className={submenuIconClasses} />,
    name: "Phone Numbers",
  },
  {
    path: "/files",
    icon: <DocumentTextIcon className={`${iconClasses} inline`} />,
    name: "Files",
  },
  {
    path: "/tools",
    icon: <ToolsIcon className={submenuIconClasses} />,
    name: "Tools",
  },
  {
    path: "/blocks",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Blocks",
  },
  {
    path: "/squads",
    icon: <UsersIcon className={submenuIconClasses} />,
    name: "Squads",
  },
  {
    path: "/voice-library",
    icon: <MicrophoneIcon className={iconClasses} />,
    name: "Voice Library",
  },
  {
    path: "/call-logs",
    icon: <InboxArrowDownIcon className={iconClasses} />,
    name: "Call Logs",
  },
];

export default routes;
