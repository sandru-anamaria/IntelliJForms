import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function BasicSelect({ parentCont, valUpdate }) {
  const [identifity, setIdentifity] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setIdentifity(event.target.value as string);
  };

  useEffect(() => {
    parentCont(identifity);
  }, [identifity]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
          size="small"
          value={identifity ? identifity : "None"}
        >
          <MenuItem value={"None"}>None</MenuItem>
          <MenuItem value={"Identity_Card"}>Identity card</MenuItem>
          <MenuItem value={"Passport_Card"}>Passport card</MenuItem>
          <MenuItem value={"Vehicle_Identity_Card"}>
            Vehicle Identity card
          </MenuItem>
          <MenuItem value={"Any_Document"}>Any document</MenuItem>
        </Select>
        <div></div>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
