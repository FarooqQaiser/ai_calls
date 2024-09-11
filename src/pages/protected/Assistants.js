import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; // useSelector,
import PlusICon from "@heroicons/react/24/outline/PlusCircleIcon";
import PhoneICon from "@heroicons/react/24/outline/PhoneIcon";
import ExclamationICon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import DollarICon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import PuzzleICon from "@heroicons/react/24/outline/PuzzlePieceIcon";
import BarsIcon from "@heroicons/react/24/outline/Bars3BottomLeftIcon";
import MicrophoneIcon from "@heroicons/react/24/outline/MicrophoneIcon";
import CodeIcon from "@heroicons/react/24/outline/CodeBracketIcon";
import CalendarIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import ChartIcon from "@heroicons/react/24/outline/ChartBarIcon";
import PublishIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import ChatIcon from "@heroicons/react/24/outline/ChatBubbleLeftRightIcon";
import SpeakerIcon from "@heroicons/react/24/outline/SpeakerXMarkIcon";
import PhoneXIcon from "@heroicons/react/24/outline/PhoneXMarkIcon";
import CameraIcon from "@heroicons/react/24/outline/VideoCameraIcon";
import LockIcon from "@heroicons/react/24/outline/LockClosedIcon";
import { openRightDrawer } from "../../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../../utils/globalConstantUtil";
import { BiDialpad, BiInjection, BiWifiOff } from "react-icons/bi";
import { GiSandsOfTime } from "react-icons/gi";
import { LuTimerReset } from "react-icons/lu";
import { TbRulerMeasure } from "react-icons/tb";
import { IoTimerOutline } from "react-icons/io5";
import { MdLineStyle } from "react-icons/md";
import {
  CCard,
  CCardBody,
  // CDropdown,
  // CDropdownDivider,
  // CDropdownItem,
  // CDropdownMenu,
  // CDropdownToggle,
  CFormCheck,
  CFormInput,
  // CFormLabel,
  CFormRange,
  CFormSelect,
  // CFormSwitch,
  // CInputGroup,
  CNav,
  CNavItem,
  CNavLink,
  CProgress,
  CProgressStacked,
  CTabContent,
  CTabPane,
  CTooltip,
} from "@coreui/react";
import Multiselect from "multiselect-react-dropdown";
import { setPageTitle } from "../../features/common/headerSlice";
import {
  ASSISTANTS_API_OPTIONS,
  ASSISTANTS_API_URL,
} from "../../components/Assistants Api/AssistantsApi";
const Assistants = () => {
  const dispatch = useDispatch();
  const [noAssistant, setNoAssistant] = useState(true);
  const [currentAssistant, setCurrentAssistant] = useState({
    id: "1",
    name: "first assistant",
  });
  const [assistantId, setAssistantId] = useState(0);
  const [assistants, setAssistants] = useState([]);
  const [activeKey, setActiveKey] = useState("model");
  const [temperature, setTemperature] = useState(1.2);
  const [silenceTimeout, setSilenceTimeout] = useState(260);
  const [responseDelay, setResponseDelay] = useState(0.9);
  const [LlmReqDelay, setLlmReqDelay] = useState(1.5);
  const [interruption, setInterruption] = useState(5);
  const [maxDuration, setMaxDuration] = useState(1800);
  const [maxIdleMessages, setMaxIdleMessages] = useState(3);
  const [idleTimeout, setIdleTimeout] = useState(7.5);

  const MESSAGES = [
    "conversation-update",
    "end-of-call-report",
    "function-call",
    "hang",
    "model-output",
    "phone-call-control",
    "speech-update",
    "status-update",
    "transcript",
    "tool-calls",
    "transfer-destination-request",
    "user-interrupted",
    "voice-input",
  ];

  const IDLEMESSAGES = [
    "Are you still there?",
    "IS there anything else you can help with",
    "Feel free to ask any questions.",
  ];

  const providers = [
    "vapi",
    "openai",
    "together-ai",
    "anyscale",
    "openrouter",
    "perplexity-ai",
    "deepinfra",
    "groq",
    "anthropic",
    "custom-llm",
  ];

  const models = [
    "GPT 4o Cluster",
    "GPT 4o Mini Cluster",
    "GPT 3.5 Turbo Cluster",
    "GPT 4 Turbo Cluster",
  ];

  const transcriberProvider = ["deepgram", "talkscriber", "gladia"];

  const transcriberModel = [
    {
      model: ["Fast", "Accurate"],
    },
    {
      model: [
        "Nova 2",
        "Nova 2 General",
        "Nova 2 Meeting",
        "Nova 2 Phonecall",
        "Nova 2 Finance",
        "Nova 2 Conversational AI",
        "Nova 2 Voicemail",
        "Nova 2 Video",
        "Nova 2 Medical",
        "Nova 2 Drive Thru",
        "Nova 2 Automotive",
      ],
    },
    {
      model: ["Whisper"],
    },
  ];

  useEffect(() => {
    let result = null;
    const fetchAssistants = async () => {
      const response = await fetch(ASSISTANTS_API_URL, ASSISTANTS_API_OPTIONS);
      result = await response.json();
      console.log(result);

      if (result) {
        setAssistants(result);
        setNoAssistant(false);
        const assistant = result.filter((assistant, index) => {
          if (index === 0) {
            return assistant;
          }
          return null;
        });
        setCurrentAssistant(assistant[0]);
      }
    };

    fetchAssistants();
  }, [setAssistants]);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Assistants" }));
  }, [dispatch]);

  // useEffect(() => {
  //   setCurrentAssistant(
  //     assistants.filter((assit) => assit.id === assistantId)[0]
  //   );
  // }, [assistantId, assistants]);

  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "CREATE ASSISTANT",
        bodyType: RIGHT_DRAWER_TYPES.CREATE_ASSISTANT,
      })
    );
  };

  const handleCurrentAssistant = (id) => {
    const assistant = assistants.filter((assistant) => {
      if (assistant.id === id) {
        return assistant;
      }
      return null;
    });
    setCurrentAssistant(assistant[0]);
  };

  return (
    <>
      {noAssistant && (
        <div className="h-screen flex justify-center items-center">
          <button
            type="button"
            onClick={() => openNotification()}
            className="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Assistant
            <PlusICon className="w-5 h-5 ml-3" />
          </button>
        </div>
      )}
      {!noAssistant && (
        <div className="flex flex-col sm:flex-row sm:justify-start sm:h-full">
          <div
            data-testid="assistant-menu"
            className="border-r border-border hide-scrollbar sm:h-full w-full sm:max-w-[320px]"
          >
            <div className="flex p-4 fixed w-full z-10 sm:w-[320px] sm:border-b sm:border-border bg-foreground/5 backdrop-blur-xl sm:backdrop-blur-sm">
              <button
                type="button"
                onClick={() => openNotification()}
                className="sm:w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create Assistant
                <PlusICon className="w-5 h-5 ml-3" />
              </button>
            </div>
            <div
              role="list"
              data-testid="assistants-list"
              className="mt-16 flex-col w-full sm:w-[320px] p-4 hide-scrollbar gap-y-2 sm:flex"
            >
              {assistants &&
                assistants.length > 0 &&
                assistants.map((assistant, index) => (
                  <div
                    key={index}
                    className={`group flex flex-col p-2 rounded-lg w-full border border-transparent hover:bg-[#2B3039] cursor-pointer transition-all duration-150 ease-in-out ${
                      currentAssistant.name === assistant.name
                        ? "bg-[#1D232A]"
                        : ""
                    }`}
                    onClick={() => handleCurrentAssistant(assistant.id)} //() => setAssistantId(assistant.id)
                  >
                    <div className="flex justify-between items-center  transition-all duration-150 ease-in-out">
                      <div className="flex flex-col justify-between items-start">
                        <div className="ellipsis-text font-semibold text-sm text-text">
                          {assistant.name}
                        </div>
                        <div className="flex gap-1.5 items-center overflow-hidden">
                          <p className="ellipsis-text text-sm text-text/40"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="p-4 w-full">
            <div className="flex justify-between items-center mb-3">
              <div className="ellipsis-text font-bold text-xl">
                {currentAssistant.name}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => openNotification()}
                  className="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <PhoneICon className="w-5 h-5 mr-3" />
                  Talk with Assistant
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-2 md:flex md:items-center md:flex-wrap sm:flex-auto sm:gap-x-4 mb-3">
              <div className="flex items-center mb-1 gap-1">
                <div className="rounded-full w-2 h-2 bg-[#5dfeca]"></div>
                <div className="text-xs text-text">Vapi Fixed Cost</div>
              </div>
              <div className="flex items-center mb-1 gap-1">
                <div className="rounded-full w-2 h-2 bg-[#db2777]"></div>
                <div className="text-xs text-text">untitled</div>
              </div>
              <div className="flex items-center mb-1 gap-1">
                <div className="rounded-full w-2 h-2 bg-[#0ea5e9]"></div>
                <div className="text-xs text-text">gpt 3.5 turbo</div>
              </div>
              <div className="flex items-center mb-1 gap-1">
                <div className="rounded-full w-2 h-2 bg-[#fcd34d]"></div>
                <div className="text-xs text-text">cartesia</div>
              </div>
              <div className="flex items-center mb-1 gap-1">
                <div className="rounded-full w-2 h-2 bg-[#c026d3]"></div>
                <div className="text-xs text-text">web</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="group h-auto flex-1 border border-[#27272A] dark:border-gray-200 p-[12px] rounded-2xl transition-all duration-150 ease-in-out bg-gray-200 dark:bg-[#27272A]">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col xl:flex-row justify-between items-start gap-2 mb-2  text-base md:text-md lg:text-lg ">
                    <div className="flex items-center gap-2">
                      <div className="bg-foreground border border-[#27272A] dark:border-gray-200 rounded-xl p-[6px] shadow-sm shadow-black/10">
                        <DollarICon className="w-5 h-5" />
                      </div>
                      <h3 className=" font-bold text-text/70">Cost</h3>
                      <CTooltip
                        content="These calculation are estimates. They may not reflect the actual cost of the assistant."
                        placement="top"
                        className="bg-black w-[250px] rounded-xl p-2 text-wrap text-xs"
                      >
                        <ExclamationICon className="w-4 h-4 text-yellow-500" />
                      </CTooltip>
                    </div>
                    <div className="font-bold font-mono text-primary bg-background/40 rounded-xl p-[6px] px-3 border border-[#27272A] dark:border-gray-200">
                      ~$0.09
                      <span className="text-text/20"> /min</span>
                    </div>
                  </div>
                  <CProgressStacked className="flex">
                    <CProgress
                      value={54}
                      className="bg-[#5dfeca] h-[13px] rounded-l-full"
                    />
                    <CProgress
                      value={11}
                      className="bg-[#db2777] h-[13px] rounded-none"
                    />
                    <CProgress
                      value={11}
                      className="bg-[#0ea5e9] h-[13px] rounded-none"
                    />
                    <CProgress
                      value={24}
                      className="bg-[#fcd34d] h-[13px] rounded-r-full"
                    />
                  </CProgressStacked>
                </div>
              </div>
              <div className="group h-auto flex-1 border border-[#27272A] dark:border-gray-200 p-[12px] rounded-2xl transition-all duration-150 ease-in-out bg-gray-200 dark:bg-[#27272A]">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col xl:flex-row justify-between items-start gap-2 mb-2  text-base md:text-md lg:text-lg ">
                    <div className="flex items-center gap-2">
                      <div className="bg-foreground border border-[#27272A] dark:border-gray-200 rounded-xl p-[6px] shadow-sm shadow-black/10">
                        <DollarICon className="w-5 h-5" />
                      </div>
                      <h3 className=" font-bold text-text/70">Latency</h3>
                      <CTooltip
                        content="These calculation are estimates. They may not reflect the actual latency of the assistant."
                        placement="top"
                        className="bg-black w-[250px] rounded-xl p-2 text-wrap text-xs"
                      >
                        <ExclamationICon className="w-4 h-4 text-yellow-500" />
                      </CTooltip>
                    </div>
                    <div className="font-bold font-mono text-primary bg-background/40 rounded-xl p-[6px] px-3 border border-[#27272A] dark:border-gray-200">
                      ~700
                      <span className="text-text/20"> ms</span>
                    </div>
                  </div>
                  <CProgressStacked className="flex">
                    <CProgress
                      value={11}
                      className="bg-[#5dfeca] h-[13px] rounded-l-full"
                    />
                    <CProgress
                      value={40}
                      className="bg-[#db2777] h-[13px] rounded-none"
                    />
                    <CProgress
                      value={11}
                      className="bg-[#0ea5e9] h-[13px] rounded-none"
                    />
                    <CProgress
                      value={24}
                      className="bg-[#fcd34d] h-[13px] rounded-none"
                    />
                    <CProgress
                      value={14}
                      className="bg-[#c026d3] h-[13px] rounded-r-full"
                    />
                  </CProgressStacked>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 xl:flex-row xl:justify-between xl:items-center">
              <CNav
                variant="tabs"
                role="tablist"
                className="w-full md:mr-2 flex flex-col items-start justify-center text-muted-foreground overflow-x-auto p-1.5 gap-x-2 bg-background/80 backdrop-blur-lg border border-border rounded-xl shadow-sm shadow-black/20 xl:flex-row xl:w-fit"
              >
                <CNavItem>
                  <CNavLink
                    href="#!"
                    active={activeKey === "model"}
                    onClick={() => setActiveKey("model")}
                    className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium hover:bg-hover disabled:pointer-events-none disabled:opacity-50 focus:border ${
                      activeKey === "model"
                        ? "shadow bg-primary/10 text-primary border"
                        : ""
                    } border-transparent group rounded-[8px] gap-x-2 m-0 transition-all duration-100 ease-in-out active:scale-[0.95] text-text/50 hover:text-text/90`}
                  >
                    <PuzzleICon className="w-3 h-3" />
                    Model
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="#!"
                    active={activeKey === "transcriber"}
                    onClick={() => setActiveKey("transcriber")}
                    className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium hover:bg-hover disabled:pointer-events-none disabled:opacity-50 focus:border ${
                      activeKey === "transcriber"
                        ? "shadow bg-primary/10 text-primary border"
                        : ""
                    } border-transparent group rounded-[8px] gap-x-2 m-0 transition-all duration-100 ease-in-out active:scale-[0.95] text-text/50 hover:text-text/90`}
                  >
                    <BarsIcon className="w-3 h-3" />
                    Transcriber
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="#!"
                    active={activeKey === "voice"}
                    onClick={() => setActiveKey("voice")}
                    className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium hover:bg-hover disabled:pointer-events-none disabled:opacity-50 focus:border ${
                      activeKey === "voice"
                        ? "shadow bg-primary/10 text-primary border"
                        : ""
                    } border-transparent group rounded-[8px] gap-x-2 m-0 transition-all duration-100 ease-in-out active:scale-[0.95] text-text/50 hover:text-text/90`}
                  >
                    <MicrophoneIcon className="w-3 h-3" />
                    Voice
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="#!"
                    active={activeKey === "functions"}
                    onClick={() => setActiveKey("functions")}
                    className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium hover:bg-hover disabled:pointer-events-none disabled:opacity-50 focus:border ${
                      activeKey === "functions"
                        ? "shadow bg-primary/10 text-primary border"
                        : ""
                    } border-transparent group rounded-[8px] gap-x-2 m-0 transition-all duration-100 ease-in-out active:scale-[0.95] text-text/50 hover:text-text/90`}
                  >
                    <CodeIcon className="w-3 h-3" />
                    Functions
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="#!"
                    active={activeKey === "advanced"}
                    onClick={() => setActiveKey("advanced")}
                    className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium hover:bg-hover disabled:pointer-events-none disabled:opacity-50 focus:border ${
                      activeKey === "advanced"
                        ? "shadow bg-primary/10 text-primary border"
                        : ""
                    } border-transparent group rounded-[8px] gap-x-2 m-0 transition-all duration-100 ease-in-out active:scale-[0.95] text-text/50 hover:text-text/90`}
                  >
                    <CalendarIcon className="w-3 h-3" />
                    Advanced
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="#!"
                    active={activeKey === "analysis"}
                    onClick={() => setActiveKey("analysis")}
                    className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium hover:bg-hover disabled:pointer-events-none disabled:opacity-50 focus:border ${
                      activeKey === "analysis"
                        ? "shadow bg-primary/10 text-primary border"
                        : ""
                    } border-transparent group rounded-[8px] gap-x-2 m-0 transition-all duration-100 ease-in-out active:scale-[0.95] text-text/50 hover:text-text/90`}
                  >
                    <ChartIcon className="w-3 h-3" />
                    Analysis
                  </CNavLink>
                </CNavItem>
              </CNav>
              <div className="flex ">
                <button
                  type="button"
                  className="w-auto mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <PublishIcon className="w-5 h-5 mr-2" />
                  Publish
                </button>
                {/* <button
                  type="button"
                  className="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <TrashIcon className="w-5 h-5" />
                </button> */}
                <button
                  type="button"
                  className="py-2.5 px-3 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  {" "}
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <CTabContent
              className={`bg-gray-200 dark:bg-[#14171A] p-3 mt-3 rounded-xl w-full ${
                activeKey === "model" ? "h-screen sm:h-auto" : "h-auto"
              } border`}
            >
              {activeKey === "model" && (
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="model-tab"
                  visible={activeKey === "model"}
                >
                  <CCard>
                    <CCardBody className="bg-background/80">
                      <h1 className="font-extrabold">Model</h1>
                      <p>
                        This section allows you to configure the model for the
                        assistant.
                      </p>
                      <div className="flex flex-col md:flex-row md:justify-start md:items-center rounded-xl p-3 bg-gray-200 dark:bg-[#1A1C1F] border-[#1A1C1F] dark:border-bg-gray-300 shadow border mt-3">
                        <div className="w-full mr-3">
                          <div>
                            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              First Message{" "}
                              <CTooltip
                                content="The first message that the assistant will say. This can also be a URL to a containerized audio file (mp3, wav, etc.)."
                                placement="top"
                                className="bg-black w-[200px] rounded-xl p-2 text-wrap text-xs"
                              >
                                <ExclamationICon className="w-4 h-4 text-yellow-500 ml-4" />
                              </CTooltip>
                            </label>
                            <input
                              type="text"
                              id="first_name"
                              className="text-sm rounded-lg block w-full p-2.5"
                              placeholder=""
                              required
                              value={currentAssistant.firstMessage}
                              onChange={(e) => {
                                currentAssistant.firstMessage = e.target.value;
                              }}
                            />
                          </div>
                          <div>
                            <label
                              for="message"
                              className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center"
                            >
                              System Prompt{" "}
                              <CTooltip
                                content="The system prompt can be used to configure the context, role, personality, instructions and so on for the assistant."
                                placement="top"
                                className="bg-black w-[200px] rounded-xl p-2 text-wrap text-xs"
                              >
                                <ExclamationICon className="w-4 h-4 text-yellow-500 ml-4" />
                              </CTooltip>
                            </label>
                            <textarea
                              id="message"
                              rows="10"
                              className="text-sm rounded-lg block w-full p-2.5"
                              placeholder="Add your prompt here..."
                              value={currentAssistant.model.messages[0].content}
                              onChange={(e) => {
                                currentAssistant.model.messages[0].content =
                                  e.target.value;
                              }}
                            ></textarea>
                          </div>
                        </div>
                        <div className="hide-scrollbar h-[200px] sm:h-full w-full sm:max-w-[240px]">
                          <div>
                            <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              Provider
                            </label>
                            <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-2 cursor-pointer">
                              {providers.map((provider, index) => {
                                if (
                                  currentAssistant.model.provider === provider
                                ) {
                                  return (
                                    <>
                                      <option
                                        key={index}
                                        value={provider}
                                        selected
                                      >
                                        {provider}
                                      </option>
                                    </>
                                  );
                                }
                                return (
                                  <>
                                    <option key={index} value={provider}>
                                      {provider}
                                    </option>
                                  </>
                                );
                              })}
                            </CFormSelect>
                          </div>
                          <div>
                            <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              Model{" "}
                              <CTooltip
                                content="We benchmark and rank ~20 models and instances across Azure and OpenAI for GPT 3.5 picking fastest at any one moment."
                                placement="top"
                                className="bg-black w-[200px] rounded-xl p-2 text-wrap text-xs"
                              >
                                <ExclamationICon className="w-4 h-4 text-yellow-500 ml-4" />
                              </CTooltip>
                            </label>
                            <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-2 cursor-pointer">
                              {models.map((model, index) => {
                                if (currentAssistant.model.model === model) {
                                  return (
                                    <>
                                      <option
                                        key={index}
                                        value={model}
                                        selected
                                      >
                                        {model}
                                      </option>
                                    </>
                                  );
                                }
                                return (
                                  <>
                                    <option key={index} value={model}>
                                      {model}
                                    </option>
                                  </>
                                );
                              })}
                            </CFormSelect>
                          </div>
                          <div>
                            <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                              Knowledge base
                            </label>
                            <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-2">
                              <option>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3" disabled>
                                Three
                              </option>
                            </CFormSelect>
                          </div>
                          <div>
                            <div className="flex justify-between items-center">
                              <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                                Temperature{" "}
                                <CTooltip
                                  content="The temperature is used to control the randomness of the output. When you set it higher, you'll get more random outputs. When you set it lower, towards 0, the values are more deterministic."
                                  placement="top"
                                  className="bg-black w-[200px] rounded-xl p-2 text-wrap text-xs"
                                >
                                  <ExclamationICon className="w-4 h-4 text-yellow-500 ml-4" />
                                </CTooltip>
                              </label>
                              <span className="text-sm rounded-lg block p-2.5">
                                {currentAssistant.model.temperature}
                              </span>
                            </div>
                            <CFormRange
                              min={1}
                              max={2}
                              step={0.1}
                              value={currentAssistant.model.temperature}
                              defaultValue={temperature}
                              onChange={(e) => {
                                currentAssistant.model.temperature =
                                  e.target.value;
                              }}
                              className="w-full h-1"
                            />
                          </div>
                          <div>
                            <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              Max Tokens{" "}
                              <CTooltip
                                content="This is the max number of tokens that the assistant will be allowed to generate in each turn of the conversation."
                                placement="top"
                                className="bg-black w-[200px] rounded-xl p-2 text-wrap text-xs"
                              >
                                <ExclamationICon className="w-4 h-4 text-yellow-500 ml-4" />
                              </CTooltip>
                            </label>
                            <CFormInput
                              className="text-sm rounded-lg block w-full p-2.5 mb-2"
                              type="number"
                            />
                          </div>
                          <label className="flex justify-between items-center cursor-pointer">
                            <span className="text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              Direct Emotion{" "}
                              <CTooltip
                                content="Enable this property to detect user's emotion such as anger, joy etc. and feed it as an additional context to the model"
                                placement="top"
                                className="bg-black w-[200px] rounded-xl p-2 text-wrap text-xs"
                              >
                                <ExclamationICon className="w-4 h-4 text-yellow-500 ml-4" />
                              </CTooltip>
                            </span>
                            <input
                              type="checkbox"
                              checked={
                                currentAssistant.model.emotionRecognitionEnabled
                              }
                              onChange={(e) => {
                                currentAssistant.model.emotionRecognitionEnabled =
                                  e.target.checked;
                              }}
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </CCardBody>
                  </CCard>
                </CTabPane>
              )}
              {activeKey === "transcriber" && (
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="transcriber-tab"
                  visible={activeKey === "transcriber"}
                >
                  <CCard>
                    <CCardBody className="bg-background/80">
                      <h1 className="font-extrabold">Transcription</h1>
                      <p>
                        This section allows you to configure the transcription
                        settings for the assistant.
                      </p>
                      <div className="rounded-xl p-3 bg-gray-200 dark:bg-[#1A1C1F] border-[#1A1C1F] dark:border-bg-gray-300 shadow border mt-3">
                        <div className="grid grid-cols-2 gap-2 my-3">
                          <div>
                            <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              Provider
                            </label>
                            <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-2">
                              {transcriberProvider.map((transcriber, index) => {
                                if (currentAssistant.transcriber.provider) {
                                  return (
                                    <>
                                      <option
                                        key={index}
                                        value={transcriber}
                                        selected
                                      >
                                        {transcriber}
                                      </option>
                                    </>
                                  );
                                }
                                return (
                                  <>
                                    <option key={index} value={transcriber}>
                                      {transcriber}
                                    </option>
                                  </>
                                );
                              })}
                            </CFormSelect>
                          </div>
                          <div>
                            <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              Language
                            </label>
                            <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-2">
                              <option>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3" disabled>
                                Three
                              </option>
                            </CFormSelect>
                            <p className="text-xs">
                              Pro tip: If you want to support both English and
                              Spanish, you can set the language to multi and use
                              ElevenLabs Turbo 2.5 in the Voice tab.
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                            Model
                          </label>
                          <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-2">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3" disabled>
                              Three
                            </option>
                          </CFormSelect>
                        </div>
                      </div>
                    </CCardBody>
                  </CCard>
                </CTabPane>
              )}
              {activeKey === "voice" && (
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="voice-tab"
                  visible={activeKey === "voice"}
                >
                  <CCard>
                    <CCardBody className="bg-background/80">
                      <h1 className="font-extrabold">Voice Configuration</h1>
                      <p>
                        Choose from the list of voices, or sync your voice
                        library if you aren't able to find your voice in the
                        dropdown. If you are still facing any error, you can
                        enable custom voice and add a voice ID manually.
                      </p>
                      <div className="rounded-xl p-3 border bg-gray-200 dark:bg-[#1A1C1F] border-[#1A1C1F] dark:border-bg-gray-300 shadow mt-3">
                        <div className="grid grid-cols-2 gap-2 my-3">
                          <div>
                            <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              Provider
                            </label>
                            <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-2">
                              <option>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3" disabled>
                                Three
                              </option>
                            </CFormSelect>
                          </div>
                          <div>
                            <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              Voice
                            </label>
                            <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-2">
                              <option>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3" disabled>
                                Three
                              </option>
                            </CFormSelect>
                          </div>
                        </div>
                        <div>
                          <CFormCheck
                            id="flexCheckChecked"
                            label="Add Voice ID Manually"
                          />
                        </div>
                      </div>
                    </CCardBody>
                  </CCard>
                  <CCard className="mt-5">
                    <CCardBody className="bg-background/80">
                      <h1 className="font-extrabold">
                        Additional Configuration
                      </h1>
                      <p>
                        Configure additional settings for the voice of your
                        assistant.
                      </p>
                      <div className="rounded-xl p-3 border bg-gray-200 dark:bg-[#1A1C1F] border-[#1A1C1F] dark:border-bg-gray-300 shadow mt-3">
                        <div className="grid grid-cols-2 gap-2 my-3">
                          <div>
                            <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              Background Sound
                              <CTooltip
                                content="This is the background sound in the call. Default for phone calls is 'office' and default for web calls is 'off'."
                                placement="top"
                                className="bg-black w-[200px] rounded-xl p-2 text-wrap text-xs"
                              >
                                <ExclamationICon className="w-4 h-4 text-yellow-500 ml-4" />
                              </CTooltip>
                            </label>
                            <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-2">
                              <option>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3" disabled>
                                Three
                              </option>
                            </CFormSelect>
                          </div>
                          <div>
                            <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              Input Min Characters
                              <CTooltip
                                content="This is the minimum number of characters that will be passed to the voice provider. This helps decides the minimum chunk size that is sent to the voice provider for the voice generation as the LLM tokens are streaming in."
                                placement="top"
                                className="bg-black w-[200px] rounded-xl p-2 text-wrap text-xs"
                              >
                                <ExclamationICon className="w-4 h-4 text-yellow-500 ml-4" />
                              </CTooltip>
                            </label>
                            <CFormInput
                              className="text-sm rounded-lg block w-full p-2.5 mb-2"
                              placeholder="10"
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="mt-2">
                          <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                            Punctuation Boundaries
                          </label>
                          <p className="text-xs">
                            These are the punctuations that are considered valid
                            boundaries or delimiters. This helps decides the
                            chunks that are sent to the voice provider for the
                            voice generation as the LLM tokens are streaming in.
                          </p>
                          <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-2">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3" disabled>
                              Three
                            </option>
                          </CFormSelect>
                        </div>
                        <hr />
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <BiInjection className="w-7 h-7 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize">
                                Filler Injection enabled
                              </span>
                              <span className="text-xs">
                                This determines whether fillers are injected
                                into the Model output before inputting it into
                                the Voice provider.
                              </span>
                            </div>
                          </div>
                          <label className="flex justify-between items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <hr />
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <ChatIcon className="w-7 h-7 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize">
                                Backchanneling Enabled
                              </span>
                              <span className="text-xs">
                                Make the bot say words like 'mhmm', 'ya' etc.
                                while listening to make the conversation sounds
                                natural. Default disabled
                              </span>
                            </div>
                          </div>
                          <label className="flex justify-between items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <hr />
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <SpeakerIcon className="w-7 h-7 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize">
                                Background Denoising Enabled
                              </span>
                              <span className="text-xs">
                                Filter background noise while the user is
                                talking.
                              </span>
                            </div>
                          </div>
                          <label className="flex justify-between items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </CCardBody>
                  </CCard>
                </CTabPane>
              )}
              {activeKey === "functions" && (
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="functions-tab"
                  visible={activeKey === "functions"}
                >
                  <CCard>
                    <CCardBody className="bg-background/80">
                      <h1 className="font-extrabold">Tools</h1>
                      <p>
                        Tools are a way you can enable your voicebots to perform
                        certain actions and tasks during the call. Add your
                        tools From the Tools Library page to your voicebots to
                        connect with Make.com or GHL workflows. You can also
                        have custom tools with your own backend.
                      </p>
                      <div
                        className="p-2 my-3 text-xs text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                        role="alert"
                      >
                        Note: Tools have different Request and Response format
                        as compared to Functions. Check our{" "}
                        <a href="/" className="font-semibold underline">
                          tools guide
                        </a>{" "}
                        for more details
                      </div>
                      <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-2">
                        <option>Select Tool</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3" disabled>
                          Three
                        </option>
                      </CFormSelect>
                    </CCardBody>
                  </CCard>
                  <CCard className="mt-5">
                    <CCardBody className="bg-background/80">
                      <h1 className="font-extrabold">Predefined functions</h1>
                      <p>
                        We've pre-built functions for common use cases. You can
                        enable them and configure them below.
                      </p>
                      <div className="rounded-xl p-3 border bg-gray-200 dark:bg-[#1A1C1F] border-[#1A1C1F] dark:border-bg-gray-300 shadow mt-3">
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <PhoneXIcon className="w-7 h-7 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize">
                                Enable End Call Function
                              </span>
                              <span className="text-xs">
                                This will allow the assistant to end the call
                                from its side. (Best for gpt-4 and bigger
                                models.)
                              </span>
                            </div>
                          </div>
                          <label className="flex justify-between items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <hr />
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <BiDialpad className="w-7 h-7 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize">
                                Dial keypad
                              </span>
                              <span className="text-xs">
                                This sets whether the assistant can dial digits
                                on the keypad.
                              </span>
                            </div>
                          </div>
                          <label className="flex justify-between items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <hr />
                        <div className="mt-2">
                          <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                            Forwarding Phone Number
                          </label>
                          <div className="flex">
                            <CFormSelect className="text-sm rounded-l-lg block w-auto p-2.5 mb-2">
                              <option>Select Country</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3" disabled>
                                Three
                              </option>
                            </CFormSelect>
                            <input
                              type="text"
                              className="text-sm rounded-r-lg block w-full p-2.5 mb-2"
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="py-3">
                          <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center capitalize">
                            end call phrases{" "}
                            <CTooltip
                              content="Enter phrases, separated by commas, that will trigger the bot to end the call when spoken. (End Call Phrases work well with gpt-3.5-turbo and smaller models.)"
                              placement="top"
                              className="bg-black w-[200px] rounded-xl p-2 text-wrap text-xs"
                            >
                              <ExclamationICon className="w-4 h-4 text-yellow-500 ml-4" />
                            </CTooltip>
                          </label>
                          <CFormInput
                            placeholder="Phrases that if spoken by the bot will end the call.Eg: goodbye"
                            className="text-sm rounded-lg block w-full p-2.5 mb-2"
                            type="text"
                          />
                        </div>
                        <hr />
                      </div>
                    </CCardBody>
                  </CCard>
                  <CCard>
                    <CCardBody className="bg-background/80">
                      <h1 className="font-extrabold">Custom Functions</h1>
                      <p>
                        Define your custom functions here to enhance your
                        assistant's capabilities. You can use your own code or
                        tools like Pipedream or Make for the setup.
                      </p>
                      <div
                        className="p-2 my-3 text-xs text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800"
                        role="alert"
                      >
                        Note: Functions are the same as tools, except they
                        follow older syntax as per the OpenAI Spec. Check our{" "}
                        <a href="/" className="font-semibold underline">
                          functions guide
                        </a>{" "}
                        for more details
                      </div>
                      <button
                        type="button"
                        disabled
                        // className="w-full border-3 border-dashed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        className="group text-text w-full flex items-center justify-center gap-2 bg-icon/30 border-2 border-dashed border-icon/50 rounded-xl p-3 hover:bg-icon/50 transition-all duration-150 ease-in-out active:border-2 active:border-dashed opacity-25 cursor-not-allowed border-black dark:border-gray-300"
                      >
                        Create a new function
                        <PlusICon className="w-5 h-5 ml-3" />
                      </button>
                    </CCardBody>
                  </CCard>
                </CTabPane>
              )}
              {activeKey === "advanced" && (
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="advanced-tab"
                  visible={activeKey === "advanced"}
                >
                  <CCard className="mt-5">
                    <CCardBody className="bg-background/80">
                      <h1 className="font-extrabold">Privacy</h1>
                      <p>
                        This section allows you to configure the privacy
                        settings for the assistant.
                      </p>
                      <div className="rounded-xl p-3 border bg-gray-200 dark:bg-[#1A1C1F] border-[#1A1C1F] dark:border-bg-gray-300 shadow mt-3">
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <LockIcon className="w-7 h-7 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize flex justify-start items-center">
                                HIPAA Compliance
                                <CTooltip
                                  content="HIPAA Compliance is enforced at the organization level and overrides individual settings."
                                  placement="top"
                                  className="bg-black w-[200px] rounded-xl p-2 text-wrap text-xs"
                                >
                                  <ExclamationICon className="w-4 h-4 text-yellow-500 ml-3" />
                                </CTooltip>
                              </span>
                              <span className="text-xs">
                                When this is enabled, no logs, recordings, or
                                transcriptions will be stored.
                              </span>
                            </div>
                          </div>
                          <label className="flex justify-between items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <hr />
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <MicrophoneIcon className="w-7 h-7 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize">
                                Audio Recording
                              </span>
                              <span className="text-xs">
                                Record the conversation with the assistant.
                              </span>
                            </div>
                          </div>
                          <label className="flex justify-between items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              checked
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <hr />
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <CameraIcon className="w-7 h-7 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize flex justify-start items-center">
                                Video Recording
                                <CTooltip
                                  content="Video recording is only possible on web calls."
                                  placement="top"
                                  className="bg-black w-[200px] rounded-xl p-2 text-wrap text-xs"
                                >
                                  <ExclamationICon className="w-4 h-4 text-yellow-500 ml-3" />
                                </CTooltip>
                              </span>
                              <span className="text-xs">
                                Enable or disable video recording during a web
                                call. This will record the video of your user.
                              </span>
                            </div>
                          </div>
                          <label className="flex justify-between items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              checked
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <hr />
                      </div>
                    </CCardBody>
                  </CCard>
                  <CCard className="mt-5">
                    <CCardBody className="bg-background/80">
                      <h1 className="font-extrabold">Pipeline Configuration</h1>
                      <p>
                        This section allows you to configure the pipeline
                        settings for the assistant.
                      </p>
                      <div className="rounded-xl p-3 border bg-gray-200 dark:bg-[#1A1C1F] border-[#1A1C1F] dark:border-bg-gray-300 shadow mt-3">
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <GiSandsOfTime className="w-7 h-6 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize">
                                Silence Timeout
                              </span>
                              <span className="text-xs">
                                How long to wait before a call is automatically
                                ended due to inactivity.
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end items-center">
                            <CFormRange
                              min={10}
                              max={600}
                              step={1}
                              value={silenceTimeout}
                              defaultValue={silenceTimeout}
                              onChange={(e) =>
                                setSilenceTimeout(e.target.value)
                              }
                              className="w-full h-1"
                            />
                            <div className="flex text-lg ml-4 text-primary rounded-xl bg-gray-200 dark:bg-[#14171A] shadow-sm shadow-black/10 transition-all duration-150 ease-in-out justify-center items-center min-w-[60px] min-h-[40px]">
                              {silenceTimeout}
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <LuTimerReset className="w-7 h-6 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize">
                                Response Delay
                              </span>
                              <span className="text-xs">
                                The minimum number of seconds the assistant
                                waits after user speech before it starts
                                speaking.
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end items-center">
                            <CFormRange
                              min={0}
                              max={2}
                              step={0.1}
                              value={responseDelay}
                              defaultValue={responseDelay}
                              onChange={(e) => setResponseDelay(e.target.value)}
                              className="w-full h-1"
                            />
                            <div className="flex text-lg ml-4 text-primary rounded-xl bg-gray-200 dark:bg-[#14171A] shadow-sm shadow-black/10 transition-all duration-150 ease-in-out justify-center items-center min-w-[60px] min-h-[40px]">
                              {responseDelay}
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <BiWifiOff className="w-7 h-6 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize">
                                LLM Request Delay
                              </span>
                              <span className="text-xs">
                                The minimum number of seconds to wait after
                                punctuation before sending a request to the LLM.
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end items-center">
                            <CFormRange
                              min={0}
                              max={3}
                              step={0.1}
                              value={LlmReqDelay}
                              defaultValue={LlmReqDelay}
                              onChange={(e) => setLlmReqDelay(e.target.value)}
                              className="w-full h-1"
                            />
                            <div className="flex text-lg ml-4 text-primary rounded-xl bg-gray-200 dark:bg-[#14171A] shadow-sm shadow-black/10 transition-all duration-150 ease-in-out justify-center items-center min-w-[60px] min-h-[40px]">
                              {LlmReqDelay}
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <TbRulerMeasure className="w-7 h-6 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize">
                                Interruption Threshold
                              </span>
                              <span className="text-xs">
                                The number of words the user must say before the
                                assistant considers being interrupted.
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end items-center">
                            <CFormRange
                              min={0}
                              max={10}
                              step={1}
                              value={interruption}
                              defaultValue={interruption}
                              onChange={(e) => setInterruption(e.target.value)}
                              className="w-full h-1"
                            />
                            <div className="flex text-lg ml-4 text-primary rounded-xl bg-gray-200 dark:bg-[#14171A] shadow-sm shadow-black/10 transition-all duration-150 ease-in-out justify-center items-center min-w-[60px] min-h-[40px]">
                              {interruption}
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <IoTimerOutline className="w-7 h-6 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize">
                                Maximum Duration
                              </span>
                              <span className="text-xs">
                                The maximum number of seconds a call will last.
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end items-center">
                            <CFormRange
                              min={10}
                              max={3600}
                              step={10}
                              value={maxDuration}
                              defaultValue={maxDuration}
                              onChange={(e) => setMaxDuration(e.target.value)}
                              className="w-full h-1"
                            />
                            <div className="flex text-lg ml-4 text-primary rounded-xl bg-gray-200 dark:bg-[#14171A] shadow-sm shadow-black/10 transition-all duration-150 ease-in-out justify-center items-center min-w-[60px] min-h-[40px]">
                              {maxDuration}
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    </CCardBody>
                  </CCard>
                  <CCard className="mt-5">
                    <CCardBody className="bg-background/80">
                      <h1 className="font-extrabold">Messaging</h1>
                      <p>
                        Message configuration for messages that are sent to and
                        from the assistant.
                      </p>
                      <div className="rounded-xl p-3 border bg-gray-200 dark:bg-[#1A1C1F] border-[#1A1C1F] dark:border-bg-gray-300 shadow mt-3">
                        <div>
                          <label className="text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                            Server Url
                          </label>
                          <div className="text-xs mb-1">
                            This is the URL Vapi will use to communicate
                            messages via HTTP POST Requests. This is used for
                            retrieving context, function calling, and
                            end-of-call reports.
                          </div>
                          <CFormInput
                            className="text-sm rounded-lg block w-full p-2.5 my-2"
                            placeholder="Endpoint URL to handle Server messages"
                          />
                        </div>
                        <hr />
                        <div className="mt-3">
                          <label className="text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                            Client Messages
                          </label>
                          <div className="text-xs mb-1">
                            These are the messages that will be sent to the
                            Client SDKs.
                          </div>
                          <Multiselect
                            isObject={false}
                            onRemove={(event) => {
                              console.log(event);
                            }}
                            onSelect={(event) => {
                              console.log(event);
                            }}
                            options={MESSAGES}
                            showCheckbox={true}
                            placeholder="Select Client Messages"
                            className="text-sm rounded-lg block w-full my-2 bg-white dark:bg-black border-none"
                          />
                        </div>
                        <hr />
                        <div className="mt-3">
                          <label className="text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                            Server Messages
                          </label>
                          <div className="text-xs mb-1">
                            These are the messages that will be sent to the
                            Server URL configured.
                          </div>
                          <Multiselect
                            isObject={false}
                            onRemove={(event) => {
                              console.log(event);
                            }}
                            onSelect={(event) => {
                              console.log(event);
                            }}
                            options={MESSAGES}
                            placeholder="Select Server Messages"
                            className="text-sm rounded-lg block w-full my-2 bg-white dark:bg-black border-none"
                          />
                        </div>
                        <hr />
                        <div className="my-2">
                          <label className="text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                            Voicemail Message
                          </label>
                          <div className="text-xs mb-1">
                            This is the message that the assistant will say if
                            the call is forwarded to voicemail.
                          </div>
                          <CFormInput
                            className="text-sm rounded-lg block w-full p-2.5 mt-2"
                            placeholder="Hey, can you please callback? Thanks!"
                          />
                        </div>
                        <hr />
                        <div className="my-2">
                          <label className="text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                            End Call Message
                          </label>
                          <div className="text-xs mb-1">
                            This is the message that the assistant will say if
                            it ends the call.
                          </div>
                          <CFormInput
                            className="text-sm rounded-lg block w-full p-2.5 mt-2"
                            placeholder="Goodbye!"
                          />
                        </div>
                        <hr />
                        <div className="my-2">
                          <label className="text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                            Idle Messages
                          </label>
                          <div className="text-xs mb-1">
                            Messages that the assistant will speak when the user
                            hasn't responded.
                          </div>
                          <Multiselect
                            isObject={false}
                            onRemove={(event) => {
                              console.log(event);
                            }}
                            onSelect={(event) => {
                              console.log(event);
                            }}
                            options={IDLEMESSAGES}
                            placeholder="Select Idle Messages"
                            className="text-sm rounded-lg block w-full my-2 bg-white dark:bg-black border-none"
                          />
                        </div>
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <MdLineStyle className="w-7 h-6 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize">
                                Max Idle Messages
                              </span>
                              <span className="text-xs">
                                Maximum number of times idle messages can be
                                spoken during the call.
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end items-center">
                            <CFormRange
                              min={1}
                              max={10}
                              step={1}
                              value={maxIdleMessages}
                              defaultValue={maxIdleMessages}
                              onChange={(e) =>
                                setMaxIdleMessages(e.target.value)
                              }
                              className="w-full h-1"
                            />
                            <div className="flex text-lg ml-4 text-primary rounded-xl bg-gray-200 dark:bg-[#14171A] shadow-sm shadow-black/10 transition-all duration-150 ease-in-out justify-center items-center min-w-[60px] min-h-[40px]">
                              {maxIdleMessages}
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className=" flex justify-between items-center py-3">
                          <div className="flex justify-start items-center">
                            <GiSandsOfTime className="w-7 h-6 mr-3" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm capitalize">
                                Idle Timeout
                              </span>
                              <span className="text-xs">
                                Timeout in seconds before an idle message is
                                spoken.
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end items-center">
                            <CFormRange
                              min={5}
                              max={10}
                              step={0.1}
                              value={idleTimeout}
                              defaultValue={idleTimeout}
                              onChange={(e) => setIdleTimeout(e.target.value)}
                              className="w-full h-1"
                            />
                            <div className="flex text-lg ml-4 text-primary rounded-xl bg-gray-200 dark:bg-[#14171A] shadow-sm shadow-black/10 transition-all duration-150 ease-in-out justify-center items-center min-w-[60px] min-h-[40px]">
                              {idleTimeout}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CCardBody>
                  </CCard>
                </CTabPane>
              )}
              {activeKey === "analysis" && (
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="analysis-tab"
                  visible={activeKey === "analysis"}
                >
                  <CCard>
                    <CCardBody className="bg-background/80">
                      <h1 className="font-extrabold">Summary</h1>
                      <p>
                        This is the prompt that's used to summarize the call.
                        The output is stored in call.analysis.summary. You can
                        also find the summary in the Call Logs Page.
                      </p>
                      <div className="rounded-xl p-3 bg-gray-200 dark:bg-[#1A1C1F] border-[#1A1C1F] dark:border-bg-gray-300 shadow border mt-3">
                        <div className="flex justify-start items-center">
                          <div className="w-full">
                            <div>
                              <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                                Prompt
                              </label>
                              <textarea
                                rows="6"
                                className="text-sm rounded-lg block w-full p-2.5"
                                placeholder="You are an expert note taker. You will be given a transcript of a call. Summarize the call in 2-3 sentences, if applicable."
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CCardBody>
                  </CCard>
                  <CCard className="mt-5">
                    <CCardBody className="bg-background/80">
                      <h1 className="font-extrabold">Success Evaluation</h1>
                      <p>
                        Evaluate if your call was successful. You can use Rubric
                        standalone or in combination with Success Evaluation
                        Prompt. If both are provided, they are concatenated into
                        appropriate instructions.
                      </p>
                      <div className="rounded-xl p-3 bg-gray-200 dark:bg-[#1A1C1F] border-[#1A1C1F] dark:border-bg-gray-300 shadow border mt-3">
                        <div className="flex justify-start items-center">
                          <div className="w-full">
                            <div>
                              <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                                Prompt
                              </label>
                              <p>
                                This is the prompt that's used to evaluate if
                                the call was successful.
                              </p>
                              <textarea
                                rows="6"
                                className="text-sm rounded-lg block w-full p-2.5"
                                placeholder="You are an expert note taker. You will be given a transcript of a call and the system prompt of the AI participant. Determine if the call was successful based on the objectives inferred from the system prompt"
                              ></textarea>
                            </div>
                            <hr />
                            <div className="mt-3">
                              <label className="text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                                Success Evaluation Rubric
                              </label>
                              <div className="text-xs mb-1">
                                This enforces the rubric of the evaluation upon
                                the Success Evaluation.
                              </div>
                              <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-2">
                                <option>
                                  Select Success Evaluation Rubric
                                </option>
                                <option value="1">
                                  Descriptive Sale | A sale of excellent, good,
                                  fair, poor.
                                </option>
                                <option value="2">
                                  Checklist | A checklist of criteria and their
                                  status.
                                </option>
                              </CFormSelect>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CCardBody>
                  </CCard>
                  <CCard className="mt-5">
                    <CCardBody className="bg-background/80">
                      <h1 className="font-extrabold">Structured Data</h1>
                      <p>
                        Extract structured data from call conversation. You can
                        use Data Schema standalone or in combination with
                        Structured Data Prompt. If both are provided, they are
                        concatenated into appropriate instructions.
                      </p>
                      <div className="rounded-xl p-3 bg-gray-200 dark:bg-[#1A1C1F] border-[#1A1C1F] dark:border-bg-gray-300 shadow border mt-3">
                        <div className="flex justify-start items-center">
                          <div className="w-full">
                            <div>
                              <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                                Prompt
                              </label>
                              <p>
                                This is the prompt that's used to extract
                                structured data from the call.
                              </p>
                              <textarea
                                rows="6"
                                className="text-sm rounded-lg block w-full p-2.5"
                                placeholder="You will be given a transcript of a call and the system prompt of the AI participant. Extract.."
                              ></textarea>
                            </div>
                            <hr />
                            {/* <div className="mt-3">
                              <label className="text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                                Data Scheme
                              </label>
                              <div className="text-xs mb-1">
                              This defines the structure of the data to be extracted. Add various properties you want in the Structured Data Output.
                              </div>
                              <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-2">
                                <option>
                                  Select Success Evaluation Rubric
                                </option>
                                <option value="1">
                                Descriptive Sale | A sale of excellent, good, fair, poor.
                                </option>
                                <option value="2">
                                Checklist | A checklist of criteria and their status.
                                </option>
                              </CFormSelect>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </CCardBody>
                  </CCard>
                </CTabPane>
              )}
            </CTabContent>
          </div>
        </div>
      )}
    </>
  );
};

export default Assistants;
