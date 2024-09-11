import React, { useState, useEffect } from "react";
import QuickStart from "../../../components/SVGs/QuickStart";
import PlusIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";
import ChatBubbleLeftRightIcon from "@heroicons/react/24/outline/ChatBubbleLeftRightIcon";
import PuzzlePieceIcon from "@heroicons/react/24/outline/PuzzlePieceIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import { VAPI_API_URL } from "../../../store";
function CreateAssistant() {
  const [assistantName, setAssistantName] = useState("");
  const [template, setTemplate] = useState("Blank");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    console.log("template name", template);
  }, [template]);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setToken(getToken);
    }
  }, []);

  // const payload = {
  //   orgId: process.env.REACT_APP_ORG_ID,
  // };

  // // Get the private key from environment variables
  // const key = process.env.REACT_APP_PRIVATE_KEY;

  // // Define token options
  // const options = {
  //   expiresIn: "1h",
  // };

  // // Generate the token using a JWT library or built-in functionality
  // const token = generateJWT(payload, key, options);

  const createAssistant = () => {
    console.log(assistantName, template);
    // const raw = JSON.stringify({
    //   transcriber: {
    //     provider: "deepgram",
    //     model: "nova-2",
    //     language: "bg",
    //     smartFormat: false,
    //     keywords: [""],
    //     endpointing: 255,
    //   },
    //   model: {
    //     messages: [{ content: "", role: "assistant" }],
    //     tools: [
    //       {
    //         async: false,
    //         messages: [
    //           {
    //             type: "request-start",
    //             content: "",
    //             conditions: [{ value: "", operator: "eq", param: "" }],
    //           },
    //         ],
    //         type: "dtmf",
    //         function: {
    //           name: "",
    //           description: "",
    //           parameters: {
    //             type: "object",
    //             properties: {},
    //             required: [""],
    //           },
    //         },
    //         server: { timeoutSeconds: 20, url: "", secret: "" },
    //       },
    //     ],
    //     toolIds: [""],
    //     provider: "anyscale",
    //     model: "",
    //     temperature: 1,
    //     knowledgeBase: {
    //       provider: "canonical",
    //       topK: 5.5,
    //       fileIds: [""],
    //     },
    //     maxTokens: 525,
    //     emotionRecognitionEnabled: true,
    //     numFastTurns: 1,
    //   },
    //   voice: {
    //     fillerInjectionEnabled: false,
    //     provider: "azure",
    //     voiceId: "andrew",
    //     speed: 1.25,
    //     chunkPlan: {
    //       enabled: true,
    //       minCharacters: 30,
    //       punctuationBoundaries: [
    //         "。",
    //         "，",
    //         ".",
    //         "!",
    //         "?",
    //         ";",
    //         "،",
    //         "۔",
    //         "।",
    //         "॥",
    //         "|",
    //         "||",
    //         ",",
    //         ":",
    //       ],
    //       formatPlan: { enabled: true, numberToDigitsCutoff: 2025 },
    //     },
    //   },
    //   firstMessageMode: "assistant-speaks-first",
    //   recordingEnabled: true,
    //   hipaaEnabled: false,
    //   clientMessages: [
    //     "conversation-update",
    //     "function-call",
    //     "hang",
    //     "model-output",
    //     "speech-update",
    //     "status-update",
    //     "transcript",
    //     "tool-calls",
    //     "user-interrupted",
    //     "voice-input",
    //   ],
    //   serverMessages: [
    //     "conversation-update",
    //     "end-of-call-report",
    //     "function-call",
    //     "hang",
    //     "speech-update",
    //     "status-update",
    //     "tool-calls",
    //     "transfer-destination-request",
    //     "user-interrupted",
    //   ],
    //   silenceTimeoutSeconds: 30,
    //   maxDurationSeconds: 600,
    //   backgroundSound: "office",
    //   backchannelingEnabled: false,
    //   backgroundDenoisingEnabled: false,
    //   modelOutputInMessagesEnabled: false,
    //   transportConfigurations: [
    //     {
    //       provider: "twilio",
    //       timeout: 60,
    //       record: false,
    //       recordingChannels: "mono",
    //     },
    //   ],
    //   name: assistantName,
    //   firstMessage: "",
    //   voicemailDetection: {
    //     provider: "twilio",
    //     voicemailDetectionTypes: ["machine_end_beep", "machine_end_silence"],
    //     enabled: true,
    //     machineDetectionTimeout: 31,
    //     machineDetectionSpeechThreshold: 3500,
    //     machineDetectionSpeechEndThreshold: 2750,
    //     machineDetectionSilenceTimeout: 6000,
    //   },
    //   voicemailMessage: "",
    //   endCallMessage: "",
    //   endCallPhrases: [""],
    //   metadata: {},
    //   serverUrl: "",
    //   serverUrlSecret: "",
    //   analysisPlan: {
    //     summaryPrompt: "",
    //     summaryRequestTimeoutSeconds: 10.5,
    //     structuredDataRequestTimeoutSeconds: 10.5,
    //     successEvaluationPrompt: "",
    //     successEvaluationRubric: "NumericScale",
    //     successEvaluationRequestTimeoutSeconds: 10.5,
    //     structuredDataPrompt: "",
    //     structuredDataSchema: {
    //       type: "string",
    //       items: {},
    //       properties: {},
    //       description: "",
    //       required: [""],
    //     },
    //   },
    //   artifactPlan: {
    //     videoRecordingEnabled: true,
    //     recordingS3PathPrefix: "",
    //   },
    //   messagePlan: {
    //     idleMessages: [""],
    //     idleMessageMaxSpokenCount: 5.5,
    //     idleTimeoutSeconds: 17.5,
    //   },
    //   startSpeakingPlan: {
    //     waitSeconds: 0.4,
    //     smartEndpointingEnabled: false,
    //     transcriptionEndpointingPlan: {
    //       onPunctuationSeconds: 0.1,
    //       onNoPunctuationSeconds: 1.5,
    //       onNumberSeconds: 0.5,
    //     },
    //   },
    //   stopSpeakingPlan: { numWords: 0, voiceSeconds: 0.2, backoffSeconds: 1 },
    //   credentialIds: [""],
    // });

    const raw = JSON.stringify({
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        messages: [
          {
            content:
              "This is a blank template with minimal defaults, you can change the model, temperature, and messages.",
            role: "system",
          },
        ],
      },
      voice: {
        provider: "cartesia",
        voiceId: "248be419-c632-4f23-adf1-5324ed7dbf1d",
      },
      name: assistantName,
    });

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: raw,
    };

    fetch(VAPI_API_URL + "assistant", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  return (
    <div className="my-3">
      <h6 className="font-bold">Choose a template</h6>
      <p>
        Here's a few templates to get you started, or you can create your own
        template and use it to create a new assistant.
      </p>
      <div className="mb-4">
        <label
          for="assistant_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Assistant Name{" "}
          <span className="text-yellow-600">
            (This can be adjusted at any time after creation.)
          </span>
        </label>
        <input
          type="text"
          id="assistant_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="New Assistant"
          required
          value={assistantName}
          onChange={(e) => setAssistantName(e.target.value)}
        />
      </div>
      <div
        className={`group w-full hover:bg-background cursor-pointer rounded-xl  overflow-hidden transition-all duration-150 ease-in-out active:scale-[0.99] flex flex-col bg-hover border mb-8 ${
          template == "Blank"
            ? "border-[#5D17EB] border-[4px]"
            : "border-border"
        }`}
      >
        <div
          className="flex flex-row h-full p-3 gap-x-4 bg-foreground/5 justify-start items-center"
          onClick={() => setTemplate("Blank")}
        >
          <PlusIcon className="h-8 w-8" />
          <div className="flex flex-col gap-y-1">
            <p className="font-medium text-md text-text">Blank Template</p>
            <p className="text-xs text-text/60">
              This blank slate template with minimal configurations. It's a
              starting point for creating your custom assistant.
            </p>
          </div>
        </div>
      </div>

      <div className="relative p-4 grid grid-cols-2 bg-background/30 border-[2px] border-gray-600 rounded-2xl gap-4 mt-2">
        <div className="absolute top-[-16px] left-[15px]">
          <QuickStart />
        </div>
        <div
          className={`w-full bg-foreground hover:bg-background cursor-pointer rounded-xl border overflow-hidden transition-all duration-150 ease-in-out active:scale-[0.98] flex flex-col ${
            template == "Appointment Setter"
              ? "border-[#5D17EB] border-[4px]"
              : "border-border"
          }`}
          onClick={() => setTemplate("Appointment Setter")}
        >
          <div className="flex flex-col h-full p-3 gap-x-4 bg-foreground/5">
            <QueueListIcon className="h-8 w-8" />
            <div className="flex flex-col gap-y-1">
              <p className="font-medium text-md text-text">
                {" "}
                Appointment Setter
              </p>
              <p className="text-xs text-muted-foreground">
                Designed for dental practices to demonstrate setting
                appointments. It streamlines scheduling, answers common
                questions, and provides service information.
              </p>
            </div>
          </div>
        </div>
        <div
          className={`w-full bg-foreground hover:bg-background cursor-pointer rounded-xl border overflow-hidden transition-all duration-150 ease-in-out active:scale-[0.98] flex flex-col ${
            template == "Customer Support"
              ? "border-[#5D17EB] border-[4px]"
              : "border-border"
          }`}
          onClick={() => setTemplate("Customer Support")}
        >
          <div className="flex flex-col h-full p-3 gap-x-4 bg-foreground/5">
            <UserGroupIcon className="h-8 w-8" />
            <div className="flex flex-col gap-y-1">
              <p className="font-medium text-md text-text"> Customer Support</p>
              <p className="text-xs text-muted-foreground">
                A versatile template designed with a perfect mix of emotional
                intelligence and technical knowledge. Ideal for empathetic,
                efficient customer support.
              </p>
            </div>
          </div>
        </div>
        <div
          className={`w-full bg-foreground hover:bg-background cursor-pointer rounded-xl border overflow-hidden transition-all duration-150 ease-in-out active:scale-[0.98] flex flex-col ${
            template == "Inbound Q/A"
              ? "border-[#5D17EB] border-[4px]"
              : "border-border"
          }`}
          onClick={() => setTemplate("Inbound Q/A")}
        >
          <div className="flex flex-col h-full p-3 gap-x-4 bg-foreground/5">
            <ChatBubbleLeftRightIcon className="h-8 w-8" />
            <div className="flex flex-col gap-y-1">
              <p className="font-medium text-md text-text"> Inbound Q/A</p>
              <p className="text-xs text-muted-foreground">
                An inbound call agent example designed to provide comprehensive
                support for SmartHome Innovations. With a deep understanding of
                product details and troubleshooting.
              </p>
            </div>
          </div>
        </div>
        <div
          className={`w-full bg-foreground hover:bg-background cursor-pointer rounded-xl border overflow-hidden transition-all duration-150 ease-in-out active:scale-[0.98] flex flex-col ${
            template == "Game NPC"
              ? "border-[#5D17EB] border-[4px]"
              : "border-border"
          }`}
          onClick={() => setTemplate("Game NPC")}
        >
          <div className="flex flex-col h-full p-3 gap-x-4 bg-foreground/5">
            <PuzzlePieceIcon className="h-8 w-8" />
            <div className="flex flex-col gap-y-1">
              <p className="font-medium text-md text-text"> Game NPC</p>
              <p className="text-xs text-muted-foreground">
                An assistant for demonstrating an in-game NPC, Elenya is
                designed to offer guidance, lore, and insights into the
                mysteries of the natural world.
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={createAssistant}
        className="mt-3 float-right text-white bg-[#5D17EB] hover:bg-[#5e17ebdd] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Create Assistant
      </button>
    </div>
  );
}

export default CreateAssistant;
