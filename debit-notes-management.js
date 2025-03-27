// Debit Notes Management JavaScript File
document.addEventListener("DOMContentLoaded", () => {
    // Add event listener for the Debit Notes Management menu item
    const debitNotesManagementLink = document.querySelector("a[onclick=\"loadContent('debit-notes')\"]")
    if (debitNotesManagementLink) {
      debitNotesManagementLink.removeAttribute("onclick")
      debitNotesManagementLink.addEventListener("click", (e) => {
        e.preventDefault()
        handleDebitNotesManagementClick()
      })
    }
  })
  
  // Sample data for debit notes
  let debitNotes = [
    {
      id: 1,
      date: "2024-12-18",
      supplier: "ABC Supplies",
      amount: 750.0,
      invoiceNumber: "INV-2024-001",
      debitNoteNumber: "DN-2024-001",
      reason: "Damaged goods",
      status: "Approved",
    },
    {
      id: 2,
      date: "2024-12-15",
      supplier: "XYZ Manufacturing",
      amount: 1200.0,
      invoiceNumber: "INV-2024-002",
      debitNoteNumber: "DN-2024-002",
      reason: "Incorrect pricing",
      status: "Pending",
    },
    {
      id: 3,
      date: "2024-12-10",
      supplier: "Global Logistics",
      amount: 500.0,
      invoiceNumber: "INV-2024-003",
      debitNoteNumber: "DN-2024-003",
      reason: "Returned items",
      status: "Rejected",
    },
  ]
  
  // Function to handle Debit Notes Management menu click
  function handleDebitNotesManagementClick() {
    // Hide all content sections first
    const allContentSections = document.querySelectorAll("#main-content > div")
    allContentSections.forEach((section) => {
      section.style.display = "none"
    })
  
    // Create or show the debit notes management content section
    let contentSection = document.getElementById("debit-notes-management-content")
  
    if (!contentSection) {
      contentSection = createDebitNotesManagementContent()
      document.getElementById("main-content").appendChild(contentSection)
      initDebitNotesManagementEventListeners()
      renderDebitNotesTable(debitNotes)
    } else {
      contentSection.style.display = "block"
    }
  
    // Update active state in sidebar
    updateSidebarActiveState("debit-notes-management")
  
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      document.getElementById("sidebar").classList.add("active")
      document.getElementById("content").classList.add("active")
    }
  }
  
  // Function to create debit notes management content section
  function createDebitNotesManagementContent() {
    const contentSection = document.createElement("div")
    contentSection.id = "debit-notes-management-content"
    contentSection.className = "container-fluid"
  
    contentSection.innerHTML = `
        <h2 class="mb-4">Debit Notes Management</h2>
        
        <div class="row mb-4">
          <div class="col-md-8">
            <div class="input-group">
              <input type="text" id="debit-notes-search" class="form-control" placeholder="Search debit notes...">
              <button class="btn btn-primary" type="button" id="debit-notes-search-btn">
                <i class="fas fa-search"></i> Search
              </button>
            </div>
          </div>
          <div class="col-md-4 text-end">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addDebitNoteModal">
              <i class="fas fa-plus"></i> Create New Debit Note
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
                    <label for="dn-filter-date-from" class="form-label">Date From</label>
                    <input type="date" class="form-control" id="dn-filter-date-from">
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="dn-filter-date-to" class="form-label">Date To</label>
                    <input type="date" class="form-control" id="dn-filter-date-to">
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="dn-filter-supplier" class="form-label">Supplier</label>
                    <select class="form-select" id="dn-filter-supplier">
                      <option value="">All Suppliers</option>
                      <option value="ABC Supplies">ABC Supplies</option>
                      <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                      <option value="Global Logistics">Global Logistics</option>
                      <option value="Tech Solutions">Tech Solutions</option>
                    </select>
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="dn-filter-status" class="form-label">Status</label>
                    <select class="form-select" id="dn-filter-status">
                      <option value="">All</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 text-end">
                    <button class="btn btn-primary" id="apply-dn-filters">Apply Filters</button>
                    <button class="btn btn-secondary" id="reset-dn-filters">Reset</button>
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
                <h5 class="card-title mb-0">Debit Notes</h5>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Debit Note #</th>
                        <th>Date</th>
                        <th>Supplier</th>
                        <th>Invoice #</th>
                        <th>Amount</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody id="debit-notes-table-body">
                      <!-- Table content will be loaded dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Add Debit Note Modal -->
        <div class="modal fade" id="addDebitNoteModal" tabindex="-1" aria-labelledby="addDebitNoteModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addDebitNoteModalLabel">Create New Debit Note</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="add-debit-note-form">
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="dn-date" class="form-label">Date</label>
                      <input type="date" class="form-control" id="dn-date" required>
                    </div>
                    <div class="col-md-6">
                      <label for="dn-number" class="form-label">Debit Note Number</label>
                      <input type="text" class="form-control" id="dn-number" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="dn-supplier" class="form-label">Supplier</label>
                      <select class="form-select" id="dn-supplier" required>
                        <option value="">Select Supplier</option>
                        <option value="ABC Supplies">ABC Supplies</option>
                        <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                        <option value="Global Logistics">Global Logistics</option>
                        <option value="Tech Solutions">Tech Solutions</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="dn-invoice" class="form-label">Invoice Number</label>
                      <input type="text" class="form-control" id="dn-invoice" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="dn-amount" class="form-label">Amount</label>
                      <input type="number" class="form-control" id="dn-amount" step="0.01" min="0" required>
                    </div>
                    <div class="col-md-6">
                      <label for="dn-status" class="form-label">Status</label>
                      <select class="form-select" id="dn-status" required>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="dn-reason" class="form-label">Reason</label>
                    <textarea class="form-control" id="dn-reason" rows="3" required></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="save-debit-note">Save Debit Note</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Edit Debit Note Modal -->
        <div class="modal fade" id="editDebitNoteModal" tabindex="-1" aria-labelledby="editDebitNoteModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editDebitNoteModalLabel">Edit Debit Note</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="edit-debit-note-form">
                  <input type="hidden" id="edit-dn-id">
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="edit-dn-date" class="form-label">Date</label>
                      <input type="date" class="form-control" id="edit-dn-date" required>
                    </div>
                    <div class="col-md-6">
                      <label for="edit-dn-number" class="form-label">Debit Note Number</label>
                      <input type="text" class="form-control" id="edit-dn-number" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="edit-dn-supplier" class="form-label">Supplier</label>
                      <select class="form-select" id="edit-dn-supplier" required>
                        <option value="">Select Supplier</option>
                        <option value="ABC Supplies">ABC Supplies</option>
                        <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                        <option value="Global Logistics">Global Logistics</option>
                        <option value="Tech Solutions">Tech Solutions</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="edit-dn-invoice" class="form-label">Invoice Number</label>
                      <input type="text" class="form-control" id="edit-dn-invoice" required>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="edit-dn-amount" class="form-label">Amount</label>
                      <input type="number" class="form-control" id="edit-dn-amount" step="0.01" min="0" required>
                    </div>
                    <div class="col-md-6">
                      <label for="edit-dn-status" class="form-label">Status</label>
                      <select class="form-select" id="edit-dn-status" required>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="edit-dn-reason" class="form-label">Reason</label>
                    <textarea class="form-control" id="edit-dn-reason" rows="3" required></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="update-debit-note">Update Debit Note</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- View Debit Note Modal -->
        <div class="modal fade" id="viewDebitNoteModal" tabindex="-1" aria-labelledby="viewDebitNoteModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="viewDebitNoteModalLabel">Debit Note Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" id="view-debit-note-details">
                <!-- Debit note details will be loaded dynamically -->
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Delete Confirmation Modal -->
        <div class="modal fade" id="deleteDebitNoteModal" tabindex="-1" aria-labelledby="deleteDebitNoteModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deleteDebitNoteModalLabel">Confirm Delete</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to delete this debit note? This action cannot be undone.</p>
                <input type="hidden" id="delete-dn-id">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" id="confirm-delete-dn">Delete</button>
              </div>
            </div>
          </div>
        </div>
      `
  
    return contentSection
  }
  
  // Function to render the debit notes table
  function renderDebitNotesTable(debitNotesData) {
    const tableBody = document.getElementById("debit-notes-table-body")
    if (!tableBody) return
  
    tableBody.innerHTML = ""
  
    if (debitNotesData.length === 0) {
      const row = document.createElement("tr")
      row.innerHTML = '<td colspan="8" class="text-center">No debit notes found</td>'
      tableBody.appendChild(row)
      return
    }
  
    debitNotesData.forEach((note) => {
      const row = document.createElement("tr")
  
      // Set row color based on status
      if (note.status === "Approved") {
        row.classList.add("table-success")
      } else if (note.status === "Rejected") {
        row.classList.add("table-danger")
      } else if (note.status === "Pending") {
        row.classList.add("table-warning")
      }
  
      row.innerHTML = `
          <td>${note.debitNoteNumber}</td>
          <td>${note.date}</td>
          <td>${note.supplier}</td>
          <td>${note.invoiceNumber}</td>
          <td>₹${note.amount.toFixed(2)}</td>
          <td>${note.reason}</td>
          <td>
            <span class="badge ${getDebitNoteStatusBadgeClass(note.status)}">${note.status}</span>
          </td>
          <td>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-sm btn-info view-debit-note" data-id="${note.id}">
                <i class="fas fa-eye"></i>
              </button>
              <button type="button" class="btn btn-sm btn-primary edit-debit-note" data-id="${note.id}">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="btn btn-sm btn-danger delete-debit-note" data-id="${note.id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        `
  
      tableBody.appendChild(row)
    })
  
    // Re-attach event listeners to the new buttons
    attachDebitNoteActionListeners()
  }
  
  // Function to get the appropriate badge class based on status
  function getDebitNoteStatusBadgeClass(status) {
    switch (status) {
      case "Approved":
        return "bg-success"
      case "Rejected":
        return "bg-danger"
      case "Pending":
        return "bg-warning"
      default:
        return "bg-secondary"
    }
  }
  
  // Function to initialize event listeners for the Debit Notes Management section
  function initDebitNotesManagementEventListeners() {
    // Add new debit note
    document.getElementById("save-debit-note").addEventListener("click", () => {
      try {
        const date = document.getElementById("dn-date").value
        const debitNoteNumber = document.getElementById("dn-number").value
        const supplier = document.getElementById("dn-supplier").value
        const invoiceNumber = document.getElementById("dn-invoice").value
        const amount = Number.parseFloat(document.getElementById("dn-amount").value)
        const status = document.getElementById("dn-status").value
        const reason = document.getElementById("dn-reason").value
  
        if (!date || !debitNoteNumber || !supplier || !invoiceNumber || isNaN(amount) || !status || !reason) {
          alert("Please fill in all required fields")
          return
        }
  
        const newId = debitNotes.length > 0 ? Math.max(...debitNotes.map((n) => n.id)) + 1 : 1
  
        const newDebitNote = {
          id: newId,
          date: date,
          debitNoteNumber: debitNoteNumber,
          supplier: supplier,
          invoiceNumber: invoiceNumber,
          amount: amount,
          status: status,
          reason: reason,
        }
  
        debitNotes.push(newDebitNote)
  
        // Close the modal first before rendering the table
        const modalElement = document.getElementById("addDebitNoteModal")
        const bootstrap = window.bootstrap
        const modal = bootstrap.Modal.getInstance(modalElement)
        if (modal) {
          modal.hide()
        } else {
          // If modal instance doesn't exist, create it and then hide
          new bootstrap.Modal(modalElement).hide()
        }
  
        // Reset form
        document.getElementById("add-debit-note-form").reset()
  
        // Then render the table
        setTimeout(() => {
          renderDebitNotesTable(debitNotes)
        }, 100)
      } catch (error) {
        console.error("Error saving debit note:", error)
        alert("An error occurred while saving the debit note. Please try again.")
      }
    })
  
    // Update debit note
    document.getElementById("update-debit-note").addEventListener("click", () => {
      try {
        const id = Number.parseInt(document.getElementById("edit-dn-id").value)
        const date = document.getElementById("edit-dn-date").value
        const debitNoteNumber = document.getElementById("edit-dn-number").value
        const supplier = document.getElementById("edit-dn-supplier").value
        const invoiceNumber = document.getElementById("edit-dn-invoice").value
        const amount = Number.parseFloat(document.getElementById("edit-dn-amount").value)
        const status = document.getElementById("edit-dn-status").value
        const reason = document.getElementById("edit-dn-reason").value
  
        if (!date || !debitNoteNumber || !supplier || !invoiceNumber || isNaN(amount) || !status || !reason) {
          alert("Please fill in all required fields")
          return
        }
  
        const index = debitNotes.findIndex((n) => n.id === id)
        if (index !== -1) {
          debitNotes[index] = {
            id: id,
            date: date,
            debitNoteNumber: debitNoteNumber,
            supplier: supplier,
            invoiceNumber: invoiceNumber,
            amount: amount,
            status: status,
            reason: reason,
          }
  
          // Close the modal first before rendering the table
          const modalElement = document.getElementById("editDebitNoteModal")
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
            renderDebitNotesTable(debitNotes)
          }, 100)
        }
      } catch (error) {
        console.error("Error updating debit note:", error)
        alert("An error occurred while updating the debit note. Please try again.")
      }
    })
  
    // Delete debit note
    document.getElementById("confirm-delete-dn").addEventListener("click", () => {
      try {
        const id = Number.parseInt(document.getElementById("delete-dn-id").value)
  
        debitNotes = debitNotes.filter((n) => n.id !== id)
  
        // Close the modal first before rendering the table
        const modalElement = document.getElementById("deleteDebitNoteModal")
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
          renderDebitNotesTable(debitNotes)
        }, 100)
      } catch (error) {
        console.error("Error deleting debit note:", error)
        alert("An error occurred while deleting the debit note. Please try again.")
      }
    })
  
    // Search functionality
    document.getElementById("debit-notes-search-btn").addEventListener("click", () => {
      const searchTerm = document.getElementById("debit-notes-search").value.toLowerCase()
  
      if (!searchTerm) {
        renderDebitNotesTable(debitNotes)
        return
      }
  
      const filteredNotes = debitNotes.filter(
        (note) =>
          note.supplier.toLowerCase().includes(searchTerm) ||
          note.debitNoteNumber.toLowerCase().includes(searchTerm) ||
          note.invoiceNumber.toLowerCase().includes(searchTerm) ||
          note.status.toLowerCase().includes(searchTerm) ||
          note.reason.toLowerCase().includes(searchTerm) ||
          note.id.toString().includes(searchTerm),
      )
  
      renderDebitNotesTable(filteredNotes)
    })
  
    // Filter functionality
    document.getElementById("apply-dn-filters").addEventListener("click", () => {
      const dateFrom = document.getElementById("dn-filter-date-from").value
      const dateTo = document.getElementById("dn-filter-date-to").value
      const supplier = document.getElementById("dn-filter-supplier").value
      const status = document.getElementById("dn-filter-status").value
  
      let filteredNotes = [...debitNotes]
  
      if (dateFrom) {
        filteredNotes = filteredNotes.filter((note) => note.date >= dateFrom)
      }
  
      if (dateTo) {
        filteredNotes = filteredNotes.filter((note) => note.date <= dateTo)
      }
  
      if (supplier) {
        filteredNotes = filteredNotes.filter((note) => note.supplier === supplier)
      }
  
      if (status) {
        filteredNotes = filteredNotes.filter((note) => note.status === status)
      }
  
      renderDebitNotesTable(filteredNotes)
    })
  
    // Reset filters
    document.getElementById("reset-dn-filters").addEventListener("click", () => {
      document.getElementById("dn-filter-date-from").value = ""
      document.getElementById("dn-filter-date-to").value = ""
      document.getElementById("dn-filter-supplier").value = ""
      document.getElementById("dn-filter-status").value = ""
  
      renderDebitNotesTable(debitNotes)
    })
  }
  
  // Function to attach action listeners to table buttons
  function attachDebitNoteActionListeners() {
    // View buttons
    document.querySelectorAll(".view-debit-note").forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        const note = debitNotes.find((n) => n.id === id)
  
        if (note) {
          const detailsContainer = document.getElementById("view-debit-note-details")
          detailsContainer.innerHTML = `
              <div class="row">
                <div class="col-md-6">
                  <p><strong>Debit Note Number:</strong> ${note.debitNoteNumber}</p>
                  <p><strong>Date:</strong> ${note.date}</p>
                  <p><strong>Supplier:</strong> ${note.supplier}</p>
                  <p><strong>Invoice Number:</strong> ${note.invoiceNumber}</p>
                </div>
                <div class="col-md-6">
                  <p><strong>Amount:</strong> ₹${note.amount.toFixed(2)}</p>
                  <p><strong>Status:</strong> <span class="badge ${getDebitNoteStatusBadgeClass(note.status)}">${note.status}</span></p>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <p><strong>Reason:</strong></p>
                  <p>${note.reason}</p>
                </div>
              </div>
            `
  
          const bootstrap = window.bootstrap
          const modal = new bootstrap.Modal(document.getElementById("viewDebitNoteModal"))
          modal.show()
        }
      })
    })
  
    // Edit buttons
    document.querySelectorAll(".edit-debit-note").forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        const note = debitNotes.find((n) => n.id === id)
  
        if (note) {
          document.getElementById("edit-dn-id").value = note.id
          document.getElementById("edit-dn-date").value = note.date
          document.getElementById("edit-dn-number").value = note.debitNoteNumber
          document.getElementById("edit-dn-supplier").value = note.supplier
          document.getElementById("edit-dn-invoice").value = note.invoiceNumber
          document.getElementById("edit-dn-amount").value = note.amount
          document.getElementById("edit-dn-status").value = note.status
          document.getElementById("edit-dn-reason").value = note.reason
  
          const bootstrap = window.bootstrap
          const modal = new bootstrap.Modal(document.getElementById("editDebitNoteModal"))
          modal.show()
        }
      })
    })
  
    // Delete buttons
    document.querySelectorAll(".delete-debit-note").forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        document.getElementById("delete-dn-id").value = id
  
        const bootstrap = window.bootstrap
        const modal = new bootstrap.Modal(document.getElementById("deleteDebitNoteModal"))
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
    if (contentType === "debit-notes-management") {
      activeLink =
        document.querySelector(`#sidebar a[href="#"][onclick*="debit-notes-management"]`) ||
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
  
  