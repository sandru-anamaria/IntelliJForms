import React from "react";
import NavBar2 from "../NavBar2";
import "./Submission.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Link } from "react-router-dom";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { Divider, Pagination } from "@mui/material";
import { useState } from "react";
import "primeicons/primeicons.css";
import { useEffect } from "react";
import { getTemplate } from "../../API/TemplateAPI/TemplateAPI";
import { useParams } from "react-router-dom";
import { getSubmissionByFormId } from "../../API/SubmissionAPI/SubmissionAPI";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import html2pdf from "html2pdf.js";
import ArrowForwardSharp from "@mui/icons-material/ArrowForwardSharp";
import SearchIcon from "@mui/icons-material/Search";

export default function Submission_Forms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState("");
  const [submissions, setSubmissions] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getTemplate(id)
      .then((response) => {
        setForm(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getSubmissionByFormId(id)
      .then((response) => {
        setSubmissions(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  submissions.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));

  function convertHtmlToPdf(htmlString, id) {
    const options = {
      margin: [0, 0, 0, 0],
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(options).from(htmlString).save(`submission${id}`);
  }

  function MyTable() {
    const rowsPerPage = 4;

    const [page, setPage] = React.useState(0);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const allFields = form.sections
      .map((section) => {
        return section.fields.map((field) => field.dynamicField_Key);
      })
      .reduce((acc, curr) => {
        return acc.concat(curr);
      }, []);

    const [sortingOrder, setSortingOrder] = React.useState("asc");
    const [sortingColumn, setSortingColumn] = React.useState("timeStamp");

    const filteredRows = submissions.filter((row) => {
      const timeStampValue = row.timeStamp.toLowerCase();
      const submissionFieldsValues = row.submissionFields.map(
        (submissionField) => submissionField.value.toLowerCase()
      );
      return (
        timeStampValue.includes(searchQuery.toLowerCase()) ||
        submissionFieldsValues.some((value) =>
          value.includes(searchQuery.toLowerCase())
        )
      );
    });

    const start = page * rowsPerPage;
    const end = start + rowsPerPage;

    React.useEffect(() => {
      setPage(0);
    }, [searchQuery]);

    const handleSortClick = (column) => {
      if (column === sortingColumn) {
        setSortingOrder(sortingOrder === "asc" ? "desc" : "asc");
      } else {
        setSortingColumn(column);
        setSortingOrder("asc");
      }
    };

    var rows = filteredRows
      .sort((a, b) => {
        if (a.timeStamp > b.timeStamp) {
          return -1;
        }
      })
      .slice(start, end);

    return (
      <>
        <TableContainer>
          <Table style={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  className="Details"
                  key={"TimeStamp"}
                  align="center"
                  onClick={() => handleSortClick("timeStamp")}
                  style={{ fontSize: "15px" }}
                >
                  Create Date (UTC)
                </TableCell>
                <TableCell
                  className="Details"
                  key={allFields[0]}
                  align="center"
                  style={{ fontSize: "15px" }}
                >
                  {allFields[0]}
                </TableCell>
                <TableCell
                  className="Details"
                  key={allFields[1]}
                  align="center"
                  style={{ fontSize: "15px" }}
                >
                  {allFields[1]}{" "}
                </TableCell>
                <TableCell
                  className="Details"
                  key={allFields[2]}
                  align="center"
                  style={{ fontSize: "15px" }}
                >
                  {allFields[2]}{" "}
                </TableCell>
                <TableCell
                  className="Details"
                  key={allFields[3]}
                  align="center"
                  style={{ fontSize: "15px" }}
                >
                  {allFields[3]}
                </TableCell>
                <TableCell
                  className="Details"
                  key={allFields[4]}
                  align="center"
                  style={{ fontSize: "15px" }}
                >
                  {allFields[4]}
                </TableCell>
                <TableCell
                  className="Details"
                  key={"Actions"}
                  align="center"
                  style={{ fontSize: "15px" }}
                >
                  {"Download"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center" key={row.timeStamp}>
                    {row.timeStamp}
                  </TableCell>
                  {row.submissionFields[0] ? (
                    <TableCell
                      align="center"
                      key={row.submissionFields[0].value}
                    >
                      {row.submissionFields[0].value}
                    </TableCell>
                  ) : (
                    <TableCell align="center" key={""}>
                      {""}
                    </TableCell>
                  )}
                  {row.submissionFields[1] ? (
                    <TableCell
                      align="center"
                      key={row.submissionFields[1].value}
                    >
                      {row.submissionFields[1].value}
                    </TableCell>
                  ) : (
                    <TableCell align="center" key={""}>
                      {""}
                    </TableCell>
                  )}
                  {row.submissionFields[2] ? (
                    <TableCell
                      align="center"
                      key={row.submissionFields[2].value}
                    >
                      {row.submissionFields[2].value}
                    </TableCell>
                  ) : (
                    <TableCell align="center" key={""}>
                      {""}
                    </TableCell>
                  )}
                  {row.submissionFields[3] ? (
                    <TableCell
                      align="center"
                      key={row.submissionFields[3].value}
                    >
                      {row.submissionFields[3].value}
                    </TableCell>
                  ) : (
                    <TableCell align="center" key={""}>
                      {""}
                    </TableCell>
                  )}
                  {row.submissionFields[4] ? (
                    <TableCell
                      align="center"
                      key={row.submissionFields[4].value}
                    >
                      {row.submissionFields[4].value}
                    </TableCell>
                  ) : (
                    <TableCell align="center" key={""}>
                      {""}
                    </TableCell>
                  )}
                  <TableCell align="center" key={"Actions"}>
                    {row && (
                      <IconButton
                        onClick={() => convertHtmlToPdf(row.content, row.id)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </div>
        </TableContainer>
      </>
    );
  }

  return (
    <div>
      <NavBar2 />
      <div className="container">
        <span>
          <SearchIcon />
        </span>
        <div className="Margin">
          <input
            className="Search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>

      <div className="Tabel">
        <div className="app-container">
          {submissions && form && <MyTable />}
        </div>
      </div>

      <div className="Delimitation">© 2023 INTELLIGENT FORMS</div>
    </div>
  );
}
