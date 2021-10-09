import { toast } from "react-toastify";

export const httpRequest = async (
  url = "",
  method = "GET",
  data = {},
  header = ""
) => {
  const response = await fetch(url, {
    method: method,
    headers: header || {
      "Access-Control-Allow-Origin": "*",
      userName: userDetails.username,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    try {
      return await response.json();
    } catch (e) {
      return await response.text();
    }
  } else {
    const res = await response.text();
    throw new Error(res);
  }
};
let userDetails = {};
try {
  userDetails = JSON.parse(localStorage.getItem("keploginuser"));
} catch (e) {}
export const httpFormRequest = async (
  url = "",
  method = "POST",
  data = {},
  header = ""
) => {
  var formData = new FormData();
  Object.keys(data).map((item) => formData.append(item, data[item]));
  const response = await fetch(url, {
    method: method,
    headers: header || {
      //   "Access-Control-Allow-Origin": "*",
      userName: userDetails.username,
    },
    body: formData,
  });
  if (response.ok) {
    const responseData = await response.text();
    try {
      return JSON.parse(responseData);
    } catch (e) {
      return responseData;
    }
  } else {
    const responseData = await response.text();

    toast.error(responseData);
  }
};
