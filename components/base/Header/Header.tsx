import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import "./Header.scss"
import { Button } from "@mui/material"

const styles = {
  title: {
    textAlign: "center",
    color: "#1f1f1f",
    fontFamily: "Quicksand sans-serif ",
    fontSize: 40,
    fontWeight: 700,
    lineHeight: "48px",
    letterSpacing: "-0.5px",
    "@media (min-width: 600px)": {
      maxWidth: 405,
      width: "100%",
    },
  },
}

type HeaderType = {
  Search: React.ReactNode
  Sort: React.ReactNode
  Direction: React.ReactNode
  title: string
  resetSearchParams: () => void
  searchQueries: string | string[] | undefined
}

export default function Header({
  Search,
  Sort,
  Direction,
  title,
  resetSearchParams,
  searchQueries,
}: HeaderType) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          background: " linear-gradient(to bottom right, blue, pink);",
        }}
      >
        <Toolbar
          sx={{
            "@media (min-width: 600px)": {
              minHeight: 80,
            },
          }}
        >
          <Typography sx={styles.title}>{title}</Typography>
          <div className="header__search">{Search}</div>
          <Button
            variant="text"
            onClick={resetSearchParams}
            sx={{
              visibility: searchQueries ? "visible" : "hidden",
              height: 48,
              ml: "10px",
              color: "#000",
            }}
          >
            Reset
          </Button>
          <div className="header__params">
            <div className="header__sort">{Sort}</div>
            <div className="header__direction">{Direction}</div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
