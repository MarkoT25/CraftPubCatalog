import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

interface BeerCardProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const BeerFiltersCard = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  sortBy,
  setSortBy,
}: BeerCardProps) => {
  const beerTypes = ["IPA", "Lager", "Stout", "Porter", "Pale Ale", "Other"];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search beers or breweries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Beer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {beerTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="manufacturer">Manufacturer</SelectItem>
                <SelectItem value="abv">ABV</SelectItem>
                <SelectItem value="type">Type</SelectItem>
                <SelectItem value="color">Color</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
