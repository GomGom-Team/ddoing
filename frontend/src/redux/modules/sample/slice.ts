import { createSlice } from '@reduxjs/toolkit';

// 3. 사용할 State를 정의하는 Slice 만들기
const studioSampleSlice = createSlice({
 name:'studioSampleSlice',

 // initialState => State의 초기값
 initialState:{
   teacherId: 0,
   studioName: "초기값",
   studioDesc: "초기값",
   studioList: [],
 },

 // reducers => State를 바꿀 수 있는 모든 함수(= action) 정의
 reducers: {
   changeStudioName:(state, action) => {
     const newStudioName = action.payload;
     state.studioName = newStudioName;
   },
   changeStudioDesc:(state, action) => {
     const newStudioDesc = action.payload;
     state.studioDesc = newStudioDesc;
   },
   addStudioToList:(state, action) => {
     const newStudio = action.payload;
     state.studioList = [...state.studioList, newStudio];
   }
 },

 // extraReducers => Axios 함수의 상태(Success, Failed, Pending)에 따른 동작 정의
 extraReducers: {
   [getStudio.fulfilled]: (state, {payload}) => {
     console.log("get Studio", payload);
     state.studioName = payload.title;
     state.studioDesc = payload.body;
   },
   [createStudio.fulfilled]: (state, {payload}) => {
     console.log("create Studio", payload);
     alert("Studio created!");
   }
 }
});



/**
* 4. 만든 Slice, action을 다른 곳에서 사용할 수 있도록 export
*/

// Slice는 default로 export 하기
export default studioSampleSlice;

// 일반 action export 하기
export const { changeStudioName, changeStudioDesc, addStudioToList } = studioSampleSlice.actions;

// Axios 비동기 action export 하기
export { getStudio, createStudio };