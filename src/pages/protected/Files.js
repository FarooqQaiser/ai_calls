import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

const Files = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle({ title: "Files" }));
  }, [dispatch]);
  return <div>Files</div>;
};

export default Files;
