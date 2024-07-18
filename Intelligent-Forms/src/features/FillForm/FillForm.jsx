import React, { useState, useEffect } from "react";
import Form from "./Form";
import ViewForm from "./ViewForm";
import "./FillForm.css";
import { getTemplate } from "../API/TemplateAPI/TemplateAPI";
import { ProgressSpinner } from "primereact/progressspinner";
import { useParams } from "react-router-dom";

export default function FillForm() {
  const [dataResponse, setDataResponse] = useState(null);
  const [conentAll, setConentAll] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await getTemplate(id);
      setDataResponse(response.data);
    }
    fetchData();
  }, []);

  const HandlerAllContent = (value) => {
    setConentAll(value);
  };

  return (
    <>
      <div className="All1">
        {dataResponse ? (
          <>
            <div className="Logo1">
              <img src="images/Logo.png" alt="Logo" />
              {dataResponse.formTitle}
            </div>
            <div className="FormContainer1">
              <Form
                form={dataResponse}
                TemplateID={id}
                ChildContent={HandlerAllContent}
              />
              <ViewForm form={dataResponse} conentPdfAll={conentAll} />
            </div>
          </>
        ) : (
          <>
            <div className="spinner">
              <ProgressSpinner />
            </div>
          </>
        )}
        <div className="Delimitation2">© 2023 INTELLIGENT FORMS</div>
      </div>
    </>
  );
}
