import React, { useState } from "react";
import { FormComposerV2, Header, Loader, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const Create = ({ tenants }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [showToast, setShowToast] = useState(null);

  const config = [
    {
      head: t("BASIC_DETAILS"),
      body: [
        {
          label: t("APPLICANT_NAME"),
          type: "text",
          isMandatory: true,
          key: "applicantName",
          disable: false,
        },
        {
          label: t("MOBILE_NUMBER"),
          type: "mobileNumber",
          isMandatory: true,
          key: "mobileNumber",
          disable: false,
        },
        {
          label: t("PROPERTY_ID"),
          type: "text",
          isMandatory: true,
          key: "propertyId",
          disable: false,
        },
        {
          label: t("PROPERTY_TYPE"),
          type: "dropdown",
          isMandatory: true,
          key: "propertyType",
          disable: false,
          populators: {
            name: "propertyType",
            optionsKey: "name",
            options: [
              { name: t("RESIDENTIAL"), code: "RESIDENTIAL" },
              { name: t("COMMERCIAL"), code: "COMMERCIAL" },
              { name: t("INSTITUTIONAL"), code: "INSTITUTIONAL" },
            ],
          },
        },
      ],
    },
    {
      head: t("CONNECTION_DETAILS"),
      body: [
        {
          label: t("WATER_SOURCE"),
          type: "dropdown",
          isMandatory: true,
          key: "waterSource",
          disable: false,
          populators: {
            name: "waterSource",
            optionsKey: "name",
            options: [
              { name: t("GROUND_WATER"), code: "GROUND_WATER" },
              { name: t("SURFACE_WATER"), code: "SURFACE_WATER" },
              { name: t("BULK_WATER"), code: "BULK_WATER" },
            ],
          },
        },
        {
          label: t("CONNECTION_TYPE"),
          type: "dropdown",
          isMandatory: true,
          key: "connectionType",
          disable: false,
          populators: {
            name: "connectionType",
            optionsKey: "name",
            options: [
              { name: t("TEMPORARY"), code: "TEMPORARY" },
              { name: t("PERMANENT"), code: "PERMANENT" },
            ],
          },
        },
        {
          label: t("NUMBER_OF_TAPS"),
          type: "number",
          isMandatory: true,
          key: "noOfTaps",
          disable: false,
        },
        {
          label: t("PIPE_SIZE"),
          type: "number",
          isMandatory: true,
          key: "pipeSize",
          disable: false,
          validation: {
            min: "0",
          },
        },
      ],
    },
  ];

  const onSubmit = async (data) => {
    try {
      // Normally we would make an API call here
      // const response = await Digit.WaterService.createWaterConnection(data);
      
      // For demo, we'll simulate a successful response
      setTimeout(() => {
        setShowToast({
          label: t("WATER_CONNECTION_CREATED_SUCCESSFULLY"),
          message: t("WATER_CONNECTION_APPLICATION_NUMBER", { applicationNumber: "WS-" + Math.floor(Math.random() * 10000) }),
          error: false,
        });
        
        // Redirect to the water connection search page after 3 seconds
        setTimeout(() => {
          history.push("/digit-ui/employee/water/water-connection/search");
        }, 3000);
      }, 1000);
    } catch (error) {
      setShowToast({
        label: t("WATER_CONNECTION_CREATION_FAILED"),
        message: error.message || t("SOMETHING_WENT_WRONG"),
        error: true,
      });
    }
  };

  const onFormValueChange = (setValue, formData, formState) => {
    // You can add custom logic here if needed when form values change
  };

  return (
    <React.Fragment>
      <Header>{t("CREATE_WATER_CONNECTION")}</Header>
      <FormComposerV2
        label={t("CREATE_WATER_CONNECTION")}
        config={config}
        onSubmit={onSubmit}
        fieldStyle={{ marginRight: 0 }}
        buttonLabel={t("SUBMIT")}
        onFormValueChange={onFormValueChange}
      />
      {showToast && (
        <Toast
          label={showToast.label}
          onClose={() => {
            setShowToast(null);
          }}
          error={showToast.error}
        >
          {showToast.message}
        </Toast>
      )}
    </React.Fragment>
  );
};

export default Create; 