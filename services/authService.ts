import axios from "axios";
export const baseUrl = "https://shippex-demo.bc.brandimic.com/api/method/";

export const loginFn = async (usr: string, pwd: string) => {
  // formdata usr and pwd
  try {
    return await axios.post(`${baseUrl}login`, {
      usr,
      pwd,
    });
  } catch (error) {
    return error;
  }
};

export const getShipmentsStatusFn = async () => {
  try {
    return await axios.post(
      `${baseUrl}frappe.client.get_list`,
      {
        doctype: "AWB Status",
        fields: ["*"],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const getShipmentsFn = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}frappe.client.get_list`,
      {
        doctype: "AWB",
        fields: ["*"],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching AWB list:", error);
  }
};
