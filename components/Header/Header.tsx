import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import "./Header.scss"

const styles = {
  title: {
    display: { xs: "none", sm: "block" },
    textAlign: "center",
    color: "#1f1f1f",
    fontFamily: ["Quicksand", "sans-serif"],
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
  Diraction: React.ReactNode
}

export default function Header({ Search, Sort, Diraction }: HeaderType) {
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
          <Typography
            sx={{
              display: { xs: "none", sm: "block" },
              color: "#1f1f1f",
              // Нужно было поменять местами шрифты в массиве
              fontFamily: ["sans-serif", "Quicksand"],
              fontSize: 40,
              fontWeight: 700,
              lineHeight: "48px",
              letterSpacing: "-0.5px",
              "@media (min-width: 600px)": {
                maxWidth: 405,
                width: "100%",
                paddingLeft: "96px",
              },
            }}
          >
            Anime
          </Typography>
          <div className="header__search">{Search}</div>
          <div className="header__params">
            <div className="header__sort">{Sort}</div>
            <div className="header__direction">{Diraction}</div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
