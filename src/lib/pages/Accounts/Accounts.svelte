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
      <div class="d-flex align-items-center">
        <span class="material-icons me-2" style="color: {account.color};">circle</span>
        {account.name}
        <div class="ms-auto text-end">
          <span class="float-end me-2" class:text-danger={account.total < 0} class:text-success={account.total >= 0}>
            <small class="text-secondary">Total in 04/06/2022</small><br />
            {formatCurrency(account.total)}
          </span>
        </div>
      </div>
    </li>
  {/each}
</ul>

<EditAccount
  {editingAccount}
  on:success={async () => {
    await loadAccounts();
  }}
/>
