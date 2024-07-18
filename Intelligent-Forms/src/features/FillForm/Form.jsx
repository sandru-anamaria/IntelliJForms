import React, { useState, useEffect } from "react";
import "./Form.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { IconButton } from "@mui/material";
import { CreateSubmission, SendScan } from "../API/SubmissionAPI/SubmissionAPI";
import CircularProgress from "@mui/material/CircularProgress";
import Webcam from "react-webcam";
import { DialogContent } from "@mui/material";
import { useRef } from "react";
import { Dialog } from "@mui/material";
import { useCallback } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Tooltip } from "@mui/material";

export default function Form({ form, TemplateID, ChildContent }) {
  const [valall, setValAll] = useState([
    { section: [{ label: "", value: "" }] },
  ]);
  const [valueContent, setValueContent] = useState([""]);
  const [selectedOption, setSelectedOption] = useState([
    { section: [null], index: 0 },
  ]);
  const [contentall, setContentAll] = useState("");
  const [selectedFiles, setSelectedFiles] = useState({ name: "", img: null });
  const [dataScan, setDataSan] = useState(null);
  const [genaralValue, setGeneralValue] = useState([""]);
  const [bollean, setBollean] = useState(false);
  const [indexsection, setIndexSection] = useState(0);
  const [contentPdf, setConentPdf] = useState("");
  const [formsub, setFormSub] = useState(false);
  const [respons, setRespons] = useState(0);
  const [loadonbuton, setLoadingButon] = useState([false]);
  const [open, setOpen] = useState(false);
  const [photoData, setPhotoData] = useState("");
  const webcamRef = useRef(null);
  const [trueGeneralValue, setTrueGeneralValue] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPhotoData("");
  };

  const handleCapture = useCallback(
    (documentType) => {
      console.log(documentType);
      const imageSrc = webcamRef.current.getScreenshot();
      const canvas = document.createElement("canvas");
      const img = new Image();
      img.src = imageSrc;
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);
        const base64String = canvas.toDataURL("image/png");
        setPhotoData(base64String);
        setSelectedFiles({ name: documentType, img: base64String });
        console.log(selectedFiles);
        setOpen(false);
      };
    },
    [webcamRef]
  );

  useEffect(() => {
    let updateallcontent = "";
    form.sections.map((section) => {
      updateallcontent += section.content;
    });
    setContentAll(updateallcontent);
  }, []);

  useEffect(() => {
    ChildContent(contentPdf);
  }, [contentPdf]);
  console.log(genaralValue);

  useEffect(() => {
    if (genaralValue.length > 1) {
      genaralValue.map((valuegenerate, index) => {
        if (valuegenerate !== null) {
          const updateText = [...valall];
          if (!updateText[indexsection]) {
            updateText[indexsection] = { section: [] };
          }
          if (!updateText[indexsection].section[index]) {
            updateText[indexsection].section[index] = {};
          }

          updateText[indexsection].section[index].value = valuegenerate;
          form.sections.map((section, indexs) => {
            section.fields.map((field, indexf) => {
              if (indexs === indexsection && indexf === index) {
                updateText[indexsection].section[index].label =
                  field.dynamicField_Key;
              }
            });
          });
          setValAll(updateText);
        }
      });

      setTrueGeneralValue(true);
    }
  }, [genaralValue]);

  const handleFileSelect = (event, sectionname) => {
    const updateselectedFiles = { ...selectedFiles };
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      updateselectedFiles.img = e.target.result;
      updateselectedFiles.name = sectionname;
      setSelectedFiles(updateselectedFiles);
    };
    reader.readAsDataURL(file);
  };

  const HandlerClickScan = async (indexSection) => {
    if (trueGeneralValue) {
      setGeneralValue([""]);
    }

    setIndexSection(indexSection);
    loadonbuton[indexSection] = true;
    setLoadingButon(loadonbuton);
    setRespons(400);
    console.log(selectedFiles.name);
    let response = await SendScan(JSON.parse(JSON.stringify(selectedFiles)));
    setDataSan(response.data);
    console.log(response);
    setBollean(true);
    if (response.status === 200) {
      setRespons(200);
    }
  };

  const HandlerAll = (
    event,
    index,
    dynamicField_Key,
    placeHolder_key,
    content,
    indexSection
  ) => {
    const targetValue = event.target ? event.target.value : event.value;

    const updatePlaceHolder = placeHolder_key.replace(/[<>]/g, "");
    const updatePlaceHolderNew = "&lt;" + updatePlaceHolder + "&gt;";
    const updateContent = [...valueContent];
    updateContent[indexSection] = content.replace(
      updatePlaceHolderNew,
      targetValue
    );
    setValueContent(updateContent);

    const updateText = [...valall];
    if (!updateText[indexSection]) {
      updateText[indexSection] = { section: [] };
    }

    if (!updateText[indexSection].section[index]) {
      updateText[indexSection].section[index] = {};
    }
    updateText[indexSection].section[index].label = dynamicField_Key;
    updateText[indexSection].section[index].value = targetValue.toString();
    setValAll(updateText);
  };

  const HandlerAll1 = (
    event,
    index,
    dynamicField_Key,
    placeHolder_key,
    content,
    indexSection
  ) => {
    const targetValue = event.target ? event.target.value : event.value;

    const updatePlaceHolder = placeHolder_key.replace(/[<>]/g, "");
    const updatePlaceHolderNew = "&lt;" + updatePlaceHolder + "&gt;";
    const updateContent = [...valueContent];
    updateContent[indexSection] = content.replace(
      updatePlaceHolderNew,
      targetValue
    );
    setValueContent(updateContent);

    const updateText = [...valall];
    if (!updateText[indexSection]) {
      updateText[indexSection] = { section: [] };
    }

    if (!updateText[indexSection].section[index]) {
      updateText[indexSection].section[index] = {};
    }
    updateText[indexSection].section[index].label = dynamicField_Key;
    updateText[indexSection].section[index].value = targetValue
      ?.toISOString()
      .slice(0, 10);
    setValAll(updateText);
  };

  const HandlerRefresh = () => {
    let updatedContentAll = contentall;
    form.sections.map((section, indexsect) => {
      if (valall[indexsect]) {
        section.fields.map((field, indexfild) => {
          if (valall[indexsect].section[indexfild]) {
            const updatePlaceHolder = field.placeHolder_Key.replace(
              /[<>]/g,
              ""
            );
            const updatePlaceHolderNew = "&lt;" + updatePlaceHolder + "&gt;";
            updatedContentAll = updatedContentAll.replace(
              updatePlaceHolderNew,
              valall[indexsect].section[indexfild].value
            );
          }
        });
      }
    });
    setConentPdf(updatedContentAll);
  };

  const HandlerCheckBox = (
    event,
    index,
    dynamicField_Key,
    indexSection,
    option,
    indexOptions
  ) => {
    if (event.target.checked) {
      const updateOption = [...selectedOption];
      updateOption[indexSection].section[indexOptions] = option;
      setSelectedOption(updateOption);
    } else {
      const updateOptionValue = [...selectedOption];
      const updateOption = selectedOption[indexSection].section.filter(
        (selected) => selected !== option
      );
      updateOptionValue[indexSection].section = updateOption;
      setSelectedOption(updateOptionValue);
    }

    const updateText = [...valall];
    if (!updateText[indexSection]) {
      updateText[indexSection] = { section: [] };
    }

    if (!updateText[indexSection].section[index]) {
      updateText[indexSection].section[index] = {};
    }
    const updateSectionID = [...selectedOption];
    updateSectionID[indexSection].index = index;
    setSelectedOption(updateSectionID);
    updateText[indexSection].section[index].label = dynamicField_Key;
    updateText[indexSection].section[index].value = "";
    setValAll(updateText);
  };

  const HandlerSubmit = async () => {
    const updatevalall = [...valall];
    if (selectedOption[indexsection].section.some((el) => el != null)) {
      const updateOption = [...selectedOption];
      updateOption.map((option, indexSection) => {
        option.section.map((date) => {
          updatevalall[indexSection].section[
            updateOption[indexSection].index
          ].value =
            updatevalall[indexSection].section[updateOption[indexSection].index]
              .value +
            date +
            ",";
        });
      });
      setValAll(updatevalall);
    }

    const NewArray = {
      submissionFields: valall
        .map((section) => section.section)
        .flat()
        .map(({ label, value }) => ({ label, value })),
      content: "",
    };

    let updatedContentAll = contentall;
    form.sections.map((section, indexsect) => {
      if (valall[indexsect]) {
        section.fields.map((field, indexfild) => {
          if (valall[indexsect].section[indexfild]) {
            const updatePlaceHolder = field.placeHolder_Key.replace(
              /[<>]/g,
              ""
            );
            const updatePlaceHolderNew = "&lt;" + updatePlaceHolder + "&gt;";
            updatedContentAll = updatedContentAll.replace(
              updatePlaceHolderNew,
              valall[indexsect].section[indexfild].value
            );
          }
        });
      }
    });
    setConentPdf(updatedContentAll);

    NewArray.content = updatedContentAll;
    setFormSub(true);
    console.log(NewArray);
    await CreateSubmission(TemplateID, JSON.parse(JSON.stringify(NewArray)));
  };

  const Functie = (
    document_KeyWords,
    indexField,
    dynamicField_Key,
    indexSection
  ) => {
    const split = document_KeyWords.split(", ");
    const value = split.map((document) => {
      const value = Object.keys(dataScan).find((key) => {
        return key.includes(document);
      });
      return value ? dataScan[value] : null;
    });
    setGeneralValue((prevState) => [
      ...prevState.slice(0, indexField),
      value[0],
      ...prevState.slice(indexField + 1),
    ]);
    setBollean(false);
    console.log(genaralValue);
  };

  return (
    <div className="form">
      <div className="form-completion">
        {form.sections.map((section, indexSection) => (
          <div key={section.sectionName}>
            <h3 className="SectionName">{section.sectionName}</h3>
            <table>
              <tbody>
                {section.fields.map((field, indexField) => (
                  <tr key={field.dynamicField_Key}>
                    <td>
                      <label htmlFor={field.dynamicField_Key}>
                        <p className="DynamicField_Key">
                          {field.dynamicField_Key}
                          {field.mandatory ? (
                            <div className="Madatory">*</div>
                          ) : null}
                        </p>
                      </label>
                    </td>

                    <td>
                      {field.fieldType === "Single-choice" ? (
                        <>
                          <RadioGroup
                            aria-label={field.dynamicField_Key}
                            name={field.dynamicField_Key}
                            onChange={(e) =>
                              HandlerAll(
                                e,
                                indexField,
                                field.dynamicField_Key,
                                field.placeHolder_Key,
                                section.content,
                                indexSection
                              )
                            }
                          >
                            {field.options.map((option) => (
                              <FormControlLabel
                                value={option}
                                disabled={formsub}
                                control={<Radio />}
                                label={option}
                              />
                            ))}
                          </RadioGroup>
                        </>
                      ) : null}

                      {field.fieldType === "Multiple-choice" ? (
                        <>
                          {field.options.map((option, index) => {
                            return (
                              <>
                                <FormGroup disabled={formsub}>
                                  <FormControlLabel
                                    onChange={(e) =>
                                      HandlerCheckBox(
                                        e,
                                        indexField,
                                        field.dynamicField_Key,
                                        indexSection,
                                        option,
                                        index
                                      )
                                    }
                                    disabled={formsub}
                                    control={<Checkbox />}
                                    label={option}
                                  />
                                </FormGroup>
                              </>
                            );
                          })}
                        </>
                      ) : null}

                      {field.fieldType === "Text" ? (
                        <>
                          <div className="Pozitionare">
                            <InputText
                              className="p-inputtext-sm"
                              id={field.dynamicField_Key}
                              name={field.dynamicField_Key}
                              disabled={formsub}
                              value={
                                bollean
                                  ? Functie(
                                      field.document_KeyWords,
                                      indexField,
                                      field.dynamicField_Key,
                                      indexSection
                                    )
                                  : valall[indexSection]?.section[indexField]
                                      ?.value
                              }
                              placeholder="Text Value"
                              pattern="[A-Za-z]+"
                              title="Introduceți numai litere"
                              onChange={(e) =>
                                HandlerAll(
                                  e,
                                  indexField,
                                  field.dynamicField_Key,
                                  field.placeHolder_Key,
                                  section.content,
                                  indexSection
                                )
                              }
                            />
                          </div>
                        </>
                      ) : null}
                      {field.fieldType === "Number" ? (
                        <>
                          <div className="Pozitionare">
                            <InputNumber
                              inputId="integeronly"
                              value={genaralValue[indexField]}
                              className="p-inputtext-sm"
                              placeholder="Number Value"
                              disabled={formsub}
                              onChange={(e) =>
                                HandlerAll(
                                  e,
                                  indexField,
                                  field.dynamicField_Key,
                                  field.placeHolder_Key,
                                  section.content,
                                  indexSection
                                )
                              }
                            />
                          </div>
                        </>
                      ) : null}

                      {field.fieldType === "Date" ? (
                        <>
                          <div className="Pozitionare">
                            <Calendar
                              className="p-inputtext-sm"
                              value={genaralValue[indexField]}
                              placeholder="dd/mm/yyyy"
                              disabled={formsub}
                              onChange={(e) =>
                                HandlerAll1(
                                  e,
                                  indexField,
                                  field.dynamicField_Key,
                                  field.placeHolder_Key,
                                  section.content,
                                  indexSection
                                )
                              }
                            />
                          </div>
                        </>
                      ) : null}

                      {field.fieldType === "Decimal" ? (
                        <>
                          <div className="Pozitionare">
                            <InputNumber
                              className="p-inputtext-sm"
                              inputId="minmaxfraction"
                              value={genaralValue[indexField]}
                              placeholder="Decimal Value"
                              disabled={formsub}
                              onChange={(e) =>
                                HandlerAll(
                                  e,
                                  indexField,
                                  field.dynamicField_Key,
                                  field.placeHolder_Key,
                                  section.content,
                                  indexSection
                                )
                              }
                            />
                          </div>
                        </>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {section.documentType !== "None" ? (
              <div className="Scann">
                <Tooltip title="Scan with camera">
                  <IconButton>
                    <CameraAltIcon onClick={handleOpen} />
                  </IconButton>
                </Tooltip>
                <Dialog
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "1920px",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <DialogContent>
                    {photoData ? (
                      <div></div>
                    ) : (
                      <div>
                        <div
                          style={{
                            transform: "scaleX(-1)",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <Webcam
                            audio={false}
                            ref={webcamRef}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleCapture(section.documentType)}
                          style={{ marginTop: "16px" }}
                        >
                          Capture
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <IconButton>
                  <FileUploadIcon
                    className="IconFile"
                    disabled={formsub}
                    onClick={() =>
                      document
                        .getElementById(`fileInput-${section.documentType}`)
                        .click()
                    }
                  />
                </IconButton>
                <input
                  hidden
                  disabled={formsub}
                  accept="image/*"
                  type="file"
                  id={`fileInput-${section.documentType}`}
                  onChange={(e) => handleFileSelect(e, section.documentType)}
                />

                <Button
                  type="file"
                  variant="outlined"
                  component="label"
                  onClick={() => HandlerClickScan(indexSection)}
                  disabled={formsub}
                >
                  <div className="sectionName1">
                    {section.documentType}(Auto-Complete)
                  </div>
                  {loadonbuton[indexSection] === true && respons === 400 ? (
                    <CircularProgress size={10} />
                  ) : null}
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
        <div className="Submit_Refresh">
          <Button
            variant="outlined"
            className="p-inputtext-ml"
            onClick={HandlerSubmit}
            disabled={formsub}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            className="p-inputtext-ml"
            onClick={() => HandlerRefresh()}
            disabled={formsub}
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}
