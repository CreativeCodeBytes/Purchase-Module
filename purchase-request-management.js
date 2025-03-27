// Purchase Request Management JavaScript

// Sample data for purchase requests
let purchaseRequests = [
    {
      id: "PR-2024-1001",
      requestedBy: "Shankar Jashav",
      department: "IT",
      requestDate: "2024-03-10",
      items: 3,
      description: "New laptops for development team",
      status: "Pending Approval",
    },
    {
      id: "PR-2024-1002",
      requestedBy: "Vijay Sharma",
      department: "Marketing",
      requestDate: "2024-03-12",
      items: 5,
      description: "Office supplies for marketing campaign",
      status: "Approved",
    },
    {
      id: "PR-2024-1003",
      requestedBy: "Raj Patil",
      department: "Finance",
      requestDate: "2024-03-15",
      items: 2,
      description: "Financial software licenses",
      status: "Rejected",
    },
  ]
  
  // Initialize when the document is loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Add event listener to the Purchase Request Management link
    const purchaseRequestLink = document.querySelector("a[onclick=\"loadContent('purchase-request')\"]")
    if (purchaseRequestLink) {
      purchaseRequestLink.removeAttribute("onclick")
      purchaseRequestLink.addEventListener("click", (e) => {
        e.preventDefault()
        openPurchaseRequestManagement()
      })
    }
  })
  
  // Function to open Purchase Request Management
  function openPurchaseRequestManagement() {
    // Hide all content sections first
    hideAllContentSections()
  
    // Create or show the purchase request management content section
    let contentSection = document.getElementById("purchase-request-content")
  
    if (!contentSection) {
      contentSection = createPurchaseRequestContent()
      document.getElementById("main-content").appendChild(contentSection)
  
      // Initialize the purchase request management functionality
      initializePurchaseRequestManagement()
    } else {
      contentSection.style.display = "block"
  
      // Refresh the data
      loadPurchaseRequests()
    }
  
    // Update active state in sidebar
    updateSidebarActiveState("purchase-request")
  
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      document.getElementById("sidebar").classList.add("active")
      document.getElementById("content").classList.add("active")
    }
  }
  
  // Function to create purchase request content
  function createPurchaseRequestContent() {
    const contentSection = document.createElement("div")
    contentSection.id = "purchase-request-content"
    contentSection.className = "container-fluid"
  
    // Create the header with title and add button
    contentSection.innerHTML = `
          <h2 class="mb-4">Purchase Request Management</h2>
          
          <!-- Search and Filter Row -->
          <div class="row mb-4">
              <div class="col-md-6">
                  <div class="input-group">
                      <span class="input-group-text"><i class="fas fa-search"></i></span>
                      <input type="text" id="purchaseRequestSearch" class="form-control" placeholder="Search purchase requests...">
                  </div>
              </div>
              <div class="col-md-6 text-end">
                  <button id="createPurchaseRequestBtn" class="btn btn-primary">
                      <i class="fas fa-plus"></i> Create New Request
                  </button>
              </div>
          </div>
          
          <!-- Filter Buttons -->
          <div class="row mb-4">
              <div class="col-12">
                  <div class="btn-group" role="group">
                      <button type="button" class="btn btn-outline-primary filter-option active" data-filter="all">All</button>
                      <button type="button" class="btn btn-outline-primary filter-option" data-filter="Pending Approval">Pending Approval</button>
                      <button type="button" class="btn btn-outline-primary filter-option" data-filter="Approved">Approved</button>
                      <button type="button" class="btn btn-outline-primary filter-option" data-filter="Rejected">Rejected</button>
                      <button type="button" class="btn btn-outline-primary filter-option" data-filter="Converted to PO">Converted to PO</button>
                  </div>
              </div>
          </div>
          
          <!-- Purchase Requests Table -->
          <div class="table-responsive">
              <table id="purchaseRequestTable" class="table table-striped table-bordered">
                  <thead>
                      <tr>
                          <th>Request ID</th>
                          <th>Requested By</th>
                          <th>Department</th>
                          <th>Request Date</th>
                          <th>Items</th>
                          <th>Status</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody id="purchaseRequestTableBody">
                      <tr>
                          <td colspan="7" class="text-center">Loading purchase requests...</td>
                      </tr>
                  </tbody>
              </table>
          </div>
          
          <!-- Purchase Request Form Modal -->
          <div class="modal fade" id="purchaseRequestModal" tabindex="-1" aria-labelledby="purchaseRequestModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                      <div class="modal-header bg-primary text-white">
                          <h5 class="modal-title" id="purchaseRequestModalLabel">Create New Purchase Request</h5>
                          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                          <form id="purchaseRequestForm">
                              <input type="hidden" id="purchaseRequestId">
                              <div class="row mb-3">
                                  <div class="col-md-6">
                                      <label for="requestedBy" class="form-label">Requested By</label>
                                      <input type="text" class="form-control" id="requestedBy" required>
                                  </div>
                                  <div class="col-md-6">
                                      <label for="department" class="form-label">Department</label>
                                      <select class="form-select" id="department" required>
                                          <option value="">Select Department</option>
                                          <option value="IT">IT</option>
                                          <option value="Marketing">Marketing</option>
                                          <option value="Finance">Finance</option>
                                          <option value="HR">HR</option>
                                          <option value="Operations">Operations</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="row mb-3">
                                  <div class="col-md-6">
                                      <label for="requestDate" class="form-label">Request Date</label>
                                      <input type="date" class="form-control" id="requestDate" required>
                                  </div>
                                  <div class="col-md-6">
                                      <label for="items" class="form-label">Number of Items</label>
                                      <input type="number" class="form-control" id="items" min="1" required>
                                  </div>
                              </div>
                              <div class="mb-3">
                                  <label for="description" class="form-label">Description</label>
                                  <textarea class="form-control" id="description" rows="3" required></textarea>
                              </div>
                              <div class="mb-3" id="statusField" style="display: none;">
                                  <label for="status" class="form-label">Status</label>
                                  <select class="form-select" id="status">
                                      <option value="Pending Approval">Pending Approval</option>
                                      <option value="Approved">Approved</option>
                                      <option value="Rejected">Rejected</option>
                                      <option value="Converted to PO">Converted to PO</option>
                                  </select>
                              </div>
                          </form>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                          <button type="button" class="btn btn-primary" id="savePurchaseRequestBtn">Save</button>
                      </div>
                  </div>
              </div>
          </div>
          
          <!-- View Purchase Request Modal -->
          <div class="modal fade" id="viewPurchaseRequestModal" tabindex="-1" aria-labelledby="viewPurchaseRequestModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                      <div class="modal-header bg-primary text-white">
                          <h5 class="modal-title" id="viewPurchaseRequestModalLabel">Purchase Request Details</h5>
                          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body" id="viewPurchaseRequestDetails">
                          <!-- Purchase request details will be loaded here -->
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary" id="editViewedPurchaseRequestBtn">Edit</button>
                          <div id="approvalButtons" style="display: none;">
                              <button type="button" class="btn btn-success" id="approveRequestBtn">Approve</button>
                              <button type="button" class="btn btn-danger" id="rejectRequestBtn">Reject</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          
          <!-- Delete Confirmation Modal -->
          <div class="modal fade" id="deletePurchaseRequestModal" tabindex="-1" aria-labelledby="deletePurchaseRequestModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header bg-danger text-white">
                          <h5 class="modal-title" id="deletePurchaseRequestModalLabel">Confirm Delete</h5>
                          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                          <p>Are you sure you want to delete this purchase request? This action cannot be undone.</p>
                          <input type="hidden" id="deletePurchaseRequestId">
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                          <button type="button" class="btn btn-danger" id="confirmDeletePurchaseRequestBtn">Delete</button>
                      </div>
                  </div>
              </div>
          </div>
      `
  
    return contentSection
  }
  
  // Function to initialize purchase request management
  function initializePurchaseRequestManagement() {
    // Load purchase requests
    loadPurchaseRequests()
  
    // Add event listener for search input
    document.getElementById("purchaseRequestSearch").addEventListener("input", function () {
      searchPurchaseRequests(this.value)
    })
  
    // Add event listener for filter buttons
    document.querySelectorAll("#purchase-request-content .filter-option").forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all filter buttons
        document.querySelectorAll("#purchase-request-content .filter-option").forEach((btn) => {
          btn.classList.remove("active")
        })
  
        // Add active class to clicked button
        this.classList.add("active")
  
        // Filter purchase requests
        filterPurchaseRequests(this.getAttribute("data-filter"))
      })
    })
  
    // Add event listener for create button
    document.getElementById("createPurchaseRequestBtn").addEventListener("click", () => {
      showPurchaseRequestForm()
    })
  
    // Add event listener for save button
    document.getElementById("savePurchaseRequestBtn").addEventListener("click", () => {
      savePurchaseRequest()
    })
  
    // Add event listener for confirm delete button
    document.getElementById("confirmDeletePurchaseRequestBtn").addEventListener("click", () => {
      deletePurchaseRequest()
    })
  
    // Add event listener for edit viewed purchase request button
    document.getElementById("editViewedPurchaseRequestBtn").addEventListener("click", function () {
      const purchaseRequestId = this.getAttribute("data-id")
      if (purchaseRequestId) {
        // Close view modal
        const viewModalElement = document.getElementById("viewPurchaseRequestModal")
        const viewModal = bootstrap.Modal.getInstance(viewModalElement)
        viewModal.hide()
  
        // Show edit form
        editPurchaseRequest(purchaseRequestId)
      }
    })
  
    // Add event listener for approve button
    document.getElementById("approveRequestBtn").addEventListener("click", function () {
      const purchaseRequestId = this.getAttribute("data-id")
      if (purchaseRequestId) {
        approvePurchaseRequest(purchaseRequestId)
      }
    })
  
    // Add event listener for reject button
    document.getElementById("rejectRequestBtn").addEventListener("click", function () {
      const purchaseRequestId = this.getAttribute("data-id")
      if (purchaseRequestId) {
        rejectPurchaseRequest(purchaseRequestId)
      }
    })
  }
  
  // Function to load purchase requests
  function loadPurchaseRequests(filteredRequests = null) {
    const requests = filteredRequests || purchaseRequests
    const tableBody = document.getElementById("purchaseRequestTableBody")
  
    // Clear table body
    tableBody.innerHTML = ""
  
    if (requests.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center">No purchase requests found.</td></tr>`
      return
    }
  
    // Add rows for each purchase request
    requests.forEach((request) => {
      const row = document.createElement("tr")
      row.setAttribute("data-id", request.id)
  
      // Determine which action buttons to show based on status
      let actionButtons = `
              <button class="btn btn-sm btn-info view-btn" title="View" data-id="${request.id}">
                  <i class="fas fa-eye"></i>
              </button>
              <button class="btn btn-sm btn-primary edit-btn" title="Edit" data-id="${request.id}">
                  <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-danger delete-btn" title="Delete" data-id="${request.id}">
                  <i class="fas fa-trash"></i>
              </button>
          `
  
      // Add approve/reject buttons if status is "Pending Approval"
      if (request.status === "Pending Approval") {
        actionButtons += `
                  <button class="btn btn-sm btn-success approve-btn" title="Approve" data-id="${request.id}">
                      <i class="fas fa-check"></i>
                  </button>
                  <button class="btn btn-sm btn-danger reject-btn" title="Reject" data-id="${request.id}">
                      <i class="fas fa-times"></i>
                  </button>
              `
      }
  
      row.innerHTML = `
              <td>${request.id}</td>
              <td>${request.requestedBy}</td>
              <td>${request.department}</td>
              <td>${formatDate(request.requestDate)}</td>
              <td>${request.items}</td>
              <td><span class="badge ${getStatusBadgeClass(request.status)}">${request.status}</span></td>
              <td>
                  <div class="btn-group">
                      ${actionButtons}
                  </div>
              </td>
          `
  
      tableBody.appendChild(row)
    })
  
    // Add event listeners for action buttons
    setupActionButtons()
  }
  
  // Function to setup action buttons
  function setupActionButtons() {
    // View buttons
    document.querySelectorAll("#purchaseRequestTableBody .view-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const purchaseRequestId = this.getAttribute("data-id")
        viewPurchaseRequest(purchaseRequestId)
      })
    })
  
    // Edit buttons
    document.querySelectorAll("#purchaseRequestTableBody .edit-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const purchaseRequestId = this.getAttribute("data-id")
        editPurchaseRequest(purchaseRequestId)
      })
    })
  
    // Delete buttons
    document.querySelectorAll("#purchaseRequestTableBody .delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const purchaseRequestId = this.getAttribute("data-id")
        confirmDeletePurchaseRequest(purchaseRequestId)
      })
    })
  
    // Approve buttons
    document.querySelectorAll("#purchaseRequestTableBody .approve-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const purchaseRequestId = this.getAttribute("data-id")
        approvePurchaseRequest(purchaseRequestId)
      })
    })
  
    // Reject buttons
    document.querySelectorAll("#purchaseRequestTableBody .reject-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const purchaseRequestId = this.getAttribute("data-id")
        rejectPurchaseRequest(purchaseRequestId)
      })
    })
  }
  
  // Function to search purchase requests
  function searchPurchaseRequests(searchTerm) {
    if (!searchTerm) {
      loadPurchaseRequests()
      return
    }
  
    searchTerm = searchTerm.toLowerCase()
  
    const filteredRequests = purchaseRequests.filter((request) => {
      return (
        request.id.toLowerCase().includes(searchTerm) ||
        request.requestedBy.toLowerCase().includes(searchTerm) ||
        request.department.toLowerCase().includes(searchTerm) ||
        request.status.toLowerCase().includes(searchTerm) ||
        (request.description && request.description.toLowerCase().includes(searchTerm))
      )
    })
  
    loadPurchaseRequests(filteredRequests)
  }
  
  // Function to filter purchase requests
  function filterPurchaseRequests(filter) {
    if (filter === "all") {
      loadPurchaseRequests()
      return
    }
  
    const filteredRequests = purchaseRequests.filter((request) => request.status === filter)
    loadPurchaseRequests(filteredRequests)
  }
  
  // Function to show purchase request form
  function showPurchaseRequestForm(purchaseRequestId = null) {
    // Reset form
    document.getElementById("purchaseRequestForm").reset()
    document.getElementById("purchaseRequestId").value = ""
  
    // Set current date as default for request date
    document.getElementById("requestDate").value = getCurrentDate()
  
    // Hide status field for new requests
    document.getElementById("statusField").style.display = "none"
  
    // If editing an existing purchase request
    if (purchaseRequestId) {
      const request = purchaseRequests.find((request) => request.id === purchaseRequestId)
  
      if (request) {
        // Set form title
        document.getElementById("purchaseRequestModalLabel").textContent = `Edit Purchase Request: ${request.id}`
  
        // Fill form with request data
        document.getElementById("purchaseRequestId").value = request.id
        document.getElementById("requestedBy").value = request.requestedBy
        document.getElementById("department").value = request.department
        document.getElementById("requestDate").value = request.requestDate
        document.getElementById("items").value = request.items
        document.getElementById("description").value = request.description || ""
  
        // Show and set status field
        document.getElementById("statusField").style.display = "block"
        document.getElementById("status").value = request.status
      }
    } else {
      // Set form title for new purchase request
      document.getElementById("purchaseRequestModalLabel").textContent = "Create New Purchase Request"
    }
  
    // Show modal
    const modalElement = document.getElementById("purchaseRequestModal")
    const modal = new bootstrap.Modal(modalElement)
    modal.show()
  }
  
  // Function to save purchase request
  function savePurchaseRequest() {
    // Get form values
    const form = document.getElementById("purchaseRequestForm")
  
    // Validate form
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
  
    const purchaseRequestId = document.getElementById("purchaseRequestId").value
    const requestedBy = document.getElementById("requestedBy").value
    const department = document.getElementById("department").value
    const requestDate = document.getElementById("requestDate").value
    const items = Number.parseInt(document.getElementById("items").value)
    const description = document.getElementById("description").value
  
    // Get status (if editing) or set to "Pending Approval" (if new)
    const status = purchaseRequestId ? document.getElementById("status").value : "Pending Approval"
  
    if (purchaseRequestId) {
      // Update existing purchase request
      const index = purchaseRequests.findIndex((request) => request.id === purchaseRequestId)
  
      if (index !== -1) {
        purchaseRequests[index] = {
          ...purchaseRequests[index],
          requestedBy,
          department,
          requestDate,
          items,
          description,
          status,
        }
      }
    } else {
      // Create new purchase request
      const newId = generatePurchaseRequestId()
  
      purchaseRequests.push({
        id: newId,
        requestedBy,
        department,
        requestDate,
        items,
        description,
        status: "Pending Approval",
      })
    }
  
    // Close modal
    const modalElement = document.getElementById("purchaseRequestModal")
    const modal = bootstrap.Modal.getInstance(modalElement)
    modal.hide()
  
    // Reload purchase requests
    loadPurchaseRequests()
  }
  
  // Function to view purchase request
  function viewPurchaseRequest(purchaseRequestId) {
    const request = purchaseRequests.find((request) => request.id === purchaseRequestId)
  
    if (request) {
      // Set modal title
      document.getElementById("viewPurchaseRequestModalLabel").textContent = `Purchase Request: ${request.id}`
  
      // Set edit button data-id
      document.getElementById("editViewedPurchaseRequestBtn").setAttribute("data-id", request.id)
  
      // Show/hide approval buttons based on status
      const approvalButtons = document.getElementById("approvalButtons")
      if (request.status === "Pending Approval") {
        approvalButtons.style.display = "block"
        document.getElementById("approveRequestBtn").setAttribute("data-id", request.id)
        document.getElementById("rejectRequestBtn").setAttribute("data-id", request.id)
      } else {
        approvalButtons.style.display = "none"
      }
  
      // Fill modal with request details
      const detailsContainer = document.getElementById("viewPurchaseRequestDetails")
  
      detailsContainer.innerHTML = `
              <div class="row">
                  <div class="col-md-6">
                      <h6>Request Information</h6>
                      <p><strong>Request ID:</strong> ${request.id}</p>
                      <p><strong>Requested By:</strong> ${request.requestedBy}</p>
                      <p><strong>Department:</strong> ${request.department}</p>
                      <p><strong>Request Date:</strong> ${formatDate(request.requestDate)}</p>
                      <p><strong>Number of Items:</strong> ${request.items}</p>
                  </div>
                  <div class="col-md-6">
                      <h6>Status Information</h6>
                      <p><strong>Status:</strong> <span class="badge ${getStatusBadgeClass(request.status)}">${request.status}</span></p>
                      ${request.approvedDate ? `<p><strong>Approved Date:</strong> ${formatDate(request.approvedDate)}</p>` : ""}
                      ${request.rejectedDate ? `<p><strong>Rejected Date:</strong> ${formatDate(request.rejectedDate)}</p>` : ""}
                      ${request.convertedDate ? `<p><strong>Converted to PO Date:</strong> ${formatDate(request.convertedDate)}</p>` : ""}
                  </div>
              </div>
              
              <h6 class="mt-3">Description</h6>
              <p>${request.description || "No description provided."}</p>
          `
  
      // Show modal
      const modalElement = document.getElementById("viewPurchaseRequestModal")
      const modal = new bootstrap.Modal(modalElement)
      modal.show()
    }
  }
  
  // Function to edit purchase request
  function editPurchaseRequest(purchaseRequestId) {
    showPurchaseRequestForm(purchaseRequestId)
  }
  
  // Function to confirm delete purchase request
  function confirmDeletePurchaseRequest(purchaseRequestId) {
    document.getElementById("deletePurchaseRequestId").value = purchaseRequestId
  
    // Show modal
    const modalElement = document.getElementById("deletePurchaseRequestModal")
    const modal = new bootstrap.Modal(modalElement)
    modal.show()
  }
  
  // Function to delete purchase request
  function deletePurchaseRequest() {
    const purchaseRequestId = document.getElementById("deletePurchaseRequestId").value
  
    // Filter out the purchase request to delete
    purchaseRequests = purchaseRequests.filter((request) => request.id !== purchaseRequestId)
  
    // Close modal
    const modalElement = document.getElementById("deletePurchaseRequestModal")
    const modal = bootstrap.Modal.getInstance(modalElement)
    modal.hide()
  
    // Reload purchase requests
    loadPurchaseRequests()
  }
  
  // Function to approve purchase request
  function approvePurchaseRequest(purchaseRequestId) {
    const index = purchaseRequests.findIndex((request) => request.id === purchaseRequestId)
  
    if (index !== -1) {
      // Update status to "Approved"
      purchaseRequests[index].status = "Approved"
      purchaseRequests[index].approvedDate = getCurrentDate()
  
      // Close view modal if open
      const viewModalElement = document.getElementById("viewPurchaseRequestModal")
      const viewModal = bootstrap.Modal.getInstance(viewModalElement)
      if (viewModal) {
        viewModal.hide()
      }
  
      // Reload purchase requests
      loadPurchaseRequests()
  
      // Show success message
      alert("Purchase request approved successfully!")
    }
  }
  
  // Function to reject purchase request
  function rejectPurchaseRequest(purchaseRequestId) {
    const index = purchaseRequests.findIndex((request) => request.id === purchaseRequestId)
  
    if (index !== -1) {
      // Update status to "Rejected"
      purchaseRequests[index].status = "Rejected"
      purchaseRequests[index].rejectedDate = getCurrentDate()
  
      // Close view modal if open
      const viewModalElement = document.getElementById("viewPurchaseRequestModal")
      const viewModal = bootstrap.Modal.getInstance(viewModalElement)
      if (viewModal) {
        viewModal.hide()
      }
  
      // Reload purchase requests
      loadPurchaseRequests()
  
      // Show success message
      alert("Purchase request rejected successfully!")
    }
  }
  
  // Helper function to hide all content sections
  function hideAllContentSections() {
    const contentSections = document.querySelectorAll("#main-content > div")
    contentSections.forEach((section) => {
      section.style.display = "none"
    })
  }
  
  // Function to update sidebar active state
  function updateSidebarActiveState(contentType) {
    // Remove active class from all sidebar items
    document.querySelectorAll("#sidebar ul li").forEach((item) => {
      item.classList.remove("active")
    })
  
    // Find the link for the current content type
    let activeLink
  
    if (contentType === "purchase-request") {
      activeLink =
        document.querySelector("a[onclick=\"loadContent('purchase-request')\"]") ||
        document.querySelector('a[href="#"][data-content="purchase-request"]')
    } else {
      activeLink =
        document.querySelector(`a[onclick="loadContent('${contentType}')"]`) ||
        document.querySelector(`a[href="#"][data-content="${contentType}"]`)
    }
  
    if (activeLink) {
      // Add active class to the parent li
      const parentLi = activeLink.closest("li")
      if (parentLi) {
        parentLi.classList.add("active")
      }
  
      // If it's in a submenu, expand the parent menu
      const parentSubmenu = activeLink.closest("ul.collapse")
      if (parentSubmenu) {
        parentSubmenu.classList.add("show")
        const parentToggle = document.querySelector(`a[href="#${parentSubmenu.id}"]`)
        if (parentToggle) {
          parentToggle.setAttribute("aria-expanded", "true")
          parentToggle.classList.remove("collapsed")
        }
  
        // If it's in a nested submenu, expand the grandparent menu too
        const grandparentSubmenu = parentSubmenu.closest("ul.collapse")
        if (grandparentSubmenu) {
          grandparentSubmenu.classList.add("show")
          const grandparentToggle = document.querySelector(`a[href="#${grandparentSubmenu.id}"]`)
          if (grandparentToggle) {
            grandparentToggle.setAttribute("aria-expanded", "true")
            grandparentToggle.classList.remove("collapsed")
          }
        }
      }
    }
  }
  
  // Helper function to format date
  function formatDate(dateString) {
    if (!dateString) return ""
  
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
  
    return `${day}/${month}/${year}`
  }
  
  // Helper function to get current date in YYYY-MM-DD format
  function getCurrentDate() {
    const date = new Date()
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
  
    return `${year}-${month}-${day}`
  }
  
  // Helper function to get status badge class
  function getStatusBadgeClass(status) {
    switch (status) {
      case "Pending Approval":
        return "bg-warning"
      case "Approved":
        return "bg-success"
      case "Rejected":
        return "bg-danger"
      case "Converted to PO":
        return "bg-info"
      default:
        return "bg-primary"
    }
  }
  
  // Helper function to generate purchase request ID
  function generatePurchaseRequestId() {
    const date = new Date()
    const year = date.getFullYear()
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    return `PR-${year}-${randomNum}`
  }
  
  