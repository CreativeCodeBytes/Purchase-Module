// Supplier Contract Management JavaScript

// Initialize when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
  // If supplier contract content is loaded, initialize it
  if (document.getElementById("supplier-contract-content")) {
    initSupplierContractManagement()
  }

  // Add event listener for the supplier contract management menu item
  const supplierContractLink = document.querySelector("a[onclick=\"loadContent('supplier-contract')\"]")
  if (supplierContractLink) {
    supplierContractLink.removeAttribute("onclick")
    supplierContractLink.addEventListener("click", (e) => {
      e.preventDefault()
      handleSupplierContractClick()
    })
  }
})

// Function to handle supplier contract menu click
function handleSupplierContractClick() {
  console.log("Handling supplier contract click")

  // Hide all content sections first
  const allContentSections = document.querySelectorAll("#main-content > div")
  allContentSections.forEach((section) => {
    section.style.display = "none"
  })

  // Create or show the supplier contract content section
  let contentSection = document.getElementById("supplier-contract-content")

  if (!contentSection) {
    contentSection = createSupplierContractContent()
    document.getElementById("main-content").appendChild(contentSection)
    initSupplierContractManagement()
  } else {
    contentSection.style.display = "block"
  }

  // Update active state in sidebar
  updateSidebarActiveState("supplier-contract")

  // Close sidebar on mobile after navigation
  if (window.innerWidth < 768) {
    document.getElementById("sidebar").classList.add("active")
    document.getElementById("content").classList.add("active")
  }
}

// Function to create supplier contract content section if it doesn't exist
function createSupplierContractContent() {
  console.log("Creating supplier contract content")

  const section = document.createElement("div")
  section.id = "supplier-contract-content"
  section.className = "container-fluid"

  section.innerHTML = `
    <h2 class="mb-4">Supplier Contract Management</h2>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Contracts</h5>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addContractModal">
          <i class="fas fa-plus me-2"></i>Add Contract
        </button>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search contracts...">
            <button class="btn btn-outline-secondary" type="button">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div class="table-responsive">
          <table id="contractsTable" class="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier</th>
                <th>Contract Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Value</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SC-1001</td>
                <td>ABC Suppliers</td>
                <td>Purchase Agreement</td>
                <td>1 Jan 2024</td>
                <td>31 Dec 2024</td>
                <td>₹50,000.00</td>
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
                <td>SC-1002</td>
                <td>XYZ Corporation</td>
                <td>Service Level Agreement</td>
                <td>15 Feb 2024</td>
                <td>14 Feb 2024</td>
                <td>₹35,000.00</td>
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
                <td>SC-1003</td>
                <td>Global Traders</td>
                <td>Framework Agreement</td>
                <td>1 Mar 2024</td>
                <td>28 Feb 2025</td>
                <td>₹120,000.00</td>
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
                <td>SC-1004</td>
                <td>Tech Solutions</td>
                <td>Maintenance Contract</td>
                <td>1 Jan 2022</td>
                <td>31 Dec 2022</td>
                <td>₹24,000.00</td>
                <td><span class="badge bg-danger">Expired</span></td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-warning"><i class="fas fa-redo"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>SC-1005</td>
                <td>Office Supplies Inc.</td>
                <td>Purchase Agreement</td>
                <td>1 Apr 2024</td>
                <td>31 Mar 2024</td>
                <td>₹18,000.00</td>
                <td><span class="badge bg-secondary">Draft</span></td>
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

    <!-- Add Contract Modal -->
    <div class="modal fade" id="addContractModal" tabindex="-1" aria-labelledby="addContractModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="addContractModalLabel">Add New Contract</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="add-contract-form">
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
                <label for="add-contract-type" class="form-label">Contract Type</label>
                <select class="form-select" id="add-contract-type" name="contractType" required>
                  <option value="">Select Type</option>
                  <option value="Purchase Agreement">Purchase Agreement</option>
                  <option value="Service Level Agreement">Service Level Agreement</option>
                  <option value="Maintenance Contract">Maintenance Contract</option>
                  <option value="Framework Agreement">Framework Agreement</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="add-start-date" class="form-label">Start Date</label>
                <input type="date" class="form-control" id="add-start-date" name="startDate" required>
              </div>
              <div class="mb-3">
                <label for="add-end-date" class="form-label">End Date</label>
                <input type="date" class="form-control" id="add-end-date" name="endDate" required>
              </div>
              <div class="mb-3">
                <label for="add-value" class="form-label">Contract Value</label>
                <input type="number" class="form-control" id="add-value" name="value" step="0.01" required>
              </div>
              <div class="mb-3">
                <label for="add-status" class="form-label">Status</label>
                <select class="form-select" id="add-status" name="status" required>
                  <option value="Draft">Draft</option>
                  <option value="Active" selected>Active</option>
                  <option value="Expired">Expired</option>
                  <option value="Terminated">Terminated</option>
                </select>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="add-auto-renewal" name="autoRenewal">
                  <label class="form-check-label" for="add-auto-renewal">
                    Auto Renewal
                  </label>
                </div>
              </div>
              <div class="mb-3">
                <label for="add-notes" class="form-label">Notes</label>
                <textarea class="form-control" id="add-notes" name="notes" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="save-new-contract">Save Contract</button>
          </div>
        </div>
      </div>
    </div>
  `

  return section
}

// Function to initialize the supplier contract management
function initSupplierContractManagement() {
  console.log("Initializing Supplier Contract Management")

  // Initialize search functionality
  initContractSearch()

  // Initialize action buttons
  initContractActions()
  
  // Initialize Add Contract functionality
  initAddContract()
}

// Function to initialize Add Contract functionality
function initAddContract() {
  const addContractButton = document.getElementById("save-new-contract");
  if (addContractButton) {
    addContractButton.addEventListener("click", saveNewContract);
  } else {
    console.log("Add contract button not found");
  }
  
  // Set default dates for the add contract form
  const startDateInput = document.getElementById("add-start-date");
  const endDateInput = document.getElementById("add-end-date");
  
  if (startDateInput && endDateInput) {
    const today = new Date();
    startDateInput.value = formatDateForInput(today);
    
    const nextYear = new Date(today);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    endDateInput.value = formatDateForInput(nextYear);
  }
}

// Function to save a new contract
function saveNewContract() {
  // Get form values
  const supplier = document.getElementById("add-supplier").value;
  const contractType = document.getElementById("add-contract-type").value;
  const startDate = document.getElementById("add-start-date").value;
  const endDate = document.getElementById("add-end-date").value;
  const value = document.getElementById("add-value").value;
  const status = document.getElementById("add-status").value;
  const autoRenewal = document.getElementById("add-auto-renewal").checked;
  const notes = document.getElementById("add-notes").value;
  
  // Validate form
  if (!supplier || !contractType || !startDate || !endDate || !value) {
    alert("Please fill in all required fields.");
    return;
  }
  
  // Generate a new contract ID
  const date = new Date();
  const year = date.getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newId = `SC-${year}-${randomNum}`;
  
  // Find the table
  const table = document.getElementById("contractsTable");
  if (table) {
    const tbody = table.querySelector("tbody");
    if (tbody) {
      // Create new row for the contract
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${newId}</td>
        <td>${supplier}</td>
        <td>${contractType}</td>
        <td>${formatDate(startDate)}</td>
        <td>${formatDate(endDate)}</td>
        <td>₹${Number.parseFloat(value).toFixed(2)}</td>
        <td><span class="badge bg-${getStatusBadgeColor(status)}">${status}</span></td>
        <td>
          <div class="btn-group">
            <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
            <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
            ${status === "Expired" ? '<button class="btn btn-sm btn-warning"><i class="fas fa-redo"></i></button>' : ''}
            <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      `;
      
      // Insert at the beginning of the table
      tbody.insertBefore(newRow, tbody.firstChild);
      
      // Close the modal
      const bootstrap = window.bootstrap;
      const modal = document.getElementById("addContractModal");
      if (modal) {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
          modalInstance.hide();
        } else {
          const newModalInstance = new bootstrap.Modal(modal);
          newModalInstance.hide();
        }
      }
      
      // Reset the form
      document.getElementById("add-contract-form").reset();
      
      // Set default dates again
      const startDateInput = document.getElementById("add-start-date");
      const endDateInput = document.getElementById("add-end-date");
      
      if (startDateInput && endDateInput) {
        const today = new Date();
        startDateInput.value = formatDateForInput(today);
        
        const nextYear = new Date(today);
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        endDateInput.value = formatDateForInput(nextYear);
      }
      
      // Reinitialize action buttons
      setTimeout(() => {
        initContractActions();
      }, 100);
      
      alert("Contract added successfully!");
    }
  }
}

// Function to initialize search functionality for contracts
function initContractSearch() {
  const searchInput = document.querySelector("#supplier-contract-content .input-group input[type='text']")
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault()
        searchContracts(this.value)
      }
    })

    const searchButton = searchInput.nextElementSibling
    if (searchButton) {
      searchButton.addEventListener("click", () => {
        searchContracts(searchInput.value)
      })
    }
  } else {
    console.log("Contract search input not found")
  }
}

// Function to search contracts
function searchContracts(searchTerm) {
  if (!searchTerm.trim()) return

  const table = document.getElementById("contractsTable")
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
    alert("No matching contracts found.")
    // Reset the table to show all rows
    rows.forEach((row) => {
      row.style.display = ""
    })
  }
}

// Function to initialize action buttons for contracts
function initContractActions() {
  // View buttons
  document.querySelectorAll("#contractsTable .btn-info").forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true")
      btn.addEventListener("click", function () {
        const row = this.closest("tr")
        if (row) {
          const id = row.cells[0].textContent
          viewContract(id)
        }
      })
    }
  })

  // Edit buttons
  document.querySelectorAll("#contractsTable .btn-primary").forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true")
      btn.addEventListener("click", function () {
        const row = this.closest("tr")
        if (row) {
          const id = row.cells[0].textContent
          editContract(id)
        }
      })
    }
  })

  // Delete buttons
  document.querySelectorAll("#contractsTable .btn-danger").forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true")
      btn.addEventListener("click", function () {
        const row = this.closest("tr")
        if (row) {
          const id = row.cells[0].textContent
          deleteContract(id)
        }
      })
    }
  })

  // Renew buttons (for expired contracts)
  document.querySelectorAll("#contractsTable .btn-warning").forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true")
      btn.addEventListener("click", function () {
        const row = this.closest("tr")
        if (row) {
          const id = row.cells[0].textContent
          renewContract(id)
        }
      })
    }
  })
}

// Function to view contract details
function viewContract(id) {
  // Fetch contract details (simulated)
  const contractDetails = fetchContractDetails(id)

  // Create modal if it doesn't exist
  let modal = document.getElementById("contract-details-modal")

  if (!modal) {
    modal = document.createElement("div")
    modal.id = "contract-details-modal"
    modal.className = "modal fade"
    modal.setAttribute("tabindex", "-1")
    modal.setAttribute("aria-labelledby", "contractDetailsModalLabel")
    modal.setAttribute("aria-hidden", "true")

    // Add modal to body
    document.body.appendChild(modal)
  }

  // Calculate contract duration in months
  const startDate = new Date(contractDetails.startDate)
  const endDate = new Date(contractDetails.endDate)
  const durationMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth())

  // Set modal content
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="contractDetailsModalLabel">Contract Details: ${id}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3">
            <div class="col-md-6">
              <h6>Contract Information</h6>
              <p><strong>Supplier:</strong> ${contractDetails.supplier}</p>
              <p><strong>Contract Type:</strong> ${contractDetails.contractType}</p>
              <p><strong>Start Date:</strong> ${formatDate(contractDetails.startDate)}</p>
              <p><strong>End Date:</strong> ${formatDate(contractDetails.endDate)}</p>
              <p><strong>Duration:</strong> ${durationMonths} months</p>
              <p><strong>Contract Value:</strong> ₹${contractDetails.value}</p>
              <p><strong>Status:</strong> <span class="badge bg-${getStatusBadgeColor(contractDetails.status)}">${contractDetails.status}</span></p>
            </div>
            <div class="col-md-6">
              <h6>Key Terms</h6>
              <ul>
                <li>Payment Terms: Net 30 days</li>
                <li>Renewal: ${contractDetails.autoRenewal ? "Automatic" : "Manual"}</li>
                <li>Termination Notice: 30 days</li>
                <li>Warranty Period: 12 months</li>
              </ul>
              <h6>Notes</h6>
              <p>${contractDetails.notes}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <h6>Contract Milestones</h6>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Milestone</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Contract Signed</td>
                      <td>${formatDate(contractDetails.startDate)}</td>
                      <td><span class="badge bg-success">Completed</span></td>
                    </tr>
                    <tr>
                      <td>First Review</td>
                      <td>${formatDate(addMonths(new Date(contractDetails.startDate), 3))}</td>
                      <td><span class="badge bg-${new Date() > addMonths(new Date(contractDetails.startDate), 3) ? "success" : "warning"}">${new Date() > addMonths(new Date(contractDetails.startDate), 3) ? "Completed" : "Pending"}</span></td>
                    </tr>
                    <tr>
                      <td>Mid-term Review</td>
                      <td>${formatDate(addMonths(new Date(contractDetails.startDate), Math.floor(durationMonths / 2)))}</td>
                      <td><span class="badge bg-${new Date() > addMonths(new Date(contractDetails.startDate), Math.floor(durationMonths / 2)) ? "success" : "warning"}">${new Date() > addMonths(new Date(contractDetails.startDate), Math.floor(durationMonths / 2)) ? "Completed" : "Pending"}</span></td>
                    </tr>
                    <tr>
                      <td>Renewal Notice</td>
                      <td>${formatDate(addMonths(new Date(contractDetails.endDate), -1))}</td>
                      <td><span class="badge bg-${new Date() > addMonths(new Date(contractDetails.endDate), -1) ? "success" : "warning"}">${new Date() > addMonths(new Date(contractDetails.endDate), -1) ? "Completed" : "Pending"}</span></td>
                    </tr>
                    <tr>
                      <td>Contract End</td>
                      <td>${formatDate(contractDetails.endDate)}</td>
                      <td><span class="badge bg-${new Date() > new Date(contractDetails.endDate) ? "success" : "warning"}">${new Date() > new Date(contractDetails.endDate) ? "Completed" : "Pending"}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="editContract('${id}')">Edit</button>
          ${contractDetails.status === "Expired" ? `<button type="button" class="btn btn-warning" onclick="renewContract('${id}')">Renew</button>` : ""}
        </div>
      </div>
    </div>
  `

  // Initialize and show the modal
  const bootstrap = window.bootstrap
  const modalInstance = new bootstrap.Modal(modal)
  modalInstance.show()
}

// Function to edit contract
function editContract(id) {
  // Hide details modal if it exists
  const detailsModal = document.getElementById("contract-details-modal")
  if (detailsModal) {
    const bootstrap = window.bootstrap
    const detailsModalInstance = bootstrap.Modal.getInstance(detailsModal)
    if (detailsModalInstance) {
      detailsModalInstance.hide()
    }
  }

  // Fetch contract details (simulated)
  const contractDetails = fetchContractDetails(id)

  // Create or get edit modal
  let modal = document.getElementById("contract-edit-modal")

  if (!modal) {
    modal = document.createElement("div")
    modal.id = "contract-edit-modal"
    modal.className = "modal fade"
    modal.setAttribute("tabindex", "-1")
    modal.setAttribute("aria-labelledby", "contractEditModalLabel")
    modal.setAttribute("aria-hidden", "true")

    // Add modal to body
    document.body.appendChild(modal)
  }

  // Set modal content
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="contractEditModalLabel">Edit Contract: ${id}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="edit-contract-form">
            <input type="hidden" id="edit-id" value="${id}">
            <div class="mb-3">
              <label for="edit-supplier" class="form-label">Supplier</label>
              <select class="form-select" id="edit-supplier" name="supplier" required>
                <option value="">Select Supplier</option>
                <option value="ABC Suppliers" ${contractDetails.supplier === "ABC Suppliers" ? "selected" : ""}>ABC Suppliers</option>
                <option value="XYZ Corporation" ${contractDetails.supplier === "XYZ Corporation" ? "selected" : ""}>XYZ Corporation</option>
                <option value="Global Traders" ${contractDetails.supplier === "Global Traders" ? "selected" : ""}>Global Traders</option>
                <option value="Tech Solutions" ${contractDetails.supplier === "Tech Solutions" ? "selected" : ""}>Tech Solutions</option>
                <option value="Office Supplies Inc." ${contractDetails.supplier === "Office Supplies Inc." ? "selected" : ""}>Office Supplies Inc.</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="edit-contract-type" class="form-label">Contract Type</label>
              <select class="form-select" id="edit-contract-type" name="contractType" required>
                <option value="">Select Type</option>
                <option value="Purchase Agreement" ${contractDetails.contractType === "Purchase Agreement" ? "selected" : ""}>Purchase Agreement</option>
                <option value="Service Level Agreement" ${contractDetails.contractType === "Service Level Agreement" ? "selected" : ""}>Service Level Agreement</option>
                <option value="Maintenance Contract" ${contractDetails.contractType === "Maintenance Contract" ? "selected" : ""}>Maintenance Contract</option>
                <option value="Framework Agreement" ${contractDetails.contractType === "Framework Agreement" ? "selected" : ""}>Framework Agreement</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="edit-start-date" class="form-label">Start Date</label>
              <input type="date" class="form-control" id="edit-start-date" name="startDate" value="${formatDateForInput(contractDetails.startDate)}" required>
            </div>
            <div class="mb-3">
              <label for="edit-end-date" class="form-label">End Date</label>
              <input type="date" class="form-control" id="edit-end-date" name="endDate" value="${formatDateForInput(contractDetails.endDate)}" required>
            </div>
            <div class="mb-3">
              <label for="edit-value" class="form-label">Contract Value</label>
              <input type="number" class="form-control" id="edit-value" name="value" step="0.01" value="${contractDetails.value}" required>
            </div>
            <div class="mb-3">
              <label for="edit-status" class="form-label">Status</label>
              <select class="form-select" id="edit-status" name="status" required>
                <option value="Draft" ${contractDetails.status === "Draft" ? "selected" : ""}>Draft</option>
                <option value="Active" ${contractDetails.status === "Active" ? "selected" : ""}>Active</option>
                <option value="Expired" ${contractDetails.status === "Expired" ? "selected" : ""}>Expired</option>
                <option value="Terminated" ${contractDetails.status === "Terminated" ? "selected" : ""}>Terminated</option>
              </select>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="edit-auto-renewal" name="autoRenewal" ${contractDetails.autoRenewal ? "checked" : ""}>
                <label class="form-check-label" for="edit-auto-renewal">
                  Auto Renewal
                </label>
              </div>
            </div>
            <div class="mb-3">
              <label for="edit-notes" class="form-label">Notes</label>
              <textarea class="form-control" id="edit-notes" name="notes" rows="3">${contractDetails.notes}</textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" onclick="saveEditedContract()">Save Changes</button>
        </div>
      </div>
    </div>
  `

  // Initialize and show the modal
  const bootstrap = window.bootstrap
  const modalInstance = new bootstrap.Modal(modal)
  modalInstance.show()
}

// Function to save edited contract
function saveEditedContract() {
  const id = document.getElementById("edit-id").value
  const supplier = document.getElementById("edit-supplier").value
  const contractType = document.getElementById("edit-contract-type").value
  const startDate = document.getElementById("edit-start-date").value
  const endDate = document.getElementById("edit-end-date").value
  const value = document.getElementById("edit-value").value
  const status = document.getElementById("edit-status").value

  // Find the row in the table
  const table = document.getElementById("contractsTable")
  if (table) {
    const rows = table.querySelectorAll("tbody tr")
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      if (row.cells[0].textContent === id) {
        // Update the row with new values
        row.cells[1].textContent = supplier
        row.cells[2].textContent = contractType
        row.cells[3].textContent = formatDate(startDate)
        row.cells[4].textContent = formatDate(endDate)
        row.cells[5].textContent = "₹" + Number.parseFloat(value).toFixed(2)

        // Update status badge
        const statusBadge = row.cells[6].querySelector(".badge")
        if (statusBadge) {
          statusBadge.className = `badge bg-${getStatusBadgeColor(status)}`
          statusBadge.textContent = status
        }

        // Update action buttons based on status
        const actionCell = row.cells[7]
        if (status === "Expired") {
          // Add renew button for expired contracts
          if (!actionCell.innerHTML.includes("fa-redo")) {
            actionCell.innerHTML = `
              <div class="btn-group">
                <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-warning"><i class="fas fa-redo"></i></button>
                <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
              </div>
            `
          }
        } else {
          // Remove renew button for non-expired contracts
          if (actionCell.innerHTML.includes("fa-redo")) {
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
        const modal = document.getElementById("contract-edit-modal")
        if (modal) {
          const modalInstance = bootstrap.Modal.getInstance(modal)
          if (modalInstance) {
            modalInstance.hide()
          }
        }

        // Reinitialize action buttons
        setTimeout(() => {
          initContractActions()
        }, 100)

        alert("Contract updated successfully!")
        break
      }
    }
  }
}

// Function to delete contract
function deleteContract(id) {
  if (confirm("Are you sure you want to delete contract: " + id + "?")) {
    // Find the row in the table
    const table = document.getElementById("contractsTable")
    if (table) {
      const rows = table.querySelectorAll("tbody tr")
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        if (row.cells[0].textContent === id) {
          // Remove the row
          row.remove()
          alert("Contract deleted successfully!")
          break
        }
      }
    }
  }
}

// Function to renew contract
function renewContract(id) {
  // Hide details modal if it exists
  const detailsModal = document.getElementById("contract-details-modal")
  if (detailsModal) {
    const bootstrap = window.bootstrap
    const detailsModalInstance = bootstrap.Modal.getInstance(detailsModal)
    if (detailsModalInstance) {
      detailsModalInstance.hide()
    }
  }

  // Fetch contract details (simulated)
  const contractDetails = fetchContractDetails(id)

  // Create or get renew modal
  let modal = document.getElementById("contract-renew-modal")

  if (!modal) {
    modal = document.createElement("div")
    modal.id = "contract-renew-modal"
    modal.className = "modal fade"
    modal.setAttribute("tabindex", "-1")
    modal.setAttribute("aria-labelledby", "contractRenewModalLabel")
    modal.setAttribute("aria-hidden", "true")

    // Add modal to body
    document.body.appendChild(modal)
  }

  // Calculate new start and end dates
  const oldEndDate = new Date(contractDetails.endDate)
  const newStartDate = new Date(oldEndDate)
  newStartDate.setDate(newStartDate.getDate() + 1)

  const newEndDate = new Date(newStartDate)
  newEndDate.setFullYear(newEndDate.getFullYear() + 1)

  // Set modal content
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="contractRenewModalLabel">Renew Contract: ${id}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="renew-contract-form">
            <input type="hidden" id="renew-id" value="${id}">
            <div class="mb-3">
              <label for="renew-supplier" class="form-label">Supplier</label>
              <input type="text" class="form-control" id="renew-supplier" name="supplier" value="${contractDetails.supplier}" readonly>
            </div>
            <div class="mb-3">
              <label for="renew-contract-type" class="form-label">Contract Type</label>
              <input type="text" class="form-control" id="renew-contract-type" name="contractType" value="${contractDetails.contractType}" readonly>
            </div>
            <div class="mb-3">
              <label for="renew-old-start-date" class="form-label">Old Start Date</label>
              <input type="date" class="form-control" id="renew-old-start-date" value="${formatDateForInput(contractDetails.startDate)}" readonly>
            </div>
            <div class="mb-3">
              <label for="renew-old-end-date" class="form-label">Old End Date</label>
              <input type="date" class="form-control" id="renew-old-end-date" value="${formatDateForInput(contractDetails.endDate)}" readonly>
            </div>
            <div class="mb-3">
              <label for="renew-start-date" class="form-label">New Start Date</label>
              <input type="date" class="form-control" id="renew-start-date" name="startDate" value="${formatDateForInput(newStartDate.toISOString())}" required>
            </div>
            <div class="mb-3">
              <label for="renew-end-date" class="form-label">New End Date</label>
              <input type="date" class="form-control" id="renew-end-date" name="endDate" value="${formatDateForInput(newEndDate.toISOString())}" required>
            </div>
            <div class="mb-3">
              <label for="renew-value" class="form-label">Contract Value</label>
              <input type="number" class="form-control" id="renew-value" name="value" step="0.01" value="${contractDetails.value}" required>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="renew-auto-renewal" name="autoRenewal" ${contractDetails.autoRenewal ? "checked" : ""}>
                <label class="form-check-label" for="renew-auto-renewal">
                  Auto Renewal
                </label>
              </div>
            </div>
            <div class="mb-3">
              <label for="renew-notes" class="form-label">Notes</label>
              <textarea class="form-control" id="renew-notes" name="notes" rows="3">${contractDetails.notes}</textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" onclick="saveRenewedContract()">Renew Contract</button>
        </div>
      </div>
    </div>
  `

  // Initialize and show the modal
  const bootstrap = window.bootstrap
  const modalInstance = new bootstrap.Modal(modal)
  modalInstance.show()
}

// Function to save renewed contract
function saveRenewedContract() {
  const id = document.getElementById("renew-id").value
  const supplier = document.getElementById("renew-supplier").value
  const contractType = document.getElementById("renew-contract-type").value
  const startDate = document.getElementById("renew-start-date").value
  const endDate = document.getElementById("renew-end-date").value
  const value = document.getElementById("renew-value").value

  // Generate a new ID for the renewed contract
  const date = new Date()
  const year = date.getFullYear()
  const randomNum = Math.floor(1000 + Math.random() * 9000)
  const newId = `SC-${year}-${randomNum}`

  // Find the table
  const table = document.getElementById("contractsTable")
  if (table) {
    const tbody = table.querySelector("tbody")
    if (tbody) {
      // Create new row for the renewed contract
      const newRow = document.createElement("tr")
      newRow.innerHTML = `
        <td>${newId}</td>
        <td>${supplier}</td>
        <td>${contractType}</td>
        <td>${formatDate(startDate)}</td>
        <td>${formatDate(endDate)}</td>
        <td>₹${Number.parseFloat(value).toFixed(2)}</td>
        <td><span class="badge bg-success">Active</span></td>
        <td>
          <div class="btn-group">
            <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
            <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
            <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      `

      // Insert at the beginning of the table
      tbody.insertBefore(newRow, tbody.firstChild)

      // Update the old contract status to "Expired" if it's not already
      const rows = tbody.querySelectorAll("tr")
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        if (row.cells[0].textContent === id) {
          const statusCell = row.cells[6]
          const statusBadge = statusCell.querySelector(".badge")
          if (statusBadge && statusBadge.textContent !== "Expired") {
            statusBadge.className = "badge bg-danger"
            statusBadge.textContent = "Expired"

            // Update action buttons to include renew button
            const actionCell = row.cells[7]
            if (!actionCell.innerHTML.includes("fa-redo")) {
              actionCell.innerHTML = `
                <div class="btn-group">
                  <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                  <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-sm btn-warning"><i class="fas fa-redo"></i></button>
                  <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                </div>
              `
            }
          }
          break
        }
      }

      // Close the modal
      const bootstrap = window.bootstrap
      const modal = document.getElementById("contract-renew-modal")
      if (modal) {
        const modalInstance = bootstrap.Modal.getInstance(modal)
        if (modalInstance) {
          modalInstance.hide()
        }
      }

      // Reinitialize action buttons
      setTimeout(() => {
        initContractActions()
      }, 100)

      alert("Contract renewed successfully!")
    }
  }
}

// Function to simulate fetching contract details
function fetchContractDetails(id) {
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
    contractType: id.includes("1001")
      ? "Purchase Agreement"
      : id.includes("1002")
        ? "Service Level Agreement"
        : id.includes("1003")
          ? "Framework Agreement"
          : id.includes("1004")
            ? "Maintenance Contract"
            : "Purchase Agreement",
    startDate: id.includes("1001")
      ? "2024-01-01"
      : id.includes("1002")
        ? "2024-02-15"
        : id.includes("1003")
          ? "2024-03-01"
          : id.includes("1004")
            ? "2022-01-01"
            : "2024-04-01",
    endDate: id.includes("1001")
      ? "2024-12-31"
      : id.includes("1002")
        ? "2024-02-14"
        : id.includes("1003")
          ? "2025-02-28"
          : id.includes("1004")
            ? "2022-12-31"
            : "2024-03-31",
    value: id.includes("1001")
      ? "50000.00"
      : id.includes("1002")
        ? "35000.00"
        : id.includes("1003")
          ? "120000.00"
          : id.includes("1004")
            ? "24000.00"
            : "18000.00",
    status: id.includes("1004") ? "Expired" : id.includes("1005") ? "Draft" : "Active",
    autoRenewal: id.includes("1001") || id.includes("1003"),
    notes: id.includes("1001")
      ? "Standard purchase agreement for office supplies and equipment."
      : id.includes("1002")
        ? "Service level agreement for IT support and maintenance."
        : id.includes("1003")
          ? "Framework agreement for multiple product categories with volume discounts."
          : id.includes("1004")
            ? "Maintenance contract for office equipment and machinery."
            : "Purchase agreement for stationery and office consumables.",
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

// Helper function to add months to a date
function addMonths(date, months) {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}

// Helper function to get badge color based on status
function getStatusBadgeColor(status) {
  switch (status) {
    case "Active":
      return "success"
    case "Draft":
      return "secondary"
    case "Expired":
      return "danger"
    case "Terminated":
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
  if (contentType === "supplier-contract") {
    activeLink =
      document.querySelector(`#sidebar a[href="#"][onclick*="supplier-contract"]`) ||
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