import { Component, type ComponentType, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import apiStore from "./mobx";
import Layout from "../Layout";

interface IModuleProps {
  children?: ReactNode;
}

interface IRedirectConfig {
  to: string;
  replace: boolean;
}

interface IModuleState {
  loading: boolean;
  redirect?: IRedirectConfig;
}

interface IRoute {
  path: string;
  name: string;
  Element: ComponentType;
  Module: ComponentType;
  redirect?: string | IRedirectConfig;
}

export default abstract class Module extends Component<
  IModuleProps,
  IModuleState
> {
  routes: IRoute[] = [];
  state: IModuleState = {
    loading: false,
  };

  isRoot = false;

  afterLeave(): Promise<void> | void {
    apiStore.setShowToast(false);
  }

  beforeEnter(): Promise<boolean> | boolean {
    return true;
  }

  async componentDidMount() {
    const shouldNext = await this.beforeEnter();
    if (shouldNext) {
      this.setState({ loading: false });
    }
  }

  async componentWillUnmount() {
    await this.afterLeave();
  }

  layout() {
    return <Layout />;
  }

  placeholder() {
    return <></>;
  }

  redirect(path: string, replace = false) {
    this.setState({ redirect: { to: path, replace } });
  }

  render() {
    const { redirect, loading } = this.state;
    if (redirect) {
      const { to, replace } = redirect;
      return <Navigate to={to} replace={replace} />;
    }
    if (loading) {
      return this.placeholder();
    }
    if (!this.routes.length) {
      return this.layout();
    }
    const content = (
      <Routes>
        <Route element={this.layout()}>
          {this.routes.map((routeConfig) => (
            <>
              {routeConfig.Module && (
                <Route
                  path={routeConfig.path}
                  element={<routeConfig.Module />}
                />
              )}

              {routeConfig.Element && (
                <Route
                  path={routeConfig.path}
                  element={<routeConfig.Element />}
                />
              )}

              {typeof routeConfig.redirect === "string" && (
                <Route
                  path={routeConfig.path}
                  element={<Navigate to={routeConfig.redirect} />}
                />
              )}

              {routeConfig.redirect &&
                typeof routeConfig.redirect !== "string" && (
                  <Route
                    path={routeConfig.path}
                    element={
                      <Navigate
                        to={routeConfig.redirect.to}
                        replace={routeConfig.redirect.replace}
                      />
                    }
                  />
                )}
            </>
          ))}
        </Route>
      </Routes>
    );

    if (this.isRoot) {
      return <BrowserRouter>{content}</BrowserRouter>;
    }
    return content;
  }
}
