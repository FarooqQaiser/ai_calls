import React, { useState, useEffect } from "react";
import { RiVoiceprintLine } from "react-icons/ri";
import ControlDiv from "../../components/Voice Library Components/ControlDiv";
import PrivateVoicesAccordion from "../../components/Voice Library Components/PrivateVoicesAccordion";
import PublicVoicesAccordion from "../../components/Voice Library Components/PublicVoicesAccordion";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import PrivateVoices from "../../components/Voice Library Components/PrivateVoices";
import PublicVoices from "../../components/Voice Library Components/PublicVoices";
import { InfinitySpin } from "react-loader-spinner";
import { setPageTitle } from "../../features/common/headerSlice";
import { useDispatch } from "react-redux";
const VoiceLibrary = () => {
  const publicVoices = [
    "Public Voice 1",
    "Public Voice 1",
    "Public Voice 1",
    "Public Voice 1",
    "Public Voice 1",
    "Public Voice 1",
    "Public Voice 1",
    "Public Voice 1",
    "Public Voice 1",
    "Public Voice 1",
  ];
  const privateVoices = [
    "Private Voice 1",
    "Private Voice 1",
    "Private Voice 1",
    "Private Voice 1",
    "Private Voice 1",
    "Private Voice 1",
    "Private Voice 1",
    "Private Voice 1",
    "Private Voice 1",
    "Private Voice 1",
  ];

  const [privateButtonClicked, setPrivateButtonClicked] = useState(false);
  const [publicButtonClicked, setPublicButtonClicked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle({ title: "Voice Library" }));
  }, []);

  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <RiVoiceprintLine className="w-8 h-8 p-2 rounded-lg dark:bg-[#1D232A] bg-[#FFFFFF]" />
        <p className="text-lg font-semibold">Voice Library</p>
      </div>
      <div className="p-5 flex flex-col gap-y-5">
        <ControlDiv />
        {privateVoices !== null && publicVoices !== null ? (
          <>
            <Accordion
              allowZeroExpanded
              allowMultipleExpanded
              className="flex flex-col gap-2"
            >
              <AccordionItem>
                <AccordionItemHeading
                  onClick={() => setPrivateButtonClicked(!privateButtonClicked)}
                >
                  <AccordionItemButton>
                    <PrivateVoicesAccordion
                      privateButtonClicked={privateButtonClicked}
                    />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="sm:grid sm:grid-cols-2 sm:gap-x-2 md:grid-cols-3">
                    {privateVoices.map((privateVoice, index) => {
                      return (
                        <PrivateVoices
                          privateVoice={privateVoice}
                          key={index}
                        />
                      );
                    })}
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading
                  onClick={() => setPublicButtonClicked(!publicButtonClicked)}
                >
                  <AccordionItemButton>
                    <PublicVoicesAccordion
                      publicButtonClicked={publicButtonClicked}
                    />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="sm:grid sm:grid-cols-2 sm:gap-x-2 md:grid-cols-3">
                    {publicVoices.map((publicVoice, index) => {
                      return (
                        <PublicVoices publicVoice={publicVoice} key={index} />
                      );
                    })}
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </>
        ) : (
          <>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <InfinitySpin
                visible={true}
                width="200"
                color="#1E40AF"
                ariaLabel="infinity-spin-loading"
              />
              {/* <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#1E40AF"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            /> */}
              <p className="">Loading Data...</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VoiceLibrary;
