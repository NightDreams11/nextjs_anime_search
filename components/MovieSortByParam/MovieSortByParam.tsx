import * as React from "react"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import { Box, TextField } from "@mui/material"

type MovieSortByParamType = {
  handleSortByParam: (param: string) => void
  param: string
}

export default function MovieSortByParam({
  handleSortByParam,
  param,
}: MovieSortByParamType) {
  const styles = {
    textField: {
      "& label.Mui-focused": {
        color: "#1c1e52",
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "#24c796",
        },
      },
      background: "white",
      borderRadius: "4px",
      ".MuiInputBase-root": {
        height: 48,
      },
      ".MuiFormLabel-root": {
        top: -3,
      },
      ".Mui-focused": {
        top: 0,
        // "& > fieldset": { border: "1px solid red" },
      },
    },
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSortByParam(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 120, margin: 0 }}>
        <TextField
          sx={styles.textField}
          id="demo-simple-select-standard"
          select
          value={param}
          onChange={handleChange}
          label="Sort by"
        >
          <MenuItem value={"mal_id"}>ID</MenuItem>
          <MenuItem value={"title"}>Title</MenuItem>
          <MenuItem value={"type"}>Type</MenuItem>
          <MenuItem value={"raiting"}>Raiting</MenuItem>
          <MenuItem value={"start_date"}>Start date</MenuItem>
          <MenuItem value={"end_date"}>End date</MenuItem>
          <MenuItem value={"episodes"}>Episodes</MenuItem>
          <MenuItem value={"score"}>Score</MenuItem>
          <MenuItem value={"scored_by"}>Scored by</MenuItem>
          <MenuItem value={"rank"}>Rank</MenuItem>
          <MenuItem value={"popularity"}>Popularity</MenuItem>
          <MenuItem value={"members"}>Members</MenuItem>
          <MenuItem value={"favorites"}>Favorites</MenuItem>
        </TextField>
      </FormControl>
    </Box>
  )
}
