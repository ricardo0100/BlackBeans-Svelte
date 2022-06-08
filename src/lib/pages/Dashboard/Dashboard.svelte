<script>
  import { getDashboard } from "../../API";
  import { onMount } from "svelte";
  import { formatCurrency } from "../../Formatters";
  import CategoriesPieChart from "./CategoriesChart.svelte";

  let accounts = [];
  let categories = [];
  let isLoading = false;

  async function loadDashboard() {
    isLoading = true;
    let response = await getDashboard();
    accounts = response.accountsBoard;
    categories = response.categoriesChart;
    isLoading = false;
  }

  onMount(async () => {
    await loadDashboard();
  });
</script>

<div class="row">
  <div class="col-lg-5 offset-lg-1">
    <h2 class="mb-4">Accounts</h2>
    {#if isLoading}
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    {:else}
      <ul class="list-group">
        {#each accounts as account}
          <li class="list-group-item">
            <span class="material-icons float-start me-2" style="color: {account.color};">circle</span>
            {account.name}
            <span class="float-end me-2" class:text-danger={account.total < 0} class:text-success={account.total >= 0}>{formatCurrency(account.total)}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div class="col-lg-3 offset-lg-1">
    <h2 class="mb-4">Categories</h2>
    {#if isLoading}
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    {/if}
    <CategoriesPieChart {categories} />
  </div>
</div>
