import { BeerCard } from "@/components/Beers/BeerCard";
import { BeerFiltersCard } from "@/components/Beers/BeerFiltersCard";
import { BeerPaginationControls } from "@/components/Beers/BeerPaginationControls";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchBeers } from "@/lib/beer.fetching";
import type { Beer } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";

export const Beers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("manufacturer");
  const [page, setPage] = useState(1);

  // Debounce search term (500ms delay)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, selectedType, sortBy]);

  // Memoize filters to prevent unnecessary re-renders
  const filters = useMemo(
    () => ({
      search: debouncedSearchTerm || undefined,
      type: selectedType !== "all" ? selectedType : undefined,
      sort: sortBy,
      order: "asc" as const,
      page,
      limit: 12,
    }),
    [debouncedSearchTerm, selectedType, sortBy, page]
  );

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["beers", filters],
    queryFn: () => fetchBeers(filters),
  });

  if (isLoading) {
    return (
      <div className="w-full p-4 flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 flex justify-center items-center min-h-[400px]">
        <p className="text-red-600">Error loading beers. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-black">Beers</h1>
        <p className="text-lg text-gray-600">
          Discover our selection of craft beers from around the world.
        </p>
      </div>

      <BeerFiltersCard
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {isFetching && !isLoading && (
        <div className="flex items-center justify-center py-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <LoadingSpinner size="sm" />
            <span>Updating results...</span>
          </div>
        </div>
      )}

      <div>
        {data?.beers && data.beers.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing {data.beers.length} of{" "}
                {data.pagination?.totalItems || 0} beers
                {data.pagination && (
                  <span>
                    {" "}
                    (Page {data.pagination.currentPage} of{" "}
                    {data.pagination.totalPages})
                  </span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {data.beers.map((beer: Beer) => (
                <BeerCard key={beer._id} beer={beer} />
              ))}
            </div>

            {data.pagination && data.pagination.totalPages > 1 && (
              <BeerPaginationControls
                data={data}
                isFetching={isFetching}
                setPage={setPage}
                page={page}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No beers found.</p>
            {(debouncedSearchTerm || selectedType !== "all") && (
              <p className="text-sm text-gray-500 mt-2">
                Try adjusting your search or filter criteria.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
