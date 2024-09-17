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
    return await axios.get(`${baseUrl}frappe.client.get_list`);
  } catch (error) {
    return error;
  }
};

export const getShipmentsFn = async ({
  doctype,
  fields,
  filters,
}: {
  doctype: string;
  fields: string[];
  filters: { name: string };
}) => {
  /**
     {
         "doctype":"AWB",
         "fields": ["*"],
         "filters": {
             "name": ["like", "%add_search_term_here%"]
         }
     }
     * 
     */

  try {
    return await axios.get(`${baseUrl}frappe.client.get_list`, {
      params: {
        doctype,
        fields,
        filters,
      },
    });
  } catch (error) {
    return error;
  }
};
