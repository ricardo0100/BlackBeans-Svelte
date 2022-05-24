<script>
  import { onMount } from "svelte";
  import { getCategories } from "../../API";
  import EditCategory from "./EditCategory.svelte";

  let categories = [];
  let isLoading = false;
  let editingCategory = { name: "", color: "", icon: "" };

  async function loadCategories() {
    isLoading = true;
    categories = await getCategories();
    isLoading = false;
  }

  onMount(async () => {
    await loadCategories();
  });

  function showNewCategory() {
    editingCategory = { name: "", color: "", icon: "" };
    showModal();
  }

  // /**
  //  * @param {{ name: string; color: string; icon: string; }}
  //  */
  function showExistingCategory(category) {
    editingCategory = category;
    showModal();
  }

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

{#if isLoading}
  <div class="text-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
{/if}

<ul class="list-group">
  {#each categories as category (category.id)}
    <li
      class="list-group-item list-group-item-action"
      on:click={(e) => {
        showExistingCategory(category);
      }}
    >
      <span class="material-icons float-start me-2" style="color: {category.color};">{category.icon}</span>
      {category.name}
    </li>
  {/each}
</ul>

<EditCategory
  {editingCategory}
  on:success={async () => {
    await loadCategories();
  }}
/>
