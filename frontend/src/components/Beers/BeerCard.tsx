import type { Beer } from "@/types/index";

interface BeerCardProps {
  beer: Beer;
}

export const BeerCard = ({ beer }: BeerCardProps) => {
  return (
    <div
      key={beer._id}
      className="border border-gray-200 rounded-lg p-4 flex flex-col items-center card-hover"
    >
      <img
        src={beer.imageUrl}
        alt={beer.name}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h2 className="text-lg font-semibold">{beer.name}</h2>
      <h3 className="text-lg font-semibold">{beer.type}</h3>
      <p className="text-gray-600">{beer.description}</p>
    </div>
  );
};
