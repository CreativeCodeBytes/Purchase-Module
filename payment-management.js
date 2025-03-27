// Payment Management JavaScript File
document.addEventListener("DOMContentLoaded", () => {
    // Add event listener for the Payment Management menu item
    const paymentManagementLink = document.querySelector("a[onclick=\"loadContent('payment-management')\"]")
    if (paymentManagementLink) {
      paymentManagementLink.removeAttribute("onclick")
      paymentManagementLink.addEventListener("click", (e) => {
        e.preventDefault()
        handlePaymentManagementClick()
      })
    }
  })
  
  // Sample data for payments
  let payments = [
    {
      id: 1,
      date: "2024-12-20",
      supplier: "ABC Supplies",
      amount: 5000.0,
      paymentMethod: "Bank Transfer",
      referenceNumber: "PAY-2024-001",
      status: "Completed",
      notes: "Monthly payment for office supplies",
    },
    {
      id: 2,
      date: "2024-12-15",
      supplier: "XYZ Manufacturing",
      amount: 12500.0,
      paymentMethod: "Credit Card",
      referenceNumber: "PAY-2024-002",
      status: "Pending",
      notes: "Payment for raw materials",
    },
    {
      id: 3,
      date: "2024-12-10",
      supplier: "Global Logistics",
      amount: 3750.0,
      paymentMethod: "Check",
      referenceNumber: "PAY-2024-003",
      status: "Failed",
      notes: "Payment for shipping services",
    },
  ]
  
  // Function to handle Payment Management menu click
  function handlePaymentManagementClick() {
    // Hide all content sections first
    const allContentSections = document.querySelectorAll("#main-content > div")
    allContentSections.forEach((section) => {
      section.style.display = "none"
    })
  
    // Create or show the payment management content section
    let contentSection = document.getElementById("payment-management-content")
  
    if (!contentSection) {
      contentSection = createPaymentManagementContent()
      document.getElementById("main-content").appendChild(contentSection)
      initPaymentManagementEventListeners()
      renderPaymentsTable(payments)
    } else {
      contentSection.style.display = "block"
    }
  
    // Update active state in sidebar
    updateSidebarActiveState("payment-management")
  
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      document.getElementById("sidebar").classList.add("active")
      document.getElementById("content").classList.add("active")
    }
  }
  
  // Function to create payment management content section
  function createPaymentManagementContent() {
    const contentSection = document.createElement("div")
    contentSection.id = "payment-management-content"
    contentSection.className = "container-fluid"
  
    contentSection.innerHTML = `
        <h2 class="mb-4">Payment Management</h2>
        
        <div class="row mb-4">
          <div class="col-md-8">
            <div class="input-group">
              <input type="text" id="payment-search" class="form-control" placeholder="Search payments...">
              <button class="btn btn-primary" type="button" id="payment-search-btn">
                <i class="fas fa-search"></i> Search
              </button>
            </div>
          </div>
          <div class="col-md-4 text-end">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addPaymentModal">
              <i class="fas fa-plus"></i> Add New Payment
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
                    <label for="filter-date-from" class="form-label">Date From</label>
                    <input type="date" class="form-control" id="filter-date-from">
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="filter-date-to" class="form-label">Date To</label>
                    <input type="date" class="form-control" id="filter-date-to">
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="filter-status" class="form-label">Status</label>
                    <select class="form-select" id="filter-status">
                      <option value="">All</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="filter-payment-method" class="form-label">Payment Method</label>
                    <select class="form-select" id="filter-payment-method">
                      <option value="">All</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Check">Check</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 text-end">
                    <button class="btn btn-primary" id="apply-payment-filters">Apply Filters</button>
                    <button class="btn btn-secondary" id="reset-payment-filters">Reset</button>
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
                <h5 class="card-title mb-0">Payment Transactions</h5>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Reference #</th>
                        <th>Date</th>
                        <th>Supplier</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody id="payments-table-body">
                      <!-- Table content will be loaded dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Add Payment Modal -->
        <div class="modal fade" id="addPaymentModal" tabindex="-1" aria-labelledby="addPaymentModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addPaymentModalLabel">Add New Payment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="add-payment-form">
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="payment-date" class="form-label">Date</label>
                      <input type="date" class="form-control" id="payment-date" required>
                    </div>
                    <div class="col-md-6">
                      <label for="payment-reference" class="form-label">Reference Number</label>
                      <input type="text" class="form-control" id="payment-reference" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="payment-supplier" class="form-label">Supplier</label>
                      <select class="form-select" id="payment-supplier" required>
                        <option value="">Select Supplier</option>
                        <option value="ABC Supplies">ABC Supplies</option>
                        <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                        <option value="Global Logistics">Global Logistics</option>
                        <option value="Tech Solutions">Tech Solutions</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="payment-amount" class="form-label">Amount</label>
                      <input type="number" class="form-control" id="payment-amount" step="0.01" min="0" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="payment-method" class="form-label">Payment Method</label>
                      <select class="form-select" id="payment-method" required>
                        <option value="">Select Payment Method</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Check">Check</option>
                        <option value="Cash">Cash</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="payment-status" class="form-label">Status</label>
                      <select class="form-select" id="payment-status" required>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="payment-notes" class="form-label">Notes</label>
                    <textarea class="form-control" id="payment-notes" rows="3"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="save-payment">Save Payment</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Edit Payment Modal -->
        <div class="modal fade" id="editPaymentModal" tabindex="-1" aria-labelledby="editPaymentModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editPaymentModalLabel">Edit Payment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="edit-payment-form">
                  <input type="hidden" id="edit-payment-id">
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="edit-payment-date" class="form-label">Date</label>
                      <input type="date" class="form-control" id="edit-payment-date" required>
                    </div>
                    <div class="col-md-6">
                      <label for="edit-payment-reference" class="form-label">Reference Number</label>
                      <input type="text" class="form-control" id="edit-payment-reference" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="edit-payment-supplier" class="form-label">Supplier</label>
                      <select class="form-select" id="edit-payment-supplier" required>
                        <option value="">Select Supplier</option>
                        <option value="ABC Supplies">ABC Supplies</option>
                        <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                        <option value="Global Logistics">Global Logistics</option>
                        <option value="Tech Solutions">Tech Solutions</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="edit-payment-amount" class="form-label">Amount</label>
                      <input type="number" class="form-control" id="edit-payment-amount" step="0.01" min="0" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="edit-payment-method" class="form-label">Payment Method</label>
                      <select class="form-select" id="edit-payment-method" required>
                        <option value="">Select Payment Method</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Check">Check</option>
                        <option value="Cash">Cash</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="edit-payment-status" class="form-label">Status</label>
                      <select class="form-select" id="edit-payment-status" required>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="edit-payment-notes" class="form-label">Notes</label>
                    <textarea class="form-control" id="edit-payment-notes" rows="3"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="update-payment">Update Payment</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- View Payment Modal -->
        <div class="modal fade" id="viewPaymentModal" tabindex="-1" aria-labelledby="viewPaymentModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="viewPaymentModalLabel">Payment Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" id="view-payment-details">
                <!-- Payment details will be loaded dynamically -->
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Delete Confirmation Modal -->
        <div class="modal fade" id="deletePaymentModal" tabindex="-1" aria-labelledby="deletePaymentModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deletePaymentModalLabel">Confirm Delete</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to delete this payment? This action cannot be undone.</p>
                <input type="hidden" id="delete-payment-id">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" id="confirm-delete-payment">Delete</button>
              </div>
            </div>
          </div>
        </div>
      `
  
    return contentSection
  }
  
  // Function to render the payments table
  function renderPaymentsTable(paymentsData) {
    const tableBody = document.getElementById("payments-table-body")
    if (!tableBody) return
  
    tableBody.innerHTML = ""
  
    if (paymentsData.length === 0) {
      const row = document.createElement("tr")
      row.innerHTML = '<td colspan="7" class="text-center">No payments found</td>'
      tableBody.appendChild(row)
      return
    }
  
    paymentsData.forEach((payment) => {
      const row = document.createElement("tr")
  
      // Set row color based on status
      if (payment.status === "Completed") {
        row.classList.add("table-success")
      } else if (payment.status === "Failed") {
        row.classList.add("table-danger")
      } else if (payment.status === "Pending") {
        row.classList.add("table-warning")
      }
  
      row.innerHTML = `
          <td>${payment.referenceNumber}</td>
          <td>${payment.date}</td>
          <td>${payment.supplier}</td>
          <td>₹${payment.amount.toFixed(2)}</td>
          <td>${payment.paymentMethod}</td>
          <td>
            <span class="badge ${getStatusBadgeClass(payment.status)}">${payment.status}</span>
          </td>
          <td>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-sm btn-info view-payment" data-id="${payment.id}">
                <i class="fas fa-eye"></i>
              </button>
              <button type="button" class="btn btn-sm btn-primary edit-payment" data-id="${payment.id}">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="btn btn-sm btn-danger delete-payment" data-id="${payment.id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        `
  
      tableBody.appendChild(row)
    })
  
    // Re-attach event listeners to the new buttons
    attachPaymentActionListeners()
  }
  
  // Function to get the appropriate badge class based on status
  function getStatusBadgeClass(status) {
    switch (status) {
      case "Completed":
        return "bg-success"
      case "Failed":
        return "bg-danger"
      case "Pending":
        return "bg-warning"
      default:
        return "bg-secondary"
    }
  }
  
  // Function to initialize event listeners for the Payment Management section
  function initPaymentManagementEventListeners() {
    // Add new payment
    document.getElementById("save-payment").addEventListener("click", () => {
      try {
        const date = document.getElementById("payment-date").value
        const referenceNumber = document.getElementById("payment-reference").value
        const supplier = document.getElementById("payment-supplier").value
        const amount = Number.parseFloat(document.getElementById("payment-amount").value)
        const paymentMethod = document.getElementById("payment-method").value
        const status = document.getElementById("payment-status").value
        const notes = document.getElementById("payment-notes").value
  
        if (!date || !referenceNumber || !supplier || isNaN(amount) || !paymentMethod || !status) {
          alert("Please fill in all required fields")
          return
        }
  
        const newId = payments.length > 0 ? Math.max(...payments.map((p) => p.id)) + 1 : 1
  
        const newPayment = {
          id: newId,
          date: date,
          referenceNumber: referenceNumber,
          supplier: supplier,
          amount: amount,
          paymentMethod: paymentMethod,
          status: status,
          notes: notes,
        }
  
        payments.push(newPayment)
  
        // Close the modal first before rendering the table
        const modalElement = document.getElementById("addPaymentModal")
        const bootstrap = window.bootstrap
        const modal = bootstrap.Modal.getInstance(modalElement)
        if (modal) {
          modal.hide()
        } else {
          // If modal instance doesn't exist, create it and then hide
          new bootstrap.Modal(modalElement).hide()
        }
  
        // Reset form
        document.getElementById("add-payment-form").reset()
  
        // Then render the table
        setTimeout(() => {
          renderPaymentsTable(payments)
        }, 100)
      } catch (error) {
        console.error("Error saving payment:", error)
        alert("An error occurred while saving the payment. Please try again.")
      }
    })
  
    // Update payment
    document.getElementById("update-payment").addEventListener("click", () => {
      try {
        const id = Number.parseInt(document.getElementById("edit-payment-id").value)
        const date = document.getElementById("edit-payment-date").value
        const referenceNumber = document.getElementById("edit-payment-reference").value
        const supplier = document.getElementById("edit-payment-supplier").value
        const amount = Number.parseFloat(document.getElementById("edit-payment-amount").value)
        const paymentMethod = document.getElementById("edit-payment-method").value
        const status = document.getElementById("edit-payment-status").value
        const notes = document.getElementById("edit-payment-notes").value
  
        if (!date || !referenceNumber || !supplier || isNaN(amount) || !paymentMethod || !status) {
          alert("Please fill in all required fields")
          return
        }
  
        const index = payments.findIndex((p) => p.id === id)
        if (index !== -1) {
          payments[index] = {
            id: id,
            date: date,
            referenceNumber: referenceNumber,
            supplier: supplier,
            amount: amount,
            paymentMethod: paymentMethod,
            status: status,
            notes: notes,
          }
  
          // Close the modal first before rendering the table
          const modalElement = document.getElementById("editPaymentModal")
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
            renderPaymentsTable(payments)
          }, 100)
        }
      } catch (error) {
        console.error("Error updating payment:", error)
        alert("An error occurred while updating the payment. Please try again.")
      }
    })
  
    // Delete payment
    document.getElementById("confirm-delete-payment").addEventListener("click", () => {
      try {
        const id = Number.parseInt(document.getElementById("delete-payment-id").value)
  
        payments = payments.filter((p) => p.id !== id)
  
        // Close the modal first before rendering the table
        const modalElement = document.getElementById("deletePaymentModal")
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
          renderPaymentsTable(payments)
        }, 100)
      } catch (error) {
        console.error("Error deleting payment:", error)
        alert("An error occurred while deleting the payment. Please try again.")
      }
    })
  
    // Search functionality
    document.getElementById("payment-search-btn").addEventListener("click", () => {
      const searchTerm = document.getElementById("payment-search").value.toLowerCase()
  
      if (!searchTerm) {
        renderPaymentsTable(payments)
        return
      }
  
      const filteredPayments = payments.filter(
        (payment) =>
          payment.supplier.toLowerCase().includes(searchTerm) ||
          payment.paymentMethod.toLowerCase().includes(searchTerm) ||
          payment.status.toLowerCase().includes(searchTerm) ||
          payment.referenceNumber.toLowerCase().includes(searchTerm) ||
          payment.notes.toLowerCase().includes(searchTerm) ||
          payment.id.toString().includes(searchTerm),
      )
  
      renderPaymentsTable(filteredPayments)
    })
  
    // Filter functionality
    document.getElementById("apply-payment-filters").addEventListener("click", () => {
      const dateFrom = document.getElementById("filter-date-from").value
      const dateTo = document.getElementById("filter-date-to").value
      const status = document.getElementById("filter-status").value
      const paymentMethod = document.getElementById("filter-payment-method").value
  
      let filteredPayments = [...payments]
  
      if (dateFrom) {
        filteredPayments = filteredPayments.filter((payment) => payment.date >= dateFrom)
      }
  
      if (dateTo) {
        filteredPayments = filteredPayments.filter((payment) => payment.date <= dateTo)
      }
  
      if (status) {
        filteredPayments = filteredPayments.filter((payment) => payment.status === status)
      }
  
      if (paymentMethod) {
        filteredPayments = filteredPayments.filter((payment) => payment.paymentMethod === paymentMethod)
      }
  
      renderPaymentsTable(filteredPayments)
    })
  
    // Reset filters
    document.getElementById("reset-payment-filters").addEventListener("click", () => {
      document.getElementById("filter-date-from").value = ""
      document.getElementById("filter-date-to").value = ""
      document.getElementById("filter-status").value = ""
      document.getElementById("filter-payment-method").value = ""
  
      renderPaymentsTable(payments)
    })
  }
  
  // Function to attach action listeners to table buttons
  function attachPaymentActionListeners() {
    // View buttons
    document.querySelectorAll(".view-payment").forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        const payment = payments.find((p) => p.id === id)
  
        if (payment) {
          const detailsContainer = document.getElementById("view-payment-details")
          detailsContainer.innerHTML = `
              <div class="row">
                <div class="col-md-6">
                  <p><strong>Reference Number:</strong> ${payment.referenceNumber}</p>
                  <p><strong>Date:</strong> ${payment.date}</p>
                  <p><strong>Supplier:</strong> ${payment.supplier}</p>
                  <p><strong>Amount:</strong> ₹${payment.amount.toFixed(2)}</p>
                </div>
                <div class="col-md-6">
                  <p><strong>Payment Method:</strong> ${payment.paymentMethod}</p>
                  <p><strong>Status:</strong> <span class="badge ${getStatusBadgeClass(payment.status)}">${payment.status}</span></p>
                  <p><strong>Notes:</strong> ${payment.notes || "No notes available"}</p>
                </div>
              </div>
            `
  
          const bootstrap = window.bootstrap
          const modal = new bootstrap.Modal(document.getElementById("viewPaymentModal"))
          modal.show()
        }
      })
    })
  
    // Edit buttons
    document.querySelectorAll(".edit-payment").forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        const payment = payments.find((p) => p.id === id)
  
        if (payment) {
          document.getElementById("edit-payment-id").value = payment.id
          document.getElementById("edit-payment-date").value = payment.date
          document.getElementById("edit-payment-reference").value = payment.referenceNumber
          document.getElementById("edit-payment-supplier").value = payment.supplier
          document.getElementById("edit-payment-amount").value = payment.amount
          document.getElementById("edit-payment-method").value = payment.paymentMethod
          document.getElementById("edit-payment-status").value = payment.status
          document.getElementById("edit-payment-notes").value = payment.notes || ""
  
          const bootstrap = window.bootstrap
          const modal = new bootstrap.Modal(document.getElementById("editPaymentModal"))
          modal.show()
        }
      })
    })
  
    // Delete buttons
    document.querySelectorAll(".delete-payment").forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        document.getElementById("delete-payment-id").value = id
  
        const bootstrap = window.bootstrap
        const modal = new bootstrap.Modal(document.getElementById("deletePaymentModal"))
        modal.show()
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
    if (contentType === "payment-management") {
      activeLink =
        document.querySelector(`#sidebar a[href="#"][onclick*="payment-management"]`) ||
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
  
  