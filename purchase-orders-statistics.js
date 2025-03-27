// import { Chart } from "@/components/ui/chart"
// Statistics by Number of Purchase Orders
document.addEventListener("DOMContentLoaded", () => {
  // Add event listener for the Purchase Orders Statistics menu item
  const purchaseOrdersStatsLink = document.querySelector("a[onclick=\"loadContent('statistics-orders')\"]")
  if (purchaseOrdersStatsLink) {
    purchaseOrdersStatsLink.removeAttribute("onclick")
    purchaseOrdersStatsLink.addEventListener("click", (e) => {
      e.preventDefault()
      handlePurchaseOrdersStatisticsClick()
    })
  }
})

// Sample data for purchase orders statistics
const purchaseOrdersStats = [
  {
    id: 1,
    month: "January",
    year: "2025",
    totalOrders: 45,
    completedOrders: 42,
    pendingOrders: 2,
    cancelledOrders: 1,
    averageOrderValue: 8500.0,
  },
  {
    id: 2,
    month: "February",
    year: "2025",
    totalOrders: 38,
    completedOrders: 35,
    pendingOrders: 1,
    cancelledOrders: 2,
    averageOrderValue: 9200.0,
  },
  {
    id: 3,
    month: "March",
    year: "2025",
    totalOrders: 52,
    completedOrders: 48,
    pendingOrders: 3,
    cancelledOrders: 1,
    averageOrderValue: 7800.0,
  },
  {
    id: 4,
    month: "April",
    year: "2024",
    totalOrders: 41,
    completedOrders: 38,
    pendingOrders: 2,
    cancelledOrders: 1,
    averageOrderValue: 8100.0,
  },
  {
    id: 5,
    month: "May",
    year: "2024",
    totalOrders: 49,
    completedOrders: 45,
    pendingOrders: 3,
    cancelledOrders: 1,
    averageOrderValue: 8300.0,
  },
  {
    id: 6,
    month: "June",
    year: "2024",
    totalOrders: 55,
    completedOrders: 50,
    pendingOrders: 4,
    cancelledOrders: 1,
    averageOrderValue: 7900.0,
  },
  {
    id: 7,
    month: "July",
    year: "2024",
    totalOrders: 60,
    completedOrders: 55,
    pendingOrders: 3,
    cancelledOrders: 2,
    averageOrderValue: 8200.0,
  },
  {
    id: 8,
    month: "August",
    year: "2024",
    totalOrders: 58,
    completedOrders: 52,
    pendingOrders: 4,
    cancelledOrders: 2,
    averageOrderValue: 8400.0,
  },
  {
    id: 9,
    month: "September",
    year: "2024",
    totalOrders: 62,
    completedOrders: 57,
    pendingOrders: 3,
    cancelledOrders: 2,
    averageOrderValue: 8600.0,
  },
  {
    id: 10,
    month: "October",
    year: "2024",
    totalOrders: 65,
    completedOrders: 60,
    pendingOrders: 4,
    cancelledOrders: 1,
    averageOrderValue: 8800.0,
  },
  {
    id: 11,
    month: "November",
    year: "2024",
    totalOrders: 70,
    completedOrders: 63,
    pendingOrders: 5,
    cancelledOrders: 2,
    averageOrderValue: 9000.0,
  },
  {
    id: 12,
    month: "December",
    year: "2024",
    totalOrders: 75,
    completedOrders: 68,
    pendingOrders: 5,
    cancelledOrders: 2,
    averageOrderValue: 9500.0,
  },
]

// Function to handle Purchase Orders Statistics menu click
function handlePurchaseOrdersStatisticsClick() {
  // Hide all content sections first
  const allContentSections = document.querySelectorAll("#main-content > div")
  allContentSections.forEach((section) => {
    section.style.display = "none"
  })

  // Create or show the purchase orders statistics content section
  let contentSection = document.getElementById("purchase-orders-statistics-content")

  if (!contentSection) {
    contentSection = createPurchaseOrdersStatisticsContent()
    document.getElementById("main-content").appendChild(contentSection)
    initPurchaseOrdersStatisticsEventListeners()
    renderPurchaseOrdersStatisticsTable(purchaseOrdersStats)
    renderPurchaseOrdersChart()
  } else {
    contentSection.style.display = "block"
  }

  // Update active state in sidebar
  updateSidebarActiveState("purchase-orders-statistics")

  // Close sidebar on mobile after navigation
  if (window.innerWidth < 768) {
    document.getElementById("sidebar").classList.add("active")
    document.getElementById("content").classList.add("active")
  }
}

// Function to create purchase orders statistics content section
function createPurchaseOrdersStatisticsContent() {
  const contentSection = document.createElement("div")
  contentSection.id = "purchase-orders-statistics-content"
  contentSection.className = "container-fluid"

  contentSection.innerHTML = `
    <h2 class="mb-4">Statistics by Number of Purchase Orders</h2>
    
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Filters</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 mb-3">
                <label for="po-stats-filter-year" class="form-label">Year</label>
                <select class="form-select" id="po-stats-filter-year">
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label for="po-stats-filter-quarter" class="form-label">Quarter</label>
                <select class="form-select" id="po-stats-filter-quarter">
                  <option value="">All Quarters</option>
                  <option value="Q1">Q1 (Jan-Mar)</option>
                  <option value="Q2">Q2 (Apr-Jun)</option>
                  <option value="Q3">Q3 (Jul-Sep)</option>
                  <option value="Q4">Q4 (Oct-Dec)</option>
                </select>
              </div>
              <div class="col-md-4 text-end align-self-end">
                <button class="btn btn-primary" id="apply-po-stats-filters">Apply Filters</button>
                <button class="btn btn-secondary" id="reset-po-stats-filters">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card bg-primary text-white">
          <div class="card-body">
            <h5 class="card-title">Total Orders</h5>
            <h2 class="card-text" id="total-orders-count">670</h2>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-success text-white">
          <div class="card-body">
            <h5 class="card-title">Completed Orders</h5>
            <h2 class="card-text" id="completed-orders-count">613</h2>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-warning text-white">
          <div class="card-body">
            <h5 class="card-title">Pending Orders</h5>
            <h2 class="card-text" id="pending-orders-count">40</h2>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-danger text-white">
          <div class="card-body">
            <h5 class="card-title">Cancelled Orders</h5>
            <h2 class="card-text" id="cancelled-orders-count">17</h2>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Purchase Orders Chart</h5>
          </div>
          <div class="card-body">
            <canvas id="purchase-orders-chart" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Monthly Purchase Orders Statistics</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Total Orders</th>
                    <th>Completed</th>
                    <th>Pending</th>
                    <th>Cancelled</th>
                    <th>Avg. Order Value</th>
                  </tr>
                </thead>
                <tbody id="purchase-orders-stats-table-body">
                  <!-- Table content will be loaded dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Add New Statistics Modal -->
    <div class="modal fade" id="addPurchaseOrdersStatsModal" tabindex="-1" aria-labelledby="addPurchaseOrdersStatsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addPurchaseOrdersStatsModalLabel">Add New Statistics Entry</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="add-po-stats-form">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="po-stats-month" class="form-label">Month</label>
                  <select class="form-select" id="po-stats-month" required>
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="po-stats-year" class="form-label">Year</label>
                  <select class="form-select" id="po-stats-year" required>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="po-stats-total" class="form-label">Total Orders</label>
                  <input type="number" class="form-control" id="po-stats-total" min="0" required>
                </div>
                <div class="col-md-6">
                  <label for="po-stats-completed" class="form-label">Completed Orders</label>
                  <input type="number" class="form-control" id="po-stats-completed" min="0" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="po-stats-pending" class="form-label">Pending Orders</label>
                  <input type="number" class="form-control" id="po-stats-pending" min="0" required>
                </div>
                <div class="col-md-6">
                  <label for="po-stats-cancelled" class="form-label">Cancelled Orders</label>
                  <input type="number" class="form-control" id="po-stats-cancelled" min="0" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="po-stats-avg-value" class="form-label">Average Order Value</label>
                  <input type="number" class="form-control" id="po-stats-avg-value" step="0.01" min="0" required>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="save-po-stats">Save Statistics</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Edit Statistics Modal -->
    <div class="modal fade" id="editPurchaseOrdersStatsModal" tabindex="-1" aria-labelledby="editPurchaseOrdersStatsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editPurchaseOrdersStatsModalLabel">Edit Statistics Entry</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="edit-po-stats-form">
              <input type="hidden" id="edit-po-stats-id">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="edit-po-stats-month" class="form-label">Month</label>
                  <select class="form-select" id="edit-po-stats-month" required>
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="edit-po-stats-year" class="form-label">Year</label>
                  <select class="form-select" id="edit-po-stats-year" required>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="edit-po-stats-total" class="form-label">Total Orders</label>
                  <input type="number" class="form-control" id="edit-po-stats-total" min="0" required>
                </div>
                <div class="col-md-6">
                  <label for="edit-po-stats-completed" class="form-label">Completed Orders</label>
                  <input type="number" class="form-control" id="edit-po-stats-completed" min="0" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="edit-po-stats-pending" class="form-label">Pending Orders</label>
                  <input type="number" class="form-control" id="edit-po-stats-pending" min="0" required>
                </div>
                <div class="col-md-6">
                  <label for="edit-po-stats-cancelled" class="form-label">Cancelled Orders</label>
                  <input type="number" class="form-control" id="edit-po-stats-cancelled" min="0" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="edit-po-stats-avg-value" class="form-label">Average Order Value</label>
                  <input type="number" class="form-control" id="edit-po-stats-avg-value" step="0.01" min="0" required>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="update-po-stats">Update Statistics</button>
          </div>
        </div>
      </div>
    </div>
  `

  return contentSection
}

// Function to render the purchase orders statistics table
function renderPurchaseOrdersStatisticsTable(stats) {
  const tableBody = document.getElementById("purchase-orders-stats-table-body")
  if (!tableBody) return

  tableBody.innerHTML = ""

  if (stats.length === 0) {
    const row = document.createElement("tr")
    row.innerHTML = '<td colspan="7" class="text-center">No statistics data found</td>'
    tableBody.appendChild(row)
    return
  }

  stats.forEach((stat) => {
    const row = document.createElement("tr")

    row.innerHTML = `
      <td>${stat.month}</td>
      <td>${stat.year}</td>
      <td>${stat.totalOrders}</td>
      <td>${stat.completedOrders}</td>
      <td>${stat.pendingOrders}</td>
      <td>${stat.cancelledOrders}</td>
      <td>₹${stat.averageOrderValue.toFixed(2)}</td>
    `

    tableBody.appendChild(row)
  })

  // Update summary cards
  updateSummaryCards(stats)
}

// Function to update summary cards
function updateSummaryCards(stats) {
  const totalOrdersCount = stats.reduce((sum, stat) => sum + stat.totalOrders, 0)
  const completedOrdersCount = stats.reduce((sum, stat) => sum + stat.completedOrders, 0)
  const pendingOrdersCount = stats.reduce((sum, stat) => sum + stat.pendingOrders, 0)
  const cancelledOrdersCount = stats.reduce((sum, stat) => sum + stat.cancelledOrders, 0)

  document.getElementById("total-orders-count").textContent = totalOrdersCount
  document.getElementById("completed-orders-count").textContent = completedOrdersCount
  document.getElementById("pending-orders-count").textContent = pendingOrdersCount
  document.getElementById("cancelled-orders-count").textContent = cancelledOrdersCount
}

// Function to render the purchase orders chart
function renderPurchaseOrdersChart() {
  const canvas = document.getElementById("purchase-orders-chart")
  if (!canvas) return

  // Check if Chart.js is loaded
  if (typeof Chart === "undefined") {
    console.error("Chart.js is not loaded. Please include Chart.js library.")
    return
  }

  // Prepare data for the chart
  const months = purchaseOrdersStats.map((stat) => stat.month)
  const totalOrders = purchaseOrdersStats.map((stat) => stat.totalOrders)
  const completedOrders = purchaseOrdersStats.map((stat) => stat.completedOrders)
  const pendingOrders = purchaseOrdersStats.map((stat) => stat.pendingOrders)
  const cancelledOrders = purchaseOrdersStats.map((stat) => stat.cancelledOrders)

  // Create the chart
  const ctx = canvas.getContext("2d")

  // Check if there's an existing chart and destroy it
  if (window.purchaseOrdersChartInstance) {
    window.purchaseOrdersChartInstance.destroy()
  }

  window.purchaseOrdersChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: months,
      datasets: [
        {
          label: "Total Orders",
          data: totalOrders,
          backgroundColor: "rgba(13, 110, 253, 0.7)",
          borderColor: "rgba(13, 110, 253, 1)",
          borderWidth: 1,
        },
        {
          label: "Completed Orders",
          data: completedOrders,
          backgroundColor: "rgba(25, 135, 84, 0.7)",
          borderColor: "rgba(25, 135, 84, 1)",
          borderWidth: 1,
        },
        {
          label: "Pending Orders",
          data: pendingOrders,
          backgroundColor: "rgba(255, 193, 7, 0.7)",
          borderColor: "rgba(255, 193, 7, 1)",
          borderWidth: 1,
        },
        {
          label: "Cancelled Orders",
          data: cancelledOrders,
          backgroundColor: "rgba(220, 53, 69, 0.7)",
          borderColor: "rgba(220, 53, 69, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Orders",
          },
        },
        x: {
          title: {
            display: true,
            text: "Month",
          },
        },
      },
    },
  })
}

// Function to initialize event listeners for the Purchase Orders Statistics section
function initPurchaseOrdersStatisticsEventListeners() {
  // Add new statistics entry
  document.getElementById("save-po-stats").addEventListener("click", () => {
    try {
      const month = document.getElementById("po-stats-month").value
      const year = document.getElementById("po-stats-year").value
      const totalOrders = Number.parseInt(document.getElementById("po-stats-total").value)
      const completedOrders = Number.parseInt(document.getElementById("po-stats-completed").value)
      const pendingOrders = Number.parseInt(document.getElementById("po-stats-pending").value)
      const cancelledOrders = Number.parseInt(document.getElementById("po-stats-cancelled").value)
      const averageOrderValue = Number.parseFloat(document.getElementById("po-stats-avg-value").value)

      if (
        !month ||
        !year ||
        isNaN(totalOrders) ||
        isNaN(completedOrders) ||
        isNaN(pendingOrders) ||
        isNaN(cancelledOrders) ||
        isNaN(averageOrderValue)
      ) {
        alert("Please fill in all required fields with valid values")
        return
      }

      // Validate that the sum of completed, pending, and cancelled equals total
      if (completedOrders + pendingOrders + cancelledOrders !== totalOrders) {
        alert("The sum of completed, pending, and cancelled orders must equal the total orders")
        return
      }

      const newId = purchaseOrdersStats.length > 0 ? Math.max(...purchaseOrdersStats.map((s) => s.id)) + 1 : 1

      const newStat = {
        id: newId,
        month: month,
        year: year,
        totalOrders: totalOrders,
        completedOrders: completedOrders,
        pendingOrders: pendingOrders,
        cancelledOrders: cancelledOrders,
        averageOrderValue: averageOrderValue,
      }

      purchaseOrdersStats.push(newStat)

      // Close the modal first before rendering
      const modalElement = document.getElementById("addPurchaseOrdersStatsModal")
      const bootstrap = window.bootstrap
      const modal = bootstrap.Modal.getInstance(modalElement)
      if (modal) {
        modal.hide()
      } else {
        // If modal instance doesn't exist, create it and then hide
        new bootstrap.Modal(modalElement).hide()
      }

      // Reset form
      document.getElementById("add-po-stats-form").reset()

      // Then render the table and chart
      setTimeout(() => {
        renderPurchaseOrdersStatisticsTable(purchaseOrdersStats)
        renderPurchaseOrdersChart()
      }, 100)
    } catch (error) {
      console.error("Error saving statistics:", error)
      alert("An error occurred while saving the statistics. Please try again.")
    }
  })

  // Update statistics entry
  document.getElementById("update-po-stats").addEventListener("click", () => {
    try {
      const id = Number.parseInt(document.getElementById("edit-po-stats-id").value)
      const month = document.getElementById("edit-po-stats-month").value
      const year = document.getElementById("edit-po-stats-year").value
      const totalOrders = Number.parseInt(document.getElementById("edit-po-stats-total").value)
      const completedOrders = Number.parseInt(document.getElementById("edit-po-stats-completed").value)
      const pendingOrders = Number.parseInt(document.getElementById("edit-po-stats-pending").value)
      const cancelledOrders = Number.parseInt(document.getElementById("edit-po-stats-cancelled").value)
      const averageOrderValue = Number.parseFloat(document.getElementById("edit-po-stats-avg-value").value)

      if (
        !month ||
        !year ||
        isNaN(totalOrders) ||
        isNaN(completedOrders) ||
        isNaN(pendingOrders) ||
        isNaN(cancelledOrders) ||
        isNaN(averageOrderValue)
      ) {
        alert("Please fill in all required fields with valid values")
        return
      }

      // Validate that the sum of completed, pending, and cancelled equals total
      if (completedOrders + pendingOrders + cancelledOrders !== totalOrders) {
        alert("The sum of completed, pending, and cancelled orders must equal the total orders")
        return
      }

      const index = purchaseOrdersStats.findIndex((s) => s.id === id)
      if (index !== -1) {
        purchaseOrdersStats[index] = {
          id: id,
          month: month,
          year: year,
          totalOrders: totalOrders,
          completedOrders: completedOrders,
          pendingOrders: pendingOrders,
          cancelledOrders: cancelledOrders,
          averageOrderValue: averageOrderValue,
        }

        // Close the modal first before rendering
        const modalElement = document.getElementById("editPurchaseOrdersStatsModal")
        const bootstrap = window.bootstrap
        const modal = bootstrap.Modal.getInstance(modalElement)
        if (modal) {
          modal.hide()
        } else {
          // If modal instance doesn't exist, create it and then hide
          new bootstrap.Modal(modalElement).hide()
        }

        // Then render the table and chart
        setTimeout(() => {
          renderPurchaseOrdersStatisticsTable(purchaseOrdersStats)
          renderPurchaseOrdersChart()
        }, 100)
      }
    } catch (error) {
      console.error("Error updating statistics:", error)
      alert("An error occurred while updating the statistics. Please try again.")
    }
  })

  // Filter functionality
  document.getElementById("apply-po-stats-filters").addEventListener("click", () => {
    const year = document.getElementById("po-stats-filter-year").value
    const quarter = document.getElementById("po-stats-filter-quarter").value

    let filteredStats = [...purchaseOrdersStats]

    if (year) {
      filteredStats = filteredStats.filter((stat) => stat.year === year)
    }

    if (quarter) {
      const quarterMonths = {
        Q1: ["January", "February", "March"],
        Q2: ["April", "May", "June"],
        Q3: ["July", "August", "September"],
        Q4: ["October", "November", "December"],
      }

      filteredStats = filteredStats.filter((stat) => quarterMonths[quarter].includes(stat.month))
    }

    renderPurchaseOrdersStatisticsTable(filteredStats)

    // We don't update the chart here as it should always show the full year data
  })

  // Reset filters
  document.getElementById("reset-po-stats-filters").addEventListener("click", () => {
    document.getElementById("po-stats-filter-year").value = "2023"
    document.getElementById("po-stats-filter-quarter").value = ""

    renderPurchaseOrdersStatisticsTable(purchaseOrdersStats)
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
  if (contentType === "purchase-orders-statistics") {
    activeLink =
      document.querySelector(`#sidebar a[href="#"][onclick*="purchase-orders-statistics"]`) ||
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

