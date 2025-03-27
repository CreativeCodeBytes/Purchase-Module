// Supplier Quotation Management JavaScript File - Refactored with unique names

// Initialize when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
  // If supplier quotation content is loaded, initialize it
  if (document.getElementById("supplier-quotation-content")) {
    initSupplierQuotationModule()
  }

  // Add event listener for the supplier quotation management menu item
  const supplierQuotationLink = document.querySelector("a[onclick=\"loadContent('supplier-quotation')\"]")
  if (supplierQuotationLink) {
    supplierQuotationLink.removeAttribute("onclick")
    supplierQuotationLink.addEventListener("click", (e) => {
      e.preventDefault()
      handleSupplierQuotationNavClick()
    })
  }
})

// Function to handle supplier quotation menu click - renamed to be unique
function handleSupplierQuotationNavClick() {
  // Hide all content sections first
  const allContentSections = document.querySelectorAll("#main-content > div")
  allContentSections.forEach((section) => {
    section.style.display = "none"
  })

  // Create or show the supplier quotation content section
  let contentSection = document.getElementById("supplier-quotation-content")

  if (!contentSection) {
    contentSection = createSupplierQuotationContentSection()
    document.getElementById("main-content").appendChild(contentSection)
    initSupplierQuotationModule()
  } else {
    contentSection.style.display = "block"
  }

  // Update active state in sidebar
  updateSupplierQuotationSidebarState("supplier-quotation")

  // Close sidebar on mobile after navigation
  if (window.innerWidth < 768) {
    document.getElementById("sidebar").classList.add("active")
    document.getElementById("content").classList.add("active")
  }
}

// Function to create supplier quotation content section if it doesn't exist - renamed
function createSupplierQuotationContentSection() {
  const contentSection = document.createElement("div")
  contentSection.id = "supplier-quotation-content"
  contentSection.className = "container-fluid"

  // Create the header with title and add button
  const header = document.createElement("div")
  header.className = "d-flex justify-content-between align-items-center mb-4"
  header.innerHTML = `
    <h2>Supplier Quotation Management</h2>
    <button id="addQuotationBtn" class="btn btn-primary">
      <i class="fas fa-plus"></i> Create New Supplier Quotation
    </button>
  `

  // Create search bar
  const searchBar = document.createElement("div")
  searchBar.className = "mb-4"
  searchBar.innerHTML = `
    <div class="input-group">
      <span class="input-group-text"><i class="fas fa-search"></i></span>
      <input type="text" id="quotationSearchInput" class="form-control" placeholder="Search quotations...">
    </div>
  `

  // Create table for quotations
  const tableContainer = document.createElement("div")
  tableContainer.className = "table-responsive"
  tableContainer.innerHTML = `
    <table id="quotationsTable" class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Quotation #</th>
          <th>Supplier</th>
          <th>Date</th>
          <th>Valid Until</th>
          <th>Total Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="quotationsTableBody">
        <!-- Quotation data will be loaded here -->
      </tbody>
    </table>
  `

  // Create modal for adding/editing quotations
  const modal = document.createElement("div")
  modal.className = "modal fade"
  modal.id = "quotationModal"
  modal.tabIndex = "-1"
  modal.setAttribute("aria-labelledby", "quotationModalLabel")
  modal.setAttribute("aria-hidden", "true")
  modal.innerHTML = `
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="quotationModalLabel">Create New Supplier Quotation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="quotationForm">
            <input type="hidden" id="quotationId">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="quotSupplierSelect" class="form-label">Supplier*</label>
                <select class="form-select" id="quotSupplierSelect" required>
                  <option value="">Select Supplier</option>
                  <option value="ABC Suppliers">ABC Suppliers</option>
                  <option value="XYZ Corporation">XYZ Corporation</option>
                  <option value="Global Traders">Global Traders</option>
                  <option value="Tech Solutions">Tech Solutions</option>
                  <option value="Office Supplies Inc.">Office Supplies Inc.</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="quotationDate" class="form-label">Quotation Date*</label>
                <input type="date" class="form-control" id="quotationDate" required>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="validUntil" class="form-label">Valid Until*</label>
                <input type="date" class="form-control" id="validUntil" required>
              </div>
              <div class="col-md-6">
                <label for="quotationStatus" class="form-label">Status</label>
                <select class="form-select" id="quotationStatus">
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-12">
                <label for="quotationReference" class="form-label">Reference Number</label>
                <input type="text" class="form-control" id="quotationReference">
              </div>
            </div>
            
            <h5 class="mt-4 mb-3">Quotation Items</h5>
            <div class="table-responsive mb-3">
              <table class="table table-bordered" id="quotationItemsTable">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="quotationItemsBody">
                  <!-- Items will be added here -->
                </tbody>
              </table>
            </div>
            
            <button type="button" class="btn btn-outline-primary mb-4" id="addQuotItemBtn">
              <i class="fas fa-plus"></i> Add Item
            </button>
            
            <div class="row justify-content-end mb-3">
              <div class="col-md-4">
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span id="quotSubtotalAmount">₹0.00</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Tax (10%):</span>
                  <span id="quotTaxAmount">₹0.00</span>
                </div>
                <div class="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span id="quotTotalAmount">₹0.00</span>
                </div>
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-md-12">
                <label for="quotationNotes" class="form-label">Notes</label>
                <textarea class="form-control" id="quotationNotes" rows="3"></textarea>
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-md-12">
                <label for="quotTermsAndConditions" class="form-label">Terms and Conditions</label>
                <textarea class="form-control" id="quotTermsAndConditions" rows="3"></textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="saveQuotationBtn">Save</button>
        </div>
      </div>
    </div>
  `

  // Create view quotation modal
  const viewModal = document.createElement("div")
  viewModal.className = "modal fade"
  viewModal.id = "viewQuotationModal"
  viewModal.tabIndex = "-1"
  viewModal.setAttribute("aria-labelledby", "viewQuotationModalLabel")
  viewModal.setAttribute("aria-hidden", "true")
  viewModal.innerHTML = `
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="viewQuotationModalLabel">Quotation Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="viewQuotationDetails">
          <!-- Quotation details will be loaded here -->
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
  deleteModal.id = "deleteQuotationModal"
  deleteModal.tabIndex = "-1"
  deleteModal.setAttribute("aria-labelledby", "deleteQuotationModalLabel")
  deleteModal.setAttribute("aria-hidden", "true")
  deleteModal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteQuotationModalLabel">Confirm Delete</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this quotation? This action cannot be undone.</p>
          <input type="hidden" id="deleteQuotationIdInput">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" id="confirmDeleteQuotationBtn">Delete</button>
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

// Sample quotation data
const sampleQuotationsData = [
  {
    id: 1,
    supplier: "ABC Supplies Inc.",
    supplierId: 1,
    date: "2024-10-15",
    validUntil: "2024-11-15",
    reference: "QT-2024-001",
    status: "Approved",
    subtotal: 4500,
    tax: 450,
    total: 4950,
    notes: "Quotation for office supplies",
    terms: "Payment within 30 days of delivery",
    items: [
      { id: 1, name: "Office Desk", description: "Standard office desk", quantity: 5, unitPrice: 300, total: 1500 },
      { id: 2, name: "Office Chair", description: "Ergonomic office chair", quantity: 10, unitPrice: 200, total: 2000 },
      { id: 3, name: "Filing Cabinet", description: "Metal filing cabinet", quantity: 5, unitPrice: 200, total: 1000 },
    ],
  },
  {
    id: 2,
    supplier: "Global Tech Solutions",
    supplierId: 2,
    date: "2024-10-20",
    validUntil: "2024-12-20",
    reference: "QT-2024-002",
    status: "Pending",
    subtotal: 8000,
    tax: 800,
    total: 8800,
    notes: "Quotation for IT equipment",
    terms: "50% advance payment required",
    items: [
      { id: 1, name: "Laptop", description: "Business laptop", quantity: 5, unitPrice: 1000, total: 5000 },
      { id: 2, name: "Monitor", description: "24-inch monitor", quantity: 10, unitPrice: 200, total: 2000 },
      { id: 3, name: "Keyboard", description: "Wireless keyboard", quantity: 10, unitPrice: 50, total: 500 },
      { id: 4, name: "Mouse", description: "Wireless mouse", quantity: 10, unitPrice: 50, total: 500 },
    ],
  },
  {
    id: 3,
    supplier: "EcoFriendly Materials",
    supplierId: 3,
    date: "2024-11-01",
    validUntil: "2024-12-01",
    reference: "QT-2024-003",
    status: "Rejected",
    subtotal: 3000,
    tax: 300,
    total: 3300,
    notes: "Quotation for eco-friendly packaging",
    terms: "Payment on delivery",
    items: [
      { id: 1, name: "Paper Bags", description: "Recyclable paper bags", quantity: 1000, unitPrice: 1, total: 1000 },
      { id: 2, name: "Cardboard Boxes", description: "Recyclable boxes", quantity: 500, unitPrice: 2, total: 1000 },
      {
        id: 3,
        name: "Biodegradable Bubble Wrap",
        description: "Eco-friendly bubble wrap",
        quantity: 100,
        unitPrice: 10,
        total: 1000,
      },
    ],
  },
]

// Function to initialize supplier quotation - renamed
function initSupplierQuotationModule() {
  // Load quotations data
  loadQuotationsData()

  // Load suppliers for dropdown
  loadQuotationSuppliersDropdown()

  // Add event listener for search input
  document.getElementById("quotationSearchInput").addEventListener("input", searchQuotationsData)

  // Add event listener for add quotation button
  document.getElementById("addQuotationBtn").addEventListener("click", () => {
    // Reset form and show modal
    document.getElementById("quotationForm").reset()
    document.getElementById("quotationId").value = ""
    document.getElementById("quotationModalLabel").textContent = "Create New Supplier Quotation"

    // Set default date values
    const today = new Date().toISOString().split("T")[0]
    document.getElementById("quotationDate").value = today

    // Calculate default valid until date (30 days from today)
    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + 30)
    document.getElementById("validUntil").value = validUntil.toISOString().split("T")[0]

    // Clear items table
    document.getElementById("quotationItemsBody").innerHTML = ""

    // Reset totals
    updateQuotationTotals()

    // Show the modal
    const bootstrap = window.bootstrap
    const quotationModal = new bootstrap.Modal(document.getElementById("quotationModal"))
    quotationModal.show()
  })

  // Add event listener for add item button
  document.getElementById("addQuotItemBtn").addEventListener("click", addQuotationItemToTable)

  // Add event listener for save quotation button
  document.getElementById("saveQuotationBtn").addEventListener("click", saveQuotationData)

  // Add event listener for confirm delete button
  document.getElementById("confirmDeleteQuotationBtn").addEventListener("click", deleteQuotationData)
}

// Function to load quotations data - renamed
function loadQuotationsData(filteredQuotations = null) {
  const quotations = filteredQuotations || getQuotationsFromLocalStorage()
  const tableBody = document.getElementById("quotationsTableBody")
  tableBody.innerHTML = ""

  quotations.forEach((quotation) => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${quotation.id}</td>
      <td>${quotation.supplier}</td>
      <td>${formatQuotationDate(quotation.date)}</td>
      <td>${formatQuotationDate(quotation.validUntil)}</td>
      <td>₹${quotation.total.toFixed(2)}</td>
      <td><span class="badge ${getQuotationStatusBadgeClass(quotation.status)}">${quotation.status}</span></td>
      <td>
        <button class="btn btn-sm btn-info view-quotation" data-id="${quotation.id}">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn btn-sm btn-primary edit-quotation" data-id="${quotation.id}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger delete-quotation" data-id="${quotation.id}">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `
    tableBody.appendChild(row)
  })

  // Add event listeners for action buttons
  addQuotationActionButtonListeners()
}

// Function to format date - renamed
function formatQuotationDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Function to get badge class based on status - renamed
function getQuotationStatusBadgeClass(status) {
  switch (status) {
    case "Approved":
      return "bg-success"
    case "Rejected":
      return "bg-danger"
    case "Pending":
      return "bg-warning"
    case "Expired":
      return "bg-secondary"
    default:
      return "bg-info"
  }
}

// Function to load suppliers for dropdown - renamed
function loadQuotationSuppliersDropdown() {
  const suppliers = getQuotationSuppliersFromStorage()
  const supplierSelect = document.getElementById("quotSupplierSelect")

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

// Function to add event listeners for action buttons - renamed
function addQuotationActionButtonListeners() {
  // View quotation buttons
  document.querySelectorAll(".view-quotation").forEach((button) => {
    button.addEventListener("click", (e) => {
      const quotationId = e.currentTarget.getAttribute("data-id")
      viewQuotationDetails(quotationId)
    })
  })

  // Edit quotation buttons
  document.querySelectorAll(".edit-quotation").forEach((button) => {
    button.addEventListener("click", (e) => {
      const quotationId = e.currentTarget.getAttribute("data-id")
      editQuotationData(quotationId)
    })
  })

  // Delete quotation buttons
  document.querySelectorAll(".delete-quotation").forEach((button) => {
    button.addEventListener("click", (e) => {
      const quotationId = e.currentTarget.getAttribute("data-id")
      confirmDeleteQuotationData(quotationId)
    })
  })
}

// Function to view quotation details - renamed
function viewQuotationDetails(quotationId) {
  const quotations = getQuotationsFromLocalStorage()
  const quotation = quotations.find((q) => q.id == quotationId)

  if (quotation) {
    const detailsContainer = document.getElementById("viewQuotationDetails")

    // Build the HTML for the quotation details
    let itemsHtml = ""
    quotation.items.forEach((item) => {
      itemsHtml += `
        <tr>
          <td>${item.name}</td>
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
          <h6>Quotation Information</h6>
          <p><strong>Quotation #:</strong> ${quotation.id}</p>
          <p><strong>Reference:</strong> ${quotation.reference || "N/A"}</p>
          <p><strong>Date:</strong> ${formatQuotationDate(quotation.date)}</p>
          <p><strong>Valid Until:</strong> ${formatQuotationDate(quotation.validUntil)}</p>
          <p><strong>Status:</strong> <span class="badge ${getQuotationStatusBadgeClass(quotation.status)}">${quotation.status}</span></p>
        </div>
        <div class="col-md-6">
          <h6>Supplier Information</h6>
          <p><strong>Supplier:</strong> ${quotation.supplier}</p>
        </div>
      </div>
      
      <h6>Quotation Items</h6>
      <div class="table-responsive mb-4">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
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
              <td colspan="4" class="text-end"><strong>Subtotal:</strong></td>
              <td>₹${quotation.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="4" class="text-end"><strong>Tax (10%):</strong></td>
              <td>₹${quotation.tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="4" class="text-end"><strong>Total:</strong></td>
              <td>₹${quotation.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <h6>Notes</h6>
          <p>${quotation.notes || "No notes available"}</p>
        </div>
        <div class="col-md-6">
          <h6>Terms and Conditions</h6>
          <p>${quotation.terms || "No terms specified"}</p>
        </div>
      </div>
    `

    // Show the modal
    const bootstrap = window.bootstrap
    const viewModal = new bootstrap.Modal(document.getElementById("viewQuotationModal"))
    viewModal.show()
  }
}

// Function to edit quotation - renamed
function editQuotationData(quotationId) {
  const quotations = getQuotationsFromLocalStorage()
  const quotation = quotations.find((q) => q.id == quotationId)

  if (quotation) {
    // Fill the form with quotation data
    document.getElementById("quotationId").value = quotation.id
    document.getElementById("quotSupplierSelect").value = quotation.supplierId
    document.getElementById("quotationDate").value = quotation.date
    document.getElementById("validUntil").value = quotation.validUntil
    document.getElementById("quotationStatus").value = quotation.status
    document.getElementById("quotationReference").value = quotation.reference || ""
    document.getElementById("quotationNotes").value = quotation.notes || ""
    document.getElementById("quotTermsAndConditions").value = quotation.terms || ""

    // Clear items table
    document.getElementById("quotationItemsBody").innerHTML = ""

    // Add items to the table
    quotation.items.forEach((item) => {
      addQuotationItemWithData(item)
    })

    // Update totals
    updateQuotationTotals()

    // Update modal title
    document.getElementById("quotationModalLabel").textContent = "Edit Supplier Quotation"

    // Show the modal
    const bootstrap = window.bootstrap
    const quotationModal = new bootstrap.Modal(document.getElementById("quotationModal"))
    quotationModal.show()
  }
}

// Function to add a quotation item to the table - renamed
function addQuotationItemWithData(item = null) {
  const itemsBody = document.getElementById("quotationItemsBody")
  const row = document.createElement("tr")

  // Generate a unique ID for the row
  const rowId = "quotItem_" + Date.now() + Math.floor(Math.random() * 1000)
  row.id = rowId

  // Set default values or use provided item
  const itemName = item ? item.name : ""
  const itemDescription = item ? item.description : ""
  const itemQuantity = item ? item.quantity : 1
  const itemUnitPrice = item ? item.unitPrice : 0
  const itemTotal = item ? item.total : 0

  row.innerHTML = `
    <td>
      <input type="text" class="form-control quot-item-name" value="${itemName}" required>
    </td>
    <td>
      <input type="text" class="form-control quot-item-description" value="${itemDescription}">
    </td>
    <td>
      <input type="number" class="form-control quot-item-quantity" value="${itemQuantity}" min="1" required onchange="updateQuotItemTotal('${rowId}')">
    </td>
    <td>
      <input type="number" class="form-control quot-item-price" value="${itemUnitPrice}" min="0" step="0.01" required onchange="updateQuotItemTotal('${rowId}')">
    </td>
    <td>
      <input type="number" class="form-control quot-item-total" value="${itemTotal}" readonly>
    </td>
    <td>
      <button type="button" class="btn btn-sm btn-danger" onclick="removeQuotationItemRow('${rowId}')">
        <i class="fas fa-trash"></i>
      </button>
    </td>
  `

  itemsBody.appendChild(row)
}

// Function to add a new quotation item - renamed
function addQuotationItemToTable() {
  addQuotationItemWithData()
}

// Function to remove a quotation item - renamed
function removeQuotationItemRow(rowId) {
  document.getElementById(rowId).remove()
  updateQuotationTotals()
}

// Function to update an item's total - renamed
function updateQuotItemTotal(rowId) {
  const row = document.getElementById(rowId)
  const quantity = Number.parseFloat(row.querySelector(".quot-item-quantity").value) || 0
  const unitPrice = Number.parseFloat(row.querySelector(".quot-item-price").value) || 0
  const total = quantity * unitPrice

  row.querySelector(".quot-item-total").value = total.toFixed(2)
  updateQuotationTotals()
}

// Function to update totals - renamed
function updateQuotationTotals() {
  let subtotal = 0

  // Calculate subtotal from all items
  document.querySelectorAll(".quot-item-total").forEach((input) => {
    subtotal += Number.parseFloat(input.value) || 0
  })

  // Calculate tax (10%)
  const tax = subtotal * 0.1

  // Calculate total
  const total = subtotal + tax

  // Update the display
  document.getElementById("quotSubtotalAmount").textContent = "₹" + subtotal.toFixed(2)
  document.getElementById("quotTaxAmount").textContent = "₹" + tax.toFixed(2)
  document.getElementById("quotTotalAmount").textContent = "₹" + total.toFixed(2)
}

// Function to confirm delete quotation - renamed
function confirmDeleteQuotationData(quotationId) {
  document.getElementById("deleteQuotationIdInput").value = quotationId
  const bootstrap = window.bootstrap
  const deleteModal = new bootstrap.Modal(document.getElementById("deleteQuotationModal"))
  deleteModal.show()
}

// Function to delete quotation - renamed
function deleteQuotationData() {
  const quotationId = document.getElementById("deleteQuotationIdInput").value
  let quotations = getQuotationsFromLocalStorage()

  // Filter out the quotation to delete
  quotations = quotations.filter((q) => q.id != quotationId)

  // Save updated quotations to storage
  saveQuotationsToLocalStorage(quotations)

  // Close the modal
  const bootstrap = window.bootstrap
  const deleteModalInstance = bootstrap.Modal.getInstance(document.getElementById("deleteQuotationModal"))
  if (deleteModalInstance) {
    deleteModalInstance.hide()
  }

  // Reload quotations table
  loadQuotationsData()
}

// Function to save quotation - renamed
function saveQuotationData() {
  // Get form values
  const quotationId = document.getElementById("quotationId").value
  const supplierId = document.getElementById("quotSupplierSelect").value
  const date = document.getElementById("quotationDate").value
  const validUntil = document.getElementById("validUntil").value
  const status = document.getElementById("quotationStatus").value
  const reference = document.getElementById("quotationReference").value
  const notes = document.getElementById("quotationNotes").value
  const terms = document.getElementById("quotTermsAndConditions").value

  // Validate required fields
  if (!supplierId || !date || !validUntil) {
    alert("Please fill in all required fields")
    return
  }

  // Get supplier name
  const suppliers = getQuotationSuppliersFromStorage()
  const supplier = suppliers.find((s) => s.id == supplierId)

  if (!supplier) {
    alert("Please select a valid supplier")
    return
  }

  // Collect items
  const items = []
  let subtotal = 0

  document.querySelectorAll("#quotationItemsBody tr").forEach((row, index) => {
    const name = row.querySelector(".quot-item-name").value
    const description = row.querySelector(".quot-item-description").value
    const quantity = Number.parseFloat(row.querySelector(".quot-item-quantity").value) || 0
    const unitPrice = Number.parseFloat(row.querySelector(".quot-item-price").value) || 0
    const total = quantity * unitPrice

    if (name && quantity > 0) {
      items.push({
        id: index + 1,
        name,
        description,
        quantity,
        unitPrice,
        total,
      })

      subtotal += total
    }
  })

  if (items.length === 0) {
    alert("Please add at least one item to the quotation")
    return
  }

  // Calculate tax and total
  const tax = subtotal * 0.1
  const total = subtotal + tax

  // Get existing quotations
  const quotations = getQuotationsFromLocalStorage()

  if (quotationId) {
    // Update existing quotation
    const index = quotations.findIndex((q) => q.id == quotationId)
    if (index !== -1) {
      quotations[index] = {
        id: Number.parseInt(quotationId),
        supplier: supplier.name,
        supplierId: Number.parseInt(supplierId),
        date,
        validUntil,
        reference,
        status,
        subtotal,
        tax,
        total,
        notes,
        terms,
        items,
      }
    }
  } else {
    // Add new quotation
    const newId = quotations.length > 0 ? Math.max(...quotations.map((q) => q.id)) + 1 : 1
    quotations.push({
      id: newId,
      supplier: supplier.name,
      supplierId: Number.parseInt(supplierId),
      date,
      validUntil,
      reference,
      status,
      subtotal,
      tax,
      total,
      notes,
      terms,
      items,
    })
  }

  // Save to storage
  saveQuotationsToLocalStorage(quotations)

  // Close the modal
  const bootstrap = window.bootstrap
  const quotationModalInstance = bootstrap.Modal.getInstance(document.getElementById("quotationModal"))
  if (quotationModalInstance) {
    quotationModalInstance.hide()
  }

  // Reload quotations table
  loadQuotationsData()
}

// Function to search quotations - renamed
function searchQuotationsData() {
  const searchTerm = document.getElementById("quotationSearchInput").value.toLowerCase()
  const quotations = getQuotationsFromLocalStorage()

  if (!searchTerm) {
    loadQuotationsData()
    return
  }

  const filteredQuotations = quotations.filter((quotation) => {
    return (
      quotation.supplier.toLowerCase().includes(searchTerm) ||
      quotation.date.includes(searchTerm) ||
      quotation.validUntil.includes(searchTerm) ||
      quotation.status.toLowerCase().includes(searchTerm) ||
      (quotation.reference && quotation.reference.toLowerCase().includes(searchTerm)) ||
      quotation.id.toString().includes(searchTerm)
    )
  })

  loadQuotationsData(filteredQuotations)
}

// Function to get quotations from storage - renamed
function getQuotationsFromLocalStorage() {
  const quotations = localStorage.getItem("quotations")
  return quotations ? JSON.parse(quotations) : sampleQuotationsData
}

// Function to save quotations to storage - renamed
function saveQuotationsToLocalStorage(quotations) {
  localStorage.setItem("quotations", JSON.stringify(quotations))
}

// Function to get suppliers from storage - renamed
function getQuotationSuppliersFromStorage() {
  const suppliers = localStorage.getItem("suppliers")
  return suppliers ? JSON.parse(suppliers) : [
    { id: 1, name: "ABC Suppliers" },
    { id: 2, name: "XYZ Corporation" },
    { id: 3, name: "Global Traders" },
    { id: 4, name: "Tech Solutions" },
    { id: 5, name: "Office Supplies Inc." }
  ]
}

// Function to update sidebar active state - renamed
function updateSupplierQuotationSidebarState(contentType) {
  // Remove active class from all sidebar items
  document.querySelectorAll("#sidebar ul li").forEach((item) => {
    item.classList.remove("active")
  })

  // Add active class to the clicked item
  let activeLink
  if (contentType === "supplier-quotation") {
    activeLink =
      document.querySelector(`#sidebar a[href="#"][onclick*="supplier-quotation"]`) ||
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

// Make these functions globally available
window.updateQuotItemTotal = updateQuotItemTotal
window.removeQuotationItemRow = removeQuotationItemRow