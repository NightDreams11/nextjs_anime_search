import SwapVertIcon from "@mui/icons-material/SwapVert"
import { useState } from "react"

enum sortDiractionEnum {
  "desc" = "desc",
  "asc" = "asc",
}

type handleToggleStartEndSortType = {
  handleToggleStartEndSort: (sortParam: string) => void
}

const FilmsStartEndSort = ({
  handleToggleStartEndSort,
}: handleToggleStartEndSortType) => {
  const [toggle, setToggle] = useState(false)

  const handleChange = () => {
    setToggle(!toggle)
    handleToggleStartEndSort(
      toggle ? sortDiractionEnum.desc : sortDiractionEnum.asc
    )
  }

  return (
    <div>
      <SwapVertIcon
        sx={{
          cursor: "pointer",
          color: toggle ? "#24c796" : "",
        }}
        onClick={handleChange}
      />
    </div>
  )
}

export default FilmsStartEndSort
