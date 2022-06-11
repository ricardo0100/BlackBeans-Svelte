<script>
  import { getItems } from "../../../../util/API";
  import { onMount } from "svelte";
  import EditItem from "./EditItem.svelte";
  import { formatCurrency, formatDate } from "../../../../util/formatters";
  import { Item } from "../../../../model/item";
  import ItemsFilter from "./ItemsFilter.svelte";

  let allItems = [];
  let items = [];
  let editingItem = new Item();
  let isLoading = false;
  let showAPIError = false;

  $: total = items.reduce((acumulator, item) => {
    if (item.isCredit) return acumulator + item.value;
    else return acumulator - item.value;
  }, 0);

  async function loadItems() {
    isLoading = true;
    showAPIError = false;

    try {
      allItems = await getItems();
      items = allItems;
      showAPIError = false;
      isLoading = false;
    } catch (error) {
      showAPIError = true;
      isLoading = false;
    }
  }

  onMount(() => {
    loadItems();
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

  function applyFilter(filter) {
    items = allItems.filter((item) => {
      return item.date <= filter.endDate && item.date >= filter.startDate;
    });
    if (filter.selectedAccount != null) {
      items = items.filter((item) => {
        return item.account.id == filter.selectedAccount.id;
      });
    }
    if (filter.selectedCategory != null) {
      items = items.filter((item) => {
        if (item.category != null) {
          return item.category.id == filter.selectedCategory.id;
        }
        return false;
      });
    }
    items = items.sort((a, b) => {
      if (a.date == b.date) {
        return b.id - a.id;
      } else if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
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

<ItemsFilter
  on:filterApplied={(e) => {
    console.log(e.detail);
    applyFilter(e.detail);
  }}
/>

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
