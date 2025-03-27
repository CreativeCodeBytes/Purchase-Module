// Purchase Invoice Reports Management
document.addEventListener("DOMContentLoaded", () => {
    // Add event listener for the Purchase Invoice Reports menu item
    const purchaseInvoiceReportsLink = document.querySelector("a[onclick=\"loadContent('purchase-invoices-report')\"]")
    if (purchaseInvoiceReportsLink) {
      purchaseInvoiceReportsLink.removeAttribute("onclick")
      purchaseInvoiceReportsLink.addEventListener("click", (e) => {
        e.preventDefault()
        handlePurchaseInvoiceReportsClick()
      })
    }
  })
  
  // Sample data for purchase invoice reports
  let purchaseInvoiceReports = [
    {
      id: 1,
      date: "2024-12-20",
      supplier: "ABC Supplies",
      invoiceNumber: "INV-2024-001",
      poNumber: "PO-2024-001",
      amount: 8500.0,
      paymentStatus: "Paid",
      approvalStatus: "Approved",
    },
    {
      id: 2,
      date: "2024-12-15",
      supplier: "XYZ Manufacturing",
      invoiceNumber: "INV-2024-002",
      poNumber: "PO-2024-002",
      amount: 15750.0,
      paymentStatus: "Pending",
      approvalStatus: "Pending",
    },
    {
      id: 3,
      date: "2024-12-10",
      supplier: "Tech Solutions",
      invoiceNumber: "INV-2024-003",
      poNumber: "PO-2024-003",
      amount: 12300.0,
      paymentStatus: "Overdue",
      approvalStatus: "Rejected",
    },
  ]
  
  // Function to handle Purchase Invoice Reports menu click
  function handlePurchaseInvoiceReportsClick() {
    // Hide all content sections first
    const allContentSections = document.querySelectorAll("#main-content > div")
    allContentSections.forEach((section) => {
      section.style.display = "none"
    })
  
    // Create or show the purchase invoice reports content section
    let contentSection = document.getElementById("purchase-invoices-report-content")
  
    if (!contentSection) {
      contentSection = createPurchaseInvoiceReportsContent()
      document.getElementById("main-content").appendChild(contentSection)
      initPurchaseInvoiceReportsEventListeners()
      renderPurchaseInvoiceReportsTable(purchaseInvoiceReports)
    } else {
      contentSection.style.display = "block"
    }
  
    // Update active state in sidebar
    updateSidebarActiveState("purchase-invoices-report")
  
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      document.getElementById("sidebar").classList.add("active")
      document.getElementById("content").classList.add("active")
    }
  }
  
  // Function to create purchase invoice reports content section
  function createPurchaseInvoiceReportsContent() {
    const contentSection = document.createElement("div")
    contentSection.id = "purchase-invoices-report-content"
    contentSection.className = "container-fluid"
  
    contentSection.innerHTML = `
      <h2 class="mb-4">Purchase Invoice Reports</h2>
      
      <div class="row mb-4">
        <div class="col-md-8">
          <div class="input-group">
            <input type="text" id="purchase-invoice-reports-search" class="form-control" placeholder="Search invoices...">
            <button class="btn btn-primary" type="button" id="purchase-invoice-reports-search-btn">
              <i class="fas fa-search"></i> Search
            </button>
          </div>
        </div>
        <div class="col-md-4 text-end">
          <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addPurchaseInvoiceReportModal">
            <i class="fas fa-plus"></i> Create New Report
          </button>
        </div>
      </div>
      
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Filters</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-3 mb-3">
                  <label for="invoice-filter-date-from" class="form-label">Date From</label>
                  <input type="date" class="form-control" id="invoice-filter-date-from">
                </div>
                <div class="col-md-3 mb-3">
                  <label for="invoice-filter-date-to" class="form-label">Date To</label>
                  <input type="date" class="form-control" id="invoice-filter-date-to">
                </div>
                <div class="col-md-3 mb-3">
                  <label for="invoice-filter-supplier" class="form-label">Supplier</label>
                  <select class="form-select" id="invoice-filter-supplier">
                    <option value="">All Suppliers</option>
                    <option value="ABC Supplies">ABC Supplies</option>
                    <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                    <option value="Tech Solutions">Tech Solutions</option>
                    <option value="Global Logistics">Global Logistics</option>
                  </select>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="invoice-filter-payment-status" class="form-label">Payment Status</label>
                  <select class="form-select" id="invoice-filter-payment-status">
                    <option value="">All</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 mb-3">
                  <label for="invoice-filter-approval-status" class="form-label">Approval Status</label>
                  <select class="form-select" id="invoice-filter-approval-status">
                    <option value="">All</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div class="col-md-9 text-end">
                  <button class="btn btn-primary" id="apply-invoice-reports-filters">Apply Filters</button>
                  <button class="btn btn-secondary" id="reset-invoice-reports-filters">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Purchase Invoice Reports</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Date</th>
                      <th>Supplier</th>
                      <th>PO Number</th>
                      <th>Amount</th>
                      <th>Payment Status</th>
                      <th>Approval Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="purchase-invoice-reports-table-body">
                    <!-- Table content will be loaded dynamically -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Add Purchase Invoice Report Modal -->
      <div class="modal fade" id="addPurchaseInvoiceReportModal" tabindex="-1" aria-labelledby="addPurchaseInvoiceReportModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addPurchaseInvoiceReportModalLabel">Create New Purchase Invoice Report</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="add-purchase-invoice-report-form">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="invoice-date" class="form-label">Date</label>
                    <input type="date" class="form-control" id="invoice-date" required>
                  </div>
                  <div class="col-md-6">
                    <label for="invoice-number" class="form-label">Invoice Number</label>
                    <input type="text" class="form-control" id="invoice-number" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="invoice-supplier" class="form-label">Supplier</label>
                    <select class="form-select" id="invoice-supplier" required>
                      <option value="">Select Supplier</option>
                      <option value="ABC Supplies">ABC Supplies</option>
                      <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                      <option value="Tech Solutions">Tech Solutions</option>
                      <option value="Global Logistics">Global Logistics</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="invoice-po-number" class="form-label">PO Number</label>
                    <input type="text" class="form-control" id="invoice-po-number" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="invoice-amount" class="form-label">Amount</label>
                    <input type="number" class="form-control" id="invoice-amount" step="0.01" min="0" required>
                  </div>
                  <div class="col-md-6">
                    <label for="invoice-payment-status" class="form-label">Payment Status</label>
                    <select class="form-select" id="invoice-payment-status" required>
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="save-purchase-invoice-report">Save Report</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Edit Purchase Invoice Report Modal -->
      <div class="modal fade" id="editPurchaseInvoiceReportModal" tabindex="-1" aria-labelledby="editPurchaseInvoiceReportModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editPurchaseInvoiceReportModalLabel">Edit Purchase Invoice Report</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="edit-purchase-invoice-report-form">
                <input type="hidden" id="edit-invoice-id">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="edit-invoice-date" class="form-label">Date</label>
                    <input type="date" class="form-control" id="edit-invoice-date" required>
                  </div>
                  <div class="col-md-6">
                    <label for="edit-invoice-number" class="form-label">Invoice Number</label>
                    <input type="text" class="form-control" id="edit-invoice-number" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="edit-invoice-supplier" class="form-label">Supplier</label>
                    <select class="form-select" id="edit-invoice-supplier" required>
                      <option value="">Select Supplier</option>
                      <option value="ABC Supplies">ABC Supplies</option>
                      <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                      <option value="Tech Solutions">Tech Solutions</option>
                      <option value="Global Logistics">Global Logistics</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="edit-invoice-po-number" class="form-label">PO Number</label>
                    <input type="text" class="form-control" id="edit-invoice-po-number" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="edit-invoice-amount" class="form-label">Amount</label>
                    <input type="number" class="form-control" id="edit-invoice-amount" step="0.01" min="0" required>
                  </div>
                  <div class="col-md-6">
                    <label for="edit-invoice-payment-status" class="form-label">Payment Status</label>
                    <select class="form-select" id="edit-invoice-payment-status" required>
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="edit-invoice-approval-status" class="form-label">Approval Status</label>
                    <select class="form-select" id="edit-invoice-approval-status" required>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="update-purchase-invoice-report">Update Report</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Delete Confirmation Modal -->
      <div class="modal fade" id="deletePurchaseInvoiceReportModal" tabindex="-1" aria-labelledby="deletePurchaseInvoiceReportModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deletePurchaseInvoiceReportModalLabel">Confirm Delete</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this invoice report? This action cannot be undone.</p>
              <input type="hidden" id="delete-invoice-id">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="confirm-delete-invoice-report">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `
  
    return contentSection
  }
  
  // Function to render the purchase invoice reports table
  function renderPurchaseInvoiceReportsTable(reports) {
    const tableBody = document.getElementById("purchase-invoice-reports-table-body")
    if (!tableBody) return
  
    tableBody.innerHTML = ""
  
    if (reports.length === 0) {
      const row = document.createElement("tr")
      row.innerHTML = '<td colspan="8" class="text-center">No invoice reports found</td>'
      tableBody.appendChild(row)
      return
    }
  
    reports.forEach((report) => {
      const row = document.createElement("tr")
  
      // Set row color based on payment status
      if (report.paymentStatus === "Paid") {
        row.classList.add("table-success")
      } else if (report.paymentStatus === "Overdue") {
        row.classList.add("table-danger")
      }
  
      row.innerHTML = `
        <td>${report.invoiceNumber}</td>
        <td>${report.date}</td>
        <td>${report.supplier}</td>
        <td>${report.poNumber}</td>
        <td>₹${report.amount.toFixed(2)}</td>
        <td>
          <span class="badge ${getPaymentBadgeClass(report.paymentStatus)}">${report.paymentStatus}</span>
        </td>
        <td>
          <span class="badge ${getApprovalBadgeClass(report.approvalStatus)}">${report.approvalStatus}</span>
        </td>
        <td>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-sm btn-primary edit-invoice-report" data-id="${report.id}">
              <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="btn btn-sm btn-danger delete-invoice-report" data-id="${report.id}">
              <i class="fas fa-trash"></i>
            </button>
            ${
              report.approvalStatus === "Pending"
                ? `
              <button type="button" class="btn btn-sm btn-success approve-invoice-report" data-id="${report.id}">
                <i class="fas fa-check"></i>
              </button>
              <button type="button" class="btn btn-sm btn-warning reject-invoice-report" data-id="${report.id}">
                <i class="fas fa-times"></i>
              </button>
            `
                : ""
            }
          </div>
        </td>
      `
  
      tableBody.appendChild(row)
    })
  
    // Re-attach event listeners to the new buttons
    attachPurchaseInvoiceReportActionListeners()
  }
  
  // Function to get the appropriate badge class based on payment status
  function getPaymentBadgeClass(status) {
    switch (status) {
      case "Paid":
        return "bg-success"
      case "Overdue":
        return "bg-danger"
      default:
        return "bg-warning"
    }
  }
  
  // Function to get the appropriate badge class based on approval status
  function getApprovalBadgeClass(status) {
    switch (status) {
      case "Approved":
        return "bg-success"
      case "Rejected":
        return "bg-danger"
      default:
        return "bg-warning"
    }
  }
  
  // Function to initialize event listeners for the Purchase Invoice Reports section
  function initPurchaseInvoiceReportsEventListeners() {
    // Add new report
    document.getElementById("save-purchase-invoice-report").addEventListener("click", () => {
      try {
        const date = document.getElementById("invoice-date").value
        const invoiceNumber = document.getElementById("invoice-number").value
        const supplier = document.getElementById("invoice-supplier").value
        const poNumber = document.getElementById("invoice-po-number").value
        const amount = Number.parseFloat(document.getElementById("invoice-amount").value)
        const paymentStatus = document.getElementById("invoice-payment-status").value
    
        if (!date || !invoiceNumber || !supplier || !poNumber || isNaN(amount) || !paymentStatus) {
          alert("Please fill in all required fields")
          return
        }
    
        const newId = purchaseInvoiceReports.length > 0 ? Math.max(...purchaseInvoiceReports.map((r) => r.id)) + 1 : 1
    
        const newReport = {
          id: newId,
          date: date,
          invoiceNumber: invoiceNumber,
          supplier: supplier,
          poNumber: poNumber,
          amount: amount,
          paymentStatus: paymentStatus,
          approvalStatus: "Pending",
        }
    
        purchaseInvoiceReports.push(newReport)
        
        // Close the modal first before rendering the table
        const modalElement = document.getElementById("addPurchaseInvoiceReportModal")
        const bootstrap = window.bootstrap
        const modal = bootstrap.Modal.getInstance(modalElement)
        if (modal) {
          modal.hide()
        } else {
          // If modal instance doesn't exist, create it and then hide
          new bootstrap.Modal(modalElement).hide()
        }
        
        // Reset form
        document.getElementById("add-purchase-invoice-report-form").reset()
        
        // Then render the table
        setTimeout(() => {
          renderPurchaseInvoiceReportsTable(purchaseInvoiceReports)
        }, 100)
      } catch (error) {
        console.error("Error saving invoice report:", error)
        alert("An error occurred while saving the invoice report. Please try again.")
      }
    })
  
    // Update report
    document.getElementById("update-purchase-invoice-report").addEventListener("click", () => {
      try {
        const id = Number.parseInt(document.getElementById("edit-invoice-id").value)
        const date = document.getElementById("edit-invoice-date").value
        const invoiceNumber = document.getElementById("edit-invoice-number").value
        const supplier = document.getElementById("edit-invoice-supplier").value
        const poNumber = document.getElementById("edit-invoice-po-number").value
        const amount = Number.parseFloat(document.getElementById("edit-invoice-amount").value)
        const paymentStatus = document.getElementById("edit-invoice-payment-status").value
        const approvalStatus = document.getElementById("edit-invoice-approval-status").value
    
        if (!date || !invoiceNumber || !supplier || !poNumber || isNaN(amount) || !paymentStatus || !approvalStatus) {
          alert("Please fill in all required fields")
          return
        }
    
        const index = purchaseInvoiceReports.findIndex((r) => r.id === id)
        if (index !== -1) {
          purchaseInvoiceReports[index] = {
            id: id,
            date: date,
            invoiceNumber: invoiceNumber,
            supplier: supplier,
            poNumber: poNumber,
            amount: amount,
            paymentStatus: paymentStatus,
            approvalStatus: approvalStatus,
          }
    
          // Close the modal first before rendering the table
          const modalElement = document.getElementById("editPurchaseInvoiceReportModal")
          const bootstrap = window.bootstrap
          const modal = bootstrap.Modal.getInstance(modalElement)
          if (modal) {
            modal.hide()
          } else {
            // If modal instance doesn't exist, create it and then hide
            new bootstrap.Modal(modalElement).hide()
          }
          
          // Then render the table
          setTimeout(() => {
            renderPurchaseInvoiceReportsTable(purchaseInvoiceReports)
          }, 100)
        }
      } catch (error) {
        console.error("Error updating invoice report:", error)
        alert("An error occurred while updating the invoice report. Please try again.")
      }
    })
  
    // Delete report
    document.getElementById("confirm-delete-invoice-report").addEventListener("click", () => {
      try {
        const id = Number.parseInt(document.getElementById("delete-invoice-id").value)
    
        purchaseInvoiceReports = purchaseInvoiceReports.filter((r) => r.id !== id)
        
        // Close the modal first before rendering the table
        const modalElement = document.getElementById("deletePurchaseInvoiceReportModal")
        const bootstrap = window.bootstrap
        const modal = bootstrap.Modal.getInstance(modalElement)
        if (modal) {
          modal.hide()
        } else {
          // If modal instance doesn't exist, create it and then hide
          new bootstrap.Modal(modalElement).hide()
        }
        
        // Then render the table
        setTimeout(() => {
          renderPurchaseInvoiceReportsTable(purchaseInvoiceReports)
        }, 100)
      } catch (error) {
        console.error("Error deleting invoice report:", error)
        alert("An error occurred while deleting the invoice report. Please try again.")
      }
    })
  
    // Search functionality
    document.getElementById("purchase-invoice-reports-search-btn").addEventListener("click", () => {
      const searchTerm = document.getElementById("purchase-invoice-reports-search").value.toLowerCase()
  
      if (!searchTerm) {
        renderPurchaseInvoiceReportsTable(purchaseInvoiceReports)
        return
      }
  
      const filteredReports = purchaseInvoiceReports.filter(
        (report) =>
          report.supplier.toLowerCase().includes(searchTerm) ||
          report.invoiceNumber.toLowerCase().includes(searchTerm) ||
          report.poNumber.toLowerCase().includes(searchTerm) ||
          report.paymentStatus.toLowerCase().includes(searchTerm) ||
          report.approvalStatus.toLowerCase().includes(searchTerm) ||
          report.id.toString().includes(searchTerm),
      )
  
      renderPurchaseInvoiceReportsTable(filteredReports)
    })
  
    // Filter functionality
    document.getElementById("apply-invoice-reports-filters").addEventListener("click", () => {
      const dateFrom = document.getElementById("invoice-filter-date-from").value
      const dateTo = document.getElementById("invoice-filter-date-to").value
      const supplier = document.getElementById("invoice-filter-supplier").value
      const paymentStatus = document.getElementById("invoice-filter-payment-status").value
      const approvalStatus = document.getElementById("invoice-filter-approval-status").value
  
      let filteredReports = [...purchaseInvoiceReports]
  
      if (dateFrom) {
        filteredReports = filteredReports.filter((report) => report.date >= dateFrom)
      }
  
      if (dateTo) {
        filteredReports = filteredReports.filter((report) => report.date <= dateTo)
      }
  
      if (supplier) {
        filteredReports = filteredReports.filter((report) => report.supplier === supplier)
      }
  
      if (paymentStatus) {
        filteredReports = filteredReports.filter((report) => report.paymentStatus === paymentStatus)
      }
  
      if (approvalStatus) {
        filteredReports = filteredReports.filter((report) => report.approvalStatus === approvalStatus)
      }
  
      renderPurchaseInvoiceReportsTable(filteredReports)
    })
  
    // Reset filters
    document.getElementById("reset-invoice-reports-filters").addEventListener("click", () => {
      document.getElementById("invoice-filter-date-from").value = ""
      document.getElementById("invoice-filter-date-to").value = ""
      document.getElementById("invoice-filter-supplier").value = ""
      document.getElementById("invoice-filter-payment-status").value = ""
      document.getElementById("invoice-filter-approval-status").value = ""
  
      renderPurchaseInvoiceReportsTable(purchaseInvoiceReports)
    })
  }
  
  // Function to attach action listeners to table buttons
  function attachPurchaseInvoiceReportActionListeners() {
    // Edit buttons
    document.querySelectorAll(".edit-invoice-report").forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        const report = purchaseInvoiceReports.find((r) => r.id === id)
  
        if (report) {
          document.getElementById("edit-invoice-id").value = report.id
          document.getElementById("edit-invoice-date").value = report.date
          document.getElementById("edit-invoice-number").value = report.invoiceNumber
          document.getElementById("edit-invoice-supplier").value = report.supplier
          document.getElementById("edit-invoice-po-number").value = report.poNumber
          document.getElementById("edit-invoice-amount").value = report.amount
          document.getElementById("edit-invoice-payment-status").value = report.paymentStatus
          document.getElementById("edit-invoice-approval-status").value = report.approvalStatus
  
          const bootstrap = window.bootstrap
          const modal = new bootstrap.Modal(document.getElementById("editPurchaseInvoiceReportModal"))
          modal.show()
        }
      })
    })
  
    // Delete buttons
    document.querySelectorAll(".delete-invoice-report").forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        document.getElementById("delete-invoice-id").value = id
  
        const bootstrap = window.bootstrap
        const modal = new bootstrap.Modal(document.getElementById("deletePurchaseInvoiceReportModal"))
        modal.show()
      })
    })
  
    // Approve buttons
    document.querySelectorAll(".approve-invoice-report").forEach((button) => {
      button.addEventListener("click", function () {
        try {
          const id = Number.parseInt(this.getAttribute("data-id"))
          const index = purchaseInvoiceReports.findIndex((r) => r.id === id)
      
          if (index !== -1) {
            purchaseInvoiceReports[index].approvalStatus = "Approved"
            renderPurchaseInvoiceReportsTable(purchaseInvoiceReports)
          }
        } catch (error) {
          console.error("Error approving invoice report:", error)
          alert("An error occurred while approving the invoice report. Please try again.")
        }
      })
    })
  
    // Reject buttons
    document.querySelectorAll(".reject-invoice-report").forEach((button) => {
      button.addEventListener("click", function () {
        try {
          const id = Number.parseInt(this.getAttribute("data-id"))
          const index = purchaseInvoiceReports.findIndex((r) => r.id === id)
      
          if (index !== -1) {
            purchaseInvoiceReports[index].approvalStatus = "Rejected"
            renderPurchaseInvoiceReportsTable(purchaseInvoiceReports)
          }
        } catch (error) {
          console.error("Error rejecting invoice report:", error)
          alert("An error occurred while rejecting the invoice report. Please try again.")
        }
      })
    })
  }
  
  // Function to update sidebar active state
  function updateSidebarActiveState(contentType) {
    // Remove active class from all sidebar items
    document.querySelectorAll("#sidebar ul li").forEach((item) => {
      item.classList.remove("active")
    })
  
    // Add active class to the clicked item
    let activeLink
    if (contentType === "purchase-invoices-report") {
      activeLink =
        document.querySelector(`#sidebar a[href="#"][onclick*="purchase-invoices-report"]`) ||
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
  
