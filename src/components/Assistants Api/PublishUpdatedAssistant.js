import React from "react";
import { MdOutlineUpdate } from "react-icons/md";
import { toast } from "react-toastify";

export default function PublishUpdatedAssistant({
  setIsPublishUpdatedAssistant,
  isPublishUpdatedAssistant,
  assistantId,
  assistantObj,
}) {
  const handleupdateAssistant = () => {
    console.log(assistantObj);
    const provider = assistantObj.transcriber.provider;
    console.log(provider);
    const updateAssistant = async () => {
      try {
        const options = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer e39adb17-33cb-472b-87c2-97f7ee91139f`, //${process.env.VAPI_PRIVATE_KEY}
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transcriber: {
              provider: "deepgram",
              model: assistantObj.transcriber.model,
              language: assistantObj.transcriber.language,
              smartFormat: true,
              keywords: ["Vapi:2", "assistant"],
            },
            model: {
              provider: assistantObj.model.provider,
              model: assistantObj.model.model,
              messages: [
                {
                  role: assistantObj.model.messages[0].role,
                  content: assistantObj.model.messages[0].content,
                },
              ],
              tools: [
                {
                  type: assistantObj.model.tools[0].type,
                  messages: [
                    {
                      type: "request-start",
                      content: "Checking the information. Please wait...",
                    },
                    {
                      type: "request-complete",
                      content: "I've found the information you requested.",
                    },
                    {
                      type: "request-failed",
                      content:
                        "I'm sorry, I couldn't retrieve the information at this time.",
                    },
                  ],
                  function: {
                    name: "get_info",
                    parameters: {
                      type: assistantObj.model.tools[0].function.parameters
                        .type,
                      properties: {
                        query: {
                          type: "string",
                        },
                      },
                    },
                    description:
                      assistantObj.model.tools[0].function.description,
                  },
                  async: assistantObj.model.tools[0].async,
                  server: {
                    url: "https://your-api-endpoint.com/get-info",
                  },
                },
              ],
            },
            voice: {
              voiceId: assistantObj.voice.voiceId,
              provider: assistantObj.voice.provider,
            },
            firstMessage: assistantObj.firstMessage,
            recordingEnabled: assistantObj.recordingEnabled,
            serverUrl: "https://your-server-url.com/webhook",
            forwardingPhoneNumber: assistantObj.forwardingPhoneNumber,
          }),
        };

        const response = await fetch(
          `https://api.vapi.ai/assistant/${assistantId}`,
          options
        );
        // const result = await response.json();
        // console.log(result);

        if (response.ok) {
          toast.success("Assistant Updated!!");
          setIsPublishUpdatedAssistant(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    updateAssistant();
  };

  return (
    <>
      {isPublishUpdatedAssistant && (
        <div
          id="updateModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed pt-96 md:pt-20 inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button
                type="button"
                onClick={() => setIsPublishUpdatedAssistant(false)}
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <MdOutlineUpdate className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                Are you sure you want to update this item?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setIsPublishUpdatedAssistant(false)}
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900"
                  onClick={handleupdateAssistant}
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// const Squads = () => {
//     const handleEdit = () => {
//   const options = {
//     method: "PATCH",
//     headers: {
//       Authorization: "Bearer 32ce8935-a261-4732-a3af-d2cd6eaecdfb",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       "transcriber": {
//         "provider": "deepgram",
//         "model": "nova-2",
//         "language": "en",
//         "smartFormat": true,
//         "keywords": ["Vapi:2", "assistant:1.5"]
//       },
//       "model": {
//         "provider": "openai",
//         "model": "gpt-4",
//         "messages": [
//           {
//             "role": "system",
//             "content": "You're a technical support assistant for Vapi."
//           }
//         ],
//         "tools": [
//           {
//             "type": "function",
//             "messages": [
//               {
//                 "type": "request-start",
//                 "content": "Checking the information. Please wait..."
//               },
//               {
//                 "type": "request-complete",
//                 "content": "I've found the information you requested."
//               },
//               {
//                 "type": "request-failed",
//                 "content": "I'm sorry, I couldn't retrieve the information at this time."
//               }
//             ],
//             "function": {
//               "name": "get_info",
//               "parameters": {
//                 "type": "object",
//                 "properties": {
//                   "query": {
//                     "type": "string"
//                   }
//                 }
//               },
//               "description": "Retrieves information based on the user's query."
//             },
//             "async": false,
//             "server": {
//               "url": "https://your-api-endpoint.com/get-info"
//             }
//           }
//         ]
//       },
//       "voice": {
//         "voiceId": "emma",
//         "provider": "azure"
//       },
//       "firstMessage": "Hello, I'm an AI assistant for Vapi. How can I help you today?",
//       "recordingEnabled": true,
//       "serverUrl": "https://your-server-url.com/webhook",
//       "forwardingPhoneNumber": "+11234567890"
//     })

//   };

//       fetch(
//         "https://api.vapi.ai/assistant/4d96f340-bf16-41f0-a9c4-1022d913d7e5",
//         options
//       )
//         .then((response) => response.json())
//         .then((response) => console.log(response))
//         .catch((err) => console.error(err));
//     };
//     return (
//       <div>
//         <button onClick={handleEdit}>Edit Squad</button>
//       </div>
//     );
//   };

//   export default Squads;
