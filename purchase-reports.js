// Purchase Reports Management
document.addEventListener("DOMContentLoaded", () => {
    
    // Add event listener for the Purchase Reports menu item
    const purchaseReportsLink = document.querySelector('a[onclick="loadContent(\'purchase-reports\')"]');
    if (purchaseReportsLink) {
      purchaseReportsLink.removeAttribute("onclick");
      purchaseReportsLink.addEventListener("click", (e) => {
        e.preventDefault();
        handlePurchaseReportsClick();
      });
    }
  });
  
  // Sample data for purchase reports
  let purchaseReports = [
    { 
      id: 1, 
      date: '2024-12-15', 
      supplier: 'ABC Supplies', 
      amount: 5000.00, 
      paymentMethod: 'Bank Transfer', 
      status: 'Pending',
      description: 'Monthly office supplies payment'
    },
    { 
      id: 2, 
      date: '2024-12-10', 
      supplier: 'XYZ Manufacturing', 
      amount: 12500.00, 
      paymentMethod: 'Credit Card', 
      status: 'Approved',
      description: 'Raw materials purchase'
    },
    { 
      id: 3, 
      date: '2024-12-05', 
      supplier: 'Global Logistics', 
      amount: 3750.00, 
      paymentMethod: 'Check', 
      status: 'Rejected',
      description: 'Shipping services'
    }
  ];
  
  // Function to handle Purchase Reports menu click
  function handlePurchaseReportsClick() {
    // Hide all content sections first
    const allContentSections = document.querySelectorAll("#main-content > div");
    allContentSections.forEach((section) => {
      section.style.display = "none";
    });
  
    // Create or show the purchase reports content section
    let contentSection = document.getElementById('purchase-reports-content');
    
    if (!contentSection) {
      contentSection = createPurchaseReportsContent();
      document.getElementById('main-content').appendChild(contentSection);
      initPurchaseReportsEventListeners();
      renderPurchaseReportsTable(purchaseReports);
    } else {
      contentSection.style.display = 'block';
    }
    
    // Update active state in sidebar
    updateSidebarActiveState("purchase-reports");
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      document.getElementById("sidebar").classList.add("active");
      document.getElementById("content").classList.add("active");
    }
  }
  
  // Function to create purchase reports content section
  function createPurchaseReportsContent() {
    const contentSection = document.createElement('div');
    contentSection.id = 'purchase-reports-content';
    contentSection.className = 'container-fluid';
    
    contentSection.innerHTML = `
      <h2 class="mb-4">Purchase Reports</h2>
      
      <div class="row mb-4">
        <div class="col-md-8">
          <div class="input-group">
            <input type="text" id="purchase-reports-search" class="form-control" placeholder="Search transactions...">
            <button class="btn btn-primary" type="button" id="purchase-reports-search-btn">
              <i class="fas fa-search"></i> Search
            </button>
          </div>
        </div>
        <div class="col-md-4 text-end">
          <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addPurchaseReportModal">
            <i class="fas fa-plus"></i> Add New Transaction
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
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
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
                  <button class="btn btn-primary" id="apply-purchase-reports-filters">Apply Filters</button>
                  <button class="btn btn-secondary" id="reset-purchase-reports-filters">Reset</button>
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
              <h5 class="card-title mb-0">Purchase Transactions</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Supplier</th>
                      <th>Amount</th>
                      <th>Payment Method</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="purchase-reports-table-body">
                    <!-- Table content will be loaded dynamically -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Add Purchase Report Modal -->
      <div class="modal fade" id="addPurchaseReportModal" tabindex="-1" aria-labelledby="addPurchaseReportModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addPurchaseReportModalLabel">Add New Payment Transaction</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="add-purchase-report-form">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="transaction-date" class="form-label">Date</label>
                    <input type="date" class="form-control" id="transaction-date" required>
                  </div>
                  <div class="col-md-6">
                    <label for="transaction-supplier" class="form-label">Supplier</label>
                    <select class="form-select" id="transaction-supplier" required>
                      <option value="">Select Supplier</option>
                      <option value="ABC Supplies">ABC Supplies</option>
                      <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                      <option value="Global Logistics">Global Logistics</option>
                      <option value="Tech Solutions">Tech Solutions</option>
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="transaction-amount" class="form-label">Amount</label>
                    <input type="number" class="form-control" id="transaction-amount" step="0.01" min="0" required>
                  </div>
                  <div class="col-md-6">
                    <label for="transaction-payment-method" class="form-label">Payment Method</label>
                    <select class="form-select" id="transaction-payment-method" required>
                      <option value="">Select Payment Method</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Check">Check</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="transaction-description" class="form-label">Description</label>
                  <textarea class="form-control" id="transaction-description" rows="3"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="save-purchase-report">Save Transaction</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Edit Purchase Report Modal -->
      <div class="modal fade" id="editPurchaseReportModal" tabindex="-1" aria-labelledby="editPurchaseReportModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editPurchaseReportModalLabel">Edit Payment Transaction</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="edit-purchase-report-form">
                <input type="hidden" id="edit-transaction-id">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="edit-transaction-date" class="form-label">Date</label>
                    <input type="date" class="form-control" id="edit-transaction-date" required>
                  </div>
                  <div class="col-md-6">
                    <label for="edit-transaction-supplier" class="form-label">Supplier</label>
                    <select class="form-select" id="edit-transaction-supplier" required>
                      <option value="">Select Supplier</option>
                      <option value="ABC Supplies">ABC Supplies</option>
                      <option value="XYZ Manufacturing">XYZ Manufacturing</option>
                      <option value="Global Logistics">Global Logistics</option>
                      <option value="Tech Solutions">Tech Solutions</option>
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="edit-transaction-amount" class="form-label">Amount</label>
                    <input type="number" class="form-control" id="edit-transaction-amount" step="0.01" min="0" required>
                  </div>
                  <div class="col-md-6">
                    <label for="edit-transaction-payment-method" class="form-label">Payment Method</label>
                    <select class="form-select" id="edit-transaction-payment-method" required>
                      <option value="">Select Payment Method</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Check">Check</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="edit-transaction-status" class="form-label">Status</label>
                    <select class="form-select" id="edit-transaction-status" required>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="edit-transaction-description" class="form-label">Description</label>
                  <textarea class="form-control" id="edit-transaction-description" rows="3"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="update-purchase-report">Update Transaction</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Delete Confirmation Modal -->
      <div class="modal fade" id="deletePurchaseReportModal" tabindex="-1" aria-labelledby="deletePurchaseReportModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deletePurchaseReportModalLabel">Confirm Delete</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this transaction? This action cannot be undone.</p>
              <input type="hidden" id="delete-transaction-id">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="confirm-delete-purchase-report">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    return contentSection;
  }
  
  // Function to render the purchase reports table
  function renderPurchaseReportsTable(reports) {
    const tableBody = document.getElementById('purchase-reports-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (reports.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="7" class="text-center">No transactions found</td>';
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
        <td>${report.id}</td>
        <td>${report.date}</td>
        <td>${report.supplier}</td>
        <td>₹${report.amount.toFixed(2)}</td>
        <td>${report.paymentMethod}</td>
        <td>
          <span class="badge ${getBadgeClass(report.status)}">${report.status}</span>
        </td>
        <td>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-sm btn-primary edit-purchase-report" data-id="${report.id}">
              <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="btn btn-sm btn-danger delete-purchase-report" data-id="${report.id}">
              <i class="fas fa-trash"></i>
            </button>
            ${report.status === 'Pending' ? `
              <button type="button" class="btn btn-sm btn-success approve-purchase-report" data-id="${report.id}">
                <i class="fas fa-check"></i>
              </button>
              <button type="button" class="btn btn-sm btn-warning reject-purchase-report" data-id="${report.id}">
                <i class="fas fa-times"></i>
              </button>
            ` : ''}
          </div>
        </td>
      `;
      
      tableBody.appendChild(row);
    });
    
    // Re-attach event listeners to the new buttons
    attachPurchaseReportActionListeners();
  }
  
  // Function to get the appropriate badge class based on status
  function getBadgeClass(status) {
    switch (status) {
      case 'Approved':
        return 'bg-success';
      case 'Rejected':
        return 'bg-danger';
      default:
        return 'bg-warning';
    }
  }
  
  // Function to initialize event listeners for the Purchase Reports section
  function initPurchaseReportsEventListeners() {
    // Add new transaction
    document.getElementById('save-purchase-report').addEventListener('click', () => {
      try {
        const date = document.getElementById('transaction-date').value;
        const supplier = document.getElementById('transaction-supplier').value;
        const amount = Number.parseFloat(document.getElementById('transaction-amount').value);
        const paymentMethod = document.getElementById('transaction-payment-method').value;
        const description = document.getElementById('transaction-description').value;
        
        if (!date || !supplier || isNaN(amount) || !paymentMethod) {
          alert('Please fill in all required fields');
          return;
        }
        
        const newId = purchaseReports.length > 0 ? Math.max(...purchaseReports.map(r => r.id)) + 1 : 1;
        
        const newTransaction = {
          id: newId,
          date: date,
          supplier: supplier,
          amount: amount,
          paymentMethod: paymentMethod,
          status: 'Pending',
          description: description
        };
        
        purchaseReports.push(newTransaction);
        
        // Close the modal first before rendering the table
        const modalElement = document.getElementById('addPurchaseReportModal');
        const bootstrap = window.bootstrap;
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        } else {
          // If modal instance doesn't exist, create it and then hide
          new bootstrap.Modal(modalElement).hide();
        }
        
        // Reset form
        document.getElementById('add-purchase-report-form').reset();
        
        // Then render the table
        setTimeout(() => {
          renderPurchaseReportsTable(purchaseReports);
        }, 100);
      } catch (error) {
        console.error("Error saving purchase report:", error);
        alert("An error occurred while saving the purchase report. Please try again.");
      }
    });
    
    // Update transaction
    document.getElementById('update-purchase-report').addEventListener('click', () => {
      try {
        const id = Number.parseInt(document.getElementById('edit-transaction-id').value);
        const date = document.getElementById('edit-transaction-date').value;
        const supplier = document.getElementById('edit-transaction-supplier').value;
        const amount = Number.parseFloat(document.getElementById('edit-transaction-amount').value);
        const paymentMethod = document.getElementById('edit-transaction-payment-method').value;
        const status = document.getElementById('edit-transaction-status').value;
        const description = document.getElementById('edit-transaction-description').value;
        
        if (!date || !supplier || isNaN(amount) || !paymentMethod || !status) {
          alert('Please fill in all required fields');
          return;
        }
        
        const index = purchaseReports.findIndex(r => r.id === id);
        if (index !== -1) {
          purchaseReports[index] = {
            id: id,
            date: date,
            supplier: supplier,
            amount: amount,
            paymentMethod: paymentMethod,
            status: status,
            description: description
          };
          
          // Close the modal first before rendering the table
          const modalElement = document.getElementById('editPurchaseReportModal');
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
            renderPurchaseReportsTable(purchaseReports);
          }, 100);
        }
      } catch (error) {
        console.error("Error updating purchase report:", error);
        alert("An error occurred while updating the purchase report. Please try again.");
      }
    });
    
    // Delete transaction
    document.getElementById('confirm-delete-purchase-report').addEventListener('click', () => {
      try {
        const id = Number.parseInt(document.getElementById('delete-transaction-id').value);
        
        purchaseReports = purchaseReports.filter(r => r.id !== id);
        
        // Close the modal first before rendering the table
        const modalElement = document.getElementById('deletePurchaseReportModal');
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
          renderPurchaseReportsTable(purchaseReports);
        }, 100);
      } catch (error) {
        console.error("Error deleting purchase report:", error);
        alert("An error occurred while deleting the purchase report. Please try again.");
      }
    });
    
    // Search functionality
    document.getElementById('purchase-reports-search-btn').addEventListener('click', () => {
      const searchTerm = document.getElementById('purchase-reports-search').value.toLowerCase();
      
      if (!searchTerm) {
        renderPurchaseReportsTable(purchaseReports);
        return;
      }
      
      const filteredReports = purchaseReports.filter(report => 
        report.supplier.toLowerCase().includes(searchTerm) ||
        report.paymentMethod.toLowerCase().includes(searchTerm) ||
        report.status.toLowerCase().includes(searchTerm) ||
        report.description.toLowerCase().includes(searchTerm) ||
        report.id.toString().includes(searchTerm)
      );
      
      renderPurchaseReportsTable(filteredReports);
    });
    
    // Filter functionality
    document.getElementById('apply-purchase-reports-filters').addEventListener('click', () => {
      const dateFrom = document.getElementById('filter-date-from').value;
      const dateTo = document.getElementById('filter-date-to').value;
      const status = document.getElementById('filter-status').value;
      const paymentMethod = document.getElementById('filter-payment-method').value;
      
      let filteredReports = [...purchaseReports];
      
      if (dateFrom) {
        filteredReports = filteredReports.filter(report => report.date >= dateFrom);
      }
      
      if (dateTo) {
        filteredReports = filteredReports.filter(report => report.date <= dateTo);
      }
      
      if (status) {
        filteredReports = filteredReports.filter(report => report.status === status);
      }
      
      if (paymentMethod) {
        filteredReports = filteredReports.filter(report => report.paymentMethod === paymentMethod);
      }
      
      renderPurchaseReportsTable(filteredReports);
    });
    
    // Reset filters
    document.getElementById('reset-purchase-reports-filters').addEventListener('click', () => {
      document.getElementById('filter-date-from').value = '';
      document.getElementById('filter-date-to').value = '';
      document.getElementById('filter-status').value = '';
      document.getElementById('filter-payment-method').value = '';
      
      renderPurchaseReportsTable(purchaseReports);
    });
  }
  
  // Function to attach action listeners to table buttons
  function attachPurchaseReportActionListeners() {
    // Edit buttons
    document.querySelectorAll('.edit-purchase-report').forEach(button => {
      button.addEventListener('click', function() {
        const id = Number.parseInt(this.getAttribute('data-id'));
        const report = purchaseReports.find(r => r.id === id);
        
        if (report) {
          document.getElementById('edit-transaction-id').value = report.id;
          document.getElementById('edit-transaction-date').value = report.date;
          document.getElementById('edit-transaction-supplier').value = report.supplier;
          document.getElementById('edit-transaction-amount').value = report.amount;
          document.getElementById('edit-transaction-payment-method').value = report.paymentMethod;
          document.getElementById('edit-transaction-status').value = report.status;
          document.getElementById('edit-transaction-description').value = report.description;
          
          // Declare bootstrap variable
          const bootstrap = window.bootstrap;
          const modal = new bootstrap.Modal(document.getElementById('editPurchaseReportModal'));
          modal.show();
        }
      });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-purchase-report').forEach(button => {
      button.addEventListener('click', function() {
        const id = Number.parseInt(this.getAttribute('data-id'));
        document.getElementById('delete-transaction-id').value = id;
        
        // Declare bootstrap variable
        const bootstrap = window.bootstrap;
        const modal = new bootstrap.Modal(document.getElementById('deletePurchaseReportModal'));
        modal.show();
      });
    });
    
    // Approve buttons
    document.querySelectorAll('.approve-purchase-report').forEach(button => {
      button.addEventListener('click', function() {
        try {
          const id = Number.parseInt(this.getAttribute('data-id'));
          const index = purchaseReports.findIndex(r => r.id === id);
          
          if (index !== -1) {
            purchaseReports[index].status = 'Approved';
            renderPurchaseReportsTable(purchaseReports);
          }
        } catch (error) {
          console.error("Error approving purchase report:", error);
          alert("An error occurred while approving the purchase report. Please try again.");
        }
      });
    });
    
    // Reject buttons
    document.querySelectorAll('.reject-purchase-report').forEach(button => {
      button.addEventListener('click', function() {
        try {
          const id = Number.parseInt(this.getAttribute('data-id'));
          const index = purchaseReports.findIndex(r => r.id === id);
          
          if (index !== -1) {
            purchaseReports[index].status = 'Rejected';
            renderPurchaseReportsTable(purchaseReports);
          }
        } catch (error) {
          console.error("Error rejecting purchase report:", error);
          alert("An error occurred while rejecting the purchase report. Please try again.");
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
    if (contentType === "purchase-reports") {
      activeLink = document.querySelector(`#sidebar a[href="#"][onclick*="purchase-reports"]`) || 
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

