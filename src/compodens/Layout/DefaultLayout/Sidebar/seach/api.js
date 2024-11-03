import axios from "axios";
import { removeVietnameseTones } from "./utils";

const API_URL = "http://localhost:8080/bookstore_api/api/products";

export const searchProductsByCategory = async (query, priceRange) => {
  try {
    const response = await axios.get(API_URL);
    console.log("API response:", response.data);

    const normalizedQuery = removeVietnameseTones(query.toLowerCase());

    const filteredAndSortedRows = response.data
      .filter((product) => {
        // Kiểm tra xem sản phẩm có khớp với truy vấn tìm kiếm
        return (
          (product.name &&
            product.name.toLowerCase().includes(normalizedQuery)) ||
          (product.productId &&
            product.productId.toString().includes(normalizedQuery)) ||
          (product.categoryName &&
            product.categoryName.toLowerCase().includes(normalizedQuery))
        );
      })
      .filter((product) => {
        // Kiểm tra xem sản phẩm có nằm trong khoảng giá không
        return product.price >= priceRange[0] && product.price <= priceRange[1];
      })
      .sort((a, b) => {
        // Sắp xếp sản phẩm theo mức độ khớp với truy vấn
        const aStartsWith =
          (a.name && a.name.toLowerCase().startsWith(normalizedQuery)) ||
          (a.productId && a.productId.toString().startsWith(normalizedQuery)) ||
          (a.categoryName &&
            a.categoryName.toLowerCase().startsWith(normalizedQuery));

        const bStartsWith =
          (b.name && b.name.toLowerCase().startsWith(normalizedQuery)) ||
          (b.productId && b.productId.toString().startsWith(normalizedQuery)) ||
          (b.categoryName &&
            b.categoryName.toLowerCase().startsWith(normalizedQuery));

        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;

        return (
          (a.name ? a.name.toLowerCase().indexOf(normalizedQuery) : Infinity) -
          (b.name ? b.name.toLowerCase().indexOf(normalizedQuery) : Infinity)
        );
      });

    console.log("Filtered and sorted products:", filteredAndSortedRows);
    return filteredAndSortedRows;
  } catch (error) {
    console.error("Error searching products by category:", error);
    throw error;
  }
};
