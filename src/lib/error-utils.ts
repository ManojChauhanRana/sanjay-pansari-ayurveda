export function getFriendlyErrorMessage(error: any): string {
  if (!error) return "An unknown error occurred.";
  
  const message = error.message || "";
  
  if (message.includes("products_slug_key")) {
    return "A product with this URL slug already exists. Please try a different name or edit the slug.";
  }
  
  if (message.includes("categories_slug_key")) {
    return "A category with this name already exists.";
  }
  
  if (message.includes("violates row-level security policy")) {
    return "You don't have permission to perform this action. Please check your admin status.";
  }

  if (message.includes('invalid input syntax for type uuid: ""')) {
    return "Please select a category for this product.";
  }

  if (message.includes("duplicate key value violates unique constraint")) {
    return "This item already exists in the system.";
  }

  if (message.includes("JWT expired")) {
    return "Your session has expired. Please log in again.";
  }

  return message || "Something went wrong. Please try again.";
}
