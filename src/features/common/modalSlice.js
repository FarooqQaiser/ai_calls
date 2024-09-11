import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    title: "", // current  title state management
    isOpen: false, // modal state management for opening closing
    bodyType: "", // modal content management
    size: "", // modal content management
    extraObject: {},
    showDetail: false,
    setShowDetail: () => {},
  },
  reducers: {
    openModal: (state, action) => {
      const { title, bodyType, extraObject, size, showDetail, setShowDetail } =
        action.payload;
      state.isOpen = true;
      state.bodyType = bodyType;
      state.title = title;
      state.size = size || "md";
      state.extraObject = extraObject;
      state.showDetail = showDetail;
      state.setShowDetail = setShowDetail;
    },

    closeModal: (state, action) => {
      state.isOpen = false;
      state.bodyType = "";
      state.title = "";
      state.extraObject = {};
    },

    setShowDetail: (state, action) => {
      state.showDetail = state.showDetail == true ? false : true;
    },
  },
});

export const { openModal, closeModal, setShowDetail } = modalSlice.actions;

export default modalSlice.reducer;
