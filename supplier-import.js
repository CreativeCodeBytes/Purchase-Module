// Supplier Mass Import functionality

// Initialize when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
    // First approach: Try to find the link by the exact onclick attribute
    let supplierImportLink = document.querySelector("a[onclick=\"loadContent('supplier-import')\"]")
  
    // Second approach: If not found, try a more flexible selector
    if (!supplierImportLink) {
      supplierImportLink = document.querySelector("a[onclick*='supplier-import']")
    }
  
    // Third approach: Try to find it by text content
    if (!supplierImportLink) {
      const allLinks = document.querySelectorAll("#sidebar a")
      for (const link of allLinks) {
        if (link.textContent.trim() === "Supplier Mass Import") {
          supplierImportLink = link
          break
        }
      }
    }
  
    if (supplierImportLink) {
      console.log("Found Supplier Mass Import link:", supplierImportLink)
  
      // Remove the onclick attribute
      supplierImportLink.removeAttribute("onclick")
  
      // Add our event listener
      supplierImportLink.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("Supplier Mass Import clicked")
        handleSupplierImportClick()
      })
    } else {
      console.error("Could not find Supplier Mass Import link")
    }
  
    // Also add a direct event listener to the sidebar to catch any clicks
    const sidebar = document.getElementById("sidebar")
    if (sidebar) {
      sidebar.addEventListener("click", (e) => {
        // Check if the clicked element or its parent is the supplier import link
        const target = e.target
        const link = target.closest("a")
  
        if (
          link &&
          (link.textContent.trim() === "Supplier Mass Import" ||
            (link.getAttribute("onclick") && link.getAttribute("onclick").includes("supplier-import")))
        ) {
          e.preventDefault()
          e.stopPropagation()
          console.log("Supplier Mass Import clicked via delegation")
          handleSupplierImportClick()
        }
      })
    }
  
    // Add a global function that can be called from HTML
    window.openSupplierImport = () => {
      console.log("openSupplierImport called")
      handleSupplierImportClick()
    }
  
    // Try to modify the link directly in the DOM
    setTimeout(() => {
      const links = document.querySelectorAll("#sidebar a")
      for (const link of links) {
        if (link.textContent.trim() === "Supplier Mass Import") {
          // Replace the onclick with our custom function
          link.setAttribute("onclick", "openSupplierImport(); return false;")
          console.log("Modified Supplier Mass Import link with setTimeout")
        }
      }
    }, 1000) // Wait for 1 second to ensure DOM is fully loaded
  })
  
  // Function to handle supplier import menu click
  function handleSupplierImportClick() {
    console.log("handleSupplierImportClick called")
  
    // Hide all content sections first
    const allContentSections = document.querySelectorAll("#main-content > div")
    allContentSections.forEach((section) => {
      section.style.display = "none"
    })
  
    // Create or show the supplier import content section
    let contentSection = document.getElementById("supplier-import-content")
  
    if (!contentSection) {
      console.log("Creating new supplier import content section")
      contentSection = createSupplierImportSection()
      const mainContent = document.getElementById("main-content")
      if (mainContent) {
        mainContent.appendChild(contentSection)
        initSupplierImport()
      } else {
        console.error("Main content element not found")
      }
    } else {
      console.log("Showing existing supplier import content section")
      contentSection.style.display = "block"
    }
  
    // Update active state in sidebar
    updateSidebarActiveState("supplier-import")
  
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      const sidebar = document.getElementById("sidebar")
      const content = document.getElementById("content")
      if (sidebar) sidebar.classList.add("active")
      if (content) content.classList.add("active")
    }
  }
  
  // Declare loadContent (assuming it's defined elsewhere or needs a placeholder)
  // In a real application, you would ensure this function is properly defined and accessible.
  const loadContent = (contentType) => {
    console.warn(
      `loadContent('${contentType}') called, but function is not fully implemented.  Ensure it's defined in your main script.`,
    )
    // Placeholder implementation - replace with actual logic
    const contentSection = createContentSection(contentType)
    const mainContent = document.getElementById("main-content") // Assuming you have a main content area
    if (mainContent) {
      mainContent.innerHTML = "" // Clear existing content
      mainContent.appendChild(contentSection)
    } else {
      console.error('Main content area not found.  Ensure an element with id "main-content" exists.')
    }
  }
  
  function initSupplierImport() {
    console.log("Initializing supplier import")
    attachSupplierImportEventListeners()
  }
  
  // This function will be called from the main script when the Supplier Mass Import is clicked
  function createContentSection(contentType) {
    if (contentType === "supplier-import") {
      return createSupplierImportSection()
    }
  
    // For other content types, create a generic section (this should be handled by other JS files)
    const section = document.createElement("div")
    section.id = contentType + "-content"
    section.innerHTML = `<h2 class="mb-4">${contentType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</h2>
                         <p>Content for ${contentType} goes here.</p>`
    return section
  }
  
  // Function to create the supplier import section
  function createSupplierImportSection() {
    const section = document.createElement("div")
    section.id = "supplier-import-content"
    section.className = "container-fluid"
  
    section.innerHTML = `
      <h2 class="mb-4">Supplier Mass Import</h2>
      
      <div class="card mb-4">
        <div class="card-header">
          <h5 class="mb-0">Import Suppliers</h5>
        </div>
        <div class="card-body">
          <form id="supplier-import-form">
            <div class="mb-3">
              <label for="supplier-file" class="form-label">Upload Excel or CSV File</label>
              <input class="form-control" type="file" id="supplier-file" accept=".xlsx, .xls, .csv">
              <div class="form-text">Supported formats: .xlsx, .xls, .csv</div>
            </div>
            
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="header-row" checked>
                <label class="form-check-label" for="header-row">
                  First row contains headers
                </label>
              </div>
            </div>
            
            <button type="button" id="upload-suppliers" class="btn btn-primary">
              <i class="fas fa-upload me-2"></i>Upload and Import
            </button>
            
            <a href="#" id="download-template" class="btn btn-outline-secondary ms-2">
              <i class="fas fa-download me-2"></i>Download Template
            </a>
          </form>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Mass Suppliers</h5>
          <div>
            <button id="save-all-suppliers" class="btn btn-success btn-sm">
              <i class="fas fa-save me-1"></i>Save All
            </button>
            <button id="delete-selected-suppliers" class="btn btn-danger btn-sm ms-2">
              <i class="fas fa-trash me-1"></i>Delete Selected
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-hover" id="mass-suppliers-table">
              <thead>
                <tr>
                  <th><input type="checkbox" id="select-all-suppliers"></th>
                  <th>Supplier Name</th>
                  <th>Contact Person</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Tax ID</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="suppliers-table-body">
                <!-- Supplier data will be loaded here -->
                <tr>
                  <td colspan="9" class="text-center">No suppliers imported yet. Upload a file to begin.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="pagination-container" class="d-flex justify-content-between align-items-center mt-3">
            <div class="showing-entries">Showing 0 entries</div>
            <nav aria-label="Suppliers pagination">
              <ul class="pagination mb-0">
                <!-- Pagination will be generated here -->
              </ul>
            </nav>
          </div>
        </div>
      </div>
    `
  
    return section
  }
  
  // Attach event listeners to the supplier import elements
  function attachSupplierImportEventListeners() {
    const uploadBtn = document.getElementById("upload-suppliers")
    const downloadTemplateBtn = document.getElementById("download-template")
    const selectAllCheckbox = document.getElementById("select-all-suppliers")
    const saveAllBtn = document.getElementById("save-all-suppliers")
    const deleteSelectedBtn = document.getElementById("delete-selected-suppliers")
  
    if (uploadBtn) {
      uploadBtn.addEventListener("click", handleSupplierFileUpload)
      console.log("Attached event listener to upload button")
    }
  
    if (downloadTemplateBtn) {
      downloadTemplateBtn.addEventListener("click", downloadSupplierTemplate)
      console.log("Attached event listener to download template button")
    }
  
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener("change", toggleSelectAllSuppliers)
      console.log("Attached event listener to select all checkbox")
    }
  
    if (saveAllBtn) {
      saveAllBtn.addEventListener("click", saveAllSuppliers)
      console.log("Attached event listener to save all button")
    }
  
    if (deleteSelectedBtn) {
      deleteSelectedBtn.addEventListener("click", deleteSelectedSuppliers)
      console.log("Attached event listener to delete selected button")
    }
  }
  
  // Handle file upload and parse the data
  function handleSupplierFileUpload() {
    const fileInput = document.getElementById("supplier-file")
    const hasHeaderRow = document.getElementById("header-row").checked
  
    if (!fileInput.files.length) {
      showAlert("Please select a file to upload", "danger")
      return
    }
  
    const file = fileInput.files[0]
    const fileName = file.name.toLowerCase()
  
    if (!(fileName.endsWith(".xlsx") || fileName.endsWith(".xls") || fileName.endsWith(".csv"))) {
      showAlert("Please upload a valid Excel or CSV file", "danger")
      return
    }
  
    // Show loading indicator
    showAlert("Processing file, please wait...", "info")
  
    // In a real application, you would use libraries like SheetJS/xlsx or PapaParse
    // For this example, we'll simulate parsing with sample data
    setTimeout(() => {
      // Simulate successful file parsing
      const sampleData = [
        {
          name: "ABC Supplies Inc.",
          contactPerson: "John Smith",
          email: "john@abcsupplies.com",
          phone: "555-123-4567",
          address: "123 Business Ave, New York, NY 10001",
          taxId: "AB-12345678",
          status: "Active",
        },
        {
          name: "XYZ Corporation",
          contactPerson: "Jane Doe",
          email: "jane@xyzcorp.com",
          phone: "555-987-6543",
          address: "456 Industry Blvd, Chicago, IL 60601",
          taxId: "XY-87654321",
          status: "Active",
        },
        {
          name: "Global Traders Ltd",
          contactPerson: "Robert Johnson",
          email: "robert@globaltraders.com",
          phone: "555-456-7890",
          address: "789 Commerce St, Los Angeles, CA 90001",
          taxId: "GT-45678901",
          status: "Inactive",
        },
      ]
  
      displaySuppliers(sampleData)
      showAlert("File processed successfully. Found " + sampleData.length + " suppliers.", "success")
    }, 1000)
  }
  
  // Display suppliers in the table
  function displaySuppliers(suppliers) {
    const tableBody = document.getElementById("suppliers-table-body")
  
    if (!tableBody) return
  
    if (!suppliers.length) {
      tableBody.innerHTML = '<tr><td colspan="9" class="text-center">No suppliers found in the file.</td></tr>'
      return
    }
  
    let html = ""
  
    suppliers.forEach((supplier, index) => {
      html += `
        <tr data-supplier-id="${index}">
          <td><input type="checkbox" class="supplier-checkbox"></td>
          <td><input type="text" class="form-control form-control-sm" value="${supplier.name}"></td>
          <td><input type="text" class="form-control form-control-sm" value="${supplier.contactPerson}"></td>
          <td><input type="email" class="form-control form-control-sm" value="${supplier.email}"></td>
          <td><input type="text" class="form-control form-control-sm" value="${supplier.phone}"></td>
          <td><input type="text" class="form-control form-control-sm" value="${supplier.address}"></td>
          <td><input type="text" class="form-control form-control-sm" value="${supplier.taxId}"></td>
          <td>
            <select class="form-select form-select-sm">
              <option value="Active" ${supplier.status === "Active" ? "selected" : ""}>Active</option>
              <option value="Inactive" ${supplier.status === "Inactive" ? "selected" : ""}>Inactive</option>
            </select>
          </td>
          <td>
            <button class="btn btn-sm btn-primary save-supplier" title="Save">
              <i class="fas fa-save"></i>
            </button>
            <button class="btn btn-sm btn-danger delete-supplier" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `
    })
  
    tableBody.innerHTML = html
  
    // Update showing entries text
    document.querySelector(".showing-entries").textContent = `Showing ${suppliers.length} entries`
  
    // Add event listeners to the new buttons
    document.querySelectorAll(".save-supplier").forEach((btn) => {
      btn.addEventListener("click", function () {
        const row = this.closest("tr")
        saveSupplier(row)
      })
    })
  
    document.querySelectorAll(".delete-supplier").forEach((btn) => {
      btn.addEventListener("click", function () {
        const row = this.closest("tr")
        deleteSupplier(row)
      })
    })
  }
  
  // Download a template file for suppliers
  function downloadSupplierTemplate(e) {
    e.preventDefault()
  
    // In a real application, you would generate an actual Excel or CSV file
    // For this example, we'll just show an alert
    showAlert("Template download started. Check your downloads folder.", "success")
  
    // Simulate a file download by creating a temporary link
    const link = document.createElement("a")
    link.href = "data:text/csv;charset=utf-8,Supplier Name,Contact Person,Email,Phone,Address,Tax ID,Status\n,,,,,,"
    link.download = "supplier_import_template.csv"
    link.style.display = "none"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  // Toggle select all suppliers
  function toggleSelectAllSuppliers() {
    const selectAllCheckbox = document.getElementById("select-all-suppliers")
    const supplierCheckboxes = document.querySelectorAll(".supplier-checkbox")
  
    supplierCheckboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked
    })
  }
  
  // Save a single supplier
  function saveSupplier(row) {
    // In a real application, you would send this data to the server
    // For this example, we'll just show a success message
    showAlert("Supplier saved successfully", "success")
  }
  
  // Delete a single supplier
  function deleteSupplier(row) {
    if (confirm("Are you sure you want to delete this supplier?")) {
      row.remove()
      updateShowingEntries()
      showAlert("Supplier deleted successfully", "success")
    }
  }
  
  // Save all suppliers
  function saveAllSuppliers() {
    // In a real application, you would send all data to the server
    // For this example, we'll just show a success message
    const supplierRows = document.querySelectorAll("#suppliers-table-body tr")
  
    if (supplierRows.length === 0 || (supplierRows.length === 1 && supplierRows[0].querySelector("td").colSpan)) {
      showAlert("No suppliers to save", "warning")
      return
    }
  
    showAlert("All suppliers saved successfully", "success")
  }
  
  // Delete selected suppliers
  function deleteSelectedSuppliers() {
    const selectedCheckboxes = document.querySelectorAll(".supplier-checkbox:checked")
  
    if (selectedCheckboxes.length === 0) {
      showAlert("No suppliers selected for deletion", "warning")
      return
    }
  
    if (confirm(`Are you sure you want to delete ${selectedCheckboxes.length} selected supplier(s)?`)) {
      selectedCheckboxes.forEach((checkbox) => {
        checkbox.closest("tr").remove()
      })
  
      // Uncheck the "select all" checkbox
      const selectAllCheckbox = document.getElementById("select-all-suppliers")
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = false
      }
  
      updateShowingEntries()
      showAlert(`${selectedCheckboxes.length} supplier(s) deleted successfully`, "success")
    }
  }
  
  // Update the "Showing X entries" text
  function updateShowingEntries() {
    const supplierRows = document.querySelectorAll("#suppliers-table-body tr")
    const showingEntriesElement = document.querySelector(".showing-entries")
  
    if (showingEntriesElement) {
      // Check if there's only one row with a colspan (empty table message)
      if (supplierRows.length === 1 && supplierRows[0].querySelector("td").colSpan) {
        showingEntriesElement.textContent = "Showing 0 entries"
      } else {
        showingEntriesElement.textContent = `Showing ${supplierRows.length} entries`
      }
    }
  }
  
  // Show alert message
  function showAlert(message, type = "info") {
    // Check if an alert container already exists
    let alertContainer = document.getElementById("alert-container")
  
    // If not, create one
    if (!alertContainer) {
      alertContainer = document.createElement("div")
      alertContainer.id = "alert-container"
      alertContainer.style.position = "fixed"
      alertContainer.style.top = "20px"
      alertContainer.style.right = "20px"
      alertContainer.style.zIndex = "9999"
      document.body.appendChild(alertContainer)
    }
  
    // Create the alert
    const alert = document.createElement("div")
    alert.className = `alert alert-${type} alert-dismissible fade show`
    alert.role = "alert"
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `
  
    // Add the alert to the container
    alertContainer.appendChild(alert)
  
    // Remove the alert after 5 seconds
    setTimeout(() => {
      alert.classList.remove("show")
      setTimeout(() => {
        alertContainer.removeChild(alert)
      }, 150)
    }, 5000)
  }
  
  // Function to update sidebar active state (copied from supplier-management.js)
  function updateSidebarActiveState(contentType) {
    // Remove active class from all sidebar items
    document.querySelectorAll("#sidebar ul li").forEach((item) => {
      item.classList.remove("active")
    })
  
    // Add active class to the clicked item
    let activeLink
    if (contentType === "supplier-import") {
      // Try multiple selectors to find the right link
      activeLink =
        document.querySelector(`#sidebar a[href="#"][onclick*="supplier-import"]`) ||
        document.querySelector(`#sidebar a:contains("Supplier Mass Import")`) ||
        document.querySelector(`#sidebar a[href="#"]:not([onclick])`)
  
      // If still not found, try to find by text content
      if (!activeLink) {
        const allLinks = document.querySelectorAll("#sidebar a")
        for (const link of allLinks) {
          if (link.textContent.trim() === "Supplier Mass Import") {
            activeLink = link
            break
          }
        }
      }
    } else {
      activeLink = document.querySelector(`#sidebar a[onclick*="${contentType}"]`)
    }
  
    if (activeLink) {
      const parentLi = activeLink.closest("li")
      if (parentLi) {
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
  }
  
  // Add a direct modification to the HTML
  document.addEventListener("DOMContentLoaded", () => {
    // Try to find the supplier import link in the HTML
    setTimeout(() => {
      // Get the HTML content
      const html = document.documentElement.innerHTML
  
      // Check if we can find the supplier import link
      if (html.includes("supplier-import")) {
        console.log("Found supplier-import in HTML")
      } else {
        console.log("Could not find supplier-import in HTML")
  
        // Try to find the supplier management submenu
        const supplierManagementSubmenu = document.getElementById("supplierManagementSubmenu")
        if (supplierManagementSubmenu) {
          console.log("Found supplier management submenu")
  
          // Find the Supplier Mass Import item
          const items = supplierManagementSubmenu.querySelectorAll("li")
          for (const item of items) {
            if (item.textContent.trim() === "Supplier Mass Import") {
              console.log("Found Supplier Mass Import item")
              const link = item.querySelector("a")
              if (link) {
                console.log("Found Supplier Mass Import link, modifying it")
                link.setAttribute("onclick", "openSupplierImport(); return false;")
              }
            }
          }
        }
      }
    }, 500)
  
    // Add a direct click handler to the document
    document.addEventListener("click", (e) => {
      // Check if the clicked element is the Supplier Mass Import link
      if (e.target && e.target.textContent && e.target.textContent.trim() === "Supplier Mass Import") {
        console.log("Supplier Mass Import clicked via document event listener")
        e.preventDefault()
        e.stopPropagation()
        handleSupplierImportClick()
      }
  
      // Also check parent elements
      let parent = e.target.parentElement
      while (parent) {
        if (parent.textContent && parent.textContent.trim() === "Supplier Mass Import") {
          console.log("Supplier Mass Import parent clicked via document event listener")
          e.preventDefault()
          e.stopPropagation()
          handleSupplierImportClick()
          break
        }
        parent = parent.parentElement
      }
    })
  })
  
  // Add a direct modification to the HTML
  setTimeout(() => {
    // Try to directly modify the HTML
    const supplierImportLink = document.querySelector('a[onclick*="supplier-import"]')
    if (supplierImportLink) {
      console.log("Found supplier import link via setTimeout, modifying it")
      supplierImportLink.setAttribute("onclick", "openSupplierImport(); return false;")
    } else {
      console.log("Could not find supplier import link via setTimeout")
  
      // Try to find by text content
      const allLinks = document.querySelectorAll("a")
      for (const link of allLinks) {
        if (link.textContent.trim() === "Supplier Mass Import") {
          console.log("Found supplier import link by text via setTimeout, modifying it")
          link.setAttribute("onclick", "openSupplierImport(); return false;")
        }
      }
    }
  }, 1000)
  
  // Add a global function to handle the supplier import
  window.openSupplierImport = () => {
    console.log("openSupplierImport global function called")
    handleSupplierImportClick()
    return false
  }
  
  // Also add a direct modification to the HTML
  const script = document.createElement("script")
  script.textContent = `
    // Add a global function to handle the supplier import
    function openSupplierImport() {
      console.log("openSupplierImport inline script function called");
      
      // Hide all content sections first
      const allContentSections = document.querySelectorAll("#main-content > div");
      allContentSections.forEach((section) => {
        section.style.display = "none";
      });
  
      // Create or show the supplier import content section
      let contentSection = document.getElementById("supplier-import-content");
  
      if (!contentSection) {
        console.log("Creating new supplier import content section from inline script");
        // Create the section
        contentSection = document.createElement('div');
        contentSection.id = 'supplier-import-content';
        contentSection.className = "container-fluid";
        
        contentSection.innerHTML = \`
          <h2 class="mb-4">Supplier Mass Import</h2>
          
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">Import Suppliers</h5>
            </div>
            <div class="card-body">
              <form id="supplier-import-form">
                <div class="mb-3">
                  <label for="supplier-file" class="form-label">Upload Excel or CSV File</label>
                  <input class="form-control" type="file" id="supplier-file" accept=".xlsx, .xls, .csv">
                  <div class="form-text">Supported formats: .xlsx, .xls, .csv</div>
                </div>
                
                <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="header-row" checked>
                    <label class="form-check-label" for="header-row">
                      First row contains headers
                    </label>
                  </div>
                </div>
                
                <button type="button" id="upload-suppliers" class="btn btn-primary">
                  <i class="fas fa-upload me-2"></i>Upload and Import
                </button>
                
                <a href="#" id="download-template" class="btn btn-outline-secondary ms-2">
                  <i class="fas fa-download me-2"></i>Download Template
                </a>
              </form>
            </div>
          </div>
          
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Mass Suppliers</h5>
              <div>
                <button id="save-all-suppliers" class="btn btn-success btn-sm">
                  <i class="fas fa-save me-1"></i>Save All
                </button>
                <button id="delete-selected-suppliers" class="btn btn-danger btn-sm ms-2">
                  <i class="fas fa-trash me-1"></i>Delete Selected
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped table-hover" id="mass-suppliers-table">
                  <thead>
                    <tr>
                      <th><input type="checkbox" id="select-all-suppliers"></th>
                      <th>Supplier Name</th>
                      <th>Contact Person</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Tax ID</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="suppliers-table-body">
                    <!-- Supplier data will be loaded here -->
                    <tr>
                      <td colspan="9" class="text-center">No suppliers imported yet. Upload a file to begin.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="pagination-container" class="d-flex justify-content-between align-items-center mt-3">
                <div class="showing-entries">Showing 0 entries</div>
                <nav aria-label="Suppliers pagination">
                  <ul class="pagination mb-0">
                    <!-- Pagination will be generated here -->
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        \`;
        
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.appendChild(contentSection);
          
          // Add event listeners
          setTimeout(function() {
            const uploadBtn = document.getElementById('upload-suppliers');
            const downloadTemplateBtn = document.getElementById('download-template');
            const selectAllCheckbox = document.getElementById('select-all-suppliers');
            const saveAllBtn = document.getElementById('save-all-suppliers');
            const deleteSelectedBtn = document.getElementById('delete-selected-suppliers');
            
            if (uploadBtn) {
              uploadBtn.addEventListener('click', function() {
                alert('File upload functionality would be implemented here.');
              });
            }
            
            if (downloadTemplateBtn) {
              downloadTemplateBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Template download functionality would be implemented here.');
              });
            }
            
            if (selectAllCheckbox) {
              selectAllCheckbox.addEventListener('change', function() {
                const supplierCheckboxes = document.querySelectorAll('.supplier-checkbox');
                supplierCheckboxes.forEach(checkbox => {
                  checkbox.checked = this.checked;
                });
              });
            }
            
            if (saveAllBtn) {
              saveAllBtn.addEventListener('click', function() {
                alert('Save all functionality would be implemented here.');
              });
            }
            
            if (deleteSelectedBtn) {
              deleteSelectedBtn.addEventListener('click', function() {
                alert('Delete selected functionality would be implemented here.');
              });
            }
          }, 100);
        } else {
          console.error("Main content element not found from inline script");
        }
      } else {
        console.log("Showing existing supplier import content section from inline script");
        contentSection.style.display = "block";
      }
  
      // Update active state in sidebar
      const sidebarItems = document.querySelectorAll("#sidebar ul li");
      sidebarItems.forEach((item) => {
        item.classList.remove("active");
      });
  
      // Find and activate the supplier import menu item
      const allLinks = document.querySelectorAll("#sidebar a");
      for (const link of allLinks) {
        if (link.textContent.trim() === "Supplier Mass Import") {
          const parentLi = link.closest("li");
          if (parentLi) {
            parentLi.classList.add("active");
            
            // If it's in a submenu, expand the parent menu
            const parentSubmenu = link.closest("ul.collapse");
            if (parentSubmenu) {
              parentSubmenu.classList.add("show");
              const parentToggle = document.querySelector(\`a[href="#\${parentSubmenu.id}"]\`);
              if (parentToggle) {
                parentToggle.setAttribute("aria-expanded", "true");
                parentToggle.classList.remove("collapsed");
              }
            }
          }
          break;
        }
      }
  
      // Close sidebar on mobile after navigation
      if (window.innerWidth < 768) {
        const sidebar = document.getElementById("sidebar");
        const content = document.getElementById("content");
        if (sidebar) sidebar.classList.add("active");
        if (content) content.classList.add("active");
      }
      
      return false;
    }
  `
  
  document.head.appendChild(script)
  
  