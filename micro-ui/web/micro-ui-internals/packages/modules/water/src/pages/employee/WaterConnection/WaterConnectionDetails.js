import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ActionBar, Card, CardLabel, CardLabelDesc, Header, Loader, SubmitBar, WorkflowActions } from "@egovernments/digit-ui-react-components";
import { useParams, useHistory } from "react-router-dom";

const WaterConnectionDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [connectionData, setConnectionData] = useState(null);
  const tenantId = Digit.ULBService.getCurrentTenantId();

  useEffect(() => {
    // In a real app, we would fetch data from API
    // For demo, we'll use mock data
    const getMockData = () => {
      // Simulate API call delay
      setTimeout(() => {
        const data = {
          connectionNo: id,
          applicationNo: `WS-2023-01-${Math.floor(Math.random() * 1000)}`,
          applicantName: "John Smith",
          mobileNumber: "9876543210",
          propertyId: "PID-001",
          address: "123 Main St, Block A",
          propertyType: "RESIDENTIAL",
          connectionType: "PERMANENT",
          waterSource: "GROUND_WATER",
          noOfTaps: 2,
          pipeSize: 15,
          status: "PENDING",
          workflowActions: ["APPROVE", "REJECT", "SEND_BACK", "VERIFY"],
          workflowHistory: [
            {
              action: "APPLY",
              assignee: "John Clerk",
              date: "05-01-2023 10:30 AM",
              comment: "Application submitted",
            },
            {
              action: "FORWARD",
              assignee: "Jane Supervisor",
              date: "06-01-2023 02:15 PM",
              comment: "Forwarded for verification",
            },
          ],
        };
        setConnectionData(data);
        setIsLoading(false);
      }, 1000);
    };

    getMockData();
  }, [id]);

  const handleWorkflowAction = (action, data) => {
    console.log("Workflow action:", action, data);
    // In a real app, we would make an API call to update the status
    // For demo, we'll just log and show a modified status
    setConnectionData((prevData) => ({
      ...prevData,
      status: action === "APPROVE" ? "APPROVED" : action === "REJECT" ? "REJECTED" : "PENDING",
    }));
  };

  const renderWorkflowHistory = () => {
    return (
      <Card>
        <CardLabel>{t("WORKFLOW_HISTORY")}</CardLabel>
        <div className="workflow-history">
          {connectionData?.workflowHistory?.map((item, index) => (
            <div key={index} className="workflow-history-item">
              <div className="workflow-action">{t(item.action)}</div>
              <div className="workflow-assignee">{item.assignee}</div>
              <div className="workflow-date">{item.date}</div>
              <div className="workflow-comment">{item.comment}</div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header>{t("WATER_CONNECTION_DETAILS")}</Header>
      
      <Card>
        <CardLabel>{t("APPLICATION_DETAILS")}</CardLabel>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 50%", padding: "8px" }}>
            <CardLabel>{t("APPLICATION_NUMBER")}</CardLabel>
            <CardLabelDesc>{connectionData.applicationNo}</CardLabelDesc>
          </div>
          <div style={{ flex: "1 1 50%", padding: "8px" }}>
            <CardLabel>{t("CONNECTION_NUMBER")}</CardLabel>
            <CardLabelDesc>{connectionData.connectionNo}</CardLabelDesc>
          </div>
          <div style={{ flex: "1 1 50%", padding: "8px" }}>
            <CardLabel>{t("STATUS")}</CardLabel>
            <CardLabelDesc>{t(connectionData.status)}</CardLabelDesc>
          </div>
        </div>
      </Card>

      <Card>
        <CardLabel>{t("APPLICANT_DETAILS")}</CardLabel>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 50%", padding: "8px" }}>
            <CardLabel>{t("APPLICANT_NAME")}</CardLabel>
            <CardLabelDesc>{connectionData.applicantName}</CardLabelDesc>
          </div>
          <div style={{ flex: "1 1 50%", padding: "8px" }}>
            <CardLabel>{t("MOBILE_NUMBER")}</CardLabel>
            <CardLabelDesc>{connectionData.mobileNumber}</CardLabelDesc>
          </div>
          <div style={{ flex: "1 1 50%", padding: "8px" }}>
            <CardLabel>{t("PROPERTY_ID")}</CardLabel>
            <CardLabelDesc>{connectionData.propertyId}</CardLabelDesc>
          </div>
          <div style={{ flex: "1 1 50%", padding: "8px" }}>
            <CardLabel>{t("PROPERTY_TYPE")}</CardLabel>
            <CardLabelDesc>{t(connectionData.propertyType)}</CardLabelDesc>
          </div>
          <div style={{ flex: "1 1 100%", padding: "8px" }}>
            <CardLabel>{t("ADDRESS")}</CardLabel>
            <CardLabelDesc>{connectionData.address}</CardLabelDesc>
          </div>
        </div>
      </Card>

      <Card>
        <CardLabel>{t("CONNECTION_DETAILS")}</CardLabel>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 50%", padding: "8px" }}>
            <CardLabel>{t("CONNECTION_TYPE")}</CardLabel>
            <CardLabelDesc>{t(connectionData.connectionType)}</CardLabelDesc>
          </div>
          <div style={{ flex: "1 1 50%", padding: "8px" }}>
            <CardLabel>{t("WATER_SOURCE")}</CardLabel>
            <CardLabelDesc>{t(connectionData.waterSource)}</CardLabelDesc>
          </div>
          <div style={{ flex: "1 1 50%", padding: "8px" }}>
            <CardLabel>{t("NUMBER_OF_TAPS")}</CardLabel>
            <CardLabelDesc>{connectionData.noOfTaps}</CardLabelDesc>
          </div>
          <div style={{ flex: "1 1 50%", padding: "8px" }}>
            <CardLabel>{t("PIPE_SIZE")}</CardLabel>
            <CardLabelDesc>{connectionData.pipeSize} mm</CardLabelDesc>
          </div>
        </div>
      </Card>

      {renderWorkflowHistory()}

      <ActionBar>
        <SubmitBar label={t("BACK")} onSubmit={() => history.goBack()} />
      </ActionBar>

      {connectionData.status !== "APPROVED" && connectionData.status !== "REJECTED" && (
        <WorkflowActions
          applicationData={connectionData}
          businessService="WATER"
          tenantId={tenantId}
          actionData={connectionData.workflowActions}
          onActionSelect={handleWorkflowAction}
        />
      )}
    </div>
  );
};

export default WaterConnectionDetails; 