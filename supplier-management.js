// Supplier Management JavaScript File

// Initialize when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
    // If supplier management content is loaded, initialize it
    if (document.getElementById("supplier-management-content")) {
      initSupplierManagement()
    }
  
    // Add event listener for the supplier management menu item
    const supplierManagementLink = document.querySelector("a[onclick=\"loadContent('supplier-management')\"]")
    if (supplierManagementLink) {
      supplierManagementLink.removeAttribute("onclick")
      supplierManagementLink.addEventListener("click", (e) => {
        e.preventDefault()
        handleSupplierManagementClick()
      })
    }
  })
  
  // Function to handle supplier management menu click
  function handleSupplierManagementClick() {
    // Hide all content sections first
    const allContentSections = document.querySelectorAll("#main-content > div")
    allContentSections.forEach((section) => {
      section.style.display = "none"
    })
  
    // Create or show the supplier management content section
    let contentSection = document.getElementById("supplier-management-content")
  
    if (!contentSection) {
      contentSection = createSupplierManagementContent()
      document.getElementById("main-content").appendChild(contentSection)
      initSupplierManagement()
    } else {
      contentSection.style.display = "block"
    }
  
    // Update active state in sidebar
    updateSidebarActiveState("supplier-management")
  
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      document.getElementById("sidebar").classList.add("active")
      document.getElementById("content").classList.add("active")
    }
  }
  
  // Function to create supplier management content section if it doesn't exist
  function createSupplierManagementContent() {
    const contentSection = document.createElement("div")
    contentSection.id = "supplier-management-content"
    contentSection.className = "container-fluid"
  
    // Create the header with title and add button
    const header = document.createElement("div")
    header.className = "d-flex justify-content-between align-items-center mb-4"
    header.innerHTML = `
      <h2>Supplier Management</h2>
      <button id="addSupplierBtn" class="btn btn-primary">
        <i class="fas fa-plus"></i> Add New Supplier
      </button>
    `
  
    // Create search bar
    const searchBar = document.createElement("div")
    searchBar.className = "mb-4"
    searchBar.innerHTML = `
      <div class="input-group">
        <span class="input-group-text"><i class="fas fa-search"></i></span>
        <input type="text" id="supplierSearchInput" class="form-control" placeholder="Search suppliers...">
      </div>
    `
  
    // Create table for suppliers
    const tableContainer = document.createElement("div")
    tableContainer.className = "table-responsive"
    tableContainer.innerHTML = `
      <table id="suppliersTable" class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier Name</th>
            <th>Contact Person</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="suppliersTableBody">
          <!-- Supplier data will be loaded here -->
        </tbody>
      </table>
    `
  
    // Create modal for adding/editing suppliers
    const modal = document.createElement("div")
    modal.className = "modal fade"
    modal.id = "supplierModal"
    modal.tabIndex = "-1"
    modal.setAttribute("aria-labelledby", "supplierModalLabel")
    modal.setAttribute("aria-hidden", "true")
    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="supplierModalLabel">Add New Supplier</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="supplierForm">
              <input type="hidden" id="supplierId">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="supplierName" class="form-label">Supplier Name*</label>
                  <input type="text" class="form-control" id="supplierName" required>
                </div>
                <div class="col-md-6">
                  <label for="contactPerson" class="form-label">Contact Person*</label>
                  <input type="text" class="form-control" id="contactPerson" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="supplierEmail" class="form-label">Email*</label>
                  <input type="email" class="form-control" id="supplierEmail" required>
                </div>
                <div class="col-md-6">
                  <label for="supplierPhone" class="form-label">Phone*</label>
                  <input type="tel" class="form-control" id="supplierPhone" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-12">
                  <label for="supplierAddress" class="form-label">Address</label>
                  <textarea class="form-control" id="supplierAddress" rows="2"></textarea>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="supplierCity" class="form-label">City</label>
                  <input type="text" class="form-control" id="supplierCity">
                </div>
                <div class="col-md-6">
                  <label for="supplierCountry" class="form-label">Country</label>
                  <input type="text" class="form-control" id="supplierCountry">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="supplierWebsite" class="form-label">Website</label>
                  <input type="url" class="form-control" id="supplierWebsite">
                </div>
                <div class="col-md-6">
                  <label for="supplierStatus" class="form-label">Status</label>
                  <select class="form-select" id="supplierStatus">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-12">
                  <label for="supplierNotes" class="form-label">Notes</label>
                  <textarea class="form-control" id="supplierNotes" rows="3"></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="saveSupplierBtn">Save</button>
          </div>
        </div>
      </div>
    `
  
    // Create view supplier modal
    const viewModal = document.createElement("div")
    viewModal.className = "modal fade"
    viewModal.id = "viewSupplierModal"
    viewModal.tabIndex = "-1"
    viewModal.setAttribute("aria-labelledby", "viewSupplierModalLabel")
    viewModal.setAttribute("aria-hidden", "true")
    viewModal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewSupplierModalLabel">Supplier Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="viewSupplierDetails">
            <!-- Supplier details will be loaded here -->
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
    deleteModal.id = "deleteSupplierModal"
    deleteModal.tabIndex = "-1"
    deleteModal.setAttribute("aria-labelledby", "deleteSupplierModalLabel")
    deleteModal.setAttribute("aria-hidden", "true")
    deleteModal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteSupplierModalLabel">Confirm Delete</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this supplier? This action cannot be undone.</p>
            <input type="hidden" id="deleteSupplierIdInput">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" id="confirmDeleteSupplierBtn">Delete</button>
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
  
  // Sample supplier data
  const sampleSuppliers = [
    {
      id: 1,
      name: "ABC Supplies Inc.",
      contactPerson: "John Smith",
      email: "john@abcsupplies.com",
      phone: "123-456-7890",
      address: "123 Main St",
      city: "New York",
      country: "USA",
      website: "www.abcsupplies.com",
      status: "Active",
      notes: "Reliable supplier for office equipment",
    },
    {
      id: 2,
      name: "Global Tech Solutions",
      contactPerson: "Jane Doe",
      email: "jane@globaltech.com",
      phone: "987-654-3210",
      address: "456 Tech Blvd",
      city: "San Francisco",
      country: "USA",
      website: "www.globaltech.com",
      status: "Active",
      notes: "IT hardware supplier",
    },
    {
      id: 3,
      name: "EcoFriendly Materials",
      contactPerson: "Robert Green",
      email: "robert@ecofriendly.com",
      phone: "555-123-4567",
      address: "789 Green Ave",
      city: "Portland",
      country: "USA",
      website: "www.ecofriendly.com",
      status: "Inactive",
      notes: "Sustainable packaging materials",
    },
    {
      id: 4,
      name: "Quick Logistics",
      contactPerson: "Sarah Johnson",
      email: "sarah@quicklogistics.com",
      phone: "444-555-6666",
      address: "101 Delivery Rd",
      city: "Chicago",
      country: "USA",
      website: "www.quicklogistics.com",
      status: "Active",
      notes: "Fast shipping partner",
    },
    {
      id: 5,
      name: "Premium Parts Ltd",
      contactPerson: "Michael Chen",
      email: "michael@premiumparts.com",
      phone: "777-888-9999",
      address: "202 Quality St",
      city: "Boston",
      country: "USA",
      website: "www.premiumparts.com",
      status: "Pending",
      notes: "High-quality manufacturing components",
    },
  ]
  
  // Function to initialize supplier management
  function initSupplierManagement() {
    // Load suppliers data
    loadSuppliers()
  
    // Add event listener for search input
    document.getElementById("supplierSearchInput").addEventListener("input", searchSuppliers)
  
    // Add event listener for add supplier button
    document.getElementById("addSupplierBtn").addEventListener("click", () => {
      // Reset form and show modal
      document.getElementById("supplierForm").reset()
      document.getElementById("supplierId").value = ""
      document.getElementById("supplierModalLabel").textContent = "Add New Supplier"
      const supplierModal = new bootstrap.Modal(document.getElementById("supplierModal"))
      supplierModal.show()
    })
  
    // Add event listener for save supplier button
    document.getElementById("saveSupplierBtn").addEventListener("click", saveSupplier)
  
    // Add event listener for confirm delete button
    document.getElementById("confirmDeleteSupplierBtn").addEventListener("click", deleteSupplier)
  }
  
  // Function to load suppliers data
  function loadSuppliers(filteredSuppliers = null) {
    const suppliers = filteredSuppliers || getSuppliersFromStorage()
    const tableBody = document.getElementById("suppliersTableBody")
    tableBody.innerHTML = ""
  
    suppliers.forEach((supplier) => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${supplier.id}</td>
        <td>${supplier.name}</td>
        <td>${supplier.contactPerson}</td>
        <td>${supplier.email}</td>
        <td>${supplier.phone}</td>
        <td><span class="badge ${getBadgeClass(supplier.status)}">${supplier.status}</span></td>
        <td>
          <button class="btn btn-sm btn-info view-supplier" data-id="${supplier.id}">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn btn-sm btn-primary edit-supplier" data-id="${supplier.id}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger delete-supplier" data-id="${supplier.id}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `
      tableBody.appendChild(row)
    })
  
    // Add event listeners for action buttons
    addActionButtonListeners()
  }
  
  // Function to get badge class based on status
  function getBadgeClass(status) {
    switch (status) {
      case "Active":
        return "bg-success"
      case "Inactive":
        return "bg-danger"
      case "Pending":
        return "bg-warning"
      default:
        return "bg-secondary"
    }
  }
  
  // Function to add event listeners for action buttons
  function addActionButtonListeners() {
    // View supplier buttons
    document.querySelectorAll(".view-supplier").forEach((button) => {
      button.addEventListener("click", (e) => {
        const supplierId = e.currentTarget.getAttribute("data-id")
        viewSupplier(supplierId)
      })
    })
  
    // Edit supplier buttons
    document.querySelectorAll(".edit-supplier").forEach((button) => {
      button.addEventListener("click", (e) => {
        const supplierId = e.currentTarget.getAttribute("data-id")
        editSupplier(supplierId)
      })
    })
  
    // Delete supplier buttons
    document.querySelectorAll(".delete-supplier").forEach((button) => {
      button.addEventListener("click", (e) => {
        const supplierId = e.currentTarget.getAttribute("data-id")
        confirmDeleteSupplier(supplierId)
      })
    })
  }
  
  // Function to view supplier details
  function viewSupplier(supplierId) {
    const suppliers = getSuppliersFromStorage()
    const supplier = suppliers.find((s) => s.id == supplierId)
  
    if (supplier) {
      const detailsContainer = document.getElementById("viewSupplierDetails")
      detailsContainer.innerHTML = `
        <div class="row">
          <div class="col-md-6">
            <p><strong>Supplier ID:</strong> ${supplier.id}</p>
            <p><strong>Supplier Name:</strong> ${supplier.name}</p>
            <p><strong>Contact Person:</strong> ${supplier.contactPerson}</p>
            <p><strong>Email:</strong> ${supplier.email}</p>
            <p><strong>Phone:</strong> ${supplier.phone}</p>
          </div>
          <div class="col-md-6">
            <p><strong>Address:</strong> ${supplier.address || "N/A"}</p>
            <p><strong>City:</strong> ${supplier.city || "N/A"}</p>
            <p><strong>Country:</strong> ${supplier.country || "N/A"}</p>
            <p><strong>Website:</strong> ${supplier.website ? `<a href="${supplier.website}" target="_blank">${supplier.website}</a>` : "N/A"}</p>
            <p><strong>Status:</strong> <span class="badge ${getBadgeClass(supplier.status)}">${supplier.status}</span></p>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
            <p><strong>Notes:</strong></p>
            <p>${supplier.notes || "No notes available"}</p>
          </div>
        </div>
      `
  
      const viewModal = new bootstrap.Modal(document.getElementById("viewSupplierModal"))
      viewModal.show()
    }
  }
  
  // Function to edit supplier
  function editSupplier(supplierId) {
    const suppliers = getSuppliersFromStorage()
    const supplier = suppliers.find((s) => s.id == supplierId)
  
    if (supplier) {
      // Fill the form with supplier data
      document.getElementById("supplierId").value = supplier.id
      document.getElementById("supplierName").value = supplier.name
      document.getElementById("contactPerson").value = supplier.contactPerson
      document.getElementById("supplierEmail").value = supplier.email
      document.getElementById("supplierPhone").value = supplier.phone
      document.getElementById("supplierAddress").value = supplier.address || ""
      document.getElementById("supplierCity").value = supplier.city || ""
      document.getElementById("supplierCountry").value = supplier.country || ""
      document.getElementById("supplierWebsite").value = supplier.website || ""
      document.getElementById("supplierStatus").value = supplier.status
      document.getElementById("supplierNotes").value = supplier.notes || ""
  
      // Update modal title
      document.getElementById("supplierModalLabel").textContent = "Edit Supplier"
  
      // Show the modal
      const supplierModal = new bootstrap.Modal(document.getElementById("supplierModal"))
      supplierModal.show()
    }
  }
  
  // Function to confirm delete supplier
  function confirmDeleteSupplier(supplierId) {
    document.getElementById("deleteSupplierIdInput").value = supplierId
    const deleteModal = new bootstrap.Modal(document.getElementById("deleteSupplierModal"))
    deleteModal.show()
  }
  
  // Function to delete supplier
  function deleteSupplier() {
    const supplierId = document.getElementById("deleteSupplierIdInput").value
    let suppliers = getSuppliersFromStorage()
  
    // Filter out the supplier to delete
    suppliers = suppliers.filter((s) => s.id != supplierId)
  
    // Save updated suppliers to storage
    saveSupplierToStorage(suppliers)
  
    // Close the modal
    const deleteModalInstance = bootstrap.Modal.getInstance(document.getElementById("deleteSupplierModal"))
    if (deleteModalInstance) {
      deleteModalInstance.hide()
    }
  
    // Reload suppliers table
    loadSuppliers()
  }
  
  // Function to save supplier
  function saveSupplier() {
    // Get form values
    const supplierId = document.getElementById("supplierId").value
    const name = document.getElementById("supplierName").value
    const contactPerson = document.getElementById("contactPerson").value
    const email = document.getElementById("supplierEmail").value
    const phone = document.getElementById("supplierPhone").value
    const address = document.getElementById("supplierAddress").value
    const city = document.getElementById("supplierCity").value
    const country = document.getElementById("supplierCountry").value
    const website = document.getElementById("supplierWebsite").value
    const status = document.getElementById("supplierStatus").value
    const notes = document.getElementById("supplierNotes").value
  
    // Validate required fields
    if (!name || !contactPerson || !email || !phone) {
      alert("Please fill in all required fields")
      return
    }
  
    // Get existing suppliers
    const suppliers = getSuppliersFromStorage()
  
    if (supplierId) {
      // Update existing supplier
      const index = suppliers.findIndex((s) => s.id == supplierId)
      if (index !== -1) {
        suppliers[index] = {
          id: Number.parseInt(supplierId),
          name,
          contactPerson,
          email,
          phone,
          address,
          city,
          country,
          website,
          status,
          notes,
        }
      }
    } else {
      // Add new supplier
      const newId = suppliers.length > 0 ? Math.max(...suppliers.map((s) => s.id)) + 1 : 1
      suppliers.push({
        id: newId,
        name,
        contactPerson,
        email,
        phone,
        address,
        city,
        country,
        website,
        status,
        notes,
      })
    }
  
    // Save to storage
    saveSupplierToStorage(suppliers)
  
    // Close the modal
    const supplierModalInstance = bootstrap.Modal.getInstance(document.getElementById("supplierModal"))
    if (supplierModalInstance) {
      supplierModalInstance.hide()
    }
  
    // Reload suppliers table
    loadSuppliers()
  }
  
  // Function to search suppliers
  function searchSuppliers() {
    const searchTerm = document.getElementById("supplierSearchInput").value.toLowerCase()
    const suppliers = getSuppliersFromStorage()
  
    if (!searchTerm) {
      loadSuppliers()
      return
    }
  
    const filteredSuppliers = suppliers.filter((supplier) => {
      return (
        supplier.name.toLowerCase().includes(searchTerm) ||
        supplier.contactPerson.toLowerCase().includes(searchTerm) ||
        supplier.email.toLowerCase().includes(searchTerm) ||
        supplier.phone.toLowerCase().includes(searchTerm) ||
        (supplier.address && supplier.address.toLowerCase().includes(searchTerm)) ||
        (supplier.city && supplier.city.toLowerCase().includes(searchTerm)) ||
        (supplier.country && supplier.country.toLowerCase().includes(searchTerm)) ||
        supplier.status.toLowerCase().includes(searchTerm)
      )
    })
  
    loadSuppliers(filteredSuppliers)
  }
  
  // Function to get suppliers from storage
  function getSuppliersFromStorage() {
    const suppliers = localStorage.getItem("suppliers")
    return suppliers ? JSON.parse(suppliers) : sampleSuppliers
  }
  
  // Function to save suppliers to storage
  function saveSupplierToStorage(suppliers) {
    localStorage.setItem("suppliers", JSON.stringify(suppliers))
  }
  
  // Function to update sidebar active state
  function updateSidebarActiveState(contentType) {
    // Remove active class from all sidebar items
    document.querySelectorAll("#sidebar ul li").forEach((item) => {
      item.classList.remove("active")
    })
  
    // Add active class to the clicked item
    let activeLink
    if (contentType === "supplier-management") {
      activeLink =
        document.querySelector(`#sidebar a[href="#"][onclick*="supplier-management"]`) ||
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
  
  // Remove the conflicting loadContent function
  // Instead, we'll use handleSupplierManagementClick for supplier management
  
  