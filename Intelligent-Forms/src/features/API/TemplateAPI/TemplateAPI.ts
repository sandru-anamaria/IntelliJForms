import axios from "axios";

const TemplateAPI = axios.create({});

const FormCreateURL =
  "https://intelligentformsapi.azurewebsites.net/api/v1/forms?userId=";

const GetTempletsURL =
  "https://intelligentformsapi.azurewebsites.net/api/v1/forms/";

const getTemplatesByUserIdURL =
  "https://intelligentformsapi.azurewebsites.net/api/v1/forms?userId=";

const deleteTemplateByIdURL =
  "https://intelligentformsapi.azurewebsites.net/api/v1/forms/";

export const createTemplate = async (Template: any, userId: string) => {
  const response = await TemplateAPI.post(
    `${FormCreateURL}${userId}`,
    Template
  );
  return response;
};

export const getTemplate = async (TemplateID: string) => {
  const response = await TemplateAPI.get(`${GetTempletsURL}${TemplateID}`);
  return response;
};

export const getTemplatesByUserId = async (userId: string) => {
  const response = await TemplateAPI.get(`${getTemplatesByUserIdURL}${userId}`);
  console.log(response);

  return response;
};

export const deleteTemplateById = async (userId: string) => {
  const response = await TemplateAPI.delete(
    `${deleteTemplateByIdURL}${userId}`
  );
  console.log(response);

  return response;
};
