<script>
  import { getCategories } from "../../../util/API";
  import { createEventDispatcher, onMount } from "svelte";

  let categories = [];
  export let selectedCategory = null;
  const dispatch = createEventDispatcher();

  onMount(async () => {
    categories = await getCategories();
  });

  function onCategorySelected(category) {
    selectedCategory = category;
    dispatch("selected", {
      category: category,
    });
  }
</script>

<p class="mb-1">Category</p>

<div class="dropdown">
  <button class="btn btn-light dropdown-toggle" type="button" id="accountsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
    {#if selectedCategory == null}
      Select category
    {:else}
      <span class="material-icons float-start me-2" style="color: {selectedCategory.color};">{selectedCategory.icon}</span>{selectedCategory.name}
    {/if}
  </button>

  <ul class="dropdown-menu" aria-labelledby="accountsDropdown">
    <form class="p-2 mb-2 bg-light border-bottom">
      <input type="search" class="form-control" autocomplete="false" placeholder="Type to filter..." />
    </form>
    {#each categories as category (category.id)}
      <li>
        <button
          type="button"
          class="dropdown-item"
          on:click={() => {
            onCategorySelected(category);
          }}
        >
          <span class="material-icons float-start me-2" style="color: {category.color};">{category.icon}</span>{category.name}
        </button>
      </li>
    {/each}
  </ul>
</div>
