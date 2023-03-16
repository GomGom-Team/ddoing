import { Component, createElement, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes, { RouteInterface } from "./routes";
 
class Router extends Component {
  render() {
    return createElement(
      BrowserRouter,
      {},
      createElement(
        Routes,
        {},
        routes.map((item, index) => {
          return createElement(
            Route,
            {
              path: item.path,
              element: item.component,
              index: item.index,
              key: `${item.name}-${item.index}`
            },
            item.children ? this.getChildren({ children: item.children, parentKey: `${item.name}-${index}` }) : void 0
          );
        })
      )
    )
  };
 
  getChildren({ children, parentKey }: { children: RouteInterface[]; parentKey: string; }): ReactNode[] {
    return children.map((item, index) => {
      return createElement(
        Route,
        {
          path: item.path,
          element: item.component,
          index: item.index,
          key: `${parentKey}-${item.name}-${index}`
        },
        item.children ? this.getChildren({ children: item.children, parentKey: `${parentKey}-${item.name}-${index}` }) : void 0
      );
    });
  };
};
 
export default Router;