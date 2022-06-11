<script>
  import { createEventDispatcher } from "svelte";
  import { putItem, postItem, deleteItem } from "../../util/API";
  import AccountPicker from "../Pickers/AccountPicker.svelte";
  import CategoryPicker from "../Pickers/CategoryPicker.svelte";
  import { Item } from "../../model/item";

  export let editingItem = new Item();

  const dispatch = createEventDispatcher();

  let showNameError = false;

  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  async function onSaveClicked() {
    if (editingItem.name == "") {
      showNameError = true;
      return;
    }

    let categoryId = null;
    if (editingItem.category != null) {
      categoryId = editingItem.category.id;
    }

    if (editingItem.id == null) {
      await postItem(editingItem.name, editingItem.value, editingItem.account.id, categoryId, editingItem.isCredit, editingItem.date);
    } else {
      await putItem(editingItem.id, editingItem.name, editingItem.value, editingItem.account.id, editingItem.category.id, editingItem.isCredit, editingItem.date);
    }

    closeModal();
    dispatch("success");
  }

  function closeModal() {
    const element = document.getElementById("editItemModal");
    // @ts-ignore
    const modal = bootstrap.Modal.getOrCreateInstance(element);
    modal.hide();
  }

  async function onConfirmDeleteClicked() {
    if (await deleteItem(editingItem.id)) {
      const element = document.getElementById("deleteModal");
      // @ts-ignore
      const modal = bootstrap.Modal.getOrCreateInstance(element);
      modal.hide();
      dispatch("success");
    }
  }
</script>

<div id="editItemModal" class="modal" tabindex="-1" data-bs-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{editingItem.name == "" ? "New item" : "Edit item"}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" bind:value={editingItem.name} class="form-control" id="name" class:is-invalid={showNameError} />
          <div class="invalid-feedback">Enter a name</div>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Value</label>
          <input type="text" bind:value={editingItem.value} class="form-control" id="value" class:is-invalid={showNameError} />
        </div>
        <div class="mb-3">
          <p class="mb-1">Type</p>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              class="btn"
              class:btn-outline-danger={editingItem.isCredit}
              class:btn-danger={!editingItem.isCredit}
              on:click={() => (editingItem.isCredit = false)}>Debit</button
            >
            <button
              type="button"
              class="btn"
              class:btn-outline-success={!editingItem.isCredit}
              class:btn-success={editingItem.isCredit}
              on:click={() => (editingItem.isCredit = true)}>Credit</button
            >
          </div>
        </div>
        <div class="mb-3">
          <p class="mb-1">Date</p>
          <input bind:value={editingItem.date} type="date" class="form-control" />
        </div>
        <div class="mb-3">
          <p class="mb-1">Number of payments</p>
          <input type="number" class="form-control" />
        </div>
        <div class="mb-3">
          <AccountPicker selectedAccount={editingItem.account} on:selected={(e) => (editingItem.account = e.detail.account)} />
        </div>
        <div class="mb-3">
          <CategoryPicker selectedCategory={editingItem.category} on:selected={(e) => (editingItem.category = e.detail.category)} />
        </div>
      </div>
      <div class="modal-footer">
        <div class="w-100 hstack gap-3">
          <div class="me-auto">
            {#if editingItem.id != null}
              <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
            {/if}
          </div>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button
            type="button"
            class="btn btn-primary"
            on:click={(e) => {
              onSaveClicked();
            }}>Save</button
          >
        </div>
      </div>
    </div>
  </div>
</div>

{#if editingItem.name != ""}
  <div class="modal" id="deleteModal" aria-labelledby="deleteModal" tabindex="-2">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete item?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this item?</p>
          <ul>
            <li>Name: <b>{editingItem.name}</b></li>
            <li>Value: <b>{formatter.format(editingItem.value)}</b></li>
            <li>Account: <b>{editingItem.account?.name}</b></li>
            {#if editingItem.category != null}
              <li>Category: <b>{editingItem.category?.name}</b></li>
            {/if}
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editItemModal">Cancel</button>
          <button
            type="button"
            class="btn btn-danger"
            on:click={() => {
              onConfirmDeleteClicked();
            }}>Delete</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}
