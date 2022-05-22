<script>
  import { getItems } from "../../API";
  import { onMount } from "svelte";

  let items = [];
  async function loadItems() {
    items = await getItems();
    console.log(items)
  }
  onMount(async () => {
    await loadItems();
  });
</script>

<div class="hstack mb-3">
  <h1>Items</h1>
  <span class="ms-auto" />
  <button class="btn btn-primary">New item</button>
</div>

<h5>Filter</h5>
<div class="hstack gap-3">
  <input class="form-control" id="" placeholder="Search item" />
  <button class="btn btn-primary btn-sm">Apply</button>
</div>
<ul class="list-group mt-3">
  {#each items as item}
    <li class="list-group-item list-group-item-action">
      {item.name}
    </li>
  {/each}
</ul>
