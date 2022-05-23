<script>
  import { createEventDispatcher } from "svelte";
  import { putItem, postItem } from "../../API";
  import AccountPicker from "../Pickers/AccountPicker.svelte";
  import CategoryPicker from "../Pickers/CategoryPicker.svelte";

  export let editingItem = {};

  const dispatch = createEventDispatcher();

  let showNameError = false;

  async function onSaveClicked() {
    if (editingItem.name == "") {
      showNameError = true;
      return;
    }
    console.log(editingItem);
    if (editingItem.id == null) {
      await postItem(editingItem.name, editingItem.value, editingItem.account.id, editingItem.category.id, editingItem.isCredit);
    } else {
      await putItem(editingItem.id, editingItem.name, editingItem.value, editingItem.account.id, editingItem.category.id, editingItem.isCredit);
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
          <AccountPicker selectedAccount={editingItem.account} on:selected={(e) => (editingItem.account = e.detail.account)} />
        </div>
        <div class="mb-3">
          <CategoryPicker selectedCategory={editingItem.category} on:selected={(e) => (editingItem.category = e.detail.category)} />
        </div>
      </div>
      <div class="modal-footer">
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
