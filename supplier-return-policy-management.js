// Supplier Return Policy Management JavaScript

// Function to initialize the supplier return policy management
function initSupplierReturnPolicy() {
  console.log("Initializing Supplier Return Policy Management")

  // Initialize search functionality
  initReturnPolicySearch()

  // Initialize action buttons
  initReturnPolicyActions()
}

// Function to initialize search functionality for return policies
function initReturnPolicySearch() {
  const searchInput = document.querySelector("#supplier-return-content .input-group input[type='text']")
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault()
        searchReturnPolicies(this.value)
      }
    })

    const searchButton = searchInput.nextElementSibling
    if (searchButton) {
      searchButton.addEventListener("click", () => {
        searchReturnPolicies(searchInput.value)
      })
    }
  } else {
    console.log("Return policy search input not found")
  }
}

// Function to search return policies
function searchReturnPolicies(searchTerm) {
  if (!searchTerm.trim()) return

  const table = document.getElementById("returnsTable")
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
    alert("No matching return policies found.")
    // Reset the table to show all rows
    rows.forEach((row) => {
      row.style.display = ""
    })
  }
}

// Function to initialize action buttons for return policies
function initReturnPolicyActions() {
  // View buttons
  document.querySelectorAll("#returnsTable .btn-info").forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true")
      btn.addEventListener("click", function () {
        const row = this.closest("tr")
        if (row) {
          const id = row.cells[0].textContent
          viewReturnPolicy(id)
        }
      })
    }
  })

  // Edit buttons
  document.querySelectorAll("#returnsTable .btn-primary").forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true")
      btn.addEventListener("click", function () {
        const row = this.closest("tr")
        if (row) {
          const id = row.cells[0].textContent
          editReturnPolicy(id)
        }
      })
    }
  })

  // Delete buttons
  document.querySelectorAll("#returnsTable .btn-danger").forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true")
      btn.addEventListener("click", function () {
        const row = this.closest("tr")
        if (row) {
          const id = row.cells[0].textContent
          deleteReturnPolicy(id)
        }
      })
    }
  })
}

// Function to view return policy details
function viewReturnPolicy(id) {
  // Fetch return policy details (simulated)
  const policyDetails = fetchReturnPolicyDetails(id)

  // Create modal if it doesn't exist
  let modal = document.getElementById("return-policy-details-modal")

  if (!modal) {
    modal = document.createElement("div")
    modal.id = "return-policy-details-modal"
    modal.className = "modal fade"
    modal.setAttribute("tabindex", "-1")
    modal.setAttribute("aria-labelledby", "returnPolicyDetailsModalLabel")
    modal.setAttribute("aria-hidden", "true")

    // Add modal to body
    document.body.appendChild(modal)
  }

  // Set modal content
  modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="returnPolicyDetailsModalLabel">Return Policy Details: ${id}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <h6>Policy Information</h6>
                            <p><strong>Policy Name:</strong> ${policyDetails.policyName}</p>
                            <p><strong>Supplier:</strong> ${policyDetails.supplier}</p>
                            <p><strong>Category:</strong> ${policyDetails.category}</p>
                            <p><strong>Return Period:</strong> ${policyDetails.returnPeriod} days</p>
                            <p><strong>Restocking Fee:</strong> ${policyDetails.restockingFee}%</p>
                            <p><strong>Status:</strong> <span class="badge bg-${getStatusBadgeColor(policyDetails.status)}">${policyDetails.status}</span></p>
                        </div>
                        <div class="col-md-6">
                            <h6>Conditions</h6>
                            <p>${policyDetails.conditions}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <h6>Return Process</h6>
                            <ol>
                                <li>Contact supplier within ${policyDetails.returnPeriod} days of receipt</li>
                                <li>Obtain Return Authorization Number</li>
                                <li>Package items securely with original packaging if possible</li>
                                <li>Include copy of invoice and Return Authorization Number</li>
                                <li>Ship to supplier's designated return address</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="editReturnPolicy('${id}')">Edit</button>
                </div>
            </div>
        </div>
    `

  // Initialize and show the modal
  const bootstrap = window.bootstrap
  const modalInstance = new bootstrap.Modal(modal)
  modalInstance.show()
}

// Function to edit return policy
function editReturnPolicy(id) {
  // Hide details modal if it exists
  const detailsModal = document.getElementById("return-policy-details-modal")
  if (detailsModal) {
    const bootstrap = window.bootstrap
    const detailsModalInstance = bootstrap.Modal.getInstance(detailsModal)
    if (detailsModalInstance) {
      detailsModalInstance.hide()
    }
  }

  // Fetch return policy details (simulated)
  const policyDetails = fetchReturnPolicyDetails(id)

  // Create or get edit modal
  let modal = document.getElementById("return-policy-edit-modal")

  if (!modal) {
    modal = document.createElement("div")
    modal.id = "return-policy-edit-modal"
    modal.className = "modal fade"
    modal.setAttribute("tabindex", "-1")
    modal.setAttribute("aria-labelledby", "returnPolicyEditModalLabel")
    modal.setAttribute("aria-hidden", "true")

    // Add modal to body
    document.body.appendChild(modal)
  }

  // Set modal content
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="returnPolicyEditModalLabel">Edit Return Policy: ${id}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="edit-return-policy-form">
            <input type="hidden" id="edit-id" value="${id}">
            <div class="mb-3">
              <label for="edit-supplier" class="form-label">Supplier</label>
              <select class="form-select" id="edit-supplier" name="supplier" required>
                <option value="">Select Supplier</option>
                <option value="ABC Suppliers" ${policyDetails.supplier === "ABC Suppliers" ? "selected" : ""}>ABC Suppliers</option>
                <option value="XYZ Corporation" ${policyDetails.supplier === "XYZ Corporation" ? "selected" : ""}>XYZ Corporation</option>
                <option value="Global Traders" ${policyDetails.supplier === "Global Traders" ? "selected" : ""}>Global Traders</option>
                <option value="Tech Solutions" ${policyDetails.supplier === "Tech Solutions" ? "selected" : ""}>Tech Solutions</option>
                <option value="Office Supplies Inc." ${policyDetails.supplier === "Office Supplies Inc." ? "selected" : ""}>Office Supplies Inc.</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="edit-policy-name" class="form-label">Policy Name</label>
              <input type="text" class="form-control" id="edit-policy-name" name="policyName" value="${policyDetails.policyName}" required>
            </div>
            <div class="mb-3">
              <label for="edit-category" class="form-label">Product Category</label>
              <select class="form-select" id="edit-category" name="category" required>
                <option value="">Select Category</option>
                <option value="Furniture" ${policyDetails.category === "Furniture" ? "selected" : ""}>Furniture</option>
                <option value="Electronics" ${policyDetails.category === "Electronics" ? "selected" : ""}>Electronics</option>
                <option value="Stationery" ${policyDetails.category === "Stationery" ? "selected" : ""}>Stationery</option>
                <option value="IT Equipment" ${policyDetails.category === "IT Equipment" ? "selected" : ""}>IT Equipment</option>
                <option value="All Products" ${policyDetails.category === "All Products" ? "selected" : ""}>All Products</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="edit-return-period" class="form-label">Return Period (days)</label>
              <input type="number" class="form-control" id="edit-return-period" name="returnPeriod" min="1" value="${policyDetails.returnPeriod}" required>
            </div>
            <div class="mb-3">
              <label for="edit-restocking-fee" class="form-label">Restocking Fee (%)</label>
              <input type="number" class="form-control" id="edit-restocking-fee" name="restockingFee" min="0" max="100" step="0.01" value="${policyDetails.restockingFee}" required>
            </div>
            <div class="mb-3">
              <label for="edit-status" class="form-label">Status</label>
              <select class="form-select" id="edit-status" name="status" required>
                <option value="Active" ${policyDetails.status === "Active" ? "selected" : ""}>Active</option>
                <option value="Inactive" ${policyDetails.status === "Inactive" ? "selected" : ""}>Inactive</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="edit-conditions" class="form-label">Conditions</label>
              <textarea class="form-control" id="edit-conditions" name="conditions" rows="3">${policyDetails.conditions}</textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" onclick="saveEditedReturnPolicy()">Save Changes</button>
        </div>
      </div>
    </div>
  `

  // Initialize and show the modal
  const bootstrap = window.bootstrap
  const modalInstance = new bootstrap.Modal(modal)
  modalInstance.show()
}

// Function to save edited return policy
function saveEditedReturnPolicy() {
  const id = document.getElementById("edit-id").value
  const supplier = document.getElementById("edit-supplier").value
  const policyName = document.getElementById("edit-policy-name").value
  const category = document.getElementById("edit-category").value
  const returnPeriod = document.getElementById("edit-return-period").value
  const restockingFee = document.getElementById("edit-restocking-fee").value
  const status = document.getElementById("edit-status").value

  // Find the row in the table
  const table = document.getElementById("returnsTable")
  if (table) {
    const rows = table.querySelectorAll("tbody tr")
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      if (row.cells[0].textContent === id) {
        // Update the row with new values
        row.cells[1].textContent = supplier
        row.cells[2].textContent = policyName
        row.cells[3].textContent = category
        row.cells[4].textContent = returnPeriod + " days"
        row.cells[5].textContent = restockingFee + "%"

        // Update status badge
        const statusBadge = row.cells[6].querySelector(".badge")
        if (statusBadge) {
          statusBadge.className = `badge bg-${getStatusBadgeColor(status)}`
          statusBadge.textContent = status
        }

        // Close the modal
        const bootstrap = window.bootstrap
        const modal = document.getElementById("return-policy-edit-modal")
        if (modal) {
          const modalInstance = bootstrap.Modal.getInstance(modal)
          if (modalInstance) {
            modalInstance.hide()
          }
        }

        alert("Return policy updated successfully!")
        break
      }
    }
  }
}

// Function to delete return policy
function deleteReturnPolicy(id) {
  if (confirm("Are you sure you want to delete return policy: " + id + "?")) {
    // Find the row in the table
    const table = document.getElementById("returnsTable")
    if (table) {
      const rows = table.querySelectorAll("tbody tr")
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        if (row.cells[0].textContent === id) {
          // Remove the row
          row.remove()
          alert("Return policy deleted successfully!")
          break
        }
      }
    }
  }
}

// Function to simulate fetching return policy details
function fetchReturnPolicyDetails(id) {
  // In a real application, this would be an API call
  // For now, we'll return mock data based on the ID
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
    policyName: id.includes("1001")
      ? "Standard Return Policy"
      : id.includes("1002")
        ? "Electronics Return Policy"
        : id.includes("1003")
          ? "Furniture Return Policy"
          : id.includes("1004")
            ? "IT Equipment Return Policy"
            : "Stationery Return Policy",
    category: id.includes("1001")
      ? "All Products"
      : id.includes("1002")
        ? "Electronics"
        : id.includes("1003")
          ? "Furniture"
          : id.includes("1004")
            ? "IT Equipment"
            : "Stationery",
    returnPeriod: id.includes("1001")
      ? "30"
      : id.includes("1002")
        ? "14"
        : id.includes("1003")
          ? "7"
          : id.includes("1004")
            ? "21"
            : "14",
    restockingFee: id.includes("1001")
      ? "10"
      : id.includes("1002")
        ? "15"
        : id.includes("1003")
          ? "20"
          : id.includes("1004")
            ? "5"
            : "0",
    status: id.includes("1005") ? "Inactive" : "Active",
    conditions: id.includes("1001")
      ? "Items must be in original packaging and unused condition. All accessories must be included."
      : id.includes("1002")
        ? "Electronics must be in original packaging with all accessories and manuals. No returns on opened software."
        : id.includes("1003")
          ? "Furniture must be in original condition with no damage. Customer responsible for return shipping."
          : id.includes("1004")
            ? "IT equipment must be in original packaging with all accessories. No returns on opened software or consumables."
            : "Stationery items must be unopened and in original packaging.",
  }
}

// Helper function to get badge color based on status
function getStatusBadgeColor(status) {
  switch (status) {
    case "Active":
      return "success"
    case "Inactive":
      return "danger"
    default:
      return "secondary"
  }
}

// Initialize when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
  // If supplier return policy content is loaded, initialize it
  if (document.getElementById("supplier-return-content")) {
    initSupplierReturnPolicy()
  }

  // Add event listener for the supplier return policy management menu item
  const supplierReturnLink = document.querySelector("a[onclick=\"loadContent('supplier-return')\"]")
  if (supplierReturnLink) {
    supplierReturnLink.removeAttribute("onclick")
    supplierReturnLink.addEventListener("click", (e) => {
      e.preventDefault()
      handleSupplierReturnClick()
    })
  }
})

// Function to handle supplier return policy menu click
function handleSupplierReturnClick() {
  console.log("Handling supplier return policy click")

  // Hide all content sections first
  const allContentSections = document.querySelectorAll("#main-content > div")
  allContentSections.forEach((section) => {
    section.style.display = "none"
  })

  // Create or show the supplier return policy content section
  let contentSection = document.getElementById("supplier-return-content")

  if (!contentSection) {
    contentSection = createSupplierReturnContent()
    document.getElementById("main-content").appendChild(contentSection)
    initSupplierReturnPolicy()
  } else {
    contentSection.style.display = "block"
  }

  // Update active state in sidebar
  updateSidebarActiveState("supplier-return")

  // Close sidebar on mobile after navigation
  if (window.innerWidth < 768) {
    document.getElementById("sidebar").classList.add("active")
    document.getElementById("content").classList.add("active")
  }
}

// Function to create supplier return policy content section if it doesn't exist
function createSupplierReturnContent() {
  console.log("Creating supplier return policy content")

  const section = document.createElement("div")
  section.id = "supplier-return-content"
  section.className = "container-fluid"

  section.innerHTML = `
    <h2 class="mb-4">Supplier Return Policy Management</h2>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Return Policies</h5>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addReturnPolicyModal">
          <i class="fas fa-plus me-2"></i>Add Return Policy
        </button>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search return policies...">
            <button class="btn btn-outline-secondary" type="button">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div class="table-responsive">
          <table id="returnsTable" class="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier</th>
                <th>Policy Name</th>
                <th>Category</th>
                <th>Return Period</th>
                <th>Restocking Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>RP-1001</td>
                <td>ABC Suppliers</td>
                <td>Standard Return Policy</td>
                <td>All Products</td>
                <td>30 days</td>
                <td>10%</td>
                <td><span class="badge bg-success">Active</span></td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>RP-1002</td>
                <td>XYZ Corporation</td>
                <td>Electronics Return Policy</td>
                <td>Electronics</td>
                <td>14 days</td>
                <td>15%</td>
                <td><span class="badge bg-success">Active</span></td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>RP-1003</td>
                <td>Global Traders</td>
                <td>Furniture Return Policy</td>
                <td>Furniture</td>
                <td>7 days</td>
                <td>20%</td>
                <td><span class="badge bg-success">Active</span></td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>RP-1004</td>
                <td>Tech Solutions</td>
                <td>IT Equipment Return Policy</td>
                <td>IT Equipment</td>
                <td>21 days</td>
                <td>5%</td>
                <td><span class="badge bg-success">Active</span></td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>RP-1005</td>
                <td>Office Supplies Inc.</td>
                <td>Stationery Return Policy</td>
                <td>Stationery</td>
                <td>14 days</td>
                <td>0%</td>
                <td><span class="badge bg-danger">Inactive</span></td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `

  return section
}

// Function to update sidebar active state
function updateSidebarActiveState(contentType) {
  // Remove active class from all sidebar items
  document.querySelectorAll("#sidebar ul li").forEach((item) => {
    item.classList.remove("active")
  })

  // Add active class to the clicked item
  let activeLink
  if (contentType === "supplier-return") {
    activeLink =
      document.querySelector(`#sidebar a[href="#"][onclick*="supplier-return"]`) ||
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

// Initialize when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if we're on the supplier return policy page
  const returnPolicyContent = document.getElementById("supplier-return-content")
  if (returnPolicyContent) {
    console.log("Return policy content found on page load")
    initSupplierReturnPolicy()
  } else {
    console.log("Return policy content not found on page load")
  }
})

// Listen for content changes to initialize when the return policy content is loaded
document.addEventListener("contentLoaded", (e) => {
  console.log("Content loaded event received:", e.detail)
  if (e.detail && e.detail.contentType === "supplier-return") {
    console.log("Initializing return policy from contentLoaded event")
    setTimeout(() => {
      initSupplierReturnPolicy()
    }, 100)
  }
})

