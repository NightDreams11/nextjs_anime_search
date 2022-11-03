import * as React from "react"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import "./Paginator.scss"

type PaginatorPropsType = {
  totalPagesCount: number
  currentPage: number
  handleChangePage: (page: string) => void
}

export default function Paginator({
  totalPagesCount,
  currentPage,
  handleChangePage,
}: PaginatorPropsType) {
  return (
    <div className="paginatorContainer">
      <Stack spacing={2}>
        <Pagination
          count={totalPagesCount}
          variant="outlined"
          shape="rounded"
          showLastButton
          showFirstButton
          page={currentPage}
          onChange={(e, page) => {
            handleChangePage(String(page))
          }}
        />
      </Stack>
    </div>
  )
}
