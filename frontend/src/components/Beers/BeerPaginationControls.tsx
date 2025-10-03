import { Button } from "@/components/ui/button";

interface BeerPaginationControlsProps {
  data: any;
  isFetching: boolean;
  setPage: (page: number) => void;
  page: number;
}

export const BeerPaginationControls = ({
  data,
  isFetching,
  setPage,
  page,
}: BeerPaginationControlsProps) => {
  if (!data?.pagination || data.pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setPage(page - 1)}
        disabled={!data.pagination.hasPrevPage || isFetching}
        className="bg-primary-600 hover:bg-primary-500 py-5 rounded-md"
      >
        Previous
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Page {data.pagination.currentPage} of {data.pagination.totalPages}
        </span>
      </div>

      <Button
        variant="destructive"
        size="sm"
        onClick={() => setPage(page + 1)}
        disabled={!data.pagination.hasNextPage || isFetching}
        className="bg-primary-600 hover:bg-primary-500 py-5 rounded-md"
      >
        Next
      </Button>
    </div>
  );
};
