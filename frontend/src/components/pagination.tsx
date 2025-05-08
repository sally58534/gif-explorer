import { Pagination } from "@mui/material";
import type React from "react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}
const GifPagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  totalPages
}) => {
  return (
    <div className="pagination">
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_event, value) => setPage(value)}
        color="primary"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white"
          }
        }}
      />
    </div>
  );
};

export default GifPagination;
