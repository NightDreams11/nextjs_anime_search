import * as React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

type FilmDateSelecterType = {
  handleChangeDate: (date: string) => void
  date: string
}

export default function FilmDateSelecter({
  handleChangeDate,
  date,
}: FilmDateSelecterType) {
  const handleChange = (event: SelectChangeEvent) => {
    handleChangeDate(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Date</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Date"
          value={date}
          onChange={handleChange}
        >
          <MenuItem value={"1"}>All years</MenuItem>
          <MenuItem value={"2020-2022"}>2020-2022</MenuItem>
          <MenuItem value={"2010-2019"}>2010-2019</MenuItem>
          <MenuItem value={"2000-2009"}>2000-2009</MenuItem>
          <MenuItem value={"1990-1999"}>1990-1999</MenuItem>
          <MenuItem value={"1980-1989"}>1980-1989</MenuItem>
          <MenuItem value={"1970-1979"}>1970-1979</MenuItem>
          <MenuItem value={"1960-1969"}>1960-1969</MenuItem>
          <MenuItem value={"1950-1959"}>1950-1959</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}