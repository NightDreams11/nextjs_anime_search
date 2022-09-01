import StraightIcon from "@mui/icons-material/Straight"

enum sortDiractionEnum {
  "desc" = "desc",
  "asc" = "asc",
}

type SortDirectionTogglerPropsType = {
  handleSortDirectionToggler: (sortParam: string) => void
  sortDiraction: string | undefined
  filmParam: string | undefined
}

const SortDirectionToggler = ({
  handleSortDirectionToggler,
  sortDiraction,
  filmParam,
}: SortDirectionTogglerPropsType) => {
  return (
    <div style={{ visibility: filmParam ? "visible" : "hidden" }}>
      <StraightIcon
        sx={{
          cursor: "pointer",
          color: sortDiraction === sortDiractionEnum.asc ? "#24c796" : "",
        }}
        onClick={() => handleSortDirectionToggler(sortDiractionEnum.asc)}
      />
      <StraightIcon
        sx={{
          cursor: "pointer",
          transform: "rotate(180deg)",
          color: sortDiraction === sortDiractionEnum.desc ? "#24c796" : "",
        }}
        onClick={() => handleSortDirectionToggler(sortDiractionEnum.desc)}
      />
    </div>
  )
}

export default SortDirectionToggler
