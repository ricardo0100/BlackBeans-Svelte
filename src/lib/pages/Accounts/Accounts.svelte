<script>
  import { onMount } from "svelte";
  import EditAccount from "./EditAccount.svelte";
  import { getAccounts } from "../../API";
  import { formatCurrency } from "../../Formatters";

  let isLoading = false;
  let accounts = [];
  let editingAccount = { name: "", color: "#000000" };

  async function loadAccounts() {
    isLoading = true;
    accounts = await getAccounts();
    isLoading = false;
  }
  onMount(async () => {
    await loadAccounts();
  });

  function showNewAccount() {
    editingAccount = { name: "", color: "#000000" };
    showModal();
  }

  /**
   * @param {{ name: string; color: string; }} account
   */
  function showExistingAccount(account) {
    editingAccount = account;
    showModal();
  }

  function showModal() {
    const element = document.getElementById("editaccountmodal");
    // @ts-ignore
    const modal = bootstrap.Modal.getOrCreateInstance(element);
    modal.show();
  }
</script>

<div class="hstack mb-3">
  <h1>Accounts</h1>
  <span class="ms-auto" />
  <button
    class="btn btn-primary"
    on:click={(e) => {
      showNewAccount();
    }}>New account</button
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
  {#each accounts as account (account.id)}
    <li
      class="list-group-item list-group-item-action"
      on:click={(e) => {
        showExistingAccount(account);
      }}
    >
      <span class="material-icons float-start me-2" style="color: {account.color};">circle</span>
      {account.name}
      <span class="float-end me-2" class:text-danger={account.total < 0} class:text-success={account.total >= 0}>{formatCurrency(account.total)}</span>
    </li>
  {/each}
</ul>

<EditAccount
  {editingAccount}
  on:success={async () => {
    await loadAccounts();
  }}
/>
