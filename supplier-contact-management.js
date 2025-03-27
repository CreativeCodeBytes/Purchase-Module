// Supplier Contact Management JavaScript File

// Initialize when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
    // If supplier contact content is loaded, initialize it
    if (document.getElementById("supplier-contact-content")) {
      initSupplierContact()
    }
  
    // Add event listener for the supplier contact management menu item
    const supplierContactLink = document.querySelector("a[onclick=\"loadContent('supplier-contact')\"]")
    if (supplierContactLink) {
      supplierContactLink.removeAttribute("onclick")
      supplierContactLink.addEventListener("click", (e) => {
        e.preventDefault()
        handleSupplierContactClick()
      })
    }
  })
  
  // Function to handle supplier contact menu click
  function handleSupplierContactClick() {
    // Hide all content sections first
    const allContentSections = document.querySelectorAll("#main-content > div")
    allContentSections.forEach((section) => {
      section.style.display = "none"
    })
  
    // Create or show the supplier contact content section
    let contentSection = document.getElementById("supplier-contact-content")
  
    if (!contentSection) {
      contentSection = createSupplierContactContent()
      document.getElementById("main-content").appendChild(contentSection)
      initSupplierContact()
    } else {
      contentSection.style.display = "block"
    }
  
    // Update active state in sidebar
    updateSidebarActiveState("supplier-contact")
  
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      document.getElementById("sidebar").classList.add("active")
      document.getElementById("content").classList.add("active")
    }
  }
  
  // Function to create supplier contact content section if it doesn't exist
  function createSupplierContactContent() {
    const contentSection = document.createElement("div")
    contentSection.id = "supplier-contact-content"
    contentSection.className = "container-fluid"
  
    // Create the header with title and add button
    const header = document.createElement("div")
    header.className = "d-flex justify-content-between align-items-center mb-4"
    header.innerHTML = `
      <h2>Supplier Contact Management</h2>
      <button id="addContactBtn" class="btn btn-primary">
        <i class="fas fa-plus"></i> Add New Contact
      </button>
    `
  
    // Create search bar
    const searchBar = document.createElement("div")
    searchBar.className = "mb-4"
    searchBar.innerHTML = `
      <div class="input-group">
        <span class="input-group-text"><i class="fas fa-search"></i></span>
        <input type="text" id="contactSearchInput" class="form-control" placeholder="Search contacts...">
      </div>
    `
  
    // Create table for contacts
    const tableContainer = document.createElement("div")
    tableContainer.className = "table-responsive"
    tableContainer.innerHTML = `
      <table id="contactsTable" class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier</th>
            <th>Contact Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Primary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="contactsTableBody">
          <!-- Contact data will be loaded here -->
        </tbody>
      </table>
    `
  
    // Create modal for adding/editing contacts
    const modal = document.createElement("div")
    modal.className = "modal fade"
    modal.id = "contactModal"
    modal.tabIndex = "-1"
    modal.setAttribute("aria-labelledby", "contactModalLabel")
    modal.setAttribute("aria-hidden", "true")
    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="contactModalLabel">Add New Contact</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="contactForm">
              <input type="hidden" id="contactId">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="supplierSelect" class="form-label">Supplier*</label>
                  <select class="form-select" id="supplierSelect" required>
                    <option value="">Select Supplier</option>
                     <option value="ABC Supplies">ABC Supplies</option>
                        <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                        <option value="Global Logistics">Global Logistics</option>
                        <option value="Tech Solutions">Tech Solutions</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="contactName" class="form-label">Contact Name*</label>
                  <input type="text" class="form-control" id="contactName" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="contactPosition" class="form-label">Position*</label>
                  <input type="text" class="form-control" id="contactPosition" required>
                </div>
                <div class="col-md-6">
                  <label for="contactDepartment" class="form-label">Department</label>
                  <input type="text" class="form-control" id="contactDepartment">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="contactEmail" class="form-label">Email*</label>
                  <input type="email" class="form-control" id="contactEmail" required>
                </div>
                <div class="col-md-6">
                  <label for="contactPhone" class="form-label">Phone*</label>
                  <input type="tel" class="form-control" id="contactPhone" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="contactMobile" class="form-label">Mobile</label>
                  <input type="tel" class="form-control" id="contactMobile">
                </div>
                <div class="col-md-6">
                  <div class="form-check mt-4">
                    <input class="form-check-input" type="checkbox" id="isPrimaryContact">
                    <label class="form-check-label" for="isPrimaryContact">
                      Primary Contact
                    </label>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-12">
                  <label for="contactNotes" class="form-label">Notes</label>
                  <textarea class="form-control" id="contactNotes" rows="3"></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="saveContactBtn">Save</button>
          </div>
        </div>
      </div>
    `
  
    // Create view contact modal
    const viewModal = document.createElement("div")
    viewModal.className = "modal fade"
    viewModal.id = "viewContactModal"
    viewModal.tabIndex = "-1"
    viewModal.setAttribute("aria-labelledby", "viewContactModalLabel")
    viewModal.setAttribute("aria-hidden", "true")
    viewModal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewContactModalLabel">Contact Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="viewContactDetails">
            <!-- Contact details will be loaded here -->
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
    deleteModal.id = "deleteContactModal"
    deleteModal.tabIndex = "-1"
    deleteModal.setAttribute("aria-labelledby", "deleteContactModalLabel")
    deleteModal.setAttribute("aria-hidden", "true")
    deleteModal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteContactModalLabel">Confirm Delete</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this contact? This action cannot be undone.</p>
            <input type="hidden" id="deleteContactIdInput">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" id="confirmDeleteContactBtn">Delete</button>
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
  
  // Sample contact data
  const sampleContacts = [
    {
      id: 1,
      supplierId: 1,
      supplierName: "ABC Supplies Inc.",
      name: "Vijay Raj",
      position: "Sales Manager",
      department: "Sales",
      email: "vijay@abcsupplies.com",
      phone: "8234567890",
      mobile: "8234567891",
      isPrimary: true,
      notes: "Main point of contact for all orders",
    },
    {
      id: 2,
      supplierId: 1,
      supplierName: "ABC Supplies Inc.",
      name: "Sara Raut",
      position: "Account Manager",
      department: "Accounts",
      email: "sara@abcsupplies.com",
      phone: "9234567892",
      mobile: "9234567893",
      isPrimary: false,
      notes: "Handles billing and payment inquiries",
    },
    {
      id: 3,
      supplierId: 2,
      supplierName: "Global Tech Solutions",
      name: "Mangesh Patil",
      position: "Technical Support Manager",
      department: "Support",
      email: "mangesh@globaltech.com",
      phone: "9876543211",
      mobile: "9876543211",
      isPrimary: true,
      notes: "Contact for technical issues and support",
    },
    {
      id: 4,
      supplierId: 3,
      supplierName: "EcoFriendly Materials",
      name: "Rohan Shinde",
      position: "CEO",
      department: "Executive",
      email: "rohan@ecofriendly.com",
      phone: "9551234567",
      mobile: "9551234568",
      isPrimary: true,
      notes: "Decision maker for all major contracts",
    },
    {
      id: 5,
      supplierId: 4,
      supplierName: "Quick Logistics",
      name: "Lisa Roy",
      position: "Logistics Coordinator",
      department: "Operations",
      email: "lisa@quicklogistics.com",
      phone: "7445556667",
      mobile: "7445556667",
      isPrimary: true,
      notes: "Handles shipping and delivery coordination",
    },
  ]
  
  // Function to initialize supplier contact
  function initSupplierContact() {
    // Load contacts data
    loadContacts()
  
    // Load suppliers for dropdown
    loadSuppliersDropdown()
  
    // Add event listener for search input
    document.getElementById("contactSearchInput").addEventListener("input", searchContacts)
  
    // Add event listener for add contact button
    document.getElementById("addContactBtn").addEventListener("click", () => {
      // Reset form and show modal
      document.getElementById("contactForm").reset()
      document.getElementById("contactId").value = ""
      document.getElementById("contactModalLabel").textContent = "Add New Contact"
  
      // Declare bootstrap variable
      const bootstrap = window.bootstrap
      const contactModal = new bootstrap.Modal(document.getElementById("contactModal"))
      contactModal.show()
    })
  
    // Add event listener for save contact button
    document.getElementById("saveContactBtn").addEventListener("click", saveContact)
  
    // Add event listener for confirm delete button
    document.getElementById("confirmDeleteContactBtn").addEventListener("click", deleteContact)
  }
  
  // Function to load contacts data
  function loadContacts(filteredContacts = null) {
    const contacts = filteredContacts || getContactsFromStorage()
    const tableBody = document.getElementById("contactsTableBody")
    tableBody.innerHTML = ""
  
    contacts.forEach((contact) => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${contact.id}</td>
        <td>${contact.supplierName}</td>
        <td>${contact.name}</td>
        <td>${contact.position}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td>${contact.isPrimary ? '<span class="badge bg-success">Primary</span>' : ""}</td>
        <td>
          <button class="btn btn-sm btn-info view-contact" data-id="${contact.id}">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn btn-sm btn-primary edit-contact" data-id="${contact.id}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger delete-contact" data-id="${contact.id}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `
      tableBody.appendChild(row)
    })
  
    // Add event listeners for action buttons
    addContactActionButtonListeners()
  }
  
  // Function to load suppliers for dropdown
  function loadSuppliersDropdown() {
    const suppliers = getSuppliersFromStorage()
    const supplierSelect = document.getElementById("supplierSelect")
  
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
  
  // Function to add event listeners for action buttons
  function addContactActionButtonListeners() {
    // View contact buttons
    document.querySelectorAll(".view-contact").forEach((button) => {
      button.addEventListener("click", (e) => {
        const contactId = e.currentTarget.getAttribute("data-id")
        viewContact(contactId)
      })
    })
  
    // Edit contact buttons
    document.querySelectorAll(".edit-contact").forEach((button) => {
      button.addEventListener("click", (e) => {
        const contactId = e.currentTarget.getAttribute("data-id")
        editContact(contactId)
      })
    })
  
    // Delete contact buttons
    document.querySelectorAll(".delete-contact").forEach((button) => {
      button.addEventListener("click", (e) => {
        const contactId = e.currentTarget.getAttribute("data-id")
        confirmDeleteContact(contactId)
      })
    })
  }
  
  // Function to view contact details
  function viewContact(contactId) {
    const contacts = getContactsFromStorage()
    const contact = contacts.find((c) => c.id == contactId)
  
    if (contact) {
      const detailsContainer = document.getElementById("viewContactDetails")
      detailsContainer.innerHTML = `
        <div class="row">
          <div class="col-md-6">
            <p><strong>Contact ID:</strong> ${contact.id}</p>
            <p><strong>Supplier:</strong> ${contact.supplierName}</p>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Position:</strong> ${contact.position}</p>
            <p><strong>Department:</strong> ${contact.department || "N/A"}</p>
          </div>
          <div class="col-md-6">
            <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></p>
            <p><strong>Mobile:</strong> ${contact.mobile ? `<a href="tel:${contact.mobile}">${contact.mobile}</a>` : "N/A"}</p>
            <p><strong>Primary Contact:</strong> ${contact.isPrimary ? "Yes" : "No"}</p>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
            <p><strong>Notes:</strong></p>
            <p>${contact.notes || "No notes available"}</p>
          </div>
        </div>
      `
  
      // Declare bootstrap variable
      const bootstrap = window.bootstrap
      const viewModal = new bootstrap.Modal(document.getElementById("viewContactModal"))
      viewModal.show()
    }
  }
  
  // Function to edit contact
  function editContact(contactId) {
    const contacts = getContactsFromStorage()
    const contact = contacts.find((c) => c.id == contactId)
  
    if (contact) {
      // Fill the form with contact data
      document.getElementById("contactId").value = contact.id
      document.getElementById("supplierSelect").value = contact.supplierId
      document.getElementById("contactName").value = contact.name
      document.getElementById("contactPosition").value = contact.position
      document.getElementById("contactDepartment").value = contact.department || ""
      document.getElementById("contactEmail").value = contact.email
      document.getElementById("contactPhone").value = contact.phone
      document.getElementById("contactMobile").value = contact.mobile || ""
      document.getElementById("isPrimaryContact").checked = contact.isPrimary
      document.getElementById("contactNotes").value = contact.notes || ""
  
      // Update modal title
      document.getElementById("contactModalLabel").textContent = "Edit Contact"
  
      // Declare bootstrap variable
      const bootstrap = window.bootstrap
      // Show the modal
      const contactModal = new bootstrap.Modal(document.getElementById("contactModal"))
      contactModal.show()
    }
  }
  
  // Function to confirm delete contact
  function confirmDeleteContact(contactId) {
    document.getElementById("deleteContactIdInput").value = contactId
    // Declare bootstrap variable
    const bootstrap = window.bootstrap
    const deleteModal = new bootstrap.Modal(document.getElementById("deleteContactModal"))
    deleteModal.show()
  }
  
  // Function to delete contact
  function deleteContact() {
    const contactId = document.getElementById("deleteContactIdInput").value
    let contacts = getContactsFromStorage()
  
    // Filter out the contact to delete
    contacts = contacts.filter((c) => c.id != contactId)
  
    // Save updated contacts to storage
    saveContactsToStorage(contacts)
  
    // Declare bootstrap variable
    const bootstrap = window.bootstrap
    // Close the modal
    const deleteModalInstance = bootstrap.Modal.getInstance(document.getElementById("deleteContactModal"))
    if (deleteModalInstance) {
      deleteModalInstance.hide()
    }
  
    // Reload contacts table
    loadContacts()
  }
  
  // Function to save contact
  function saveContact() {
    // Get form values
    const contactId = document.getElementById("contactId").value
    const supplierId = document.getElementById("supplierSelect").value
    const name = document.getElementById("contactName").value
    const position = document.getElementById("contactPosition").value
    const department = document.getElementById("contactDepartment").value
    const email = document.getElementById("contactEmail").value
    const phone = document.getElementById("contactPhone").value
    const mobile = document.getElementById("contactMobile").value
    const isPrimary = document.getElementById("isPrimaryContact").checked
    const notes = document.getElementById("contactNotes").value
  
    // Validate required fields
    if (!supplierId || !name || !position || !email || !phone) {
      alert("Please fill in all required fields")
      return
    }
  
    // Get supplier name
    const suppliers = getSuppliersFromStorage()
    const supplier = suppliers.find((s) => s.id == supplierId)
  
    if (!supplier) {
      alert("Please select a valid supplier")
      return
    }
  
    // Get existing contacts
    let contacts = getContactsFromStorage()
  
    // If this is a primary contact, update other contacts for this supplier
    if (isPrimary) {
      contacts = contacts.map((contact) => {
        if (contact.supplierId == supplierId && contact.id != contactId) {
          return { ...contact, isPrimary: false }
        }
        return contact
      })
    }
  
    if (contactId) {
      // Update existing contact
      const index = contacts.findIndex((c) => c.id == contactId)
      if (index !== -1) {
        contacts[index] = {
          id: Number.parseInt(contactId),
          supplierId: Number.parseInt(supplierId),
          supplierName: supplier.name,
          name,
          position,
          department,
          email,
          phone,
          mobile,
          isPrimary,
          notes,
        }
      }
    } else {
      // Add new contact
      const newId = contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) + 1 : 1
      contacts.push({
        id: newId,
        supplierId: Number.parseInt(supplierId),
        supplierName: supplier.name,
        name,
        position,
        department,
        email,
        phone,
        mobile,
        isPrimary,
        notes,
      })
    }
  
    // Save to storage
    saveContactsToStorage(contacts)
  
    // Declare bootstrap variable
    const bootstrap = window.bootstrap
    // Close the modal
    const contactModalInstance = bootstrap.Modal.getInstance(document.getElementById("contactModal"))
    if (contactModalInstance) {
      contactModalInstance.hide()
    }
  
    // Reload contacts table
    loadContacts()
  }
  
  // Function to search contacts
  function searchContacts() {
    const searchTerm = document.getElementById("contactSearchInput").value.toLowerCase()
    const contacts = getContactsFromStorage()
  
    if (!searchTerm) {
      loadContacts()
      return
    }
  
    const filteredContacts = contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.position.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm) ||
        contact.phone.toLowerCase().includes(searchTerm) ||
        contact.supplierName.toLowerCase().includes(searchTerm) ||
        (contact.department && contact.department.toLowerCase().includes(searchTerm)) ||
        (contact.mobile && contact.mobile.toLowerCase().includes(searchTerm)) ||
        (contact.notes && contact.notes.toLowerCase().includes(searchTerm))
      )
    })
  
    loadContacts(filteredContacts)
  }
  
  // Function to get contacts from storage
  function getContactsFromStorage() {
    const contacts = localStorage.getItem("supplierContacts")
    return contacts ? JSON.parse(contacts) : sampleContacts
  }
  
  // Function to save contacts to storage
  function saveContactsToStorage(contacts) {
    localStorage.setItem("supplierContacts", JSON.stringify(contacts))
  }
  
  // Function to get suppliers from storage
  function getSuppliersFromStorage() {
    const suppliers = localStorage.getItem("suppliers")
    return suppliers ? JSON.parse(suppliers) : []
  }
  
  // Function to update sidebar active state
  function updateSidebarActiveState(contentType) {
    // Remove active class from all sidebar items
    document.querySelectorAll("#sidebar ul li").forEach((item) => {
      item.classList.remove("active")
    })
  
    // Add active class to the clicked item
    let activeLink
    if (contentType === "supplier-contact") {
      activeLink =
        document.querySelector(`#sidebar a[href="#"][onclick*="supplier-contact"]`) ||
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
  
  