import * as React from "react"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import { TextField } from "@mui/material"

type PageSizeSelectorPropsType = {
  handleChangePageSize: (perPage: string) => void
  perPage: number | undefined
}

export default function PageSizeSelector({
  handleChangePageSize,
  perPage,
}: PageSizeSelectorPropsType) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangePageSize(event.target.value)
  }

  const styles = {
    textField: {
      ".MuiInputBase-root": {
        height: 32,
      },
      ".MuiFormLabel-root": {
        top: -11,
      },
      ".Mui-focused": {
        top: 0,
      },
    },
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <TextField
          sx={styles.textField}
          select
          id="demo-simple-select"
          value={perPage}
          label="Size"
          onChange={handleChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </TextField>
      </FormControl>
    </Box>
  )
}
