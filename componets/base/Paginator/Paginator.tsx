import * as React from "react"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import "./Paginator.scss"

type PaginatorType = {
  totalPagesCount: number
  pageSize: number
  currentPage: number
  handleChangePage: (page: string) => void
}

export default function Paginator({
  totalPagesCount,
  pageSize,
  currentPage,
  handleChangePage,
}: PaginatorType) {
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
