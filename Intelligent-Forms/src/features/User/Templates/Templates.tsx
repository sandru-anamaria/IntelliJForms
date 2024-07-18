import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import { createTemplate } from "../../API/TemplateAPI/TemplateAPI";
import NavBar2 from "../NavBar2";
import EditorComponent from "./Editor";
import BasicSelect from "./Selecter";
import "./Templates.css";
import { Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Templates() {
  const [val, setVal] = useState([""]);

  const [sect, setSect] = useState({
    formTitle: "",
    dataRetentionPeriod: 0,
    sections: [
      {
        sectionName: "",
        content: "",
        documentType: "",
        fields: [
          {
            dynamicField_Key: "",
            placeHolder_key: "",
            mandatory: false,
            fieldType: "",
            options: [""],
            document_KeyWords: "",
          },
        ],
      },
    ],
  });

  console.log(sect);
  const [selectedValue, setSelectedValue] = useState("");
  const [IndexCurentSec, setIndexCurentSec] = useState(0);
  const [localEditorValue, setLocalEditorValue] = useState("");
  const [opt, setOpt] = useState([""]);
  const [IndexDynamicFields, setIndexDynamicFields] = useState(0);
  const [placeHolder_key, setplaceHolder_key] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [valDocument, setValDocument] = useState("");
  const [valField, setValField] = useState("");
  const [valDatavalidation, setvalDatavalidation] = useState(30);
  const [valScan, setValScan] = useState("");
  const [valTitle, setValTitle] = useState("");

  useEffect(() => {
    const updateSet = { ...sect };
    updateSet.sections[IndexCurentSec].fields[IndexDynamicFields].options = opt;
    setSect(updateSet);
    console.log(sect);
  }, [opt]);

  const CreateForm = async () => {
    var response = await createTemplate(
      JSON.parse(JSON.stringify(sect)),
      localStorage.getItem("userId")!
    );
    if (response.status === 200) {
      window.location.href = "#/Update_Form";
    } else {
      console.log("Fail");
    }
    console.log(response);
  };

  const handleDelete = (index) => {
    const updatedfields = val.filter((item, i) => i !== index);
    const updateSect = sect.sections.map((item, i) => {
      if (i === IndexCurentSec) {
        const newfields = item.fields.filter((value, j) => j !== index);
        return { ...item, fields: newfields };
      } else {
        return item;
      }
    });
    const update = { ...sect };
    update.sections = updateSect;
    setSect(update);
    setVal(updatedfields);
  };

  const ChangeDataRetention = (e) => {
    const updatedSect = { ...sect };
    updatedSect.dataRetentionPeriod = parseInt(e.target.value, 10);
    setvalDatavalidation(e.target.value);
    setSect(updatedSect);
  };

  const createNewValue = () => {
    return {
      dynamicField_Key: "",
      placeHolder_key: "",
      mandatory: false,
      document_KeyWords: "",
      options: [""],
      fieldType: "",
    };
  };

  const handleChange = (e) => {
    const updateSect = { ...sect };
    updateSect.sections[IndexCurentSec].fields[IndexDynamicFields].fieldType =
      e.target.value;
    setSect(updateSect);
    console.log(sect);
    setValField(e.target.value);
  };

  const HandlerChangePlaceHoder = (e) => {
    const updateSect = { ...sect };
    updateSect.sections[IndexCurentSec].fields[
      IndexDynamicFields
    ].placeHolder_key = e.target.value;
    setplaceHolder_key(e.target.value);
    setSect(updateSect);
  };

  const HandlerChangeDocument = (e) => {
    const updateSect = { ...sect };
    updateSect.sections[IndexCurentSec].fields[
      IndexDynamicFields
    ].document_KeyWords = e.target.value;
    setValDocument(e.target.value);
    setSect(updateSect);
  };

  const HandlerTitle = (e) => {
    const updatedSect = { ...sect };
    updatedSect.formTitle = e.target.value;
    setValTitle(e.target.value);
    setSect(updatedSect);
  };

  const handleDeleteselection = (index) => {
    const updateSection = sect.sections.filter((item, i) => i !== index);
    const update = { ...sect };
    update.sections = updateSection;
    setSect(update);
  };

  const handleDeleteOpt = (index) => {
    const updatedOpt = opt.filter((item, i) => i !== index);
    console.log(updatedOpt);
    setOpt(updatedOpt);
  };

  const handleChanges = (e, index) => {
    const updatedfields = [...val];
    const updatedSect = { ...sect };
    const currentValue = updatedSect.sections[IndexCurentSec].fields[index];
    if (!currentValue) {
      updatedSect.sections[IndexCurentSec].fields[index] = createNewValue();
    }

    updatedSect.sections[IndexCurentSec].fields[index].dynamicField_Key =
      e.target.value;
    updatedfields[index] = e.target.value;
    setIndexDynamicFields(index);
    setSect(updatedSect);
    setVal(updatedfields);
  };

  const ChangeEventOpt = (e, index) => {
    const updatedOpt = [...opt];
    updatedOpt[index] = e.target.value;
    setOpt(updatedOpt);
  };

  const ChangeEvent = (e, index) => {
    const updatedSection = { ...sect };
    updatedSection.sections[index].sectionName = e.target.value;

    setSect(updatedSection);
  };

  const handleChildClick = (updatedSect) => {
    setSect(updatedSect);
  };

  const handleChangeSelectedSection = (currentIndex) => {
    console.log(currentIndex);
    console.log(IndexDynamicFields);
    const updatedSection = sect.sections[currentIndex];
    if (updatedSection && updatedSection.fields[IndexDynamicFields]) {
      const dynamicFieldsfields = updatedSection.fields.map(
        (dynamicField) => dynamicField.dynamicField_Key
      );
      setVal(dynamicFieldsfields);
      console.log(sect);
      setIndexCurentSec(currentIndex);
      setLocalEditorValue(updatedSection.content);
      setplaceHolder_key("");
      setIsChecked(false);
      setValDocument("");
      setValField("None");
    }
  };

  const ChangeScan = (value) => {
    const updatedSect = { ...sect };
    updatedSect.sections[IndexCurentSec].documentType = value;
    setSect(updatedSect);
    setValScan(value);
  };

  const handleCheckboxChange = (event) => {
    const updatedSect = { ...sect };
    updatedSect.sections[IndexCurentSec].fields[IndexDynamicFields].mandatory =
      event.target.checked;
    setSect(updatedSect);
    console.log(sect);
    setIsChecked(event.target.checked);
  };

  const handleAddSection = () => {
    setSect((prevState) => {
      return {
        ...prevState,
        sections: [
          ...prevState.sections,
          {
            sectionName: "",
            content: "",
            documentType: "",
            fields: [
              {
                dynamicField_Key: "",
                placeHolder_key: "",
                mandatory: false,
                fieldType: "",
                options: [""],
                document_KeyWords: "",
              },
            ],
          },
        ],
      };
    });
    setIndexCurentSec(sect.sections.length);
    setLocalEditorValue("");
    setVal([""]);
    setIndexDynamicFields(0);
    setplaceHolder_key("");
    setIsChecked(false);
    setValDocument("");
    setValField("None");
    setValScan("");
  };

  return (
    <div>
      <NavBar2 />
      <div className="a">
        <div className="container1">
          <div className="Title">Title:</div>
          <br />
          <div className="TextField">
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder="e.g.: name of the form"
              value={valTitle}
              onChange={(e) => HandlerTitle(e)}
            />
          </div>

          <div className="text">
            Dynamic Fields:
            <div className="inputs">
              {val.map((item, index) => {
                return (
                  <div className="interor" key={index}>
                    <div className="int2">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="e.g.: name, cnp etc."
                        value={item}
                        size="small"
                        onChange={(e) => handleChanges(e, index)}
                        onClick={() => {
                          setSelectedValue(item);
                          setIndexDynamicFields(index);

                          setplaceHolder_key(
                            sect.sections[IndexCurentSec].fields[index]
                              .placeHolder_key
                          );
                          setIsChecked(
                            sect.sections[IndexCurentSec].fields[index]
                              .mandatory
                          );
                          setValDocument(
                            sect.sections[IndexCurentSec].fields[index]
                              .document_KeyWords
                          );
                          setValField(
                            sect.sections[IndexCurentSec].fields[index]
                              .fieldType
                          );

                          setOpt(
                            sect.sections[IndexCurentSec].fields[index].options
                          );
                        }}
                      />
                    </div>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleDelete(index)}
                    >
                      <Tooltip title="Delete">
                        <DeleteIcon />
                      </Tooltip>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="buttons">
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setVal([...val, ""]), setplaceHolder_key("");
              }}
            >
              <Tooltip title="Add">
                <AddIcon />
              </Tooltip>
            </Button>
          </div>
          <div className="text">
            Sections:
            <div className="inputs">
              {sect.sections.map((item1, index1) => {
                return (
                  <div className="interor" key={index1}>
                    <div className="int2">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        placeholder="e.g.: name of the section"
                        onChange={(e) => ChangeEvent(e, index1)}
                        onClick={() => handleChangeSelectedSection(index1)}
                      />
                    </div>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleDeleteselection(index1)}
                    >
                      <Tooltip title="Delete">
                        <DeleteIcon />
                      </Tooltip>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="buttons">
            <Button variant="outlined" size="small" onClick={handleAddSection}>
              <Tooltip title="Add">
                <AddIcon />
              </Tooltip>
            </Button>
          </div>
          <div className="data_retention">
            Data Retention Period:
            <div className="it3">
              <TextField
                id="outlined-number"
                label="Days"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: "1",
                  step: "1",
                  max: "60",
                }}
                onChange={(e) => ChangeDataRetention(e)}
                value={valDatavalidation}
                size="small"
              />
            </div>
          </div>

          <div className="scan_document">
            Scan document type:
            <div className="it">
              <BasicSelect parentCont={ChangeScan} valUpdate={valScan} />
            </div>
          </div>
        </div>

        <div className="container2">
          <div className="label">
            Label:
            <div className="it">
              <TextField
                disabled
                id="outlined-disabled"
                label="Disabled"
                size="small"
                value={selectedValue}
              />
            </div>
          </div>
          <div className="Placeholder">
            Placeholder keyword:
            <div className="it1">
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                placeholder="e.g.: first_name, last_name etc."
                value={placeHolder_key}
                onChange={(e) => HandlerChangePlaceHoder(e)}
              />
            </div>
          </div>
          <div className="madatory">
            Mandatory:
            <Checkbox
              {...label}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="field_type">
            Field Type:
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={handleChange}
                autoWidth
                size="small"
                value={valField ? valField : "None"}
              >
                <MenuItem value={"None"}>None</MenuItem>
                <MenuItem value={"Text"}>Text</MenuItem>
                <MenuItem value={"Number"}>Number</MenuItem>
                <MenuItem value={"Decimal"}>Decimal</MenuItem>
                <MenuItem value={"Date"}>Date</MenuItem>
                <MenuItem value={"Single-choice"}>Single-choice</MenuItem>
                <MenuItem value={"Multiple-choice"}>Multiple-choice</MenuItem>
              </Select>
            </FormControl>
          </div>

          {(sect.sections[IndexCurentSec]?.fields[IndexDynamicFields]
            ?.fieldType === "Single-choice" ||
            sect.sections[IndexCurentSec]?.fields[IndexDynamicFields]
              ?.fieldType === "Multiple-choice") && (
            <>
              <div className="options">Options:</div>
              <div className="buttonsOpt">
                <div className="inputs">
                  {opt.map((item1, index) => {
                    return (
                      <div className="interor" key={index}>
                        <div className="int2">
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            value={item1}
                            onChange={(e) => ChangeEventOpt(e, index)}
                          />
                        </div>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleDeleteOpt(index)}
                        >
                          <Tooltip title="Delete">
                            <DeleteIcon />
                          </Tooltip>
                        </Button>
                      </div>
                    );
                  })}
                </div>
                <div className="btn">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setOpt([...opt, ""])}
                  >
                    <Tooltip title="Add">
                      <AddIcon />
                    </Tooltip>
                  </Button>
                </div>
              </div>
            </>
          )}
          <div className="document">
            Document keywords:
            <div className="it">
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                placeholder="e.g.: cnp, social number etc."
                value={valDocument}
                onChange={HandlerChangeDocument}
              />
            </div>
          </div>
          <div className="content">Content:</div>
          <EditorComponent
            sect={sect}
            parentContent={localEditorValue}
            currentIndexSection={IndexCurentSec}
            onChildClick={handleChildClick}
          />
        </div>
      </div>
      <div className="Create">
        <Button variant="outlined" size="small" onClick={CreateForm}>
          Create
        </Button>
      </div>
      <div className="spatiere"></div>
      <div className="Delimitation">© 2023 INTELLIGENT FORMS</div>
    </div>
  );
}

export default Templates;
