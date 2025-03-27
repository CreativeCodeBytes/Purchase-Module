// Purchase Order Reports Management
document.addEventListener("DOMContentLoaded", function() {
    // Add event listener for the Purchase Order Reports menu item
    const purchaseOrderReportsLink = document.querySelector('a[onclick="loadContent(\'purchase-order-report\')"]');
    if (purchaseOrderReportsLink) {
      purchaseOrderReportsLink.removeAttribute("onclick");
      purchaseOrderReportsLink.addEventListener("click", function(e) {
        e.preventDefault();
        handlePurchaseOrderReportsClick();
      });
    }
  });
  
  // Sample data for purchase order reports
  let purchaseOrderReports = [
    { 
      id: 1, 
      date: '2024-12-18', 
      supplier: 'ABC Supplies', 
      products: 'Office Furniture, Stationery', 
      cost: 8500.00, 
      status: 'Pending',
      poNumber: 'PO-2024-001'
    },
    { 
      id: 2, 
      date: '2024-12-12', 
      supplier: 'XYZ Manufacturing', 
      products: 'Raw Materials, Packaging', 
      cost: 15750.00, 
      status: 'Approved',
      poNumber: 'PO-2024-002'
    },
    { 
      id: 3, 
      date: '2024-12-08', 
      supplier: 'Tech Solutions', 
      products: 'Computer Equipment, Software Licenses', 
      cost: 12300.00, 
      status: 'Rejected',
      poNumber: 'PO-2024-003'
    }
  ];
  
  // Function to handle Purchase Order Reports menu click
  function handlePurchaseOrderReportsClick() {
    // Hide all content sections first
    const allContentSections = document.querySelectorAll("#main-content > div");
    allContentSections.forEach((section) => {
      section.style.display = "none";
    });
  
    // Create or show the purchase order reports content section
    let contentSection = document.getElementById('purchase-order-report-content');
    
    if (!contentSection) {
      contentSection = createPurchaseOrderReportsContent();
      document.getElementById('main-content').appendChild(contentSection);
      initPurchaseOrderReportsEventListeners();
      renderPurchaseOrderReportsTable(purchaseOrderReports);
    } else {
      contentSection.style.display = 'block';
    }
    
    // Update active state in sidebar
    updateSidebarActiveState("purchase-order-report");
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      document.getElementById("sidebar").classList.add("active");
      document.getElementById("content").classList.add("active");
    }
  }
  
  // Function to create purchase order reports content section
  function createPurchaseOrderReportsContent() {
    const contentSection = document.createElement('div');
    contentSection.id = 'purchase-order-report-content';
    contentSection.className = 'container-fluid';
    
    contentSection.innerHTML = `
      <h2 class="mb-4">Purchase Order Reports</h2>
      
      <div class="row mb-4">
        <div class="col-md-8">
          <div class="input-group">
            <input type="text" id="purchase-order-reports-search" class="form-control" placeholder="Search purchase orders...">
            <button class="btn btn-primary" type="button" id="purchase-order-reports-search-btn">
              <i class="fas fa-search"></i> Search
            </button>
          </div>
        </div>
        <div class="col-md-4 text-end">
          <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addPurchaseOrderReportModal">
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
                  <label for="po-filter-date-from" class="form-label">Date From</label>
                  <input type="date" class="form-control" id="po-filter-date-from">
                </div>
                <div class="col-md-3 mb-3">
                  <label for="po-filter-date-to" class="form-label">Date To</label>
                  <input type="date" class="form-control" id="po-filter-date-to">
                </div>
                <div class="col-md-3 mb-3">
                  <label for="po-filter-supplier" class="form-label">Supplier</label>
                  <select class="form-select" id="po-filter-supplier">
                    <option value="">All Suppliers</option>
                    <option value="ABC Supplies">ABC Supplies</option>
                    <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                    <option value="Tech Solutions">Tech Solutions</option>
                    <option value="Global Logistics">Global Logistics</option>
                  </select>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="po-filter-status" class="form-label">Status</label>
                  <select class="form-select" id="po-filter-status">
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 text-end">
                  <button class="btn btn-primary" id="apply-po-reports-filters">Apply Filters</button>
                  <button class="btn btn-secondary" id="reset-po-reports-filters">Reset</button>
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
              <h5 class="card-title mb-0">Purchase Order Reports</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>PO Number</th>
                      <th>Date</th>
                      <th>Supplier</th>
                      <th>Products</th>
                      <th>Cost</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="purchase-order-reports-table-body">
                    <!-- Table content will be loaded dynamically -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Add Purchase Order Report Modal -->
      <div class="modal fade" id="addPurchaseOrderReportModal" tabindex="-1" aria-labelledby="addPurchaseOrderReportModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addPurchaseOrderReportModalLabel">Create New Purchase Order Report</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="add-purchase-order-report-form">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="po-date" class="form-label">Date</label>
                    <input type="date" class="form-control" id="po-date" required>
                  </div>
                  <div class="col-md-6">
                    <label for="po-number" class="form-label">PO Number</label>
                    <input type="text" class="form-control" id="po-number" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="po-supplier" class="form-label">Supplier</label>
                    <select class="form-select" id="po-supplier" required>
                      <option value="">Select Supplier</option>
                      <option value="ABC Supplies">ABC Supplies</option>
                      <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                      <option value="Tech Solutions">Tech Solutions</option>
                      <option value="Global Logistics">Global Logistics</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="po-cost" class="form-label">Total Cost</label>
                    <input type="number" class="form-control" id="po-cost" step="0.01" min="0" required>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="po-products" class="form-label">Products</label>
                  <textarea class="form-control" id="po-products" rows="3" required></textarea>
                  <small class="form-text text-muted">Enter products separated by commas</small>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="save-purchase-order-report">Save Report</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Edit Purchase Order Report Modal -->
      <div class="modal fade" id="editPurchaseOrderReportModal" tabindex="-1" aria-labelledby="editPurchaseOrderReportModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editPurchaseOrderReportModalLabel">Edit Purchase Order Report</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="edit-purchase-order-report-form">
                <input type="hidden" id="edit-po-id">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="edit-po-date" class="form-label">Date</label>
                    <input type="date" class="form-control" id="edit-po-date" required>
                  </div>
                  <div class="col-md-6">
                    <label for="edit-po-number" class="form-label">PO Number</label>
                    <input type="text" class="form-control" id="edit-po-number" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="edit-po-supplier" class="form-label">Supplier</label>
                    <select class="form-select" id="edit-po-supplier" required>
                      <option value="">Select Supplier</option>
                      <option value="ABC Supplies">ABC Supplies</option>
                      <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                      <option value="Tech Solutions">Tech Solutions</option>
                      <option value="Global Logistics">Global Logistics</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="edit-po-cost" class="form-label">Total Cost</label>
                    <input type="number" class="form-control" id="edit-po-cost" step="0.01" min="0" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="edit-po-status" class="form-label">Status</label>
                    <select class="form-select" id="edit-po-status" required>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="edit-po-products" class="form-label">Products</label>
                  <textarea class="form-control" id="edit-po-products" rows="3" required></textarea>
                  <small class="form-text text-muted">Enter products separated by commas</small>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="update-purchase-order-report">Update Report</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Delete Confirmation Modal -->
      <div class="modal fade" id="deletePurchaseOrderReportModal" tabindex="-1" aria-labelledby="deletePurchaseOrderReportModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deletePurchaseOrderReportModalLabel">Confirm Delete</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this purchase order report? This action cannot be undone.</p>
              <input type="hidden" id="delete-po-id">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="confirm-delete-po-report">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    return contentSection;
  }
  
  // Function to render the purchase order reports table
  function renderPurchaseOrderReportsTable(reports) {
    const tableBody = document.getElementById('purchase-order-reports-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (reports.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="7" class="text-center">No purchase order reports found</td>';
      tableBody.appendChild(row);
      return;
    }
    
    reports.forEach(report => {
      const row = document.createElement('tr');
      
      // Set row color based on status
      if (report.status === 'Approved') {
        row.classList.add('table-success');
      } else if (report.status === 'Rejected') {
        row.classList.add('table-danger');
      }
      
      row.innerHTML = `
        <td>${report.poNumber}</td>
        <td>${report.date}</td>
        <td>${report.supplier}</td>
        <td>${report.products}</td>
        <td>₹${report.cost.toFixed(2)}</td>
        <td>
          <span class="badge ${getBadgeClassPO(report.status)}">${report.status}</span>
        </td>
        <td>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-sm btn-primary edit-po-report" data-id="${report.id}">
              <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="btn btn-sm btn-danger delete-po-report" data-id="${report.id}">
              <i class="fas fa-trash"></i>
            </button>
            ${report.status === 'Pending' ? `
              <button type="button" class="btn btn-sm btn-success approve-po-report" data-id="${report.id}">
                <i class="fas fa-check"></i>
              </button>
              <button type="button" class="btn btn-sm btn-warning reject-po-report" data-id="${report.id}">
                <i class="fas fa-times"></i>
              </button>
            ` : ''}
          </div>
        </td>
      `;
      
      tableBody.appendChild(row);
    });
    
    // Re-attach event listeners to the new buttons
    attachPurchaseOrderReportActionListeners();
  }
  
  // Function to get the appropriate badge class based on status
  function getBadgeClassPO(status) {
    switch (status) {
      case 'Approved':
        return 'bg-success';
      case 'Rejected':
        return 'bg-danger';
      default:
        return 'bg-warning';
    }
  }
  
  // Function to initialize event listeners for the Purchase Order Reports section
  function initPurchaseOrderReportsEventListeners() {
    // Add new report
    document.getElementById('save-purchase-order-report').addEventListener('click', function() {
      try {
        const date = document.getElementById('po-date').value;
        const poNumber = document.getElementById('po-number').value;
        const supplier = document.getElementById('po-supplier').value;
        const cost = parseFloat(document.getElementById('po-cost').value);
        const products = document.getElementById('po-products').value;
        
        if (!date || !poNumber || !supplier || isNaN(cost) || !products) {
          alert('Please fill in all required fields');
          return;
        }
        
        const newId = purchaseOrderReports.length > 0 ? Math.max(...purchaseOrderReports.map(r => r.id)) + 1 : 1;
        
        const newReport = {
          id: newId,
          date: date,
          poNumber: poNumber,
          supplier: supplier,
          cost: cost,
          products: products,
          status: 'Pending'
        };
        
        purchaseOrderReports.push(newReport);
        
        // Close the modal first before rendering the table
        const modalElement = document.getElementById('addPurchaseOrderReportModal');
        const bootstrap = window.bootstrap;
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        } else {
          // If modal instance doesn't exist, create it and then hide
          new bootstrap.Modal(modalElement).hide();
        }
        
        // Reset form
        document.getElementById('add-purchase-order-report-form').reset();
        
        // Then render the table
        setTimeout(() => {
          renderPurchaseOrderReportsTable(purchaseOrderReports);
        }, 100);
      } catch (error) {
        console.error("Error saving purchase order report:", error);
        alert("An error occurred while saving the purchase order report. Please try again.");
      }
    });
    
    // Update report
    document.getElementById('update-purchase-order-report').addEventListener('click', function() {
      try {
        const id = parseInt(document.getElementById('edit-po-id').value);
        const date = document.getElementById('edit-po-date').value;
        const poNumber = document.getElementById('edit-po-number').value;
        const supplier = document.getElementById('edit-po-supplier').value;
        const cost = parseFloat(document.getElementById('edit-po-cost').value);
        const status = document.getElementById('edit-po-status').value;
        const products = document.getElementById('edit-po-products').value;
        
        if (!date || !poNumber || !supplier || isNaN(cost) || !status || !products) {
          alert('Please fill in all required fields');
          return;
        }
        
        const index = purchaseOrderReports.findIndex(r => r.id === id);
        if (index !== -1) {
          purchaseOrderReports[index] = {
            id: id,
            date: date,
            poNumber: poNumber,
            supplier: supplier,
            cost: cost,
            status: status,
            products: products
          };
          
          // Close the modal first before rendering the table
          const modalElement = document.getElementById('editPurchaseOrderReportModal');
          const bootstrap = window.bootstrap;
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          } else {
            // If modal instance doesn't exist, create it and then hide
            new bootstrap.Modal(modalElement).hide();
          }
          
          // Then render the table
          setTimeout(() => {
            renderPurchaseOrderReportsTable(purchaseOrderReports);
          }, 100);
        }
      } catch (error) {
        console.error("Error updating purchase order report:", error);
        alert("An error occurred while updating the purchase order report. Please try again.");
      }
    });
    
    // Delete report
    document.getElementById('confirm-delete-po-report').addEventListener('click', function() {
      try {
        const id = parseInt(document.getElementById('delete-po-id').value);
        
        purchaseOrderReports = purchaseOrderReports.filter(r => r.id !== id);
        
        // Close the modal first before rendering the table
        const modalElement = document.getElementById('deletePurchaseOrderReportModal');
        const bootstrap = window.bootstrap;
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        } else {
          // If modal instance doesn't exist, create it and then hide
          new bootstrap.Modal(modalElement).hide();
        }
        
        // Then render the table
        setTimeout(() => {
          renderPurchaseOrderReportsTable(purchaseOrderReports);
        }, 100);
      } catch (error) {
        console.error("Error deleting purchase order report:", error);
        alert("An error occurred while deleting the purchase order report. Please try again.");
      }
    });
    
    // Search functionality
    document.getElementById('purchase-order-reports-search-btn').addEventListener('click', function() {
      const searchTerm = document.getElementById('purchase-order-reports-search').value.toLowerCase();
      
      if (!searchTerm) {
        renderPurchaseOrderReportsTable(purchaseOrderReports);
        return;
      }
      
      const filteredReports = purchaseOrderReports.filter(report => 
        report.supplier.toLowerCase().includes(searchTerm) ||
        report.products.toLowerCase().includes(searchTerm) ||
        report.status.toLowerCase().includes(searchTerm) ||
        report.poNumber.toLowerCase().includes(searchTerm) ||
        report.id.toString().includes(searchTerm)
      );
      
      renderPurchaseOrderReportsTable(filteredReports);
    });
    
    // Filter functionality
    document.getElementById('apply-po-reports-filters').addEventListener('click', function() {
      const dateFrom = document.getElementById('po-filter-date-from').value;
      const dateTo = document.getElementById('po-filter-date-to').value;
      const supplier = document.getElementById('po-filter-supplier').value;
      const status = document.getElementById('po-filter-status').value;
      
      let filteredReports = [...purchaseOrderReports];
      
      if (dateFrom) {
        filteredReports = filteredReports.filter(report => report.date >= dateFrom);
      }
      
      if (dateTo) {
        filteredReports = filteredReports.filter(report => report.date <= dateTo);
      }
      
      if (supplier) {
        filteredReports = filteredReports.filter(report => report.supplier === supplier);
      }
      
      if (status) {
        filteredReports = filteredReports.filter(report => report.status === status);
      }
      
      renderPurchaseOrderReportsTable(filteredReports);
    });
    
    // Reset filters
    document.getElementById('reset-po-reports-filters').addEventListener('click', function() {
      document.getElementById('po-filter-date-from').value = '';
      document.getElementById('po-filter-date-to').value = '';
      document.getElementById('po-filter-supplier').value = '';
      document.getElementById('po-filter-status').value = '';
      
      renderPurchaseOrderReportsTable(purchaseOrderReports);
    });
  }
  
  // Function to attach action listeners to table buttons
  function attachPurchaseOrderReportActionListeners() {
    // Edit buttons
    document.querySelectorAll('.edit-po-report').forEach(button => {
      button.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        const report = purchaseOrderReports.find(r => r.id === id);
        
        if (report) {
          document.getElementById('edit-po-id').value = report.id;
          document.getElementById('edit-po-date').value = report.date;
          document.getElementById('edit-po-number').value = report.poNumber;
          document.getElementById('edit-po-supplier').value = report.supplier;
          document.getElementById('edit-po-cost').value = report.cost;
          document.getElementById('edit-po-status').value = report.status;
          document.getElementById('edit-po-products').value = report.products;
          
          const bootstrap = window.bootstrap;
          const modal = new bootstrap.Modal(document.getElementById('editPurchaseOrderReportModal'));
          modal.show();
        }
      });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-po-report').forEach(button => {
      button.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        document.getElementById('delete-po-id').value = id;
        
        const bootstrap = window.bootstrap;
        const modal = new bootstrap.Modal(document.getElementById('deletePurchaseOrderReportModal'));
        modal.show();
      });
    });
    
    // Approve buttons
    document.querySelectorAll('.approve-po-report').forEach(button => {
      button.addEventListener('click', function() {
        try {
          const id = parseInt(this.getAttribute('data-id'));
          const index = purchaseOrderReports.findIndex(r => r.id === id);
          
          if (index !== -1) {
            purchaseOrderReports[index].status = 'Approved';
            renderPurchaseOrderReportsTable(purchaseOrderReports);
          }
        } catch (error) {
          console.error("Error approving purchase order report:", error);
          alert("An error occurred while approving the purchase order report. Please try again.");
        }
      });
    });
    
    // Reject buttons
    document.querySelectorAll('.reject-po-report').forEach(button => {
      button.addEventListener('click', function() {
        try {
          const id = parseInt(this.getAttribute('data-id'));
          const index = purchaseOrderReports.findIndex(r => r.id === id);
          
          if (index !== -1) {
            purchaseOrderReports[index].status = 'Rejected';
            renderPurchaseOrderReportsTable(purchaseOrderReports);
          }
        } catch (error) {
          console.error("Error rejecting purchase order report:", error);
          alert("An error occurred while rejecting the purchase order report. Please try again.");
        }
      });
    });
  }
  
  // Function to update sidebar active state
  function updateSidebarActiveState(contentType) {
    // Remove active class from all sidebar items
    document.querySelectorAll("#sidebar ul li").forEach((item) => {
      item.classList.remove("active");
    });
  
    // Add active class to the clicked item
    let activeLink;
    if (contentType === "purchase-order-report") {
      activeLink = document.querySelector(`#sidebar a[href="#"][onclick*="purchase-order-report"]`) || 
                  document.querySelector(`#sidebar a[href="#"]:not([onclick])`);
    } else {
      activeLink = document.querySelector(`#sidebar a[onclick*="${contentType}"]`);
    }
  
    if (activeLink) {
      const parentLi = activeLink.closest("li");
      parentLi.classList.add("active");
  
      // If it's in a submenu, expand the parent menu
      const parentSubmenu = activeLink.closest("ul.collapse");
      if (parentSubmenu) {
        parentSubmenu.classList.add("show");
        const parentToggle = document.querySelector(`a[href="#${parentSubmenu.id}"]`);
        if (parentToggle) {
          parentToggle.setAttribute("aria-expanded", "true");
          parentToggle.classList.remove("collapsed");
        }
      }
    }
  }
