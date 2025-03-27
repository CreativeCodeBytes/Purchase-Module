// Supplier Invoice Management JavaScript

// Initialize when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
  // If supplier invoice content is loaded, initialize it
  if (document.getElementById("supplier-invoices-content")) {
    initSupplierInvoiceManagement()
  }

  // Add event listener for the supplier invoice management menu item
  const supplierInvoiceLink = document.querySelector("a[onclick=\"loadContent('supplier-invoices')\"]")
  if (supplierInvoiceLink) {
    supplierInvoiceLink.removeAttribute("onclick")
    supplierInvoiceLink.addEventListener("click", (e) => {
      e.preventDefault()
      handleSupplierInvoiceClick()
    })
  }
})

// Function to handle supplier invoice menu click
function handleSupplierInvoiceClick() {
  console.log("Handling supplier invoice click")

  // Hide all content sections first
  const allContentSections = document.querySelectorAll("#main-content > div")
  allContentSections.forEach((section) => {
    section.style.display = "none"
  })

  // Create or show the supplier invoice content section
  let contentSection = document.getElementById("supplier-invoices-content")

  if (!contentSection) {
    contentSection = createSupplierInvoiceContent()
    document.getElementById("main-content").appendChild(contentSection)
    initSupplierInvoiceManagement()
  } else {
    contentSection.style.display = "block"
  }

  // Update active state in sidebar
  updateSidebarActiveState("supplier-invoices")

  // Close sidebar on mobile after navigation
  if (window.innerWidth < 768) {
    document.getElementById("sidebar").classList.add("active")
    document.getElementById("content").classList.add("active")
  }
}

// Function to create supplier invoice content section if it doesn't exist
function createSupplierInvoiceContent() {
  console.log("Creating supplier invoice content")

  const section = document.createElement("div")
  section.id = "supplier-invoices-content"
  section.className = "container-fluid"

  section.innerHTML = `
    <h2 class="mb-4">Supplier Invoice Management</h2>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Invoices</h5>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addInvoiceModal">
          <i class="fas fa-plus me-2"></i>Add Invoice
        </button>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search invoices...">
            <button class="btn btn-outline-secondary" type="button">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div class="table-responsive">
          <table id="invoicesTable" class="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier</th>
                <th>Invoice #</th>
                <th>PO #</th>
                <th>Invoice Date</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>INV-1001</td>
                <td>ABC Suppliers</td>
                <td>ABC-INV-5678</td>
                <td>PO-2024-0125</td>
                <td>15 Mar 2024</td>
                <td>14 Apr 2024</td>
                <td>₹5,240.00</td>
                <td><span class="badge bg-success">Paid</span></td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>INV-1002</td>
                <td>XYZ Corporation</td>
                <td>XYZ-INV-1234</td>
                <td>PO-2024-0124</td>
                <td>14 Mar 2024</td>
                <td>13 Apr 2024</td>
                <td>₹3,450.00</td>
                <td><span class="badge bg-warning">Pending</span></td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-success"><i class="fas fa-money-bill-wave"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>INV-1003</td>
                <td>Global Traders</td>
                <td>GT-INV-9876</td>
                <td>PO-2024-0123</td>
                <td>12 Mar 2024</td>
                <td>11 Apr 2024</td>
                <td>₹7,890.00</td>
                <td><span class="badge bg-warning">Pending</span></td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-success"><i class="fas fa-money-bill-wave"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>INV-1004</td>
                <td>Tech Solutions</td>
                <td>TS-INV-5432</td>
                <td>PO-2024-0122</td>
                <td>10 Mar 2024</td>
                <td>9 Apr 2024</td>
                <td>₹2,340.00</td>
                <td><span class="badge bg-success">Paid</span></td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>INV-1005</td>
                <td>Office Supplies Inc.</td>
                <td>OSI-INV-7890</td>
                <td>PO-2024-0121</td>
                <td>8 Mar 2024</td>
                <td>7 Apr 2024</td>
                <td>₹1,230.00</td>
                <td><span class="badge bg-danger">Overdue</span></td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-success"><i class="fas fa-money-bill-wave"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add Invoice Modal -->
    <div class="modal fade" id="addInvoiceModal" tabindex="-1" aria-labelledby="addInvoiceModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="addInvoiceModalLabel">Add New Invoice</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="add-invoice-form">
              <div class="mb-3">
                <label for="add-supplier" class="form-label">Supplier</label>
                <select class="form-select" id="add-supplier" name="supplier" required>
                  <option value="">Select Supplier</option>
                  <option value="ABC Suppliers">ABC Suppliers</option>
                  <option value="XYZ Corporation">XYZ Corporation</option>
                  <option value="Global Traders">Global Traders</option>
                  <option value="Tech Solutions">Tech Solutions</option>
                  <option value="Office Supplies Inc.">Office Supplies Inc.</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="add-invoice-number" class="form-label">Invoice Number</label>
                <input type="text" class="form-control" id="add-invoice-number" name="invoiceNumber" required>
              </div>
              <div class="mb-3">
                <label for="add-po-number" class="form-label">PO Number</label>
                <input type="text" class="form-control" id="add-po-number" name="poNumber">
              </div>
              <div class="mb-3">
                <label for="add-invoice-date" class="form-label">Invoice Date</label>
                <input type="date" class="form-control" id="add-invoice-date" name="invoiceDate" required>
              </div>
              <div class="mb-3">
                <label for="add-due-date" class="form-label">Due Date</label>
                <input type="date" class="form-control" id="add-due-date" name="dueDate" required>
              </div>
              <div class="mb-3">
                <label for="add-amount" class="form-label">Amount</label>
                <input type="number" class="form-control" id="add-amount" name="amount" step="0.01" required>
              </div>
              <div class="mb-3">
                <label for="add-tax" class="form-label">Tax Amount</label>
                <input type="number" class="form-control" id="add-tax" name="tax" step="0.01" required>
              </div>
              <div class="mb-3">
                <label for="add-status" class="form-label">Status</label>
                <select class="form-select" id="add-status" name="status" required>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Disputed">Disputed</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" onclick="saveNewInvoice()">Save Invoice</button>
          </div>
        </div>
      </div>
    </div>
  `

  return section
}

// Function to initialize the supplier invoice management
function initSupplierInvoiceManagement() {
  console.log("Initializing Supplier Invoice Management")

  // Initialize search functionality
  initInvoiceSearch()

  // Initialize action buttons
  initInvoiceActions()
}

// Function to initialize search functionality for invoices
function initInvoiceSearch() {
  const searchInput = document.querySelector("#supplier-invoices-content .input-group input[type='text']")
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault()
        searchInvoices(this.value)
      }
    })

    const searchButton = searchInput.nextElementSibling
    if (searchButton) {
      searchButton.addEventListener("click", () => {
        searchInvoices(searchInput.value)
      })
    }
  } else {
    console.log("Invoice search input not found")
  }
}

// Function to search invoices
function searchInvoices(searchTerm) {
  if (!searchTerm.trim()) return

  const table = document.getElementById("invoicesTable")
  if (!table) return

  const rows = table.querySelectorAll("tbody tr")
  let found = false

  rows.forEach((row) => {
    let rowText = ""
    row.querySelectorAll("td").forEach((cell) => {
      rowText += cell.textContent.toLowerCase() + " "
    })

    if (rowText.includes(searchTerm.toLowerCase())) {
      row.style.display = ""
      found = true
      // Highlight the matching row
      row.classList.add("table-primary")
      setTimeout(() => {
        row.classList.remove("table-primary")
      }, 2000)
    } else {
      row.style.display = "none"
    }
  })

  if (!found) {
    alert("No matching invoices found.")
    // Reset the table to show all rows
    rows.forEach((row) => {
      row.style.display = ""
    })
  }
}

// Function to initialize action buttons for invoices
function initInvoiceActions() {
  // View buttons
  document.querySelectorAll("#invoicesTable .btn-info").forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true")
      btn.addEventListener("click", function () {
        const row = this.closest("tr")
        if (row) {
          const id = row.cells[0].textContent
          viewInvoice(id)
        }
      })
    }
  })

  // Edit buttons
  document.querySelectorAll("#invoicesTable .btn-primary").forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true")
      btn.addEventListener("click", function () {
        const row = this.closest("tr")
        if (row) {
          const id = row.cells[0].textContent
          editInvoice(id)
        }
      })
    }
  })

  // Delete buttons
  document.querySelectorAll("#invoicesTable .btn-danger").forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true")
      btn.addEventListener("click", function () {
        const row = this.closest("tr")
        if (row) {
          const id = row.cells[0].textContent
          deleteInvoice(id)
        }
      })
    }
  })

  // Payment buttons
  document.querySelectorAll("#invoicesTable .btn-success").forEach((btn) => {
    if (!btn.hasAttribute("data-initialized") && btn.innerHTML.includes("fa-money-bill-wave")) {
      btn.setAttribute("data-initialized", "true")
      btn.addEventListener("click", function () {
        const row = this.closest("tr")
        if (row) {
          const id = row.cells[0].textContent
          processPayment(id)
        }
      })
    }
  })
}

// Function to save new invoice
function saveNewInvoice() {
  // Get form values
  const supplier = document.getElementById("add-supplier").value
  const invoiceNumber = document.getElementById("add-invoice-number").value
  const poNumber = document.getElementById("add-po-number").value
  const invoiceDate = document.getElementById("add-invoice-date").value
  const dueDate = document.getElementById("add-due-date").value
  const amount = parseFloat(document.getElementById("add-amount").value)
  const tax = parseFloat(document.getElementById("add-tax").value)
  const status = document.getElementById("add-status").value

  // Validate form
  if (!supplier || !invoiceNumber || !invoiceDate || !dueDate || isNaN(amount) || isNaN(tax)) {
    alert("Please fill in all required fields.")
    return
  }

  // Generate a new invoice ID
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const randomNum = Math.floor(1000 + Math.random() * 9000)
  const newId = `INV-${randomNum}`

  // Format the amount for display
  const formattedAmount = amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'Rupees',
    minimumFractionDigits: 2
  })

  // Create a new row for the table
  const table = document.getElementById("invoicesTable")
  if (table) {
    const tbody = table.querySelector("tbody")
    const newRow = document.createElement("tr")
    
    // Set the HTML content of the new row
    newRow.innerHTML = `
      <td>${newId}</td>
      <td>${supplier}</td>
      <td>${invoiceNumber}</td>
      <td>${poNumber}</td>
      <td>${formatDate(invoiceDate)}</td>
      <td>${formatDate(dueDate)}</td>
      <td>${formattedAmount}</td>
      <td><span class="badge bg-${getStatusBadgeColor(status)}">${status}</span></td>
      <td>
        <div class="btn-group">
          <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
          <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
          ${status !== "Paid" ? `<button class="btn btn-sm btn-success"><i class="fas fa-money-bill-wave"></i></button>` : ""}
          <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    `
    
    // Add the new row to the table
    tbody.insertBefore(newRow, tbody.firstChild)
    
    // Reinitialize action buttons
    initInvoiceActions()
    
    // Close the modal
    const bootstrap = window.bootstrap
    const modal = document.getElementById("addInvoiceModal")
    if (modal) {
      const modalInstance = bootstrap.Modal.getInstance(modal)
      if (modalInstance) {
        modalInstance.hide()
      }
    }
    
    // Reset the form
    document.getElementById("add-invoice-form").reset()
    
    // Show success message
    alert("Invoice added successfully!")
  }
}

// Function to view invoice details
function viewInvoice(id) {
  // Fetch invoice details (simulated)
  const invoiceDetails = fetchInvoiceDetails(id)

  // Create modal if it doesn't exist
  let modal = document.getElementById("invoice-details-modal")

  if (!modal) {
    modal = document.createElement("div")
    modal.id = "invoice-details-modal"
    modal.className = "modal fade"
    modal.setAttribute("tabindex", "-1")
    modal.setAttribute("aria-labelledby", "invoiceDetailsModalLabel")
    modal.setAttribute("aria-hidden", "true")

    // Add modal to body
    document.body.appendChild(modal)
  }

  // Calculate days overdue if applicable
  let daysOverdue = 0
  const dueDate = new Date(invoiceDetails.dueDate)
  const today = new Date()

  if (today > dueDate && invoiceDetails.status !== "Paid") {
    const diffTime = Math.abs(today - dueDate)
    daysOverdue = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Set modal content
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="invoiceDetailsModalLabel">Invoice Details: ${id}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3">
            <div class="col-md-6">
              <h6>Invoice Information</h6>
              <p><strong>Supplier:</strong> ${invoiceDetails.supplier}</p>
              <p><strong>Invoice Number:</strong> ${invoiceDetails.invoiceNumber}</p>
              <p><strong>PO Number:</strong> ${invoiceDetails.poNumber}</p>
              <p><strong>Invoice Date:</strong> ${formatDate(invoiceDetails.invoiceDate)}</p>
              <p><strong>Due Date:</strong> ${formatDate(invoiceDetails.dueDate)}</p>
              <p><strong>Status:</strong> <span class="badge bg-${getStatusBadgeColor(invoiceDetails.status)}">${invoiceDetails.status}</span></p>
              ${daysOverdue > 0 ? `<p><strong>Days Overdue:</strong> <span class="text-danger">${daysOverdue}</span></p>` : ""}
            </div>
            <div class="col-md-6">
              <h6>Amount Details</h6>
              <p><strong>Subtotal:</strong> ₹${invoiceDetails.subtotal.toFixed(2)}</p>
              <p><strong>Tax:</strong> ₹${invoiceDetails.tax.toFixed(2)}</p>
              <p><strong>Total:</strong> ₹${invoiceDetails.amount.toFixed(2)}</p>
              <p><strong>Amount Paid:</strong> ₹${invoiceDetails.amountPaid.toFixed(2)}</p>
              <p><strong>Balance Due:</strong> ₹${(invoiceDetails.amount - invoiceDetails.amountPaid).toFixed(2)}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <h6>Invoice Items</h6>
              <div class="table-responsive">
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
                    ${invoiceDetails.items
                      .map(
                        (item) => `
                      <tr>
                        <td>${item.name}</td>
                        <td>${item.description}</td>
                        <td>${item.quantity}</td>
                        <td>₹${item.unitPrice.toFixed(2)}</td>
                        <td>₹${(item.quantity * item.unitPrice).toFixed(2)}</td>
                      </tr>
                    `,
                      )
                      .join("")}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colspan="4" class="text-end">Subtotal:</th>
                      <td>₹${invoiceDetails.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <th colspan="4" class="text-end">Tax:</th>
                      <td>₹${invoiceDetails.tax.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <th colspan="4" class="text-end">Total:</th>
                      <td>₹${invoiceDetails.amount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          ${
            invoiceDetails.status !== "Paid"
              ? `
          <div class="row mt-3">
            <div class="col-12">
              <h6>Payment Information</h6>
              <p><strong>Payment Terms:</strong> Net ${invoiceDetails.paymentTerms} days</p>
              <p><strong>Payment Instructions:</strong> ${invoiceDetails.paymentInstructions}</p>
            </div>
          </div>
          `
              : `
          <div class="row mt-3">
            <div class="col-12">
              <h6>Payment History</h6>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${formatDate(invoiceDetails.paymentDate)}</td>
                      <td>₹${invoiceDetails.amountPaid.toFixed(2)}</td>
                      <td>${invoiceDetails.paymentMethod}</td>
                      <td>${invoiceDetails.paymentReference}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          `
          }
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="editInvoice('${id}')">Edit</button>
          ${invoiceDetails.status !== "Paid" ? `<button type="button" class="btn btn-success" onclick="processPayment('${id}')"><i class="fas fa-money-bill-wave me-2"></i>Process Payment</button>` : ""}
        </div>
      </div>
    </div>
  `

  // Initialize and show the modal
  const bootstrap = window.bootstrap
  const modalInstance = new bootstrap.Modal(modal)
  modalInstance.show()
}

// Function to edit invoice
function editInvoice(id) {
  // Hide details modal if it exists
  const detailsModal = document.getElementById("invoice-details-modal")
  if (detailsModal) {
    const bootstrap = window.bootstrap
    const detailsModalInstance = bootstrap.Modal.getInstance(detailsModal)
    if (detailsModalInstance) {
      detailsModalInstance.hide()
    }
  }

  // Fetch invoice details (simulated)
  const invoiceDetails = fetchInvoiceDetails(id)

  // Create or get edit modal
  let modal = document.getElementById("invoice-edit-modal")

  if (!modal) {
    modal = document.createElement("div")
    modal.id = "invoice-edit-modal"
    modal.className = "modal fade"
    modal.setAttribute("tabindex", "-1")
    modal.setAttribute("aria-labelledby", "invoiceEditModalLabel")
    modal.setAttribute("aria-hidden", "true")

    // Add modal to body
    document.body.appendChild(modal)
  }

  // Set modal content
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="invoiceEditModalLabel">Edit Invoice: ${id}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="edit-invoice-form">
            <input type="hidden" id="edit-id" value="${id}">
            <div class="mb-3">
              <label for="edit-supplier" class="form-label">Supplier</label>
              <select class="form-select" id="edit-supplier" name="supplier" required>
                <option value="">Select Supplier</option>
                <option value="ABC Suppliers" ${invoiceDetails.supplier === "ABC Suppliers" ? "selected" : ""}>ABC Suppliers</option>
                <option value="XYZ Corporation" ${invoiceDetails.supplier === "XYZ Corporation" ? "selected" : ""}>XYZ Corporation</option>
                <option value="Global Traders" ${invoiceDetails.supplier === "Global Traders" ? "selected" : ""}>Global Traders</option>
                <option value="Tech Solutions" ${invoiceDetails.supplier === "Tech Solutions" ? "selected" : ""}>Tech Solutions</option>
                <option value="Office Supplies Inc." ${invoiceDetails.supplier === "Office Supplies Inc." ? "selected" : ""}>Office Supplies Inc.</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="edit-invoice-number" class="form-label">Invoice Number</label>
              <input type="text" class="form-control" id="edit-invoice-number" name="invoiceNumber" value="${invoiceDetails.invoiceNumber}" required>
            </div>
            <div class="mb-3">
              <label for="edit-po-number" class="form-label">PO Number</label>
              <input type="text" class="form-control" id="edit-po-number" name="poNumber" value="${invoiceDetails.poNumber}">
            </div>
            <div class="mb-3">
              <label for="edit-invoice-date" class="form-label">Invoice Date</label>
              <input type="date" class="form-control" id="edit-invoice-date" name="invoiceDate" value="${formatDateForInput(invoiceDetails.invoiceDate)}" required>
            </div>
            <div class="mb-3">
              <label for="edit-due-date" class="form-label">Due Date</label>
              <input type="date" class="form-control" id="edit-due-date" name="dueDate" value="${formatDateForInput(invoiceDetails.dueDate)}" required>
            </div>
            <div class="mb-3">
              <label for="edit-amount" class="form-label">Amount</label>
              <input type="number" class="form-control" id="edit-amount" name="amount" step="0.01" value="${invoiceDetails.amount}" required>
            </div>
            <div class="mb-3">
              <label for="edit-tax" class="form-label">Tax Amount</label>
              <input type="number" class="form-control" id="edit-tax" name="tax" step="0.01" value="${invoiceDetails.tax}" required>
            </div>
            <div class="mb-3">
              <label for="edit-status" class="form-label">Status</label>
              <select class="form-select" id="edit-status" name="status" required>
                <option value="Pending" ${invoiceDetails.status === "Pending" ? "selected" : ""}>Pending</option>
                <option value="Paid" ${invoiceDetails.status === "Paid" ? "selected" : ""}>Paid</option>
                <option value="Overdue" ${invoiceDetails.status === "Overdue" ? "selected" : ""}>Overdue</option>
                <option value="Disputed" ${invoiceDetails.status === "Disputed" ? "selected" : ""}>Disputed</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" onclick="saveEditedInvoice()">Save Changes</button>
        </div>
      </div>
    </div>
  `

  // Initialize and show the modal
  const bootstrap = window.bootstrap
  const modalInstance = new bootstrap.Modal(modal)
  modalInstance.show()
}

// Function to save edited invoice
function saveEditedInvoice() {
  const id = document.getElementById("edit-id").value
  const supplier = document.getElementById("edit-supplier").value
  const invoiceNumber = document.getElementById("edit-invoice-number").value
  const poNumber = document.getElementById("edit-po-number").value
  const invoiceDate = document.getElementById("edit-invoice-date").value
  const dueDate = document.getElementById("edit-due-date").value
  const amount = document.getElementById("edit-amount").value
  const tax = document.getElementById("edit-tax").value
  const status = document.getElementById("edit-status").value

  // Find the row in the table
  const table = document.getElementById("invoicesTable")
  if (table) {
    const rows = table.querySelectorAll("tbody tr")
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      if (row.cells[0].textContent === id) {
        // Update the row with new values
        row.cells[1].textContent = supplier
        row.cells[2].textContent = invoiceNumber
        row.cells[3].textContent = poNumber
        row.cells[4].textContent = formatDate(invoiceDate)
        row.cells[5].textContent = formatDate(dueDate)
        row.cells[6].textContent = "₹" + Number.parseFloat(amount).toFixed(2)

        // Update status badge
        const statusBadge = row.cells[7].querySelector(".badge")
        if (statusBadge) {
          statusBadge.className = `badge bg-${getStatusBadgeColor(status)}`
          statusBadge.textContent = status
        }

        // Update action buttons based on status
        const actionCell = row.cells[8]
        if (status === "Paid") {
          // Remove payment button for paid invoices
          if (actionCell.innerHTML.includes("fa-money-bill-wave")) {
            actionCell.innerHTML = `
              <div class="btn-group">
                <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
              </div>
            `
          }
        } else {
          // Add payment button for unpaid invoices
          if (!actionCell.innerHTML.includes("fa-money-bill-wave")) {
            actionCell.innerHTML = `
              <div class="btn-group">
                <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-success"><i class="fas fa-money-bill-wave"></i></button>
                <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
              </div>
            `
          }
        }

        // Close the modal
        const bootstrap = window.bootstrap
        const modal = document.getElementById("invoice-edit-modal")
        if (modal) {
          const modalInstance = bootstrap.Modal.getInstance(modal)
          if (modalInstance) {
            modalInstance.hide()
          }
        }

        // Reinitialize action buttons
        setTimeout(() => {
          initInvoiceActions()
        }, 100)

        alert("Invoice updated successfully!")
        break
      }
    }
  }
}

// Function to delete invoice
function deleteInvoice(id) {
  if (confirm("Are you sure you want to delete invoice: " + id + "?")) {
    // Find the row in the table
    const table = document.getElementById("invoicesTable")
    if (table) {
      const rows = table.querySelectorAll("tbody tr")
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        if (row.cells[0].textContent === id) {
          // Remove the row
          row.remove()
          alert("Invoice deleted successfully!")
          break
        }
      }
    }
  }
}

// Function to process payment for an invoice
function processPayment(id) {
  // Hide details modal if it exists
  const detailsModal = document.getElementById("invoice-details-modal")
  if (detailsModal) {
    const bootstrap = window.bootstrap
    const detailsModalInstance = bootstrap.Modal.getInstance(detailsModal)
    if (detailsModalInstance) {
      detailsModalInstance.hide()
    }
  }

  // Fetch invoice details (simulated)
  const invoiceDetails = fetchInvoiceDetails(id)

  // Create or get payment modal
  let modal = document.getElementById("invoice-payment-modal")

  if (!modal) {
    modal = document.createElement("div")
    modal.id = "invoice-payment-modal"
    modal.className = "modal fade"
    modal.setAttribute("tabindex", "-1")
    modal.setAttribute("aria-labelledby", "invoicePaymentModalLabel")
    modal.setAttribute("aria-hidden", "true")

    // Add modal to body
    document.body.appendChild(modal)
  }

  // Calculate balance due
  const balanceDue = invoiceDetails.amount - invoiceDetails.amountPaid

  // Set modal content
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="invoicePaymentModalLabel">Process Payment: ${id}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="payment-form">
            <input type="hidden" id="payment-id" value="${id}">
            <div class="row mb-3">
              <div class="col-md-6">
                <h6>Invoice Information</h6>
                <p><strong>Supplier:</strong> ${invoiceDetails.supplier}</p>
                <p><strong>Invoice Number:</strong> ${invoiceDetails.invoiceNumber}</p>
                <p><strong>Invoice Date:</strong> ${formatDate(invoiceDetails.invoiceDate)}</p>
                <p><strong>Due Date:</strong> ${formatDate(invoiceDetails.dueDate)}</p>
              </div>
              <div class="col-md-6">
                <h6>Amount Information</h6>
                <p><strong>Total Amount:</strong> ₹${invoiceDetails.amount.toFixed(2)}</p>
                <p><strong>Amount Paid:</strong> ₹${invoiceDetails.amountPaid.toFixed(2)}</p>
                <p><strong>Balance Due:</strong> ₹${balanceDue.toFixed(2)}</p>
              </div>
            </div>
            <div class="mb-3">
              <label for="payment-amount" class="form-label">Payment Amount</label>
              <input type="number" class="form-control" id="payment-amount" name="paymentAmount" step="0.01" value="${balanceDue.toFixed(2)}" max="${balanceDue.toFixed(2)}" required>
            </div>
            <div class="mb-3">
              <label for="payment-date" class="form-label">Payment Date</label>
              <input type="date" class="form-control" id="payment-date" name="paymentDate" value="${formatDateForInput(new Date().toISOString())}" required>
            </div>
            <div class="mb-3">
              <label for="payment-method" class="form-label">Payment Method</label>
              <select class="form-select" id="payment-method" name="paymentMethod" required>
                <option value="">Select Payment Method</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Check">Check</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="payment-reference" class="form-label">Reference Number</label>
              <input type="text" class="form-control" id="payment-reference" name="paymentReference">
            </div>
            <div class="mb-3">
              <label for="payment-notes" class="form-label">Notes</label>
              <textarea class="form-control" id="payment-notes" name="paymentNotes" rows="3"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-success" onclick="savePayment()">Process Payment</button>
        </div>
      </div>
    </div>
  `

  // Initialize and show the modal
  const bootstrap = window.bootstrap
  const modalInstance = new bootstrap.Modal(modal)
  modalInstance.show()
}

// Function to save payment
function savePayment() {
  const id = document.getElementById("payment-id").value
  const paymentAmount = Number.parseFloat(document.getElementById("payment-amount").value)
  const paymentDate = document.getElementById("payment-date").value
  const paymentMethod = document.getElementById("payment-method").value
  const paymentReference = document.getElementById("payment-reference").value

  // Validate form
  if (!paymentAmount || !paymentDate || !paymentMethod) {
    alert("Please fill in all required fields.")
    return
  }

  // Fetch invoice details (simulated)
  const invoiceDetails = fetchInvoiceDetails(id)

  // Calculate new amount paid and determine if fully paid
  const newAmountPaid = invoiceDetails.amountPaid + paymentAmount
  const isPaid = Math.abs(newAmountPaid - invoiceDetails.amount) < 0.01 // Account for floating point precision

  // Find the row in the table
  const table = document.getElementById("invoicesTable")
  if (table) {
    const rows = table.querySelectorAll("tbody tr")
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      if (row.cells[0].textContent === id) {
        // Update status badge
        const statusBadge = row.cells[7].querySelector(".badge")
        if (statusBadge) {
          if (isPaid) {
            statusBadge.className = "badge bg-success"
            statusBadge.textContent = "Paid"

            // Update action buttons (remove payment button)
            const actionCell = row.cells[8]
            actionCell.innerHTML = `
              <div class="btn-group">
                <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
              </div>
            `
          }
        }

        // Close the modal
        const bootstrap = window.bootstrap
        const modal = document.getElementById("invoice-payment-modal")
        if (modal) {
          const modalInstance = bootstrap.Modal.getInstance(modal)
          if (modalInstance) {
            modalInstance.hide()
          }
        }

        // Reinitialize action buttons
        setTimeout(() => {
          initInvoiceActions()
        }, 100)

        // Generate payment ID
        const date = new Date()
        const year = date.getFullYear()
        const randomNum = Math.floor(1000 + Math.random() * 9000)
        const paymentId = `PAY-${year}-${randomNum}`

        alert(`Payment of ₹${paymentAmount.toFixed(2)} processed successfully!\nPayment ID: ${paymentId}`)
        break
      }
    }
  }
}

// Function to simulate fetching invoice details
function fetchInvoiceDetails(id) {
  // In a real application, this would be an API call
  // For now, we'll return mock data based on the ID
  const isPaid = id.includes("1001") || id.includes("1004")
  const amount = id.includes("1001")
    ? 5240.0
    : id.includes("1002")
      ? 3450.0
      : id.includes("1003")
        ? 7890.0
        : id.includes("1004")
          ? 2340.0
          : 1230.0

  const tax = amount * 0.18 // 18% tax
  const subtotal = amount - tax

  return {
    id: id,
    supplier: id.includes("1001")
      ? "ABC Suppliers"
      : id.includes("1002")
        ? "XYZ Corporation"
        : id.includes("1003")
          ? "Global Traders"
          : id.includes("1004")
            ? "Tech Solutions"
            : "Office Supplies Inc.",
    invoiceNumber: id.includes("1001")
      ? "ABC-INV-5678"
      : id.includes("1002")
        ? "XYZ-INV-1234"
        : id.includes("1003")
          ? "GT-INV-9876"
          : id.includes("1004")
            ? "TS-INV-5432"
            : "OSI-INV-7890",
    poNumber: id.includes("1001")
      ? "PO-2024-0125"
      : id.includes("1002")
        ? "PO-2024-0124"
        : id.includes("1003")
          ? "PO-2024-0123"
          : id.includes("1004")
            ? "PO-2024-0122"
            : "PO-2024-0121",
    invoiceDate: id.includes("1001")
      ? "2024-03-15"
      : id.includes("1002")
        ? "2024-03-14"
        : id.includes("1003")
          ? "2024-03-12"
          : id.includes("1004")
            ? "2024-03-10"
            : "2024-03-08",
    dueDate: id.includes("1001")
      ? "2024-04-14"
      : id.includes("1002")
        ? "2024-04-13"
        : id.includes("1003")
          ? "2024-04-11"
          : id.includes("1004")
            ? "2024-04-09"
            : "2024-04-07",
    amount: amount,
    subtotal: subtotal,
    tax: tax,
    status:
      id.includes("1001") || id.includes("1004")
        ? "Paid"
        : id.includes("1002") || id.includes("1003")
          ? "Pending"
          : "Overdue",
    amountPaid: isPaid ? amount : 0,
    paymentDate: isPaid ? (id.includes("1001") ? "2024-03-30" : "2024-03-25") : null,
    paymentMethod: isPaid ? (id.includes("1001") ? "Bank Transfer" : "Credit Card") : null,
    paymentReference: isPaid ? (id.includes("1001") ? "TRF-12345" : "CC-67890") : null,
    paymentTerms: 30,
    paymentInstructions:
      "Please make payment to the bank account details provided in the invoice or contact our accounts department for alternative payment methods.",
    items: [
      {
        name: "Item 1",
        description: "Description for Item 1",
        quantity: 5,
        unitPrice: (subtotal * 0.4) / 5,
      },
      {
        name: "Item 2",
        description: "Description for Item 2",
        quantity: 3,
        unitPrice: (subtotal * 0.3) / 3,
      },
      {
        name: "Item 3",
        description: "Description for Item 3",
        quantity: 2,
        unitPrice: (subtotal * 0.3) / 2,
      },
    ],
  }
}

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "short" })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

// Helper function to format date for input fields
function formatDateForInput(dateString) {
  const date = new Date(dateString)
  return date.toISOString().split("T")[0]
}

// Helper function to get badge color based on status
function getStatusBadgeColor(status) {
  switch (status) {
    case "Paid":
      return "success"
    case "Pending":
      return "warning"
    case "Overdue":
      return "danger"
    case "Disputed":
      return "danger"
    default:
      return "secondary"
  }
}

// Function to update sidebar active state
function updateSidebarActiveState(contentType) {
  // Remove active class from all sidebar items
  document.querySelectorAll("#sidebar ul li").forEach((item) => {
    item.classList.remove("active")
  })

  // Add active class to the clicked item
  let activeLink
  if (contentType === "supplier-invoices") {
    activeLink =
      document.querySelector(`#sidebar a[href="#"][onclick*="supplier-invoices"]`) ||
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

// Execute this to test the code
console.log("Supplier Invoice Management script loaded successfully");