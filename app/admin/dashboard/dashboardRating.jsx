"use client";


const products = [
  {
    id: 1,
    name: "Ergonomic Cotton Bike",
    rating: 5,
  },
  {
    id: 2,
    name: "Oriental Steel Salad",
    rating: 5,
  },
  {
    id: 3,
    name: "Ergonomic Gold Mouse",
    rating: 5,
  },
  
];

// Helper to render stars
const Stars = ({ count }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.285-3.95a1 1 0 00-.364-1.118L2.034 9.377c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.95z" />
        </svg>
      ))}
    </div>
  );
};

export default function ProductRatingTable() {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Product Ratings</h2>

      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="text-sm font-medium text-gray-500">Product</th>
            <th className="text-sm font-medium text-gray-500">Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <td className="py-2 flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  {product.name}
                </span>
              </td>
              <td className="py-2">
                <Stars count={product.rating} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
