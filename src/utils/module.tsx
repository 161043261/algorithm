import { Component, type ReactNode } from "react";
import { type RouteObject } from "react-router";

interface IModuleProps {
  children?: ReactNode;
}

interface IModuleState {
  loading: boolean;
  redirect?: {
    to: string;
    replace: boolean;
  };
}

export default abstract class Module extends Component<
  IModuleProps,
  IModuleState
> {
  routes: RouteObject[] = [];

  state: IModuleState = {
    loading: false,
  };

  async componentDidMount() {}

  async componentWillUnmount() {}

  beforeEnter() {}
}
