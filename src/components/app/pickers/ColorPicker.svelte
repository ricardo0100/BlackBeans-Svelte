<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { getColors } from "../../../util/API";

  let colors = [];
  export let selected = "";

  const dispatch = createEventDispatcher();

  onMount(async () => {
    // @ts-ignore
    colors = await getColors();
  });

  /**
   * @param {string} color
   */
  function setColor(color) {
    selected = color;
    dispatch("selected", {
      color: color,
    });
  }
</script>

<p class="mb-1">Color</p>

<div class="d-flex justify-content-between border rounded p-2">
  {#each colors as color}
    {#if color == selected}
      <i
        class="bi-check-circle-fill"
        style="color: {color}"
        on:click={(e) => {
          setColor(color);
        }}
      />
    {:else}
      <i
        class="bi-circle-fill"
        style="color: {color}"
        on:click={(e) => {
          setColor(color);
        }}
      />
    {/if}
  {/each}
</div>
