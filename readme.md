Description:
Build an e-commerce application where users can browse products, add them to a cart, and
purchase them. The inventory is shared across users, so real-time updates to product stock
must reflect immediately for all users.
Frontend (Next.js):
● Product List Page: Fetch and display a list of products from the back-end API. Each
product displays: Name, description, price, and current stock. An 'Add to Cart' button is
disabled if the stock is 0.
● Cart Page: Show items added to the cart along with: Quantity for each item and the total
price. Allow users to adjust the quantity of each item (but not exceed stock) and remove
items from the cart.
● Checkout Page: Submit the cart to purchase items. On success, deduct the purchased
quantities from the stock in the database and clear the cart.


● Real-Time Stock Updates: If another user updates the inventory, reflect changes
immediately (using WebSockets or Server-Sent Events).
● Checkout Page: Submit the cart to purchase items. On success, deduct the purchased
quantities from the stock in the database and clear the cart.
● Frontend Design: Use a clean, responsive UI (CSS, Tailwind, or a component library like
Material-UI).
Backend (Node.js + Express):
● APIs:
● - /api/products (GET): Fetch all products with their current stock.
● - /api/cart/checkout (POST): Submit the cart for checkout. Validate stock availability
for each item and deduct purchased quantities from the stock in the database.
● Database: SQLite to store products with the fields: id, name, description, price, stock. Prepopulate the database
with at least 5 products.
● Real-Time Updates: Implement WebSocket or Server-Sent Events to notify clients about
stock changes.

● Error Handling: Handle edge cases like attempting to purchase an out-of-stock item or
race conditions during stock updates.
● Code Quality: Modularize the back-end code and use middleware for validation and
error handling.
Bonus Challenges:
● Implement authentication (JWT-based) to simulate a multi-user environment.
● Add optimistic UI updates for a smoother user experience.
● Write unit tests for critical back-end APIs using a testing framework like Jest.