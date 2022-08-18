import * as React from "react"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import "./Paginator.scss"
import { useStore } from "../../../store/store"
import { toJS } from "mobx"

type PaginatorType = {
  totalPagesCount: number
  pageSize: number
  currentPage: number
}

export default function Paginator({
  totalPagesCount,
  pageSize,
  currentPage,
}: PaginatorType) {
  const store = useStore()

  console.log(toJS(store))

  const handleChangePage = (page: number) => {
    store.fetchFilms({ page })
  }

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
          onChange={(e, page) => handleChangePage(page)}
        />
      </Stack>
    </div>
  )
}
