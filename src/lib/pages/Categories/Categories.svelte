<script>
  import { onMount } from "svelte";
  import { getCategories } from "../../API";
  import EditCategory from "./EditCategory.svelte";

  let categories = [];
  let editingCategory = { name: "", icon: "" };

  async function loadCategories() {
    categories = await getCategories();
  }

  onMount(async () => {
    await loadCategories();
  });

  function showNewCategory() {
    editingCategory = { name: "", icon: "" };
    showModal();
  }

  // /**
  //  * @param {{ name: string; color: string; }}
  //  */
  // function showExistingAccount(account) {
  //   editingAccount = account;
  //   showModal();
  // }

  function showModal() {
    const element = document.getElementById("editcategorymodal");
    // @ts-ignore
    const modal = bootstrap.Modal.getOrCreateInstance(element);
    modal.show();
  }
</script>

<div class="hstack mb-3">
  <h1>Categories</h1>
  <span class="ms-auto" />
  <button
    class="btn btn-primary"
    on:click={(e) => {
      showNewCategory();
    }}>New category</button
  >
</div>

<ul class="list-group">
  {#each categories as category (category.id)}
    <li
      class="list-group-item list-group-item-action"
      on:click={(e) => {
        // showExistingAccount(account);
      }}
    >
      <i class="bi-circle-fill me-3" style="color: {category}" />{category.name}
    </li>
  {/each}
</ul>

<EditCategory
  on:success={async () => {
    await loadCategories();
  }}
/>
