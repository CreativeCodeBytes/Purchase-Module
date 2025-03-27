// Purchase Order Management JavaScript File

// Initialize when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
  // If purchase order content is loaded, initialize it
  if (document.getElementById("purchase-order-content")) {
    initPurchaseOrderManagement()
  }

  // Add event listener for the purchase order management menu item
  const purchaseOrderLink = document.querySelector("a[onclick=\"loadContent('purchase-order')\"]")
  if (purchaseOrderLink) {
    purchaseOrderLink.removeAttribute("onclick")
    purchaseOrderLink.addEventListener("click", (e) => {
      e.preventDefault()
      handlePurchaseOrderClick()
    })
  }
})

// Function to handle purchase order menu click - renamed to be unique
function handlePurchaseOrderClick() {
  // Hide all content sections first
  const allContentSections = document.querySelectorAll("#main-content > div")
  allContentSections.forEach((section) => {
    section.style.display = "none"
  })

  // Create or show the purchase order content section
  let contentSection = document.getElementById("purchase-order-content")

  if (!contentSection) {
    contentSection = createPurchaseOrderContent()
    document.getElementById("main-content").appendChild(contentSection)
    initPurchaseOrderManagement()
  } else {
    contentSection.style.display = "block"
    // Refresh the data
    loadPurchaseOrders()
  }

  // Update active state in sidebar
  updatePurchaseOrderSidebarState("purchase-order")

  // Close sidebar on mobile after navigation
  if (window.innerWidth < 768) {
    document.getElementById("sidebar").classList.add("active")
    document.getElementById("content").classList.add("active")
  }
}

// Function to create purchase order content section if it doesn't exist
function createPurchaseOrderContent() {
  const contentSection = document.createElement("div")
  contentSection.id = "purchase-order-content"
  contentSection.className = "container-fluid"

  // Create the header with title and add button
  const header = document.createElement("div")
  header.className = "d-flex justify-content-between align-items-center mb-4"
  header.innerHTML = `
    <h2>Purchase Order Management</h2>
    <button id="addPurchaseOrderBtn" class="btn btn-primary">
      <i class="fas fa-plus"></i> Create New Purchase Order
    </button>
  `

  // Create search and filter bar
  const searchFilterBar = document.createElement("div")
  searchFilterBar.className = "row mb-4"
  searchFilterBar.innerHTML = `
    <div class="col-md-6">
      <div class="input-group">
        <span class="input-group-text"><i class="fas fa-search"></i></span>
        <input type="text" id="purchaseOrderSearchInput" class="form-control" placeholder="Search purchase orders...">
      </div>
    </div>
    <div class="col-md-6">
      <div class="d-flex gap-2 justify-content-end">
        <select id="poStatusFilter" class="form-select" style="width: auto;">
          <option value="all">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Pending">Pending Approval</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Completed">Completed</option>
        </select>
        <select id="poDateFilter" class="form-select" style="width: auto;">
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </select>
      </div>
    </div>
  `

  // Create table for purchase orders
  const tableContainer = document.createElement("div")
  tableContainer.className = "table-responsive"
  tableContainer.innerHTML = `
    <table id="purchaseOrdersTable" class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>PO #</th>
          <th>Supplier</th>
          <th>Date</th>
          <th>Total Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="purchaseOrdersTableBody">
        <!-- Purchase order data will be loaded here -->
      </tbody>
    </table>
  `

  // Create modal for adding/editing purchase orders
  const modal = document.createElement("div")
  modal.className = "modal fade"
  modal.id = "purchaseOrderModal"
  modal.tabIndex = "-1"
  modal.setAttribute("aria-labelledby", "purchaseOrderModalLabel")
  modal.setAttribute("aria-hidden", "true")
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="purchaseOrderModalLabel">Create New Purchase Order</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="purchaseOrderForm">
            <input type="hidden" id="purchaseOrderId">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="poSupplier" class="form-label">Supplier*</label>
                <select class="form-select" id="poSupplier" required>
                  <option value="">Select Supplier</option>
                  <option value="ABC Suppliers">ABC Suppliers</option>
                  <option value="XYZ Corporation">XYZ Corporation</option>
                  <option value="Global Traders">Global Traders</option>
                  <option value="Tech Solutions">Tech Solutions</option>
                  <option value="Office Supplies Inc.">Office Supplies Inc.</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="poDate" class="form-label">Date*</label>
                <input type="date" class="form-control" id="poDate" required>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="poDeliveryDate" class="form-label">Expected Delivery Date</label>
                <input type="date" class="form-control" id="poDeliveryDate">
              </div>
              <div class="col-md-6">
                <label for="poStatus" class="form-label">Status</label>
                <select class="form-select" id="poStatus">
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending Approval</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-12">
                <label for="poNotes" class="form-label">Notes</label>
                <textarea class="form-control" id="poNotes" rows="2"></textarea>
              </div>
            </div>
            
            <h6 class="mt-4 mb-3">Order Items</h6>
            <div class="table-responsive">
              <table class="table table-bordered" id="poItemsTable">
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="poItemsTableBody">
                  <!-- Items will be added here -->
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="5">
                      <button type="button" class="btn btn-sm btn-secondary" id="addPoItemBtn">
                        <i class="fas fa-plus"></i> Add Item
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-end"><strong>Subtotal:</strong></td>
                    <td id="poSubtotal">₹0.00</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-end"><strong>Tax (10%):</strong></td>
                    <td id="poTax">₹0.00</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-end"><strong>Total:</strong></td>
                    <td id="poTotal">₹0.00</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="savePurchaseOrderBtn">Save</button>
        </div>
      </div>
    </div>
  `

  // Create view purchase order modal
  const viewModal = document.createElement("div")
  viewModal.className = "modal fade"
  viewModal.id = "viewPurchaseOrderModal"
  viewModal.tabIndex = "-1"
  viewModal.setAttribute("aria-labelledby", "viewPurchaseOrderModalLabel")
  viewModal.setAttribute("aria-hidden", "true")
  viewModal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="viewPurchaseOrderModalLabel">Purchase Order Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="viewPurchaseOrderDetails">
          <!-- Purchase order details will be loaded here -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-success" id="approvePoOrderBtn" style="display: none;">Approve</button>
          <button type="button" class="btn btn-danger" id="rejectPoOrderBtn" style="display: none;">Reject</button>
        </div>
      </div>
    </div>
  `

  // Create delete confirmation modal
  const deleteModal = document.createElement("div")
  deleteModal.className = "modal fade"
  deleteModal.id = "deletePurchaseOrderModal"
  deleteModal.tabIndex = "-1"
  deleteModal.setAttribute("aria-labelledby", "deletePurchaseOrderModalLabel")
  deleteModal.setAttribute("aria-hidden", "true")
  deleteModal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deletePurchaseOrderModalLabel">Confirm Delete</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this purchase order? This action cannot be undone.</p>
          <input type="hidden" id="deletePurchaseOrderIdInput">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" id="confirmDeletePurchaseOrderBtn">Delete</button>
        </div>
      </div>
    </div>
  `

  // Append all elements to the content section
  contentSection.appendChild(header)
  contentSection.appendChild(searchFilterBar)
  contentSection.appendChild(tableContainer)
  contentSection.appendChild(modal)
  contentSection.appendChild(viewModal)
  contentSection.appendChild(deleteModal)

  return contentSection
}

// Sample purchase order data
const samplePurchaseOrders = [
  {
    id: 1001,
    supplier: "ABC Supplies Inc.",
    supplierId: 1,
    date: "2024-06-15",
    deliveryDate: "2024-06-30",
    status: "Approved",
    notes: "Regular quarterly order",
    items: [
      { description: "Office Desk", quantity: 5, unitPrice: 250, total: 1250 },
      { description: "Office Chair", quantity: 10, unitPrice: 120, total: 1200 },
    ],
    subtotal: 2450,
    tax: 245,
    total: 2695,
  },
  {
    id: 1002,
    supplier: "Global Tech Solutions",
    supplierId: 2,
    date: "2024-07-01",
    deliveryDate: "2024-07-15",
    status: "Pending",
    notes: "Urgent IT equipment order",
    items: [
      { description: "Laptop", quantity: 3, unitPrice: 1200, total: 3600 },
      { description: "Monitor", quantity: 6, unitPrice: 300, total: 1800 },
    ],
    subtotal: 5400,
    tax: 540,
    total: 5940,
  },
  {
    id: 1003,
    supplier: "EcoFriendly Materials",
    supplierId: 3,
    date: "2024-07-10",
    deliveryDate: "2024-07-25",
    status: "Draft",
    notes: "Sustainable packaging materials",
    items: [
      { description: "Recycled Boxes", quantity: 200, unitPrice: 2.5, total: 500 },
      { description: "Biodegradable Packing Peanuts", quantity: 50, unitPrice: 15, total: 750 },
    ],
    subtotal: 1250,
    tax: 125,
    total: 1375,
  },
  {
    id: 1004,
    supplier: "Premium Parts Ltd",
    supplierId: 5,
    date: "2024-08-05",
    deliveryDate: "2024-08-20",
    status: "Rejected",
    notes: "Budget exceeded, needs revision",
    items: [
      { description: "High-grade Steel Components", quantity: 50, unitPrice: 45, total: 2250 },
      { description: "Precision Gears", quantity: 30, unitPrice: 65, total: 1950 },
    ],
    subtotal: 4200,
    tax: 420,
    total: 4620,
  },
  {
    id: 1005,
    supplier: "Quick Logistics",
    supplierId: 4,
    date: "2024-08-15",
    deliveryDate: "2024-08-25",
    status: "Completed",
    notes: "Shipping supplies for Q3",
    items: [
      { description: "Shipping Labels", quantity: 1000, unitPrice: 0.15, total: 150 },
      { description: "Packing Tape", quantity: 100, unitPrice: 3.5, total: 350 },
    ],
    subtotal: 500,
    tax: 50,
    total: 550,
  },
]

// Function to initialize purchase order management
function initPurchaseOrderManagement() {
  // Load purchase orders data
  loadPurchaseOrders()

  // Load suppliers for dropdown
  loadPurchaseOrderSuppliersDropdown()

  // Add event listener for search input
  document.getElementById("purchaseOrderSearchInput").addEventListener("input", searchPurchaseOrders)

  // Add event listeners for filters
  document.getElementById("poStatusFilter").addEventListener("change", filterPurchaseOrders)
  document.getElementById("poDateFilter").addEventListener("change", filterPurchaseOrders)

  // Add event listener for add purchase order button
  document.getElementById("addPurchaseOrderBtn").addEventListener("click", () => {
    // Reset form and show modal
    document.getElementById("purchaseOrderForm").reset()
    document.getElementById("purchaseOrderId").value = ""
    document.getElementById("purchaseOrderModalLabel").textContent = "Create New Purchase Order"
    document.getElementById("poDate").valueAsDate = new Date()

    // Clear items table
    const itemsTableBody = document.getElementById("poItemsTableBody")
    itemsTableBody.innerHTML = ""

    // Reset totals
    updatePurchaseOrderTotals()

    // Show the modal
    const purchaseOrderModal = new bootstrap.Modal(document.getElementById("purchaseOrderModal"))
    purchaseOrderModal.show()
  })

  // Add event listener for add item button
  document.getElementById("addPoItemBtn").addEventListener("click", addPurchaseOrderItemRow)

  // Add event listener for save purchase order button
  document.getElementById("savePurchaseOrderBtn").addEventListener("click", savePurchaseOrder)

  // Add event listener for confirm delete button
  document.getElementById("confirmDeletePurchaseOrderBtn").addEventListener("click", deletePurchaseOrder)

  // Add event listeners for approve/reject buttons
  document.getElementById("approvePoOrderBtn").addEventListener("click", () => updatePurchaseOrderStatus("Approved"))
  document.getElementById("rejectPoOrderBtn").addEventListener("click", () => updatePurchaseOrderStatus("Rejected"))
}

// Function to load suppliers dropdown
function loadPurchaseOrderSuppliersDropdown() {
  const suppliers = getPurchaseOrderSuppliersFromStorage()
  const supplierSelect = document.getElementById("poSupplier")

  // Clear existing options except the first one
  while (supplierSelect.options.length > 1) {
    supplierSelect.remove(1)
  }

  // Add supplier options
  suppliers.forEach((supplier) => {
    if (supplier.status === "Active") {
      const option = document.createElement("option")
      option.value = supplier.id
      option.textContent = supplier.name
      supplierSelect.appendChild(option)
    }
  })
}

// Function to get suppliers from storage
function getPurchaseOrderSuppliersFromStorage() {
  const suppliers = localStorage.getItem("suppliers")
  return suppliers
    ? JSON.parse(suppliers)
    : [
        {
          id: 1,
          name: "ABC Supplies Inc.",
          status: "Active",
        },
        {
          id: 2,
          name: "Global Tech Solutions",
          status: "Active",
        },
        {
          id: 3,
          name: "EcoFriendly Materials",
          status: "Inactive",
        },
        {
          id: 4,
          name: "Quick Logistics",
          status: "Active",
        },
        {
          id: 5,
          name: "Premium Parts Ltd",
          status: "Active",
        },
      ]
}

// Function to add an item row to the purchase order form
function addPurchaseOrderItemRow() {
  const itemsTableBody = document.getElementById("poItemsTableBody")
  const newRow = document.createElement("tr")
  newRow.innerHTML = `
    <td><input type="text" class="form-control item-description" placeholder="Item description" required></td>
    <td><input type="number" class="form-control item-quantity" placeholder="Qty" min="1" value="1" required></td>
    <td><input type="number" class="form-control item-price" placeholder="Price" min="0" step="0.01" value="0.00" required></td>
    <td class="item-total">₹0.00</td>
    <td><button type="button" class="btn btn-sm btn-danger remove-po-item"><i class="fas fa-trash"></i></button></td>
  `

  itemsTableBody.appendChild(newRow)

  // Add event listeners for the new row
  const quantityInput = newRow.querySelector(".item-quantity")
  const priceInput = newRow.querySelector(".item-price")
  const removeButton = newRow.querySelector(".remove-po-item")

  quantityInput.addEventListener("input", updatePurchaseOrderItemTotal)
  priceInput.addEventListener("input", updatePurchaseOrderItemTotal)
  removeButton.addEventListener("click", () => {
    newRow.remove()
    updatePurchaseOrderTotals()
  })
}

// Function to update an item's total
function updatePurchaseOrderItemTotal(event) {
  const row = event.target.closest("tr")
  const quantity = Number.parseFloat(row.querySelector(".item-quantity").value) || 0
  const price = Number.parseFloat(row.querySelector(".item-price").value) || 0
  const total = quantity * price

  row.querySelector(".item-total").textContent = "₹" + total.toFixed(2)

  updatePurchaseOrderTotals()
}

// Function to update order totals
function updatePurchaseOrderTotals() {
  const itemTotals = Array.from(document.querySelectorAll(".item-total")).map((el) => {
    return Number.parseFloat(el.textContent.replace("₹", "")) || 0
  })

  const subtotal = itemTotals.reduce((sum, total) => sum + total, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  document.getElementById("poSubtotal").textContent = "₹" + subtotal.toFixed(2)
  document.getElementById("poTax").textContent = "₹" + tax.toFixed(2)
  document.getElementById("poTotal").textContent = "₹" + total.toFixed(2)
}

// Function to load purchase orders data
function loadPurchaseOrders(filteredOrders = null) {
  const orders = filteredOrders || getPurchaseOrdersFromStorage()
  const tableBody = document.getElementById("purchaseOrdersTableBody")
  tableBody.innerHTML = ""

  orders.forEach((order) => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.supplier}</td>
      <td>${formatPurchaseOrderDate(order.date)}</td>
      <td>₹${order.total.toFixed(2)}</td>
      <td><span class="badge ${getPurchaseOrderStatusBadgeClass(order.status)}">${order.status}</span></td>
      <td>
        <button class="btn btn-sm btn-info view-po-order" data-id="${order.id}">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn btn-sm btn-primary edit-po-order" data-id="${order.id}" ${order.status === "Completed" ? "disabled" : ""}>
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger delete-po-order" data-id="${order.id}" ${order.status === "Completed" || order.status === "Approved" ? "disabled" : ""}>
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `
    tableBody.appendChild(row)
  })

  // Add event listeners for action buttons
  addPurchaseOrderActionButtonListeners()
}

// Function to format date
function formatPurchaseOrderDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Function to get status badge class
function getPurchaseOrderStatusBadgeClass(status) {
  switch (status) {
    case "Approved":
      return "bg-success"
    case "Pending":
      return "bg-warning"
    case "Rejected":
      return "bg-danger"
    case "Draft":
      return "bg-secondary"
    case "Completed":
      return "bg-info"
    default:
      return "bg-secondary"
  }
}

// Function to add event listeners for action buttons
function addPurchaseOrderActionButtonListeners() {
  // View order buttons
  document.querySelectorAll(".view-po-order").forEach((button) => {
    button.addEventListener("click", (e) => {
      const orderId = e.currentTarget.getAttribute("data-id")
      viewPurchaseOrder(orderId)
    })
  })

  // Edit order buttons
  document.querySelectorAll(".edit-po-order").forEach((button) => {
    button.addEventListener("click", (e) => {
      const orderId = e.currentTarget.getAttribute("data-id")
      editPurchaseOrder(orderId)
    })
  })

  // Delete order buttons
  document.querySelectorAll(".delete-po-order").forEach((button) => {
    button.addEventListener("click", (e) => {
      const orderId = e.currentTarget.getAttribute("data-id")
      confirmDeletePurchaseOrder(orderId)
    })
  })
}

// Function to view purchase order details
function viewPurchaseOrder(orderId) {
  const orders = getPurchaseOrdersFromStorage()
  const order = orders.find((o) => o.id == orderId)

  if (order) {
    const detailsContainer = document.getElementById("viewPurchaseOrderDetails")

    // Create the HTML for the order details
    let itemsHtml = ""
    order.items.forEach((item) => {
      itemsHtml += `
        <tr>
          <td>${item.description}</td>
          <td>${item.quantity}</td>
          <td>₹${item.unitPrice.toFixed(2)}</td>
          <td>₹${item.total.toFixed(2)}</td>
        </tr>
      `
    })

    detailsContainer.innerHTML = `
      <div class="row mb-4">
        <div class="col-md-6">
          <h6>Purchase Order #${order.id}</h6>
          <p><strong>Supplier:</strong> ${order.supplier}</p>
          <p><strong>Date:</strong> ${formatPurchaseOrderDate(order.date)}</p>
          <p><strong>Expected Delivery:</strong> ${order.deliveryDate ? formatPurchaseOrderDate(order.deliveryDate) : "Not specified"}</p>
        </div>
        <div class="col-md-6 text-md-end">
          <p><strong>Status:</strong> <span class="badge ${getPurchaseOrderStatusBadgeClass(order.status)}">${order.status}</span></p>
          <p><strong>Total Amount:</strong> ₹${order.total.toFixed(2)}</p>
        </div>
      </div>
      
      <div class="row mb-3">
        <div class="col-12">
          <h6>Notes:</h6>
          <p>${order.notes || "No notes available"}</p>
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end"><strong>Subtotal:</strong></td>
              <td>₹${order.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end"><strong>Tax (10%):</strong></td>
              <td>₹${order.tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end"><strong>Total:</strong></td>
              <td>₹${order.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `

    // Show/hide approve/reject buttons based on status
    const approveBtn = document.getElementById("approvePoOrderBtn")
    const rejectBtn = document.getElementById("rejectPoOrderBtn")

    if (order.status === "Pending") {
      approveBtn.style.display = "inline-block"
      rejectBtn.style.display = "inline-block"

      // Store the order ID for the approve/reject actions
      approveBtn.setAttribute("data-id", order.id)
      rejectBtn.setAttribute("data-id", order.id)
    } else {
      approveBtn.style.display = "none"
      rejectBtn.style.display = "none"
    }

    // Show the modal
    const bootstrap = window.bootstrap
    const viewModalElement = document.getElementById("viewPurchaseOrderModal")
    const viewModal = new bootstrap.Modal(viewModalElement)
    viewModal.show()
  }
}

// Function to edit purchase order
function editPurchaseOrder(orderId) {
  const orders = getPurchaseOrdersFromStorage()
  const order = orders.find((o) => o.id == orderId)

  if (order) {
    // Fill the form with order data
    document.getElementById("purchaseOrderId").value = order.id
    document.getElementById("poSupplier").value = order.supplierId
    document.getElementById("poDate").value = order.date
    document.getElementById("poDeliveryDate").value = order.deliveryDate || ""
    document.getElementById("poStatus").value = order.status
    document.getElementById("poNotes").value = order.notes || ""

    // Clear items table
    const itemsTableBody = document.getElementById("poItemsTableBody")
    itemsTableBody.innerHTML = ""

    // Add item rows
    order.items.forEach((item) => {
      const newRow = document.createElement("tr")
      newRow.innerHTML = `
        <td><input type="text" class="form-control item-description" value="${item.description}" required></td>
        <td><input type="number" class="form-control item-quantity" value="${item.quantity}" min="1" required></td>
        <td><input type="number" class="form-control item-price" value="${item.unitPrice.toFixed(2)}" min="0" step="0.01" required></td>
        <td class="item-total">₹${item.total.toFixed(2)}</td>
        <td><button type="button" class="btn btn-sm btn-danger remove-po-item"><i class="fas fa-trash"></i></button></td>
      `

      itemsTableBody.appendChild(newRow)

      // Add event listeners for the new row
      const quantityInput = newRow.querySelector(".item-quantity")
      const priceInput = newRow.querySelector(".item-price")
      const removeButton = newRow.querySelector(".remove-po-item")

      quantityInput.addEventListener("input", updatePurchaseOrderItemTotal)
      priceInput.addEventListener("input", updatePurchaseOrderItemTotal)
      removeButton.addEventListener("click", () => {
        newRow.remove()
        updatePurchaseOrderTotals()
      })
    })

    // Update totals
    updatePurchaseOrderTotals()

    // Update modal title
    document.getElementById("purchaseOrderModalLabel").textContent = "Edit Purchase Order"

    // Show the modal
    const bootstrap = window.bootstrap
    const purchaseOrderModal = new bootstrap.Modal(document.getElementById("purchaseOrderModal"))
    purchaseOrderModal.show()
  }
}

// Function to confirm delete purchase order
function confirmDeletePurchaseOrder(orderId) {
  document.getElementById("deletePurchaseOrderIdInput").value = orderId
  const bootstrap = window.bootstrap
  const deleteModal = new bootstrap.Modal(document.getElementById("deletePurchaseOrderModal"))
  deleteModal.show()
}

// Function to delete purchase order
function deletePurchaseOrder() {
  const orderId = document.getElementById("deletePurchaseOrderIdInput").value
  let orders = getPurchaseOrdersFromStorage()

  // Filter out the order to delete
  orders = orders.filter((o) => o.id != orderId)

  // Save updated orders to storage
  savePurchaseOrdersToStorage(orders)

  // Close the modal
  const bootstrap = window.bootstrap
  const deleteModalInstance = bootstrap.Modal.getInstance(document.getElementById("deletePurchaseOrderModal"))
  if (deleteModalInstance) {
    deleteModalInstance.hide()
  }

  // Reload orders table
  loadPurchaseOrders()
}

// Function to update order status (approve/reject)
function updatePurchaseOrderStatus(newStatus) {
  const bootstrap = window.bootstrap
  const viewModal = bootstrap.Modal.getInstance(document.getElementById("viewPurchaseOrderModal"))
  const orderId = document.getElementById("approvePoOrderBtn").getAttribute("data-id")
  const orders = getPurchaseOrdersFromStorage()

  // Find and update the order
  const orderIndex = orders.findIndex((o) => o.id == orderId)
  if (orderIndex !== -1) {
    orders[orderIndex].status = newStatus

    // Save updated orders
    savePurchaseOrdersToStorage(orders)

    // Close the modal
    if (viewModal) {
      viewModal.hide()
    }

    // Reload orders table
    loadPurchaseOrders()
  }
}

// Function to save purchase order
function savePurchaseOrder() {
  // Get form values
  const orderId = document.getElementById("purchaseOrderId").value
  const supplierId = document.getElementById("poSupplier").value
  const date = document.getElementById("poDate").value
  const deliveryDate = document.getElementById("poDeliveryDate").value
  const status = document.getElementById("poStatus").value
  const notes = document.getElementById("poNotes").value

  // Validate required fields
  if (!supplierId || !date) {
    alert("Please fill in all required fields")
    return
  }

  // Get items from the table
  const itemRows = document.querySelectorAll("#poItemsTableBody tr")
  if (itemRows.length === 0) {
    alert("Please add at least one item to the purchase order")
    return
  }

  const items = []
  let isValid = true

  itemRows.forEach((row) => {
    const description = row.querySelector(".item-description").value
    const quantity = Number.parseInt(row.querySelector(".item-quantity").value)
    const unitPrice = Number.parseFloat(row.querySelector(".item-price").value)

    if (!description || isNaN(quantity) || isNaN(unitPrice)) {
      isValid = false
      return
    }

    const total = quantity * unitPrice
    items.push({
      description,
      quantity,
      unitPrice,
      total,
    })
  })

  if (!isValid) {
    alert("Please fill in all item details correctly")
    return
  }

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  // Get supplier name
  const supplierSelect = document.getElementById("poSupplier")
  const supplierName = supplierSelect.options[supplierSelect.selectedIndex].text

  // Get existing orders
  const orders = getPurchaseOrdersFromStorage()

  if (orderId) {
    // Update existing order
    const index = orders.findIndex((o) => o.id == orderId)
    if (index !== -1) {
      orders[index] = {
        id: Number.parseInt(orderId),
        supplier: supplierName,
        supplierId: Number.parseInt(supplierId),
        date,
        deliveryDate,
        status,
        notes,
        items,
        subtotal,
        tax,
        total,
      }
    }
  } else {
    // Add new order
    const newId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1001
    orders.push({
      id: newId,
      supplier: supplierName,
      supplierId: Number.parseInt(supplierId),
      date,
      deliveryDate,
      status,
      notes,
      items,
      subtotal,
      tax,
      total,
    })
  }

  // Save to storage
  savePurchaseOrdersToStorage(orders)

  // Close the modal
  const bootstrap = window.bootstrap
  const purchaseOrderModalInstance = bootstrap.Modal.getInstance(document.getElementById("purchaseOrderModal"))
  if (purchaseOrderModalInstance) {
    purchaseOrderModalInstance.hide()
  }

  // Reload orders table
  loadPurchaseOrders()
}

// Function to search purchase orders
function searchPurchaseOrders() {
  applyPurchaseOrderFilters()
}

// Function to filter purchase orders
function filterPurchaseOrders() {
  applyPurchaseOrderFilters()
}

// Function to apply all filters and search
function applyPurchaseOrderFilters() {
  const searchTerm = document.getElementById("purchaseOrderSearchInput").value.toLowerCase()
  const statusFilter = document.getElementById("poStatusFilter").value
  const dateFilter = document.getElementById("poDateFilter").value

  const orders = getPurchaseOrdersFromStorage()

  const filteredOrders = orders.filter((order) => {
    // Apply search term filter
    const matchesSearch =
      searchTerm === "" ||
      order.id.toString().includes(searchTerm) ||
      order.supplier.toLowerCase().includes(searchTerm) ||
      order.status.toLowerCase().includes(searchTerm) ||
      (order.notes && order.notes.toLowerCase().includes(searchTerm))

    // Apply status filter
    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    // Apply date filter
    let matchesDate = true
    if (dateFilter !== "all") {
      const orderDate = new Date(order.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const weekAgo = new Date(today)
      weekAgo.setDate(today.getDate() - 7)

      const monthAgo = new Date(today)
      monthAgo.setMonth(today.getMonth() - 1)

      const quarterAgo = new Date(today)
      quarterAgo.setMonth(today.getMonth() - 3)

      switch (dateFilter) {
        case "today":
          matchesDate = orderDate.toDateString() === today.toDateString()
          break
        case "week":
          matchesDate = orderDate >= weekAgo
          break
        case "month":
          matchesDate = orderDate >= monthAgo
          break
        case "quarter":
          matchesDate = orderDate >= quarterAgo
          break
      }
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  loadPurchaseOrders(filteredOrders)
}

// Function to get purchase orders from storage
function getPurchaseOrdersFromStorage() {
  const orders = localStorage.getItem("purchaseOrders")
  return orders ? JSON.parse(orders) : samplePurchaseOrders
}

// Function to save purchase orders to storage
function savePurchaseOrdersToStorage(orders) {
  localStorage.setItem("purchaseOrders", JSON.stringify(orders))
}

// Function to update sidebar active state
function updatePurchaseOrderSidebarState(contentType) {
  // Remove active class from all sidebar items
  document.querySelectorAll("#sidebar ul li").forEach((item) => {
    item.classList.remove("active")
  })

  // Add active class to the clicked item
  let activeLink
  if (contentType === "purchase-order") {
    activeLink =
      document.querySelector(`#sidebar a[href="#"][onclick*="purchase-order"]`) ||
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

// Function to remove a purchase order item - needed for the remove button
function removePurchaseOrderItem(rowId) {
  document.getElementById(rowId).remove()
  updatePurchaseOrderTotals()
}

// Make these functions globally available for event handlers
window.updatePurchaseOrderItemTotal = updatePurchaseOrderItemTotal
window.removePurchaseOrderItem = removePurchaseOrderItem