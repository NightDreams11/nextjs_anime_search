import * as React from "react"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import { TextField } from "@mui/material"

type MovieTypeSelectorType = {
  handleChangeFilmType: (perPage: string) => void
  type: string
}

export default function MovieTypeSelector({
  handleChangeFilmType,
  type,
}: MovieTypeSelectorType) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeFilmType(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <TextField
          sx={{
            ".MuiInputBase-root": {
              height: 40,
            },
          }}
          select
          size="small"
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
        </TextField>
      </FormControl>
    </Box>
  )
}
