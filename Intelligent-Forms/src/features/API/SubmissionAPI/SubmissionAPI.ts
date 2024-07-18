import axios from "axios";

const SubmissionAPI = axios.create({});

const getSubmissionByFormIdURL =
  "https://intelligentformsapi.azurewebsites.net/api/v1/submissions?formId=";

const PostSubmissionURL =
  "https://intelligentformsapi.azurewebsites.net/api/v1/submissions?formId=";

const PostScanURL =
  "https://intelligentformsapi.azurewebsites.net/api/v1/forms-scanner?documentType=";

export const getSubmissionByFormId = async (formId: string) => {
  console.log(`${getSubmissionByFormIdURL}${formId}`);
  const response = await SubmissionAPI.get(
    `${getSubmissionByFormIdURL}${formId}`
  );

  return response;
};

export const CreateSubmission = async (TemplateID: string, Submission: any) => {
  const response = await SubmissionAPI.post(
    `${PostSubmissionURL}${TemplateID}`,
    Submission
  );

  return response;
};

export const SendScan = async (ScanDocument: any) => {
  console.log(ScanDocument.img);
  const response = await SubmissionAPI.post(
    `${PostScanURL}${ScanDocument.name}`,
    ScanDocument.img,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};
