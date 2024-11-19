const form = document.getElementById("budget-form");
const summary = document.getElementById("summary");
const chartContainer = document.getElementById("finance-chart");
let chart;

// Maneja el envío del formulario
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtener datos del usuario
  const income = parseFloat(document.getElementById("income").value);
  const expenses = parseFloat(document.getElementById("expenses").value);
  const savings = parseFloat(document.getElementById("savings").value);

  // Validación básica
  if (income <= 0 || expenses < 0 || savings < 0) {
    summary.innerHTML = `<p style="color: red;">Por favor, ingresa valores válidos.</p>`;
    return;
  }

  const surplus = income - (expenses + savings);
  if (surplus < 0) {
    summary.innerHTML = `<p style="color: red;">Tus gastos y ahorros superan tu ingreso mensual.</p>`;
    return;
  }

  // Actualizar resultados
  summary.innerHTML = `
        <p><strong>Ingresos:</strong> $${income.toFixed(2)}</p>
        <p><strong>Gastos:</strong> $${expenses.toFixed(2)}</p>
        <p><strong>Ahorros:</strong> $${savings.toFixed(2)}</p>
        <p><strong>Excedente:</strong> $${surplus.toFixed(2)}</p>
    `;

  // Generar gráfico
  renderChart(income, expenses, savings, surplus);
});

function renderChart(income, expenses, savings, surplus) {
  const ctx = chartContainer.getContext("2d");

  // Eliminar gráfico anterior
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Gastos", "Ahorros", "Excedente"],
      datasets: [
        {
          label: "Distribución Financiera",
          data: [expenses, savings, surplus],
          backgroundColor: ["#f87060", "#43aa8b", "#577590"],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}
