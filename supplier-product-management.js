// Supplier Product/Service Management JavaScript File

// Initialize when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
    // If supplier product content is loaded, initialize it
    if (document.getElementById("supplier-product-content")) {
      initSupplierProduct()
    }
  
    // Add event listener for the supplier product management menu item
    const supplierProductLink = document.querySelector("a[onclick=\"loadContent('supplier-product')\"]")
    if (supplierProductLink) {
      supplierProductLink.removeAttribute("onclick")
      supplierProductLink.addEventListener("click", (e) => {
        e.preventDefault()
        handleSupplierProductClick()
      })
    }
  })
  
  // Function to handle supplier product menu click
  function handleSupplierProductClick() {
    // Hide all content sections first
    const allContentSections = document.querySelectorAll("#main-content > div")
    allContentSections.forEach((section) => {
      section.style.display = "none"
    })
  
    // Create or show the supplier product content section
    let contentSection = document.getElementById("supplier-product-content")
  
    if (!contentSection) {
      contentSection = createSupplierProductContent()
      document.getElementById("main-content").appendChild(contentSection)
      initSupplierProduct()
    } else {
      contentSection.style.display = "block"
    }
  
    // Update active state in sidebar
    updateSidebarActiveState("supplier-product")
  
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      document.getElementById("sidebar").classList.add("active")
      document.getElementById("content").classList.add("active")
    }
  }
  
  // Function to create supplier product content section if it doesn't exist
  function createSupplierProductContent() {
    const contentSection = document.createElement("div")
    contentSection.id = "supplier-product-content"
    contentSection.className = "container-fluid"
  
    // Create the header with title and add button
    const header = document.createElement("div")
    header.className = "d-flex justify-content-between align-items-center mb-4"
    header.innerHTML = `
      <h2>Supplier Product/Service Management</h2>
      <button id="addProductBtn" class="btn btn-primary">
        <i class="fas fa-plus"></i> Add New Product/Service
      </button>
    `
  
    // Create search bar
    const searchBar = document.createElement("div")
    searchBar.className = "mb-4"
    searchBar.innerHTML = `
      <div class="input-group">
        <span class="input-group-text"><i class="fas fa-search"></i></span>
        <input type="text" id="productSearchInput" class="form-control" placeholder="Search products/services...">
      </div>
    `
  
    // Create table for products
    const tableContainer = document.createElement("div")
    tableContainer.className = "table-responsive"
    tableContainer.innerHTML = `
      <table id="productsTable" class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier</th>
            <th>Name</th>
            <th>Type</th>
            <th>SKU/Code</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="productsTableBody">
          <!-- Product data will be loaded here -->
        </tbody>
      </table>
    `
  
    // Create modal for adding/editing products
    const modal = document.createElement("div")
    modal.className = "modal fade"
    modal.id = "productModal"
    modal.tabIndex = "-1"
    modal.setAttribute("aria-labelledby", "productModalLabel")
    modal.setAttribute("aria-hidden", "true")
    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">Add New Product/Service</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="productForm">
              <input type="hidden" id="productId">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="supplierSelect" class="form-label">Supplier*</label>
                  <select class="form-select" id="supplierSelect" required>
                    <option value="">Select Supplier</option>
                    <option value="ABC Suppliers">ABC Suppliers</option>
                  <option value="XYZ Corporation">XYZ Corporation</option>
                  <option value="Global Traders">Global Traders</option>
                  <option value="Tech Solutions">Tech Solutions</option>
                  <option value="Office Supplies Inc.">Office Supplies Inc.</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="productType" class="form-label">Type*</label>
                  <select class="form-select" id="productType" required>
                    <option value="">Select Type</option>
                    <option value="Product">Product</option>
                    <option value="Service">Service</option>
                    <option value="Software">Software</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="productName" class="form-label">Name*</label>
                  <input type="text" class="form-control" id="productName" required>
                </div>
                <div class="col-md-6">
                  <label for="productSKU" class="form-label">SKU/Code*</label>
                  <input type="text" class="form-control" id="productSKU" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="productPrice" class="form-label">Price*</label>
                  <div class="input-group">
                    <span class="input-group-text">₹</span>
                    <input type="number" class="form-control" id="productPrice" step="0.01" min="0" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="productStatus" class="form-label">Status</label>
                  <select class="form-select" id="productStatus">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-12">
                  <label for="productDescription" class="form-label">Description</label>
                  <textarea class="form-control" id="productDescription" rows="3"></textarea>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="productMinOrder" class="form-label">Minimum Order Quantity</label>
                  <input type="number" class="form-control" id="productMinOrder" min="1">
                </div>
                <div class="col-md-6">
                  <label for="productLeadTime" class="form-label">Lead Time (days)</label>
                  <input type="number" class="form-control" id="productLeadTime" min="0">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-12">
                  <label for="productNotes" class="form-label">Notes</label>
                  <textarea class="form-control" id="productNotes" rows="2"></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="saveProductBtn">Save</button>
          </div>
        </div>
      </div>
    `
  
    // Create view product modal
    const viewModal = document.createElement("div")
    viewModal.className = "modal fade"
    viewModal.id = "viewProductModal"
    viewModal.tabIndex = "-1"
    viewModal.setAttribute("aria-labelledby", "viewProductModalLabel")
    viewModal.setAttribute("aria-hidden", "true")
    viewModal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewProductModalLabel">Product/Service Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="viewProductDetails">
            <!-- Product details will be loaded here -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `
  
    // Create delete confirmation modal
    const deleteModal = document.createElement("div")
    deleteModal.className = "modal fade"
    deleteModal.id = "deleteProductModal"
    deleteModal.tabIndex = "-1"
    deleteModal.setAttribute("aria-labelledby", "deleteProductModalLabel")
    deleteModal.setAttribute("aria-hidden", "true")
    deleteModal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteProductModalLabel">Confirm Delete</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this product/service? This action cannot be undone.</p>
            <input type="hidden" id="deleteProductIdInput">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" id="confirmDeleteProductBtn">Delete</button>
          </div>
        </div>
      </div>
    `
  
    // Append all elements to the content section
    contentSection.appendChild(header)
    contentSection.appendChild(searchBar)
    contentSection.appendChild(tableContainer)
    contentSection.appendChild(modal)
    contentSection.appendChild(viewModal)
    contentSection.appendChild(deleteModal)
  
    return contentSection
  }
  
  // Sample product data
  const sampleProducts = [
    {
      id: 1,
      supplierId: 1,
      supplierName: "ABC Supplies Inc.",
      name: "Office Desk",
      type: "Product",
      sku: "DESK-001",
      price: 299.99,
      status: "Active",
      description: "Standard office desk with drawers",
      minOrder: 5,
      leadTime: 14,
      notes: "Available in oak, maple, and cherry finishes",
    },
    {
      id: 2,
      supplierId: 1,
      supplierName: "ABC Supplies Inc.",
      name: "Office Chair",
      type: "Product",
      sku: "CHAIR-001",
      price: 149.99,
      status: "Active",
      description: "Ergonomic office chair with adjustable height",
      minOrder: 10,
      leadTime: 7,
      notes: "Available in black, blue, and gray",
    },
    {
      id: 3,
      supplierId: 2,
      supplierName: "Global Tech Solutions",
      name: "Laptop",
      type: "Hardware",
      sku: "LT-2023",
      price: 899.99,
      status: "Active",
      description: "Business laptop with 16GB RAM and 512GB SSD",
      minOrder: 5,
      leadTime: 21,
      notes: "Includes 3-year warranty",
    },
    {
      id: 4,
      supplierId: 2,
      supplierName: "Global Tech Solutions",
      name: "IT Support",
      type: "Service",
      sku: "SVC-IT-001",
      price: 99.99,
      status: "Active",
      description: "Monthly IT support service",
      minOrder: 1,
      leadTime: 1,
      notes: "24/7 support available for additional fee",
    },
    {
      id: 5,
      supplierId: 3,
      supplierName: "EcoFriendly Materials",
      name: "Recycled Paper",
      type: "Product",
      sku: "PAPER-ECO",
      price: 4.99,
      status: "Active",
      description: "100% recycled paper, 500 sheets",
      minOrder: 20,
      leadTime: 5,
      notes: "FSC certified",
    },
  ]
  
  // Function to initialize supplier product
  function initSupplierProduct() {
    // Load products data
    loadProducts()
  
    // Load suppliers for dropdown
    loadSuppliersDropdown()
  
    // Add event listener for search input
    document.getElementById("productSearchInput").addEventListener("input", searchProducts)
  
    // Add event listener for add product button
    document.getElementById("addProductBtn").addEventListener("click", () => {
      // Reset form and show modal
      document.getElementById("productForm").reset()
      document.getElementById("productId").value = ""
      document.getElementById("productModalLabel").textContent = "Add New Product/Service"
  
      // Declare bootstrap variable
      const bootstrap = window.bootstrap
      const productModal = new bootstrap.Modal(document.getElementById("productModal"))
      productModal.show()
    })
  
    // Add event listener for save product button
    document.getElementById("saveProductBtn").addEventListener("click", saveProduct)
  
    // Add event listener for confirm delete button
    document.getElementById("confirmDeleteProductBtn").addEventListener("click", deleteProduct)
  }
  
  // Function to load products data
  function loadProducts(filteredProducts = null) {
    const products = filteredProducts || getProductsFromStorage()
    const tableBody = document.getElementById("productsTableBody")
    tableBody.innerHTML = ""
  
    products.forEach((product) => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.supplierName}</td>
        <td>${product.name}</td>
        <td>${product.type}</td>
        <td>${product.sku}</td>
        <td>₹${product.price.toFixed(2)}</td>
        <td><span class="badge ${getProductStatusBadgeClass(product.status)}">${product.status}</span></td>
        <td>
          <button class="btn btn-sm btn-info view-product" data-id="${product.id}">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn btn-sm btn-primary edit-product" data-id="${product.id}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger delete-product" data-id="${product.id}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `
      tableBody.appendChild(row)
    })
  
    // Add event listeners for action buttons
    addProductActionButtonListeners()
  }
  
  // Function to get badge class based on status
  function getProductStatusBadgeClass(status) {
    switch (status) {
      case "Active":
        return "bg-success"
      case "Inactive":
        return "bg-warning"
      case "Discontinued":
        return "bg-danger"
      default:
        return "bg-secondary"
    }
  }
  
  // Function to load suppliers for dropdown
  function loadSuppliersDropdown() {
    const suppliers = getSuppliersFromStorage()
    const supplierSelect = document.getElementById("supplierSelect")
  
    // Clear existing options except the first one
    while (supplierSelect.options.length > 1) {
      supplierSelect.remove(1)
    }
  
    // Add supplier options
    suppliers.forEach((supplier) => {
      const option = document.createElement("option")
      option.value = supplier.id
      option.textContent = supplier.name
      supplierSelect.appendChild(option)
    })
  }
  
  // Function to add event listeners for action buttons
  function addProductActionButtonListeners() {
    // View product buttons
    document.querySelectorAll(".view-product").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.currentTarget.getAttribute("data-id")
        viewProduct(productId)
      })
    })
  
    // Edit product buttons
    document.querySelectorAll(".edit-product").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.currentTarget.getAttribute("data-id")
        editProduct(productId)
      })
    })
  
    // Delete product buttons
    document.querySelectorAll(".delete-product").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.currentTarget.getAttribute("data-id")
        confirmDeleteProduct(productId)
      })
    })
  }
  
  // Function to view product details
  function viewProduct(productId) {
    const products = getProductsFromStorage()
    const product = products.find((p) => p.id == productId)
  
    if (product) {
      const detailsContainer = document.getElementById("viewProductDetails")
      detailsContainer.innerHTML = `
        <div class="row">
          <div class="col-md-6">
            <p><strong>Product ID:</strong> ${product.id}</p>
            <p><strong>Supplier:</strong> ${product.supplierName}</p>
            <p><strong>Name:</strong> ${product.name}</p>
            <p><strong>Type:</strong> ${product.type}</p>
            <p><strong>SKU/Code:</strong> ${product.sku}</p>
          </div>
          <div class="col-md-6">
            <p><strong>Price:</strong> ₹${product.price.toFixed(2)}</p>
            <p><strong>Status:</strong> <span class="badge ${getProductStatusBadgeClass(product.status)}">${product.status}</span></p>
            <p><strong>Minimum Order:</strong> ${product.minOrder || "N/A"}</p>
            <p><strong>Lead Time:</strong> ${product.leadTime ? `${product.leadTime} days` : "N/A"}</p>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
            <p><strong>Description:</strong></p>
            <p>${product.description || "No description available"}</p>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
            <p><strong>Notes:</strong></p>
            <p>${product.notes || "No notes available"}</p>
          </div>
        </div>
      `
  
      // Declare bootstrap variable
      const bootstrap = window.bootstrap
      const viewModal = new bootstrap.Modal(document.getElementById("viewProductModal"))
      viewModal.show()
    }
  }
  
  // Function to edit product
  function editProduct(productId) {
    const products = getProductsFromStorage()
    const product = products.find((p) => p.id == productId)
  
    if (product) {
      // Fill the form with product data
      document.getElementById("productId").value = product.id
      document.getElementById("supplierSelect").value = product.supplierId
      document.getElementById("productType").value = product.type
      document.getElementById("productName").value = product.name
      document.getElementById("productSKU").value = product.sku
      document.getElementById("productPrice").value = product.price
      document.getElementById("productStatus").value = product.status
      document.getElementById("productDescription").value = product.description || ""
      document.getElementById("productMinOrder").value = product.minOrder || ""
      document.getElementById("productLeadTime").value = product.leadTime || ""
      document.getElementById("productNotes").value = product.notes || ""
  
      // Update modal title
      document.getElementById("productModalLabel").textContent = "Edit Product/Service"
  
      // Declare bootstrap variable
      const bootstrap = window.bootstrap
      // Show the modal
      const productModal = new bootstrap.Modal(document.getElementById("productModal"))
      productModal.show()
    }
  }
  
  // Function to confirm delete product
  function confirmDeleteProduct(productId) {
    document.getElementById("deleteProductIdInput").value = productId
    // Declare bootstrap variable
    const bootstrap = window.bootstrap
    const deleteModal = new bootstrap.Modal(document.getElementById("deleteProductModal"))
    deleteModal.show()
  }
  
  // Function to delete product
  function deleteProduct() {
    const productId = document.getElementById("deleteProductIdInput").value
    let products = getProductsFromStorage()
  
    // Filter out the product to delete
    products = products.filter((p) => p.id != productId)
  
    // Save updated products to storage
    saveProductsToStorage(products)
  
    // Declare bootstrap variable
    const bootstrap = window.bootstrap
    // Close the modal
    const deleteModalInstance = bootstrap.Modal.getInstance(document.getElementById("deleteProductModal"))
    if (deleteModalInstance) {
      deleteModalInstance.hide()
    }
  
    // Reload products table
    loadProducts()
  }
  
  // Function to save product
  function saveProduct() {
    // Get form values
    const productId = document.getElementById("productId").value
    const supplierId = document.getElementById("supplierSelect").value
    const type = document.getElementById("productType").value
    const name = document.getElementById("productName").value
    const sku = document.getElementById("productSKU").value
    const price = Number.parseFloat(document.getElementById("productPrice").value)
    const status = document.getElementById("productStatus").value
    const description = document.getElementById("productDescription").value
    const minOrder = document.getElementById("productMinOrder").value
      ? Number.parseInt(document.getElementById("productMinOrder").value)
      : null
    const leadTime = document.getElementById("productLeadTime").value
      ? Number.parseInt(document.getElementById("productLeadTime").value)
      : null
    const notes = document.getElementById("productNotes").value
  
    // Validate required fields
    if (!supplierId || !type || !name || !sku || isNaN(price)) {
      alert("Please fill in all required fields")
      return
    }
  
    // Get supplier name
    const suppliers = getSuppliersFromStorage()
    const supplier = suppliers.find((s) => s.id == supplierId)
  
    if (!supplier) {
      alert("Please select a valid supplier")
      return
    }
  
    // Get existing products
    const products = getProductsFromStorage()
  
    // Check for duplicate SKU
    const isDuplicateSKU = products.some((p) => p.sku === sku && p.id != productId)
    if (isDuplicateSKU) {
      alert("A product with this SKU/Code already exists. Please use a unique SKU/Code.")
      return
    }
  
    if (productId) {
      // Update existing product
      const index = products.findIndex((p) => p.id == productId)
      if (index !== -1) {
        products[index] = {
          id: Number.parseInt(productId),
          supplierId: Number.parseInt(supplierId),
          supplierName: supplier.name,
          name,
          type,
          sku,
          price,
          status,
          description,
          minOrder,
          leadTime,
          notes,
        }
      }
    } else {
      // Add new product
      const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
      products.push({
        id: newId,
        supplierId: Number.parseInt(supplierId),
        supplierName: supplier.name,
        name,
        type,
        sku,
        price,
        status,
        description,
        minOrder,
        leadTime,
        notes,
      })
    }
  
    // Save to storage
    saveProductsToStorage(products)
  
    // Declare bootstrap variable
    const bootstrap = window.bootstrap
    // Close the modal
    const productModalInstance = bootstrap.Modal.getInstance(document.getElementById("productModal"))
    if (productModalInstance) {
      productModalInstance.hide()
    }
  
    // Reload products table
    loadProducts()
  }
  
  // Function to search products
  function searchProducts() {
    const searchTerm = document.getElementById("productSearchInput").value.toLowerCase()
    const products = getProductsFromStorage()
  
    if (!searchTerm) {
      loadProducts()
      return
    }
  
    const filteredProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.type.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm) ||
        product.supplierName.toLowerCase().includes(searchTerm) ||
        product.status.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm)) ||
        (product.notes && product.notes.toLowerCase().includes(searchTerm))
      )
    })
  
    loadProducts(filteredProducts)
  }
  
  // Function to get products from storage
  function getProductsFromStorage() {
    const products = localStorage.getItem("supplierProducts")
    return products ? JSON.parse(products) : sampleProducts
  }
  
  // Function to save products to storage
  function saveProductsToStorage(products) {
    localStorage.setItem("supplierProducts", JSON.stringify(products))
  }
  
  // Function to get suppliers from storage
  function getSuppliersFromStorage() {
    const suppliers = localStorage.getItem("suppliers")
    return suppliers ? JSON.parse(suppliers) : []
  }
  
  // Function to update sidebar active state
  function updateSidebarActiveState(contentType) {
    // Remove active class from all sidebar items
    document.querySelectorAll("#sidebar ul li").forEach((item) => {
      item.classList.remove("active")
    })
  
    // Add active class to the clicked item
    let activeLink
    if (contentType === "supplier-product") {
      activeLink =
        document.querySelector(`#sidebar a[href="#"][onclick*="supplier-product"]`) ||
        document.querySelector(`#sidebar a[href="#"]:not([onclick])`)
    } else {
      activeLink = document.querySelector(`#sidebar a[onclick*="${contentType}"]`)
    }
  
    if (activeLink) {
      const parentLi = activeLink.closest("li")
      parentLi.classList.add("active")
  
      // If it's in a submenu, expand the parent menu
      const parentSubmenu = activeLink.closest("ul.collapse")
      if (parentSubmenu) {
        parentSubmenu.classList.add("show")
        const parentToggle = document.querySelector(`a[href="#${parentSubmenu.id}"]`)
        if (parentToggle) {
          parentToggle.setAttribute("aria-expanded", "true")
          parentToggle.classList.remove("collapsed")
        }
      }
    }
  }
  
  