import { AppContainer, BreadCrumb } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";
import Create from "./WaterConnection/Create";
import Search from "./WaterConnection/Search";
import WaterConnectionDetails from "./WaterConnection/WaterConnectionDetails";

const WaterBreadCrumb = ({ location }) => {
  const { t } = useTranslation();
  const crumbs = [
    {
      path: `/${window?.contextPath}/employee`,
      content: t("HOME"),
      show: true,
    },
    {
      path: `/${window?.contextPath}/employee/water`,
      content: t("WATER_MODULE"),
      show: true,
    },
    {
      path: `/${window?.contextPath}/employee/water/${location.pathname.split("/").pop()}`,
      content: t(location.pathname.split("/").pop().toUpperCase()),
      show: location.pathname.split("/").pop() !== "water",
    },
  ];
  return <BreadCrumb crumbs={crumbs} spanStyle={{ maxWidth: "min-content" }} />;
};

const App = ({ path, stateCode, userType, tenants }) => {
  const commonProps = { stateCode, userType, tenants, path };

  return (
    <Switch>
      <AppContainer className="ground-container">
        <React.Fragment>
          <WaterBreadCrumb location={location} />
        </React.Fragment>
        <Route path={`${path}/water-connection/create`} component={() => <Create {...commonProps} />} />
        <Route path={`${path}/water-connection/search`} component={() => <Search {...commonProps} />} />
        <Route path={`${path}/water-connection/view/:id`} component={() => <WaterConnectionDetails {...commonProps} />} />
      </AppContainer>
    </Switch>
  );
};

export default App; 