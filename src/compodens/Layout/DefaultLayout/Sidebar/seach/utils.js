// utils.js
export function removeVietnameseTones(str) {
  if (!str) return ""; // Xử lý nếu chuỗi rỗng hoặc null
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}
