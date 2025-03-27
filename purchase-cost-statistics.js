// import { Chart } from "@/components/ui/chart"
// Statistics by Cost
document.addEventListener("DOMContentLoaded", () => {
  // Add event listener for the Purchase Cost Statistics menu item
  const purchaseCostStatsLink = document.querySelector("a[onclick=\"loadContent('statistics-cost')\"]")
  if (purchaseCostStatsLink) {
    purchaseCostStatsLink.removeAttribute("onclick")
    purchaseCostStatsLink.addEventListener("click", (e) => {
      e.preventDefault()
      handlePurchaseCostStatisticsClick()
    })
  }
})

// Sample data for purchase cost statistics
const purchaseCostStats = [
  {
    id: 1,
    month: "January",
    year: "2025",
    totalCost: 382500.0,
    supplierCosts: [
      { supplier: "ABC Supplies", cost: 125000.0 },
      { supplier: "XYZ Manufacturing", cost: 180000.0 },
      { supplier: "Tech Solutions", cost: 77500.0 },
    ],
    categoryCosts: [
      { category: "Raw Materials", cost: 210000.0 },
      { category: "Office Supplies", cost: 45000.0 },
      { category: "Equipment", cost: 127500.0 },
    ],
  },
  {
    id: 2,
    month: "February",
    year: "2025",
    totalCost: 349600.0,
    supplierCosts: [
      { supplier: "ABC Supplies", cost: 115000.0 },
      { supplier: "XYZ Manufacturing", cost: 165000.0 },
      { supplier: "Tech Solutions", cost: 69600.0 },
    ],
    categoryCosts: [
      { category: "Raw Materials", cost: 195000.0 },
      { category: "Office Supplies", cost: 42000.0 },
      { category: "Equipment", cost: 112600.0 },
    ],
  },
  {
    id: 3,
    month: "March",
    year: "2025",
    totalCost: 405600.0,
    supplierCosts: [
      { supplier: "ABC Supplies", cost: 135000.0 },
      { supplier: "XYZ Manufacturing", cost: 190000.0 },
      { supplier: "Tech Solutions", cost: 80600.0 },
    ],
    categoryCosts: [
      { category: "Raw Materials", cost: 220000.0 },
      { category: "Office Supplies", cost: 48000.0 },
      { category: "Equipment", cost: 137600.0 },
    ],
  },
  {
    id: 4,
    month: "April",
    year: "2024",
    totalCost: 332100.0,
    supplierCosts: [
      { supplier: "ABC Supplies", cost: 110000.0 },
      { supplier: "XYZ Manufacturing", cost: 155000.0 },
      { supplier: "Tech Solutions", cost: 67100.0 },
    ],
    categoryCosts: [
      { category: "Raw Materials", cost: 185000.0 },
      { category: "Office Supplies", cost: 40000.0 },
      { category: "Equipment", cost: 107100.0 },
    ],
  },
  {
    id: 5,
    month: "May",
    year: "2024",
    totalCost: 406700.0,
    supplierCosts: [
      { supplier: "ABC Supplies", cost: 135000.0 },
      { supplier: "XYZ Manufacturing", cost: 190000.0 },
      { supplier: "Tech Solutions", cost: 81700.0 },
    ],
    categoryCosts: [
      { category: "Raw Materials", cost: 225000.0 },
      { category: "Office Supplies", cost: 48000.0 },
      { category: "Equipment", cost: 133700.0 },
    ],
  },
  {
    id: 6,
    month: "June",
    year: "2024",
    totalCost: 434500.0,
    supplierCosts: [
      { supplier: "ABC Supplies", cost: 145000.0 },
      { supplier: "XYZ Manufacturing", cost: 205000.0 },
      { supplier: "Tech Solutions", cost: 84500.0 },
    ],
    categoryCosts: [
      { category: "Raw Materials", cost: 240000.0 },
      { category: "Office Supplies", cost: 52000.0 },
      { category: "Equipment", cost: 142500.0 },
    ],
  },
  {
    id: 7,
    month: "July",
    year: "2024",
    totalCost: 492000.0,
    supplierCosts: [
      { supplier: "ABC Supplies", cost: 165000.0 },
      { supplier: "XYZ Manufacturing", cost: 230000.0 },
      { supplier: "Tech Solutions", cost: 97000.0 },
    ],
    categoryCosts: [
      { category: "Raw Materials", cost: 270000.0 },
      { category: "Office Supplies", cost: 58000.0 },
      { category: "Equipment", cost: 164000.0 },
    ],
  },
  {
    id: 8,
    month: "August",
    year: "2024",
    totalCost: 487200.0,
    supplierCosts: [
      { supplier: "ABC Supplies", cost: 162000.0 },
      { supplier: "XYZ Manufacturing", cost: 228000.0 },
      { supplier: "Tech Solutions", cost: 97200.0 },
    ],
    categoryCosts: [
      { category: "Raw Materials", cost: 268000.0 },
      { category: "Office Supplies", cost: 57000.0 },
      { category: "Equipment", cost: 162200.0 },
    ],
  },
  {
    id: 9,
    month: "September",
    year: "2024",
    totalCost: 533200.0,
    supplierCosts: [
      { supplier: "ABC Supplies", cost: 178000.0 },
      { supplier: "XYZ Manufacturing", cost: 250000.0 },
      { supplier: "Tech Solutions", cost: 105200.0 },
    ],
    categoryCosts: [
      { category: "Raw Materials", cost: 295000.0 },
      { category: "Office Supplies", cost: 63000.0 },
      { category: "Equipment", cost: 175200.0 },
    ],
  },
  {
    id: 10,
    month: "October",
    year: "2024",
    totalCost: 572000.0,
    supplierCosts: [
      { supplier: "ABC Supplies", cost: 190000.0 },
      { supplier: "XYZ Manufacturing", cost: 270000.0 },
      { supplier: "Tech Solutions", cost: 112000.0 },
    ],
    categoryCosts: [
      { category: "Raw Materials", cost: 315000.0 },
      { category: "Office Supplies", cost: 67000.0 },
      { category: "Equipment", cost: 190000.0 },
    ],
  },
  {
    id: 11,
    month: "November",
    year: "2024",
    totalCost: 630000.0,
    supplierCosts: [
      { supplier: "ABC Supplies", cost: 210000.0 },
      { supplier: "XYZ Manufacturing", cost: 295000.0 },
      { supplier: "Tech Solutions", cost: 125000.0 },
    ],
    categoryCosts: [
      { category: "Raw Materials", cost: 350000.0 },
      { category: "Office Supplies", cost: 75000.0 },
      { category: "Equipment", cost: 205000.0 },
    ],
  },
  {
    id: 12,
    month: "December",
    year: "2024",
    totalCost: 712500.0,
    supplierCosts: [
      { supplier: "ABC Supplies", cost: 237500.0 },
      { supplier: "XYZ Manufacturing", cost: 335000.0 },
      { supplier: "Tech Solutions", cost: 140000.0 },
    ],
    categoryCosts: [
      { category: "Raw Materials", cost: 395000.0 },
      { category: "Office Supplies", cost: 85000.0 },
      { category: "Equipment", cost: 232500.0 },
    ],
  },
]

// Function to handle Purchase Cost Statistics menu click
function handlePurchaseCostStatisticsClick() {
  // Hide all content sections first
  const allContentSections = document.querySelectorAll("#main-content > div")
  allContentSections.forEach((section) => {
    section.style.display = "none"
  })

  // Create or show the purchase cost statistics content section
  let contentSection = document.getElementById("purchase-cost-statistics-content")

  if (!contentSection) {
    contentSection = createPurchaseCostStatisticsContent()
    document.getElementById("main-content").appendChild(contentSection)
    initPurchaseCostStatisticsEventListeners()
    renderPurchaseCostStatisticsTable(purchaseCostStats)
    renderPurchaseCostCharts()
  } else {
    contentSection.style.display = "block"
  }

  // Update active state in sidebar
  updateSidebarActiveState("purchase-cost-statistics")

  // Close sidebar on mobile after navigation
  if (window.innerWidth < 768) {
    document.getElementById("sidebar").classList.add("active")
    document.getElementById("content").classList.add("active")
  }
}

// Function to create purchase cost statistics content section
function createPurchaseCostStatisticsContent() {
  const contentSection = document.createElement("div")
  contentSection.id = "purchase-cost-statistics-content"
  contentSection.className = "container-fluid"

  contentSection.innerHTML = `
    <h2 class="mb-4">Statistics by Cost</h2>
    
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Filters</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 mb-3">
                <label for="cost-stats-filter-year" class="form-label">Year</label>
                <select class="form-select" id="cost-stats-filter-year">
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label for="cost-stats-filter-quarter" class="form-label">Quarter</label>
                <select class="form-select" id="cost-stats-filter-quarter">
                  <option value="">All Quarters</option>
                  <option value="Q1">Q1 (Jan-Mar)</option>
                  <option value="Q2">Q2 (Apr-Jun)</option>
                  <option value="Q3">Q3 (Jul-Sep)</option>
                  <option value="Q4">Q4 (Oct-Dec)</option>
                </select>
              </div>
              <div class="col-md-4 text-end align-self-end">
                <button class="btn btn-primary" id="apply-cost-stats-filters">Apply Filters</button>
                <button class="btn btn-secondary" id="reset-cost-stats-filters">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card bg-primary text-white">
          <div class="card-body">
            <h5 class="card-title">Total Annual Cost</h5>
            <h2 class="card-text" id="total-annual-cost">₹5,737,900.00</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-success text-white">
          <div class="card-body">
            <h5 class="card-title">Average Monthly Cost</h5>
            <h2 class="card-text" id="avg-monthly-cost">₹478,158.33</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-info text-white">
          <div class="card-body">
            <h5 class="card-title">Highest Monthly Cost</h5>
            <h2 class="card-text" id="highest-monthly-cost">₹712,500.00</h2>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Monthly Cost Trend</h5>
          </div>
          <div class="card-body">
            <canvas id="monthly-cost-chart" height="300"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Cost by Supplier</h5>
          </div>
          <div class="card-body">
            <canvas id="supplier-cost-chart" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Cost by Category</h5>
          </div>
          <div class="card-body">
            <canvas id="category-cost-chart" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Monthly Purchase Cost Statistics</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Total Cost</th>
                    <th>ABC Supplies</th>
                    <th>XYZ Manufacturing</th>
                    <th>Tech Solutions</th>
                    <th>Raw Materials</th>
                    <th>Office Supplies</th>
                    <th>Equipment</th>
                  </tr>
                </thead>
                <tbody id="purchase-cost-stats-table-body">
                  <!-- Table content will be loaded dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  return contentSection
}

// Function to render the purchase cost statistics table
function renderPurchaseCostStatisticsTable(stats) {
  const tableBody = document.getElementById("purchase-cost-stats-table-body")
  if (!tableBody) return

  tableBody.innerHTML = ""

  if (stats.length === 0) {
    const row = document.createElement("tr")
    row.innerHTML = '<td colspan="9" class="text-center">No statistics data found</td>'
    tableBody.appendChild(row)
    return
  }

  stats.forEach((stat) => {
    const row = document.createElement("tr")

    // Find supplier costs
    const abcSuppliesCost = stat.supplierCosts.find((s) => s.supplier === "ABC Supplies")?.cost || 0
    const xyzManufacturingCost = stat.supplierCosts.find((s) => s.supplier === "XYZ Manufacturing")?.cost || 0
    const techSolutionsCost = stat.supplierCosts.find((s) => s.supplier === "Tech Solutions")?.cost || 0

    // Find category costs
    const rawMaterialsCost = stat.categoryCosts.find((c) => c.category === "Raw Materials")?.cost || 0
    const officeSuppliesCost = stat.categoryCosts.find((c) => c.category === "Office Supplies")?.cost || 0
    const equipmentCost = stat.categoryCosts.find((c) => c.category === "Equipment")?.cost || 0

    row.innerHTML = `
      <td>${stat.month}</td>
      <td>${stat.year}</td>
      <td>₹${stat.totalCost.toFixed(2)}</td>
      <td>₹${abcSuppliesCost.toFixed(2)}</td>
      <td>₹${xyzManufacturingCost.toFixed(2)}</td>
      <td>₹${techSolutionsCost.toFixed(2)}</td>
      <td>₹${rawMaterialsCost.toFixed(2)}</td>
      <td>₹${officeSuppliesCost.toFixed(2)}</td>
      <td>₹${equipmentCost.toFixed(2)}</td>
    `

    tableBody.appendChild(row)
  })

  // Update summary cards
  updateCostSummaryCards(stats)
}

// Function to update cost summary cards
function updateCostSummaryCards(stats) {
  const totalAnnualCost = stats.reduce((sum, stat) => sum + stat.totalCost, 0)
  const avgMonthlyCost = totalAnnualCost / (stats.length || 1)
  const highestMonthlyCost = Math.max(...stats.map((stat) => stat.totalCost))

  document.getElementById("total-annual-cost").textContent = `₹${totalAnnualCost.toFixed(2)}`
  document.getElementById("avg-monthly-cost").textContent = `₹${avgMonthlyCost.toFixed(2)}`
  document.getElementById("highest-monthly-cost").textContent = `₹${highestMonthlyCost.toFixed(2)}`
}

// Function to render the purchase cost charts
function renderPurchaseCostCharts() {
  // Check if Chart.js is loaded
  if (typeof Chart === "undefined") {
    console.error("Chart.js is not loaded. Please include Chart.js library.")
    return
  }

  renderMonthlyCostChart()
  renderSupplierCostChart()
  renderCategoryCostChart()
}

// Function to render monthly cost chart
function renderMonthlyCostChart() {
  const canvas = document.getElementById("monthly-cost-chart")
  if (!canvas) return

  // Prepare data for the chart
  const months = purchaseCostStats.map((stat) => stat.month)
  const costs = purchaseCostStats.map((stat) => stat.totalCost)

  // Create the chart
  const ctx = canvas.getContext("2d")

  // Check if there's an existing chart and destroy it
  if (window.monthlyCostChartInstance) {
    window.monthlyCostChartInstance.destroy()
  }

  window.monthlyCostChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Monthly Cost",
          data: costs,
          backgroundColor: "rgba(13, 110, 253, 0.2)",
          borderColor: "rgba(13, 110, 253, 1)",
          borderWidth: 2,
          tension: 0.1,
          fill: true,
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
            text: "Cost (₹)",
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

// Function to render supplier cost chart
function renderSupplierCostChart() {
  const canvas = document.getElementById("supplier-cost-chart")
  if (!canvas) return

  // Calculate total cost per supplier
  const supplierTotals = {}

  purchaseCostStats.forEach((stat) => {
    stat.supplierCosts.forEach((supplierCost) => {
      if (!supplierTotals[supplierCost.supplier]) {
        supplierTotals[supplierCost.supplier] = 0
      }
      supplierTotals[supplierCost.supplier] += supplierCost.cost
    })
  })

  const suppliers = Object.keys(supplierTotals)
  const supplierCosts = Object.values(supplierTotals)

  // Create the chart
  const ctx = canvas.getContext("2d")

  // Check if there's an existing chart and destroy it
  if (window.supplierCostChartInstance) {
    window.supplierCostChartInstance.destroy()
  }

  window.supplierCostChartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: suppliers,
      datasets: [
        {
          data: supplierCosts,
          backgroundColor: ["rgba(13, 110, 253, 0.7)", "rgba(25, 135, 84, 0.7)", "rgba(255, 193, 7, 0.7)"],
          borderColor: ["rgba(13, 110, 253, 1)", "rgba(25, 135, 84, 1)", "rgba(255, 193, 7, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || ""
              const value = context.raw || 0
              return `${label}: ₹${value.toFixed(2)}`
            },
          },
        },
      },
    },
  })
}

// Function to render category cost chart
function renderCategoryCostChart() {
  const canvas = document.getElementById("category-cost-chart")
  if (!canvas) return

  // Calculate total cost per category
  const categoryTotals = {}

  purchaseCostStats.forEach((stat) => {
    stat.categoryCosts.forEach((categoryCost) => {
      if (!categoryTotals[categoryCost.category]) {
        categoryTotals[categoryCost.category] = 0
      }
      categoryTotals[categoryCost.category] += categoryCost.cost
    })
  })

  const categories = Object.keys(categoryTotals)
  const categoryCosts = Object.values(categoryTotals)

  // Create the chart
  const ctx = canvas.getContext("2d")

  // Check if there's an existing chart and destroy it
  if (window.categoryCostChartInstance) {
    window.categoryCostChartInstance.destroy()
  }

  window.categoryCostChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: categories,
      datasets: [
        {
          label: "Cost by Category",
          data: categoryCosts,
          backgroundColor: ["rgba(13, 110, 253, 0.7)", "rgba(25, 135, 84, 0.7)", "rgba(255, 193, 7, 0.7)"],
          borderColor: ["rgba(13, 110, 253, 1)", "rgba(25, 135, 84, 1)", "rgba(255, 193, 7, 1)"],
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
            text: "Cost (₹)",
          },
        },
        x: {
          title: {
            display: true,
            text: "Category",
          },
        },
      },
    },
  })
}

// Function to initialize event listeners for the Purchase Cost Statistics section
function initPurchaseCostStatisticsEventListeners() {
  // Filter functionality
  document.getElementById("apply-cost-stats-filters").addEventListener("click", () => {
    const year = document.getElementById("cost-stats-filter-year").value
    const quarter = document.getElementById("cost-stats-filter-quarter").value

    let filteredStats = [...purchaseCostStats]

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

    renderPurchaseCostStatisticsTable(filteredStats)

    // We don't update the charts here as they should always show the full year data
  })

  // Reset filters
  document.getElementById("reset-cost-stats-filters").addEventListener("click", () => {
    document.getElementById("cost-stats-filter-year").value = "2024"
    document.getElementById("cost-stats-filter-quarter").value = ""

    renderPurchaseCostStatisticsTable(purchaseCostStats)
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
  if (contentType === "purchase-cost-statistics") {
    activeLink =
      document.querySelector(`#sidebar a[href="#"][onclick*="purchase-cost-statistics"]`) ||
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

