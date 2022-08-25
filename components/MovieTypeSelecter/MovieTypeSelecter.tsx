import * as React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

type MovieTypeSelectorType = {
  handleChangeFilmType: (perPage: string) => void
  type: string
}

export default function MovieTypeSelector({
  handleChangeFilmType,
  type,
}: MovieTypeSelectorType) {
  const handleChange = (event: SelectChangeEvent) => {
    handleChangeFilmType(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value={"tv"}>TV</MenuItem>
          <MenuItem value={"Movie"}>Movie</MenuItem>
          <MenuItem value={"ova"}>Ova</MenuItem>
          <MenuItem value={"special"}>Special</MenuItem>
          <MenuItem value={"ona"}>Ona</MenuItem>
          <MenuItem value={"music"}>Music</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}