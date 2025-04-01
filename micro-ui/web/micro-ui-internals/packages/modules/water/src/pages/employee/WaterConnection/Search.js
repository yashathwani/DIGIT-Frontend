import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { InboxSearchComposer, Header, Loader } from "@egovernments/digit-ui-react-components";
import { useHistory } from "react-router-dom";

const Search = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [searchData, setSearchData] = useState(null);

  // Mock search data for demonstration
  const mockSearchResults = [
    {
      applicationNo: "WS-2023-01-001",
      connectionNo: "CONN-001",
      applicantName: "John Smith",
      mobileNumber: "9876543210",
      propertyId: "PID-001",
      status: "PENDING",
      address: "123 Main St, Block A",
      connectionType: "PERMANENT",
    },
    {
      applicationNo: "WS-2023-01-002",
      connectionNo: "CONN-002",
      applicantName: "Jane Doe",
      mobileNumber: "9876543211",
      propertyId: "PID-002",
      status: "APPROVED",
      address: "456 Park Ave, Block B",
      connectionType: "TEMPORARY",
    },
    {
      applicationNo: "WS-2023-01-003",
      connectionNo: "CONN-003",
      applicantName: "Robert Johnson",
      mobileNumber: "9876543212",
      propertyId: "PID-003",
      status: "REJECTED",
      address: "789 Oak St, Block C",
      connectionType: "PERMANENT",
    },
  ];

  const onSearch = (data) => {
    // In a real app, we would make an API call here
    // For demo, we'll use mock data
    setSearchData(mockSearchResults);
  };

  const onRowClick = (row) => {
    history.push(`/digit-ui/employee/water/water-connection/view/${row.connectionNo}`);
  };

  const searchConfig = {
    label: t("WATER_CONNECTION_SEARCH"),
    type: "search",
    description: t("WATER_CONNECTION_SEARCH_DESC"),
    configs: [
      {
        label: t("APPLICATION_NUMBER"),
        type: "text",
        name: "applicationNo",
        placeholder: t("ENTER_APPLICATION_NUMBER"),
      },
      {
        label: t("CONNECTION_NUMBER"),
        type: "text",
        name: "connectionNo",
        placeholder: t("ENTER_CONNECTION_NUMBER"),
      },
      {
        label: t("MOBILE_NUMBER"),
        type: "mobileNumber",
        name: "mobileNumber",
        placeholder: t("ENTER_MOBILE_NUMBER"),
      },
      {
        label: t("PROPERTY_ID"),
        type: "text",
        name: "propertyId",
        placeholder: t("ENTER_PROPERTY_ID"),
      },
      {
        label: t("STATUS"),
        type: "dropdown",
        name: "status",
        placeholder: t("SELECT_STATUS"),
        options: [
          { value: "PENDING", label: t("PENDING") },
          { value: "APPROVED", label: t("APPROVED") },
          { value: "REJECTED", label: t("REJECTED") },
        ],
      },
    ],
    primaryAction: {
      label: t("SEARCH"),
      submitFn: onSearch,
    },
    secondaryAction: {
      label: t("RESET"),
      submitFn: () => setSearchData(null),
    },
  };

  const tableConfig = {
    columns: [
      {
        label: t("APPLICATION_NUMBER"),
        accessor: "applicationNo",
        mobileCell: (value) => value,
      },
      {
        label: t("CONNECTION_NUMBER"),
        accessor: "connectionNo",
        mobileCell: (value) => value,
      },
      {
        label: t("APPLICANT_NAME"),
        accessor: "applicantName",
        mobileCell: (value) => value,
      },
      {
        label: t("PROPERTY_ID"),
        accessor: "propertyId",
        mobileCell: (value) => value,
      },
      {
        label: t("STATUS"),
        accessor: "status",
        mobileCell: (value) => t(value),
      },
      {
        label: t("CONNECTION_TYPE"),
        accessor: "connectionType",
        mobileCell: (value) => t(value),
      },
    ],
    enableRowClick: true,
    onClickRow: onRowClick,
  };

  return (
    <React.Fragment>
      <Header>{t("SEARCH_WATER_CONNECTION")}</Header>
      <InboxSearchComposer 
        defaultSearchParams={{}}
        searchConfig={searchConfig}
        tableConfig={tableConfig}
        data={searchData || []}
        isLoading={false}
      />
    </React.Fragment>
  );
};

export default Search; 