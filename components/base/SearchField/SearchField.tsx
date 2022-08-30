import * as React from "react"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import "./SearchField.scss"

type SearchFieldtype = {
  handleChangeFilmTitle: (filmTitle: string | undefined) => void
  filmName: string | undefined
}

export default function SearchField({
  handleChangeFilmTitle,
  filmName,
}: SearchFieldtype) {
  const [filmTitle, setFilmTitle] = React.useState(filmName)

  return (
    <div className="searchFieldContainer">
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          height: 48,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          onChange={(e) => setFilmTitle(e.target.value)}
          value={filmTitle}
        />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => handleChangeFilmTitle(filmTitle)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  )
}
