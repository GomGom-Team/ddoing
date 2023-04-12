import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./configStore";

// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppDispatch: () => AppDispatch = useDispatch;

// useSelect에 별도의 RootState 타입을 안붙이기 위한 useAppSelect 생성
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
