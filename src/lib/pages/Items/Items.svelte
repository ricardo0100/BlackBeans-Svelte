<script>
  import { getItems } from "../../API";
  import { afterUpdate, onMount } from "svelte";
  import EditItem from "./EditItem.svelte";

  let items = [];
  let isLoading = false;
  let editingItem = { id: null, name: "", value: 0, account: null, category: null, isCredit: false };
  async function loadItems() {
    isLoading = true;
    items = await getItems();
    isLoading = false;
  }

  onMount(async () => {
    await loadItems();
  });

  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function formatTimestamp(timestamp) {
    var newDate = new Date();
    newDate.setTime(timestamp * 1000);
    return newDate.toLocaleDateString();
  }

  function onNewItemClicked() {
    editingItem = { id: null, name: "", value: 0, account: null, category: null, isCredit: false };
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

{#if isLoading}
  <div class="text-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
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
          <small class="ms-auto">{formatTimestamp(item.creationTimestamp)}</small>
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
          <h5 class="ms-auto">{formatter.format(item.value)}</h5>
        </div>
      </li>
    {/each}
  </ul>
{/if}

<EditItem {editingItem} on:success={() => loadItems()} />

<style>
  .badge {
    height: 24px;
  }
</style>
