// Product/Service Management JavaScript - Refactored to avoid conflicts

// Namespace all product management functionality to avoid conflicts
const ProductManagement = (function() {
  // Private variables - prefixed with pm to avoid conflicts
  let pmProducts = [
    { id: "P001", name: "Laptop", category: "Electronics", price: 999.99, stock: 50, status: "Active" },
    { id: "P002", name: "Office Desk", category: "Furniture", price: 249.99, stock: 20, status: "Active" },
    { id: "P003", name: "Printer", category: "Electronics", price: 199.99, stock: 15, status: "Low Stock" },
    { id: "P004", name: "Desk Chair", category: "Furniture", price: 129.99, stock: 30, status: "Active" },
    { id: "P005", name: "Whiteboard", category: "Office Supplies", price: 49.99, stock: 25, status: "Active" },
  ];

  // Initialize when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners for the menu items
    setupProductMenuListeners();
  });

  // Setup menu listeners - renamed to be unique
  function setupProductMenuListeners() {
    // Product Management menu item
    const productManagementLink = document.querySelector("a[onclick=\"loadContent('product-management')\"]");
    if (productManagementLink) {
      productManagementLink.removeAttribute("onclick");
      productManagementLink.addEventListener("click", (e) => {
        e.preventDefault();
        loadProductManagementContent();
      });
    }

    // Bulk Import menu item
    const bulkImportLink = document.querySelector("a[onclick=\"loadContent('bulk-import')\"]");
    if (bulkImportLink) {
      bulkImportLink.removeAttribute("onclick");
      bulkImportLink.addEventListener("click", (e) => {
        e.preventDefault();
        loadBulkImportContent();
      });
    }
  }

  // Load Product Management content - renamed to be unique
  function loadProductManagementContent() {
    // Hide all content sections
    hideAllProductContentSections();

    // Create or show the product management section
    let contentSection = document.getElementById("product-management-content");
    if (!contentSection) {
      createProductManagementSection();
      contentSection = document.getElementById("product-management-content");
    }

    // Show the content section
    contentSection.style.display = "block";

    // Update sidebar active state
    updateProductSidebarActiveState("product-management");
  }

  // Load Bulk Import content - renamed to be unique
  function loadBulkImportContent() {
    // Hide all content sections
    hideAllProductContentSections();

    // Create or show the bulk import section
    let contentSection = document.getElementById("bulk-import-content");
    if (!contentSection) {
      createBulkImportSection();
      contentSection = document.getElementById("bulk-import-content");
    }

    // Show the content section
    contentSection.style.display = "block";

    // Update sidebar active state
    updateProductSidebarActiveState("bulk-import");
  }

  // Hide all content sections - renamed to be unique
  function hideAllProductContentSections() {
    const contentSections = document.querySelectorAll("#main-content > div");
    contentSections.forEach((section) => {
      section.style.display = "none";
    });
  }

  // Initialize product management functionality - renamed to be unique
  function initProductManagement() {
    // Create content sections if they don't exist
    createProductManagementSection();
    createBulkImportSection();
  }

  // Create product management section - renamed to be unique
  function createProductManagementSection() {
    // Check if section already exists
    if (document.getElementById("product-management-content")) {
      return;
    }

    // Create product management content section
    const productManagementContent = document.createElement("div");
    productManagementContent.id = "product-management-content";
    productManagementContent.style.display = "none";
    productManagementContent.innerHTML = `
      <div class="container-fluid">
        <h2 class="mb-4">Product/Service Management</h2>
        
        <div class="card mb-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="input-group" style="max-width: 300px;">
                <input type="text" id="pm-product-search" class="form-control" placeholder="Search products...">
                <button class="btn btn-outline-secondary" type="button" id="pm-search-button">
                  <i class="fas fa-search"></i>
                </button>
              </div>
              <button class="btn btn-primary" id="pm-add-product-btn">
                <i class="fas fa-plus"></i> Add Product
              </button>
            </div>
            
            <div class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>PID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Unit Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="pm-product-table-body">
                  <!-- Product rows will be inserted here -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Product Modal -->
      <div class="modal fade" id="pmProductModal" tabindex="-1" aria-labelledby="pmProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="pmProductModalLabel">Add Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="pm-product-form">
                <input type="hidden" id="pm-product-id">
                <div class="mb-3">
                  <label for="pm-product-name" class="form-label">Product Name</label>
                  <input type="text" class="form-control" id="pm-product-name" required>
                </div>
                <div class="mb-3">
                  <label for="pm-product-category" class="form-label">Category</label>
                  <select class="form-select" id="pm-product-category" required>
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Software">Software</option>
                    <option value="Services">Services</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="pm-product-price" class="form-label">Unit Price</label>
                  <input type="number" class="form-control" id="pm-product-price" step="0.01" min="0" required>
                </div>
                <div class="mb-3">
                  <label for="pm-product-stock" class="form-label">Stock</label>
                  <input type="number" class="form-control" id="pm-product-stock" min="0" required>
                </div>
                <div class="mb-3">
                  <label for="pm-product-status" class="form-label">Status</label>
                  <select class="form-select" id="pm-product-status" required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="pm-save-product">Save</button>
            </div>
          </div>
        </div>
      </div>

      <!-- View Product Modal -->
      <div class="modal fade" id="pmViewProductModal" tabindex="-1" aria-labelledby="pmViewProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="pmViewProductModalLabel">Product Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="pm-view-product-details">
              <!-- Product details will be inserted here -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div class="modal fade" id="pmDeleteProductModal" tabindex="-1" aria-labelledby="pmDeleteProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="pmDeleteProductModalLabel">Confirm Delete</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this product? This action cannot be undone.</p>
              <input type="hidden" id="pm-delete-product-id">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="pm-confirm-delete">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add to main content
    document.getElementById("main-content").appendChild(productManagementContent);

    // Initialize event listeners for product management
    initProductEventListeners();

    // Render products table
    renderProductsTable();
  }

  // Create bulk import section - renamed to be unique
  function createBulkImportSection() {
    // Check if section already exists
    if (document.getElementById("bulk-import-content")) {
      return;
    }

    // Create bulk import content section
    const bulkImportContent = document.createElement("div");
    bulkImportContent.id = "bulk-import-content";
    bulkImportContent.style.display = "none";
    bulkImportContent.innerHTML = `
      <div class="container-fluid">
        <h2 class="mb-4">Bulk Import Products</h2>
        
        <div class="card mb-4">
          <div class="card-body">
            <div class="mb-4">
              <h5>Instructions</h5>
              <p>Follow these steps to import products in bulk:</p>
              <ol>
                <li>Download the template CSV file</li>
                <li>Fill in your product data in the template</li>
                <li>Upload the completed CSV file</li>
                <li>Review and confirm the import</li>
              </ol>
            </div>
            
            <div class="mb-4">
              <a href="#" class="btn btn-outline-primary" id="pm-download-template">
                <i class="fas fa-download"></i> Download Template
              </a>
            </div>
            
            <div class="mb-4">
              <label for="pm-csv-file" class="form-label">Upload CSV File</label>
              <input class="form-control" type="file" id="pm-csv-file" accept=".csv">
            </div>
            
            <div class="mb-4">
              <button class="btn btn-primary" id="pm-upload-csv" disabled>
                <i class="fas fa-upload"></i> Upload and Preview
              </button>
            </div>
            
            <div id="pm-preview-container" style="display: none;">
              <h5>Preview</h5>
              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>PID</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Unit Price</th>
                      <th>Stock</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="pm-preview-table-body">
                    <!-- Preview rows will be inserted here -->
                  </tbody>
                </table>
              </div>
              
              <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-secondary me-2" id="pm-cancel-import">Cancel</button>
                <button class="btn btn-success" id="pm-confirm-import">Confirm Import</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add to main content
    document.getElementById("main-content").appendChild(bulkImportContent);

    // Initialize event listeners for bulk import
    initBulkImportEventListeners();
  }

  // Initialize event listeners for product management - renamed to be unique
  function initProductEventListeners() {
    // Add product button
    document.getElementById("pm-add-product-btn").addEventListener("click", () => {
      // Clear form
      document.getElementById("pm-product-form").reset();
      document.getElementById("pm-product-id").value = "";
      document.getElementById("pmProductModalLabel").textContent = "Add Product";

      // Show modal - Create a new instance each time
      const productModalElement = document.getElementById("pmProductModal");
      const productModal = new bootstrap.Modal(productModalElement);
      productModal.show();
    });

    // Save product button
    document.getElementById("pm-save-product").addEventListener("click", saveProduct);

    // Search functionality
    document.getElementById("pm-product-search").addEventListener("keyup", searchProducts);
    document.getElementById("pm-search-button").addEventListener("click", searchProducts);

    // Confirm delete button
    document.getElementById("pm-confirm-delete").addEventListener("click", deleteProduct);
  }

  // Initialize event listeners for bulk import - renamed to be unique
  function initBulkImportEventListeners() {
    // Enable/disable upload button based on file selection
    document.getElementById("pm-csv-file").addEventListener("change", function () {
      document.getElementById("pm-upload-csv").disabled = !this.files.length;
    });

    // Download template button
    document.getElementById("pm-download-template").addEventListener("click", (e) => {
      e.preventDefault();
      downloadCSVTemplate();
    });

    // Upload CSV button
    document.getElementById("pm-upload-csv").addEventListener("click", previewCSV);

    // Cancel import button
    document.getElementById("pm-cancel-import").addEventListener("click", () => {
      document.getElementById("pm-preview-container").style.display = "none";
      document.getElementById("pm-csv-file").value = "";
      document.getElementById("pm-upload-csv").disabled = true;
    });

    // Confirm import button
    document.getElementById("pm-confirm-import").addEventListener("click", confirmImport);
  }

  // Render products table - renamed to be unique
  function renderProductsTable(filteredProducts = null) {
    const tableBody = document.getElementById("pm-product-table-body");
    tableBody.innerHTML = "";

    const productsToRender = filteredProducts || pmProducts;

    if (productsToRender.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center">No products found</td>
        </tr>
      `;
      return;
    }

    productsToRender.forEach((product) => {
      const row = document.createElement("tr");

      // Set status class
      let statusClass = "";
      if (product.status === "Active") {
        statusClass = "bg-success text-white";
      } else if (product.status === "Inactive") {
        statusClass = "bg-secondary text-white";
      } else if (product.status === "Low Stock") {
        statusClass = "bg-warning";
      } else if (product.status === "Out of Stock") {
        statusClass = "bg-danger text-white";
      }

      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>₹${product.price.toFixed(2)}</td>
        <td>${product.stock}</td>
        <td><span class="badge ${statusClass}">${product.status}</span></td>
        <td>
          <button class="btn btn-sm btn-info pm-view-product" data-id="${product.id}">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn btn-sm btn-primary pm-edit-product" data-id="${product.id}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger pm-delete-product" data-id="${product.id}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;

      tableBody.appendChild(row);
    });

    // Add event listeners to action buttons
    addProductActionButtonListeners();
  }

  // Add event listeners to action buttons - renamed to be unique
  function addProductActionButtonListeners() {
    // View product buttons
    document.querySelectorAll(".pm-view-product").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-id");
        viewProduct(productId);
      });
    });

    // Edit product buttons
    document.querySelectorAll(".pm-edit-product").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-id");
        editProduct(productId);
      });
    });

    // Delete product buttons
    document.querySelectorAll(".pm-delete-product").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-id");
        confirmDeleteProduct(productId);
      });
    });
  }

  // View product details - renamed to be unique
  function viewProduct(productId) {
    const product = pmProducts.find((p) => p.id === productId);

    if (product) {
      const detailsContainer = document.getElementById("pm-view-product-details");
      detailsContainer.innerHTML = `
        <div class="mb-3">
          <strong>Product ID:</strong> ${product.id}
        </div>
        <div class="mb-3">
          <strong>Name:</strong> ${product.name}
        </div>
        <div class="mb-3">
          <strong>Category:</strong> ${product.category}
        </div>
        <div class="mb-3">
          <strong>Unit Price:</strong> ₹${product.price.toFixed(2)}
        </div>
        <div class="mb-3">
          <strong>Stock:</strong> ${product.stock}
        </div>
        <div class="mb-3">
          <strong>Status:</strong> ${product.status}
        </div>
      `;

      // Create a new instance each time
      const viewModalElement = document.getElementById("pmViewProductModal");
      const viewModal = new bootstrap.Modal(viewModalElement);
      viewModal.show();
    }
  }

  // Edit product - renamed to be unique
  function editProduct(productId) {
    const product = pmProducts.find((p) => p.id === productId);

    if (product) {
      // Fill form with product data
      document.getElementById("pm-product-id").value = product.id;
      document.getElementById("pm-product-name").value = product.name;
      document.getElementById("pm-product-category").value = product.category;
      document.getElementById("pm-product-price").value = product.price;
      document.getElementById("pm-product-stock").value = product.stock;
      document.getElementById("pm-product-status").value = product.status;

      // Update modal title
      document.getElementById("pmProductModalLabel").textContent = "Edit Product";

      // Show modal - Create a new instance each time
      const productModalElement = document.getElementById("pmProductModal");
      const productModal = new bootstrap.Modal(productModalElement);
      productModal.show();
    }
  }

  // Confirm delete product - renamed to be unique
  function confirmDeleteProduct(productId) {
    document.getElementById("pm-delete-product-id").value = productId;

    // Create a new instance each time
    const deleteModalElement = document.getElementById("pmDeleteProductModal");
    const deleteModal = new bootstrap.Modal(deleteModalElement);
    deleteModal.show();
  }

  // Save product (add or update) - renamed to be unique
  function saveProduct() {
    // Get form data
    const productId = document.getElementById("pm-product-id").value;
    const name = document.getElementById("pm-product-name").value;
    const category = document.getElementById("pm-product-category").value;
    const price = Number.parseFloat(document.getElementById("pm-product-price").value);
    const stock = Number.parseInt(document.getElementById("pm-product-stock").value);
    const status = document.getElementById("pm-product-status").value;

    // Validate form
    if (!name || !category || isNaN(price) || isNaN(stock)) {
      alert("Please fill all required fields with valid data.");
      return;
    }

    if (productId) {
      // Update existing product
      const index = pmProducts.findIndex((p) => p.id === productId);

      if (index !== -1) {
        pmProducts[index] = {
          id: productId,
          name,
          category,
          price,
          stock,
          status,
        };
      }
    } else {
      // Add new product
      const newId = generateProductId();

      pmProducts.push({
        id: newId,
        name,
        category,
        price,
        stock,
        status,
      });
    }

    // Properly close the modal
    const productModalElement = document.getElementById("pmProductModal");
    const productModal = bootstrap.Modal.getInstance(productModalElement);
    if (productModal) {
      productModal.hide();
    }

    // Refresh table
    renderProductsTable();
  }

  // Delete product - renamed to be unique
  function deleteProduct() {
    const productId = document.getElementById("pm-delete-product-id").value;

    // Remove product from array
    pmProducts = pmProducts.filter((p) => p.id !== productId);

    // Properly close the modal
    const deleteModalElement = document.getElementById("pmDeleteProductModal");
    const deleteModal = bootstrap.Modal.getInstance(deleteModalElement);
    if (deleteModal) {
      deleteModal.hide();
    }

    // Refresh table
    renderProductsTable();
  }

  // Search products - renamed to be unique
  function searchProducts() {
    const searchTerm = document.getElementById("pm-product-search").value.toLowerCase();

    if (!searchTerm) {
      renderProductsTable();
      return;
    }

    const filteredProducts = pmProducts.filter(
      (product) =>
        product.id.toLowerCase().includes(searchTerm) ||
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.status.toLowerCase().includes(searchTerm),
    );

    renderProductsTable(filteredProducts);
  }

  // Generate product ID - renamed to be unique
  function generateProductId() {
    // Find highest existing ID number
    const existingIds = pmProducts.map((p) => Number.parseInt(p.id.replace(/\D/g, "")));
    const maxId = Math.max(...existingIds, 0);

    // Create new ID with P prefix and padded number
    return `P${(maxId + 1).toString().padStart(3, "0")}`;
  }

  // Download CSV template - renamed to be unique
  function downloadCSVTemplate() {
    const headers = ["PID", "Name", "Category", "Unit Price", "Stock", "Status"];
    const sampleData = [
      ["P006", "Sample Product 1", "Electronics", "99.99", "10", "Active"],
      ["P007", "Sample Product 2", "Office Supplies", "29.99", "50", "Active"],
    ];

    let csvContent = headers.join(",") + "\n";
    sampleData.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "product_import_template.csv";
    a.click();

    URL.revokeObjectURL(url);
  }

  // Preview CSV file - renamed to be unique
  function previewCSV() {
    const fileInput = document.getElementById("pm-csv-file");
    const file = fileInput.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      const lines = contents.split("\n");

      // Skip header row and parse data
      const previewData = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();

        if (!line) continue;

        const values = line.split(",");

        if (values.length >= 6) {
          previewData.push({
            id: values[0],
            name: values[1],
            category: values[2],
            price: Number.parseFloat(values[3]),
            stock: Number.parseInt(values[4]),
            status: values[5],
          });
        }
      }

      // Display preview
      renderPreviewTable(previewData);
      document.getElementById("pm-preview-container").style.display = "block";
    };

    reader.readAsText(file);
  }

  // Render preview table - renamed to be unique
  function renderPreviewTable(previewData) {
    const tableBody = document.getElementById("pm-preview-table-body");
    tableBody.innerHTML = "";

    if (previewData.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">No valid data found in CSV</td>
        </tr>
      `;
      return;
    }

    previewData.forEach((product) => {
      const row = document.createElement("tr");

      // Set status class
      let statusClass = "";
      if (product.status === "Active") {
        statusClass = "bg-success text-white";
      } else if (product.status === "Inactive") {
        statusClass = "bg-secondary text-white";
      } else if (product.status === "Low Stock") {
        statusClass = "bg-warning";
      } else if (product.status === "Out of Stock") {
        statusClass = "bg-danger text-white";
      }

      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>₹${product.price.toFixed(2)}</td>
        <td>${product.stock}</td>
        <td><span class="badge ${statusClass}">${product.status}</span></td>
      `;

      tableBody.appendChild(row);
    });

    // Store preview data for import
    window.pmPreviewData = previewData;
  }

  // Confirm import - renamed to be unique
  function confirmImport() {
    if (!window.pmPreviewData || window.pmPreviewData.length === 0) {
      return;
    }

    // Add preview data to products array
    pmProducts = [...pmProducts, ...window.pmPreviewData];

    // Reset import form
    document.getElementById("pm-csv-file").value = "";
    document.getElementById("pm-upload-csv").disabled = true;
    document.getElementById("pm-preview-container").style.display = "none";

    // Show success message
    alert(`Successfully imported ${window.pmPreviewData.length} products.`);

    // Clear preview data
    window.pmPreviewData = null;

    // If we're on the product management page, refresh the table
    if (document.getElementById("product-management-content").style.display !== "none") {
      renderProductsTable();
    }
  }

  // Update sidebar active state - renamed to be unique
  function updateProductSidebarActiveState(contentType) {
    // Remove active class from all sidebar items
    document.querySelectorAll("#sidebar ul li").forEach((item) => {
      item.classList.remove("active");
    });

    // Add active class to the clicked item
    const activeLink = document.querySelector(`#sidebar a[onclick="loadContent('${contentType}')"]`);
    if (activeLink) {
      activeLink.closest("li").classList.add("active");

      // If it's in a submenu, expand the parent menu
      const parentSubmenu = activeLink.closest("ul.collapse");
      if (parentSubmenu) {
        parentSubmenu.classList.add("show");
        const parentToggle = document.querySelector(`a[href="#${parentSubmenu.id}"]`);
        if (parentToggle) {
          parentToggle.setAttribute("aria-expanded", "true");
          parentToggle.classList.remove("collapsed");
        }
      }
    }
  }

  // Public API
  return {
    init: initProductManagement,
    loadProductManagement: loadProductManagementContent,
    loadBulkImport: loadBulkImportContent
  };
})();

// Override the loadContent function from the main script to handle our specific content types
const originalLoadContent = window.loadContent;
window.loadContent = (contentType) => {
  if (contentType === "product-management") {
    ProductManagement.loadProductManagement();
    return;
  } else if (contentType === "bulk-import") {
    ProductManagement.loadBulkImport();
    return;
  }

  // For other content types, use the original function
  if (typeof originalLoadContent === "function") {
    originalLoadContent(contentType);
  }
};

// Initialize the product management module
document.addEventListener("DOMContentLoaded", () => {
  ProductManagement.init();
});

console.log("Product Management module has been refactored to prevent conflicts with other modules.");