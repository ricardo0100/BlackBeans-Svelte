<script>
  import { postNewCategory, putExistingCategory } from "../../API";
  import { createEventDispatcher } from "svelte";
  import ColorPicker from "../Pickers/ColorPicker.svelte";
  import IconPicker from "../Pickers/IconPicker.svelte";

  export let editingCategory = { name: "", color: "", icon: "" };
  let showNameError = false;

  const dispatch = createEventDispatcher();

  async function onSaveClicked() {
    showNameError = false;
    if (editingCategory.name == "") {
      showNameError = true;
      return;
    }
    if (editingCategory.id == null) {
      await postNewCategory(editingCategory.name, editingCategory.color, editingCategory.icon);
    } else {
      await putExistingCategory(editingCategory.id, editingCategory.name, editingCategory.color, editingCategory.icon);
    }
    closeModal();
  }

  function closeModal() {
    dispatch("success");
    const element = document.getElementById("editcategorymodal");
    // @ts-ignore
    const modal = bootstrap.Modal.getOrCreateInstance(element);
    modal.hide();
  }
</script>

<div id="editcategorymodal" class="modal" tabindex="-1" data-bs-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{editingCategory.name == "" ? "New category" : "Edit category"}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" bind:value={editingCategory.name} class="form-control" id="name" class:is-invalid={showNameError} />
            <div class="invalid-feedback">Enter a name</div>
          </div>
          <div class="mb-3">
            <ColorPicker selected={editingCategory.color} on:selected={(e) => (editingCategory.color = e.detail.color)} />
          </div>
          <div class="mb-3">
            <IconPicker selected={editingCategory.icon} on:selected={(e) => (editingCategory.icon = e.detail.icon)} />
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
