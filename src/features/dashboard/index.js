import DashboardStats from "./components/DashboardStats";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";

import UserChannels from "./components/UserChannels";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import TitleCard from "../../components/Cards/TitleCard";
import {
  MdOutlineTimer,
  MdPhoneForwarded,
  MdMoney,
  MdAttachMoney,
  MdOutlinePhoneInTalk,
} from "react-icons/md";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { CRow, CCol } from "@coreui/react";
import { VAPI_API_URL } from "../../store";

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend);
function Dashboard() {
  const dispatch = useDispatch();
  const date = new Date();
  const [token, setToken] = useState(localStorage.getItem("token")); //oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneWeekAgo = date.setDate(date.getDate() - 7);
  const [startDate, setStartDate] = useState(
    new Date(oneWeekAgo).toISOString()
  );
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [totalCallMins, setTotalCallMins] = useState("0");
  const [noOfCalls, setNoOfCalls] = useState("0");
  const [totalSpent, setTotalSpent] = useState("0.00");
  const [costPerProvider, setCostPerProvider] = useState("0.00");
  const [averageCost, setAverageCost] = useState("0.00");
  const [assistants, setAssistants] = useState([]);
  const [assistantCalls, setAssistantCalls] = useState([]);
  const [failedCalls, setFailedCalls] = useState([]);
  const [endCalllabels, setEndCalllabels] = useState([]);
  const [endCallData, setEndCallData] = useState([]);
  const [assistantsName, setAssistantsName] = useState([]);
  const [assistantsNameData, setAssistantsNameData] = useState([]);
  const [assistantsDurData, setAssistantsDurData] = useState([]);

  const updateDashboardPeriod = (newRange) => {
    // Dashboard range changed, write code to refresh your values
    setStartDate(new Date(newRange.startDate).toISOString());
    setEndDate(new Date(newRange.endDate).toISOString());

    analytics();
    dispatch(
      showNotification({
        message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
        status: 1,
      })
    );
  };
  const options = {
    responsive: true,
    plugins: {
      legend: false,
    },
  };

  const labels = [
    "Electronics",
    "Home Applicances",
    "Beauty",
    "Furniture",
    "Watches",
    "Apparel",
  ];

  const reasonData = {
    labels: endCalllabels,
    datasets: [
      {
        data: endCallData.slice(0, endCalllabels.length),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };
  const averageCallData = {
    labels: assistantsNameData,
    datasets: [
      {
        label: "Minutes",
        data: assistantsDurData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setToken(getToken);
      analytics();
    }
  }, []);

  const getAssistantName = async (id, index, duration) => {
    const getCallsCount = assistantCalls.filter(
      (item) => item.assistantId == id
    )[0];
    console.log("get call count", getCallsCount);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_TOKEN}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const res = await fetch(VAPI_API_URL + "assistant/" + id, requestOptions);
    const resdata = await res.json();
    const addObject = {
      id: id,
      name: resdata.name ? resdata.name : "Unknown",
      avgDuration: duration,
      count: getCallsCount.countId,
    };
    if (!assistantsName.find((item) => item.id === id)) {
      assistantsName.push(addObject);
    } else {
      const valueIndex = assistantsName.findIndex((obj) => obj.id == id);
      assistantsName[valueIndex].duration =
        assistantsName[valueIndex].duration + duration;
      assistantsName[valueIndex].count =
        parseInt(assistantsName[valueIndex].count) +
        parseInt(getCallsCount.countId);
    }
    setAssistantsName(assistantsName);
    let getNames = assistantsName.map((a) => a.name);
    let getDuration = assistantsName.map((a) => a.avgDuration);
    setAssistantsNameData(getNames);
    setAssistantsDurData(getDuration);
  };

  const analytics = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_TOKEN}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      queries: [
        {
          name: "LLM, STT, TTS, VAPI Costs",
          table: "call",
          operations: [
            {
              operation: "sum",
              column: "costBreakdown.llm",
            },
            {
              operation: "sum",
              column: "costBreakdown.stt",
            },
            {
              operation: "sum",
              column: "costBreakdown.tts",
            },
            {
              operation: "sum",
              column: "costBreakdown.vapi",
            },
          ],
          timeRange: {
            start: startDate,
            end: endDate,
            step: "day",
            timezone: "UTC",
          },
        },
        {
          name: "Total Call Duration",
          table: "call",
          operations: [
            {
              operation: "sum",
              column: "duration",
            },
          ],
          timeRange: {
            start: startDate,
            end: endDate,
            step: "day",
            timezone: "UTC",
          },
        },
        {
          name: "Cost Per Provider",
          table: "call",
          operations: [
            {
              operation: "sum",
              column: "cost",
            },
          ],
          timeRange: {
            start: startDate,
            end: endDate,
            step: "day",
            timezone: "UTC",
          },
        },
        {
          name: "Average Call Cost",
          table: "call",
          operations: [
            {
              operation: "avg",
              column: "cost",
            },
          ],
          timeRange: {
            start: startDate,
            end: endDate,
            step: "day",
            timezone: "UTC",
          },
        },
        {
          name: "Number of Calls by Type",
          table: "call",
          operations: [
            {
              operation: "count",
              column: "id",
            },
          ],
          groupBy: ["type"],
          timeRange: {
            start: startDate,
            end: endDate,
            step: "day",
            timezone: "UTC",
          },
        },
        {
          name: "Number of Failed Calls",
          table: "call",
          operations: [
            {
              operation: "count",
              column: "id",
            },
          ],
          groupBy: ["endedReason"],
          timeRange: {
            start: startDate,
            end: endDate,
            step: "day",
            timezone: "UTC",
          },
        },
        {
          name: "Number of Calls by Assistant",
          table: "call",
          operations: [
            {
              operation: "count",
              column: "id",
            },
          ],
          groupBy: ["assistantId"],
          timeRange: {
            start: startDate,
            end: endDate,
            step: "day",
            timezone: "UTC",
          },
        },
        {
          name: "Average Call Duration by Assistant",
          table: "call",
          operations: [
            {
              operation: "avg",
              column: "duration",
            },
          ],
          groupBy: ["assistantId"],
          timeRange: {
            start: startDate,
            end: endDate,
            step: "day",
            timezone: "UTC",
          },
        },
        {
          name: "Total Minutes",
          table: "call",
          operations: [
            {
              operation: "sum",
              column: "duration",
            },
          ],
          timeRange: {
            start: startDate,
            end: endDate,
            step: "day",
            timezone: "UTC",
          },
        },
        {
          name: "Total Spent",
          table: "call",
          operations: [
            {
              operation: "sum",
              column: "cost",
            },
          ],
          timeRange: {
            start: startDate,
            end: endDate,
            step: "day",
            timezone: "UTC",
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(VAPI_API_URL + "analytics", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // total call minutes
        let totalMins = result.filter((res) => res.name == "Total Minutes")[0];
        if (totalMins.result?.length > 0) {
          let totalMinSum;
          totalMinSum = totalMins.result?.reduce(function (prev, current) {
            return parseInt(prev + +current.sumDuration);
          }, 0);
          setTotalCallMins(totalMinSum);
        }
        // number of calls
        let callNo = result.filter(
          (res) => res.name == "Number of Calls by Assistant"
        )[0];
        setNoOfCalls(callNo.result?.length);

        // total spent
        let spentTotal = result.filter((res) => res.name == "Total Spent")[0];
        if (spentTotal.result?.length > 0) {
          let totalSpentSum;
          totalSpentSum = spentTotal.result?.reduce(function (prev, current) {
            return parseInt(prev + +current.sumCost);
          }, 0);
          setTotalSpent(totalSpentSum);
        }

        // Cost Per Provider
        let costPerProvider = result.filter(
          (res) => res.name == "Cost Per Provider"
        )[0];
        if (costPerProvider.result?.length > 0) {
          let costProviderSum;
          costProviderSum = costPerProvider.result?.reduce(function (
            prev,
            current
          ) {
            return parseInt(prev + +current.sumCost);
          },
          0);
          setCostPerProvider(costProviderSum);
        }

        // average cost per call
        let costAvg = result.filter(
          (res) => res.name == "Average Call Cost"
        )[0];
        if (costAvg.result?.length > 0) {
          let avgCostSum;
          avgCostSum = costAvg.result?.reduce(function (prev, current) {
            return parseInt(prev + +current.avgCost);
          }, 0);
          setAverageCost(avgCostSum);
        }

        // Number of Calls by Assistant
        let assistantCalls = result.filter(
          (res) => res.name == "Number of Calls by Assistant"
        )[0];
        setAssistantCalls(assistantCalls.result);

        // assistants
        let assistantsData = result.filter(
          (res) => res.name == "Average Call Duration by Assistant"
        )[0];
        if (assistantsData.result?.length > 0) {
          setAssistants(assistantsData.result);
          assistantsData.result.map((data, index) => {
            getAssistantName(data.assistantId, index, data.avgDuration);
          });
        }

        // Number of Failed Calls
        let failedCallsData = result.filter(
          (res) => res.name == "Number of Failed Calls"
        )[0];
        setFailedCalls(failedCallsData.result);
        if (failedCallsData.result?.length > 0) {
          // set labels array
          failedCallsData.result?.map((data) => {
            if (!endCalllabels.find((item) => item === data.endedReason)) {
              // search by id
              endCalllabels.push(data.endedReason);
            }
          });
          setEndCalllabels(endCalllabels);
          // set data for donut chart
          endCalllabels.map((reason) => {
            endCallData.push(
              failedCallsData.result?.filter((d) => d.endedReason == reason)
                .length
            );
          });
          setEndCallData(endCallData);
        }
      })

      .catch((error) => console.error(error));
  };

  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        <DashboardStats
          title="Total Call Minutes"
          value={totalCallMins}
          Icon={MdOutlineTimer}
          description="↙ -92.50%"
          colorIndex={0}
        />
        <DashboardStats
          title="Number of Calls"
          value={noOfCalls}
          Icon={MdPhoneForwarded}
          description="↙ 83.33%"
          colorIndex={1}
        />
        <DashboardStats
          title="Total Spent"
          value={`$${totalSpent}`}
          Icon={MdMoney}
          description="↙ 95.81%"
          colorIndex={1}
        />
        <DashboardStats
          title="Average Cost per Call"
          value={`$${averageCost}`}
          Icon={MdAttachMoney}
          description="↙ 74.87%"
          colorIndex={1}
        />
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart />
        <BarChart />
      </div> */}

      {/** ---------------------- User source channels table  ------------------------- */}
      <div className="grid lg:grid-cols-3 mt-4 grid-cols-1 gap-6 mb-0">
        <div className="flex justify-start items-center col-span-2 mb-0">
          <MdOutlinePhoneInTalk className="w-9 h-9 mr-3" />
          <div className="flex flex-col">
            <p className="text-lg font-bold mt-0">Call Analysis</p>
            <p className="text-xs mt-0 mb-4">
              Here you can get a quick overview of how your calls are going
              within organization.
            </p>
          </div>
        </div>
        <div className="flex justify-start items-center mb-0">
          <FaUsersBetweenLines className="w-9 h-9 mr-3 -mt-2" />
          <div className="flex flex-col">
            <p className="text-lg font-bold mt-0">Assistants Table</p>
            <p className="text-xs mt-0 mb-4">
              Total and average call duration aggregated by assistants.
            </p>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 col-span-2">
          <TitleCard topMargin="mt-0">
            <p className="text-lg font-bold mt-0">Call Ended Reason</p>
            <p className="text-xs mt-0 mb-4">
              Call aggregated by the reason of why the call ended.
            </p>
            <Doughnut options={options} data={reasonData} />
          </TitleCard>
          <TitleCard topMargin="mt-0">
            <p className="text-lg font-bold mt-0">
              Average Call Duration By Assistance
            </p>
            <p className="text-xs mt-0 mb-4">
              Average call duration by assistance in minutes.
            </p>
            <Doughnut options={options} data={averageCallData} />
          </TitleCard>
        </div>
        <UserChannels data={assistants} names={assistantsName} />
      </div>

      {/** ---------------------- Different stats content 2 ------------------------- */}

      <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        {/* <AmountStats/> */}
        <DashboardStats
          title="Cost per Provider"
          value={`$${costPerProvider}`}
          Icon={"span"}
          description="↙ -92.50%"
          colorIndex={5}
        />
        {/* <PageStats /> */}
      </div>
    </>
  );
}

export default Dashboard;
