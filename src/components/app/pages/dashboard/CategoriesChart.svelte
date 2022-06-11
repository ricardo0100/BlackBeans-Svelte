<script>
  import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";

  Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

  export let categories = [];
  let chart = undefined;

  $: if (categories) {
    setupCategoriesChart();
  }

  function setupCategoriesChart() {
    if (categories.length == 0) return;

    let filtered = categories.filter((category) => {
      return category.total > 0;
    });

    let labels = filtered.map((category) => {
      return category.name;
    });

    let colors = filtered.map((category) => {
      return category.color;
    });

    let values = filtered.map((category) => {
      return category.total;
    });

    const data = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
        },
      ],
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "rgb(255, 99, 132)",
            },
          },
        },
      },
    };

    const config = {
      type: "doughnut",
      data: data,
    };

    // @ts-ignore
    chart = new Chart("categoriesChart", config);
  }
</script>

<canvas id="categoriesChart" />
