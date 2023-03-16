import { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
 

export interface RouteInterface {
	name: string;
	path: string;
	component: ReactNode;
	index?: boolean;
	children?: RouteInterface[];
}
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

export default router