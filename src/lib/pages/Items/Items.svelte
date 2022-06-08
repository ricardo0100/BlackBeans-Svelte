<script>
  import { getAccounts, getCategories, getItems } from "../../API";
  import { onMount } from "svelte";
  import EditItem from "./EditItem.svelte";
  import { formatCurrency, formatDate } from "../../Formatters";
  import { Item } from "../../model/Item";

  let allItems = [];
  let items = [];
  let editingItem = new Item();
  let isLoading = false;
  let showAPIError = false;
  let startDate = new Date().toISOString().slice(0, 7) + "-01";
  let endDate = new Date().toISOString().slice(0, 10);
  let accounts = [];
  let selectedAccount = null;
  let categories = [];
  let selectedCategory = null;
  $: total = items.reduce((acumulator, item) => {
    if (item.isCredit) return acumulator + item.value;
    else return acumulator - item.value;
  }, 0);

  async function loadItems() {
    isLoading = true;
    showAPIError = false;

    try {
      allItems = await getItems();
      clearFilter();
      showAPIError = false;
      isLoading = false;
    } catch (error) {
      showAPIError = true;
      isLoading = false;
    }
  }

  async function loadAccounts() {
    accounts = await getAccounts();
  }

  async function loadCategories() {
    categories = await getCategories();
  }

  onMount(() => {
    loadItems();
    loadAccounts();
    loadCategories();
  });

  function onNewItemClicked() {
    editingItem = new Item();
    openModal();
  }

  function openExistingItem(item) {
    editingItem = item;
    openModal();
  }

  function openModal() {
    const element = document.getElementById("editItemModal");
    // @ts-ignore
    const modal = bootstrap.Modal.getOrCreateInstance(element);
    modal.show();
  }

  function applyFilter() {
    items = allItems.filter((item) => {
      return item.date <= endDate && item.date >= startDate;
    });
    if (selectedAccount != null) {
      items = items.filter((item) => {
        return item.account.id == selectedAccount.id;
      });
    }
    if (selectedCategory != null) {
      items = items.filter((item) => {
        if(item.category != null) {
          return item.category.id == selectedCategory.id;
        }
        return false;
      });
    }
  }

  function clearFilter() {
    startDate = new Date().toISOString().slice(0, 7) + "-01";
    endDate = new Date().toISOString().slice(0, 10);
    selectedAccount = null;
    selectedCategory = null;
    applyFilter();
  }
</script>

<div class="hstack mb-3">
  <h1>Items</h1>
  <span class="ms-auto" />
  <button
    class="btn btn-primary"
    on:click={() => {
      onNewItemClicked();
    }}>New item</button
  >
</div>

<div class="d-flex align-content-center gap-3">
  <input bind:value={startDate} style="font-size: 0.95em;" type="date" class="border border-secondary text-secondary rounded p-2" />
  <input bind:value={endDate} style="font-size: 0.95em;" type="date" class="border border-secondary text-secondary rounded p-2" />
  <div class="dropdown">
    <button class="btn btn-outline-secondary dropdown-toggle p-2" type="button" id="dropdownAccounts" data-bs-toggle="dropdown" aria-expanded="false">
      {#if selectedAccount == null}
        All accounts
      {:else}
        <span class="material-icons me-2" style="color: {selectedAccount.color}; font-size: 1rem;">circle</span>{selectedAccount.name}
      {/if}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownAccounts">
      <li>
        <button
          type="button"
          class="dropdown-item"
          on:click={() => {
            selectedAccount = null;
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
              selectedAccount = account;
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
      {#if selectedCategory == null}
        All categories
      {:else}
        <span class="material-icons me-2" style="color: {selectedCategory.color}; font-size: 1rem;">{selectedCategory.icon}</span>{selectedCategory.name}
      {/if}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownAccounts">
      <li>
        <button
          type="button"
          class="dropdown-item"
          on:click={() => {
            selectedCategory = null;
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
              selectedCategory = category;
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

{#if isLoading}
  <div class="text-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
{:else if showAPIError}
  <div class="alert alert-warning d-flex align-items-center mt-5" role="alert">An error occoured while fetching the items.</div>
{:else if items.length == 0}
  <div class="alert alert-secondary mt-5" role="alert">No items!</div>
{:else}
  <ul class="list-group mt-3">
    {#each items as item}
      <li
        class="list-group-item list-group-item-action"
        on:click={() => {
          openExistingItem(item);
        }}
      >
        <div class="hstack">
          <h5 class="mb-1">{item.name}</h5>
          <small class="ms-auto">{formatDate(item.date)}</small>
        </div>
        <div class="d-flex flex-wrap gap-1">
          <span class="badge d-flex align-items-center flex-shrink-1" style="background-color: {item.account.color};">
            {item.account.name}
          </span>
          {#if item.category != null}
            <span class="badge d-flex align-items-center flex-shrink-2" style="background-color: {item.category.color};">
              <span class="material-icons me-2" style="font-size: 1.3em;">{item.category.icon}</span>{item.category.name}
            </span>
          {/if}
          <h5 class="ms-auto" class:text-danger={!item.isCredit} class:text-success={item.isCredit}>
            {#if !item.isCredit}-{/if}{formatCurrency(item.value)}
          </h5>
        </div>
      </li>
    {/each}
  </ul>
  <h4 class="text-end mt-3" class:text-danger={total < 0} class:text-success={total >= 0}>
    Total: {formatCurrency(total)}
  </h4>
{/if}

<EditItem {editingItem} on:success={() => loadItems()} />

<style>
  .badge {
    height: 24px;
  }
</style>
