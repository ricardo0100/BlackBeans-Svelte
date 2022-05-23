<script>
  import { Chart, DoughnutController, ArcElement, LineController, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
  import { onMount } from "svelte";

  Chart.register(DoughnutController, ArcElement, LineController, CategoryScale, LinearScale, PointElement, LineElement, Title);

  onMount(() => {
    setupCategoriesChart();
    setupTimeChart();
  });

  function setupCategoriesChart() {
    const ctx = document.getElementById("categoriesChart");

    const data = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [200, 120, 85, 40],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(155, 205, 86)"],
          hoverOffset: 4,
        },
      ],
    };

    const config = {
      type: "doughnut",
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Custom doughnbtntbn Title",
          },
          legend: {
            display: true,
            labels: {
              color: "rgb(255, 99, 132)",
            },
          },
        },
      },
    };

    // @ts-ignore
    const myChart = new Chart(ctx, config);
  }

  function setupTimeChart() {
    const data = {
      labels: ["kdk", "dsdsds", "sdss", "aaa", "qwe", "qwqwq", "x"],
      datasets: [
        {
          label: "My First Dataset",
          data: [65, 59, 80, 81, 56, 55, 20],
          fill: false,
          borderColor: "rgb(100, 150, 190)",
          tension: 0.0,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Custom Chart Title",
          },
        },
      },
    };

    const ctx = document.getElementById("timeChart");
    // @ts-ignore
    const myChart = new Chart(ctx, config);
  }
</script>

<div class="row">
  <div class="col-lg-4 text-center">
    <canvas id="categoriesChart" />
  </div>
  <div class="col-lg-8 text-center">
    <canvas id="timeChart" />
  </div>
</div>

<style>
  #categoriesChart {
    width: 50px;
  }
</style>
