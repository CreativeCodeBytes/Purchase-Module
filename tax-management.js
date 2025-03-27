// Tax Management JavaScript File
document.addEventListener("DOMContentLoaded", () => {
    // Add event listener for the Tax Management menu item
    const taxManagementLink = document.querySelector("a[onclick=\"loadContent('tax-management')\"]")
    if (taxManagementLink) {
      taxManagementLink.removeAttribute("onclick")
      taxManagementLink.addEventListener("click", (e) => {
        e.preventDefault()
        handleTaxManagementClick()
      })
    }
  })
  
  // Sample data for tax records
  let taxRecords = [
    {
      id: 1,
      date: "2024-12-20",
      taxType: "VAT",
      amount: 2500.0,
      period: "Q4 2024",
      referenceNumber: "TAX-2024-001",
      status: "Paid",
      notes: "Quarterly VAT payment",
    },
    {
      id: 2,
      date: "2024-12-15",
      taxType: "Income Tax",
      amount: 5000.0,
      period: "Annual 2024",
      referenceNumber: "TAX-2024-002",
      status: "Pending",
      notes: "Annual income tax payment",
    },
    {
      id: 3,
      date: "2024-12-10",
      taxType: "Sales Tax",
      amount: 1800.0,
      period: "Q4 2024",
      referenceNumber: "TAX-2024-003",
      status: "Overdue",
      notes: "Quarterly sales tax payment",
    },
  ]
  
  // Function to handle Tax Management menu click
  function handleTaxManagementClick() {
    // Hide all content sections first
    const allContentSections = document.querySelectorAll("#main-content > div")
    allContentSections.forEach((section) => {
      section.style.display = "none"
    })
  
    // Create or show the tax management content section
    let contentSection = document.getElementById("tax-management-content")
  
    if (!contentSection) {
      contentSection = createTaxManagementContent()
      document.getElementById("main-content").appendChild(contentSection)
      initTaxManagementEventListeners()
      renderTaxRecordsTable(taxRecords)
    } else {
      contentSection.style.display = "block"
    }
  
    // Update active state in sidebar
    updateSidebarActiveState("tax-management")
  
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      document.getElementById("sidebar").classList.add("active")
      document.getElementById("content").classList.add("active")
    }
  }
  
  // Function to create tax management content section
  function createTaxManagementContent() {
    const contentSection = document.createElement("div")
    contentSection.id = "tax-management-content"
    contentSection.className = "container-fluid"
  
    contentSection.innerHTML = `
        <h2 class="mb-4">Tax Management</h2>
        
        <div class="row mb-4">
          <div class="col-md-8">
            <div class="input-group">
              <input type="text" id="tax-search" class="form-control" placeholder="Search tax records...">
              <button class="btn btn-primary" type="button" id="tax-search-btn">
                <i class="fas fa-search"></i> Search
              </button>
            </div>
          </div>
          <div class="col-md-4 text-end">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addTaxRecordModal">
              <i class="fas fa-plus"></i> Add New Tax Record
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
                    <label for="tax-filter-date-from" class="form-label">Date From</label>
                    <input type="date" class="form-control" id="tax-filter-date-from">
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="tax-filter-date-to" class="form-label">Date To</label>
                    <input type="date" class="form-control" id="tax-filter-date-to">
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="tax-filter-type" class="form-label">Tax Type</label>
                    <select class="form-select" id="tax-filter-type">
                      <option value="">All Types</option>
                      <option value="VAT">VAT</option>
                      <option value="Income Tax">Income Tax</option>
                      <option value="Sales Tax">Sales Tax</option>
                      <option value="Property Tax">Property Tax</option>
                    </select>
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="tax-filter-status" class="form-label">Status</label>
                    <select class="form-select" id="tax-filter-status">
                      <option value="">All</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 text-end">
                    <button class="btn btn-primary" id="apply-tax-filters">Apply Filters</button>
                    <button class="btn btn-secondary" id="reset-tax-filters">Reset</button>
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
                <h5 class="card-title mb-0">Tax Records</h5>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Reference #</th>
                        <th>Date</th>
                        <th>Tax Type</th>
                        <th>Period</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody id="tax-records-table-body">
                      <!-- Table content will be loaded dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Add Tax Record Modal -->
        <div class="modal fade" id="addTaxRecordModal" tabindex="-1" aria-labelledby="addTaxRecordModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addTaxRecordModalLabel">Add New Tax Record</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="add-tax-record-form">
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="tax-date" class="form-label">Date</label>
                      <input type="date" class="form-control" id="tax-date" required>
                    </div>
                    <div class="col-md-6">
                      <label for="tax-reference" class="form-label">Reference Number</label>
                      <input type="text" class="form-control" id="tax-reference" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="tax-type" class="form-label">Tax Type</label>
                      <select class="form-select" id="tax-type" required>
                        <option value="">Select Tax Type</option>
                        <option value="VAT">VAT</option>
                        <option value="Income Tax">Income Tax</option>
                        <option value="Sales Tax">Sales Tax</option>
                        <option value="Property Tax">Property Tax</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="tax-period" class="form-label">Period</label>
                      <input type="text" class="form-control" id="tax-period" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="tax-amount" class="form-label">Amount</label>
                      <input type="number" class="form-control" id="tax-amount" step="0.01" min="0" required>
                    </div>
                    <div class="col-md-6">
                      <label for="tax-status" class="form-label">Status</label>
                      <select class="form-select" id="tax-status" required>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="tax-notes" class="form-label">Notes</label>
                    <textarea class="form-control" id="tax-notes" rows="3"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="save-tax-record">Save Record</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Edit Tax Record Modal -->
        <div class="modal fade" id="editTaxRecordModal" tabindex="-1" aria-labelledby="editTaxRecordModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editTaxRecordModalLabel">Edit Tax Record</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="edit-tax-record-form">
                  <input type="hidden" id="edit-tax-id">
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="edit-tax-date" class="form-label">Date</label>
                      <input type="date" class="form-control" id="edit-tax-date" required>
                    </div>
                    <div class="col-md-6">
                      <label for="edit-tax-reference" class="form-label">Reference Number</label>
                      <input type="text" class="form-control" id="edit-tax-reference" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="edit-tax-type" class="form-label">Tax Type</label>
                      <select class="form-select" id="edit-tax-type" required>
                        <option value="">Select Tax Type</option>
                        <option value="VAT">VAT</option>
                        <option value="Income Tax">Income Tax</option>
                        <option value="Sales Tax">Sales Tax</option>
                        <option value="Property Tax">Property Tax</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="edit-tax-period" class="form-label">Period</label>
                      <input type="text" class="form-control" id="edit-tax-period" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="edit-tax-amount" class="form-label">Amount</label>
                      <input type="number" class="form-control" id="edit-tax-amount" step="0.01" min="0" required>
                    </div>
                    <div class="col-md-6">
                      <label for="edit-tax-status" class="form-label">Status</label>
                      <select class="form-select" id="edit-tax-status" required>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="edit-tax-notes" class="form-label">Notes</label>
                    <textarea class="form-control" id="edit-tax-notes" rows="3"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="update-tax-record">Update Record</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- View Tax Record Modal -->
        <div class="modal fade" id="viewTaxRecordModal" tabindex="-1" aria-labelledby="viewTaxRecordModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="viewTaxRecordModalLabel">Tax Record Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" id="view-tax-record-details">
                <!-- Tax record details will be loaded dynamically -->
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Delete Confirmation Modal -->
        <div class="modal fade" id="deleteTaxRecordModal" tabindex="-1" aria-labelledby="deleteTaxRecordModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deleteTaxRecordModalLabel">Confirm Delete</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to delete this tax record? This action cannot be undone.</p>
                <input type="hidden" id="delete-tax-id">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" id="confirm-delete-tax">Delete</button>
              </div>
            </div>
          </div>
        </div>
      `
  
    return contentSection
  }
  
  // Function to render the tax records table
  function renderTaxRecordsTable(taxRecordsData) {
    const tableBody = document.getElementById("tax-records-table-body")
    if (!tableBody) return
  
    tableBody.innerHTML = ""
  
    if (taxRecordsData.length === 0) {
      const row = document.createElement("tr")
      row.innerHTML = '<td colspan="7" class="text-center">No tax records found</td>'
      tableBody.appendChild(row)
      return
    }
  
    taxRecordsData.forEach((record) => {
      const row = document.createElement("tr")
  
      // Set row color based on status
      if (record.status === "Paid") {
        row.classList.add("table-success")
      } else if (record.status === "Overdue") {
        row.classList.add("table-danger")
      } else if (record.status === "Pending") {
        row.classList.add("table-warning")
      }
  
      row.innerHTML = `
          <td>${record.referenceNumber}</td>
          <td>${record.date}</td>
          <td>${record.taxType}</td>
          <td>${record.period}</td>
          <td>₹${record.amount.toFixed(2)}</td>
          <td>
            <span class="badge ${getTaxStatusBadgeClass(record.status)}">${record.status}</span>
          </td>
          <td>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-sm btn-info view-tax-record" data-id="${record.id}">
                <i class="fas fa-eye"></i>
              </button>
              <button type="button" class="btn btn-sm btn-primary edit-tax-record" data-id="${record.id}">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="btn btn-sm btn-danger delete-tax-record" data-id="${record.id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        `
  
      tableBody.appendChild(row)
    })
  
    // Re-attach event listeners to the new buttons
    attachTaxRecordActionListeners()
  }
  
  // Function to get the appropriate badge class based on status
  function getTaxStatusBadgeClass(status) {
    switch (status) {
      case "Paid":
        return "bg-success"
      case "Overdue":
        return "bg-danger"
      case "Pending":
        return "bg-warning"
      default:
        return "bg-secondary"
    }
  }
  
  // Function to initialize event listeners for the Tax Management section
  function initTaxManagementEventListeners() {
    // Add new tax record
    document.getElementById("save-tax-record").addEventListener("click", () => {
      try {
        const date = document.getElementById("tax-date").value
        const referenceNumber = document.getElementById("tax-reference").value
        const taxType = document.getElementById("tax-type").value
        const period = document.getElementById("tax-period").value
        const amount = Number.parseFloat(document.getElementById("tax-amount").value)
        const status = document.getElementById("tax-status").value
        const notes = document.getElementById("tax-notes").value
  
        if (!date || !referenceNumber || !taxType || !period || isNaN(amount) || !status) {
          alert("Please fill in all required fields")
          return
        }
  
        const newId = taxRecords.length > 0 ? Math.max(...taxRecords.map((r) => r.id)) + 1 : 1
  
        const newTaxRecord = {
          id: newId,
          date: date,
          referenceNumber: referenceNumber,
          taxType: taxType,
          period: period,
          amount: amount,
          status: status,
          notes: notes,
        }
  
        taxRecords.push(newTaxRecord)
  
        // Close the modal first before rendering the table
        const modalElement = document.getElementById("addTaxRecordModal")
        const bootstrap = window.bootstrap
        const modal = bootstrap.Modal.getInstance(modalElement)
        if (modal) {
          modal.hide()
        } else {
          // If modal instance doesn't exist, create it and then hide
          new bootstrap.Modal(modalElement).hide()
        }
  
        // Reset form
        document.getElementById("add-tax-record-form").reset()
  
        // Then render the table
        setTimeout(() => {
          renderTaxRecordsTable(taxRecords)
        }, 100)
      } catch (error) {
        console.error("Error saving tax record:", error)
        alert("An error occurred while saving the tax record. Please try again.")
      }
    })
  
    // Update tax record
    document.getElementById("update-tax-record").addEventListener("click", () => {
      try {
        const id = Number.parseInt(document.getElementById("edit-tax-id").value)
        const date = document.getElementById("edit-tax-date").value
        const referenceNumber = document.getElementById("edit-tax-reference").value
        const taxType = document.getElementById("edit-tax-type").value
        const period = document.getElementById("edit-tax-period").value
        const amount = Number.parseFloat(document.getElementById("edit-tax-amount").value)
        const status = document.getElementById("edit-tax-status").value
        const notes = document.getElementById("edit-tax-notes").value
  
        if (!date || !referenceNumber || !taxType || !period || isNaN(amount) || !status) {
          alert("Please fill in all required fields")
          return
        }
  
        const index = taxRecords.findIndex((r) => r.id === id)
        if (index !== -1) {
          taxRecords[index] = {
            id: id,
            date: date,
            referenceNumber: referenceNumber,
            taxType: taxType,
            period: period,
            amount: amount,
            status: status,
            notes: notes,
          }
  
          // Close the modal first before rendering the table
          const modalElement = document.getElementById("editTaxRecordModal")
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
            renderTaxRecordsTable(taxRecords)
          }, 100)
        }
      } catch (error) {
        console.error("Error updating tax record:", error)
        alert("An error occurred while updating the tax record. Please try again.")
      }
    })
  
    // Delete tax record
    document.getElementById("confirm-delete-tax").addEventListener("click", () => {
      try {
        const id = Number.parseInt(document.getElementById("delete-tax-id").value)
  
        taxRecords = taxRecords.filter((r) => r.id !== id)
  
        // Close the modal first before rendering the table
        const modalElement = document.getElementById("deleteTaxRecordModal")
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
          renderTaxRecordsTable(taxRecords)
        }, 100)
      } catch (error) {
        console.error("Error deleting tax record:", error)
        alert("An error occurred while deleting the tax record. Please try again.")
      }
    })
  
    // Search functionality
    document.getElementById("tax-search-btn").addEventListener("click", () => {
      const searchTerm = document.getElementById("tax-search").value.toLowerCase()
  
      if (!searchTerm) {
        renderTaxRecordsTable(taxRecords)
        return
      }
  
      const filteredRecords = taxRecords.filter(
        (record) =>
          record.taxType.toLowerCase().includes(searchTerm) ||
          record.period.toLowerCase().includes(searchTerm) ||
          record.status.toLowerCase().includes(searchTerm) ||
          record.referenceNumber.toLowerCase().includes(searchTerm) ||
          record.notes.toLowerCase().includes(searchTerm) ||
          record.id.toString().includes(searchTerm),
      )
  
      renderTaxRecordsTable(filteredRecords)
    })
  
    // Filter functionality
    document.getElementById("apply-tax-filters").addEventListener("click", () => {
      const dateFrom = document.getElementById("tax-filter-date-from").value
      const dateTo = document.getElementById("tax-filter-date-to").value
      const taxType = document.getElementById("tax-filter-type").value
      const status = document.getElementById("tax-filter-status").value
  
      let filteredRecords = [...taxRecords]
  
      if (dateFrom) {
        filteredRecords = filteredRecords.filter((record) => record.date >= dateFrom)
      }
  
      if (dateTo) {
        filteredRecords = filteredRecords.filter((record) => record.date <= dateTo)
      }
  
      if (taxType) {
        filteredRecords = filteredRecords.filter((record) => record.taxType === taxType)
      }
  
      if (status) {
        filteredRecords = filteredRecords.filter((record) => record.status === status)
      }
  
      renderTaxRecordsTable(filteredRecords)
    })
  
    // Reset filters
    document.getElementById("reset-tax-filters").addEventListener("click", () => {
      document.getElementById("tax-filter-date-from").value = ""
      document.getElementById("tax-filter-date-to").value = ""
      document.getElementById("tax-filter-type").value = ""
      document.getElementById("tax-filter-status").value = ""
  
      renderTaxRecordsTable(taxRecords)
    })
  }
  
  // Function to attach action listeners to table buttons
  function attachTaxRecordActionListeners() {
    // View buttons
    document.querySelectorAll(".view-tax-record").forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        const record = taxRecords.find((r) => r.id === id)
  
        if (record) {
          const detailsContainer = document.getElementById("view-tax-record-details")
          detailsContainer.innerHTML = `
              <div class="row">
                <div class="col-md-6">
                  <p><strong>Reference Number:</strong> ${record.referenceNumber}</p>
                  <p><strong>Date:</strong> ${record.date}</p>
                  <p><strong>Tax Type:</strong> ${record.taxType}</p>
                  <p><strong>Period:</strong> ${record.period}</p>
                </div>
                <div class="col-md-6">
                  <p><strong>Amount:</strong> ₹${record.amount.toFixed(2)}</p>
                  <p><strong>Status:</strong> <span class="badge ${getTaxStatusBadgeClass(record.status)}">${record.status}</span></p>
                  <p><strong>Notes:</strong> ${record.notes || "No notes available"}</p>
                </div>
              </div>
            `
  
          const bootstrap = window.bootstrap
          const modal = new bootstrap.Modal(document.getElementById("viewTaxRecordModal"))
          modal.show()
        }
      })
    })
  
    // Edit buttons
    document.querySelectorAll(".edit-tax-record").forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        const record = taxRecords.find((r) => r.id === id)
  
        if (record) {
          document.getElementById("edit-tax-id").value = record.id
          document.getElementById("edit-tax-date").value = record.date
          document.getElementById("edit-tax-reference").value = record.referenceNumber
          document.getElementById("edit-tax-type").value = record.taxType
          document.getElementById("edit-tax-period").value = record.period
          document.getElementById("edit-tax-amount").value = record.amount
          document.getElementById("edit-tax-status").value = record.status
          document.getElementById("edit-tax-notes").value = record.notes || ""
  
          const bootstrap = window.bootstrap
          const modal = new bootstrap.Modal(document.getElementById("editTaxRecordModal"))
          modal.show()
        }
      })
    })
  
    // Delete buttons
    document.querySelectorAll(".delete-tax-record").forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        document.getElementById("delete-tax-id").value = id
  
        const bootstrap = window.bootstrap
        const modal = new bootstrap.Modal(document.getElementById("deleteTaxRecordModal"))
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
    if (contentType === "tax-management") {
      activeLink =
        document.querySelector(`#sidebar a[href="#"][onclick*="tax-management"]`) ||
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
  
  