<script>
  import { getDashboard } from "../../API";
  import { onMount } from "svelte";
  import { formatCurrency } from "../../Formatters";
  import CategoriesPieChart from "./CategoriesChart.svelte";

  let accounts = [];
  let categories = [];

  onMount(async () => {
    let response = await getDashboard();
    accounts = response.accountsBoard;
    categories = response.categoriesChart;
  });
</script>

<div class="row">
  <div class="col-lg-6">
    <h2 class="mb-2">Accounts</h2>
    <ul class="list-group">
      {#each accounts as account}
        <li class="list-group-item">
          <span class="material-icons float-start me-2" style="color: {account.color};">circle</span>
          {account.name}
          <span class="float-end me-2" class:text-danger={account.total < 0} class:text-success={account.total >= 0}>{formatCurrency(account.total)}</span>
        </li>
      {/each}
    </ul>
  </div>
  <div class="col-lg-4 offset-2">
    <h2 class="mb-2">Categories</h2>
    <CategoriesPieChart {categories} />
  </div>
</div>
