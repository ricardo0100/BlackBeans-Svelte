<script>
  import ColorPicker from "../Pickers/ColorPicker.svelte";
  import { postNewAccount, putExistingAccount } from "../../API";
  import { createEventDispatcher } from "svelte";

  export let editingAccount = { name: "" };
  let showNameError = false;

  const dispatch = createEventDispatcher();

  async function onSaveClicked() {
    showNameError = false;
    if (editingAccount.name == "") {
      showNameError = true;
      return;
    }
    if (editingAccount.id == null) {
      await postNewAccount(editingAccount.name, editingAccount.color);
    } else {
      await putExistingAccount(editingAccount.id, editingAccount.name, editingAccount.color);
    }
    closeModal();
  }

  function closeModal() {
    dispatch("success");
    const element = document.getElementById("editaccountmodal");
    // @ts-ignore
    const modal = bootstrap.Modal.getOrCreateInstance(element);
    modal.hide();
  }
</script>

<div id="editaccountmodal" class="modal" tabindex="-1" data-bs-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{editingAccount.name == "" ? "New account" : "Edit account"}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" bind:value={editingAccount.name} class="form-control" id="name" class:is-invalid={showNameError} />
            <div class="invalid-feedback">Enter a name</div>
          </div>
          <div class="mb-3">
            <ColorPicker selected={editingAccount.color} on:selected={(e) => (editingAccount.color = e.detail.color)} />
          </div>
        </form>
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
