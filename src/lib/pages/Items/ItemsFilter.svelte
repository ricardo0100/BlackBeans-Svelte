<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { getAccounts, getCategories } from "../../API";

  const dispatch = createEventDispatcher();

  let accounts = [];
  let categories = [];

  let filter = {
    selectedAccount: null,
    selectedCategory: null,
    startDate: new Date().toISOString().slice(0, 7) + "-01",
    endDate: new Date().toISOString().slice(0, 10),
  };

  async function loadAccounts() {
    accounts = await getAccounts();
  }

  async function loadCategories() {
    categories = await getCategories();
  }

  onMount(() => {
    loadAccounts();
    loadCategories();
  });

  function applyFilter() {
    dispatch("filterApplied", filter);
  }

  function clearFilter() {
    filter.startDate = new Date().toISOString().slice(0, 7) + "-01";
    filter.endDate = new Date().toISOString().slice(0, 10);
    filter.selectedAccount = null;
    filter.selectedCategory = null;
    applyFilter();
  }
</script>

<div class="d-flex align-content-center gap-3">
  <input bind:value={filter.startDate} style="font-size: 0.95em;" type="date" class="border border-secondary text-secondary rounded p-2" />
  <input bind:value={filter.endDate} style="font-size: 0.95em;" type="date" class="border border-secondary text-secondary rounded p-2" />
  <div class="dropdown">
    <button class="btn btn-outline-secondary dropdown-toggle p-2" type="button" id="dropdownAccounts" data-bs-toggle="dropdown" aria-expanded="false">
      {#if filter.selectedAccount == null}
        All accounts
      {:else}
        <span class="material-icons me-2" style="color: {filter.selectedAccount.color}; font-size: 1rem;">circle</span>{filter.selectedAccount.name}
      {/if}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownAccounts">
      <li>
        <button
          type="button"
          class="dropdown-item"
          on:click={() => {
            filter.selectedAccount = null;
          }}
        >
          <span class="material-icons me-2" style="color: #FFFFFF00; font-size: 1rem;">circle</span>All accounts
        </button>
      </li>
      {#each accounts as account}
        <li>
          <button
            type="button"
            class="dropdown-item"
            on:click={() => {
              filter.selectedAccount = account;
            }}
          >
            <span class="material-icons me-2" style="color: {account.color}; font-size: 1rem;">circle</span>{account.name}
          </button>
        </li>
      {/each}
    </ul>
  </div>
  <div class="dropdown">
    <button class="btn btn-outline-secondary dropdown-toggle p-2" type="button" id="dropdownAccounts" data-bs-toggle="dropdown" aria-expanded="false">
      {#if filter.selectedCategory == null}
        All categories
      {:else}
        <span class="material-icons me-2" style="color: {filter.selectedCategory.color}; font-size: 1rem;">{filter.selectedCategory.icon}</span>{selectedCategory.name}
      {/if}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownAccounts">
      <li>
        <button
          type="button"
          class="dropdown-item"
          on:click={() => {
            filter.selectedCategory = null;
          }}
        >
          <span class="material-icons me-2" style="color: #FFFFFF00; font-size: 1rem;">circle</span>All categories
        </button>
      </li>

      {#each categories as category}
        <li>
          <button
            type="button"
            class="dropdown-item"
            on:click={() => {
              filter.selectedCategory = category;
            }}
          >
            <span class="material-icons me-2" style="color: {category.color}; font-size: 1rem;">{category.icon}</span>{category.name}
          </button>
        </li>
      {/each}
    </ul>
  </div>
  <button
    type="button"
    class="btn btn-primary b-1"
    on:click={() => {
      applyFilter();
    }}>Filter</button
  >
  <button
    type="button"
    class="btn b-1"
    on:click={() => {
      clearFilter();
    }}>Clear</button
  >
</div>
