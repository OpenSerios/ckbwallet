<template>
  <div class="network_row" :active="isSelected">
    <img src="@/assets/network_ava.png">
    <div class="name_col">
      <p class="name">{{ network.name }}</p>
      <p class="url">{{ endpoint }}</p>
      <!-- TODO:Support update RPC URL -->
      <button v-if="!isSelected" disabled class="editBut" @click="edit">
        <fa icon="cog" />Edit
      </button>
    </div>
    <div class="stat_col">
      <button v-if="!isSelected" @click="select">Select</button>
      <button v-else-if="!isConnected" class="connecting">Connecting...</button>
      <p v-else>Connected</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    network: {
      type: Object,
      required: true
    }
  },
  computed: {
    endpoint() {
      const net = this.network
      return `${net.url}`
    },
    networkStatus() {
      return this.$store.state.Network.status
    },
    isConnected() {
      const state = this.$store.state.Network
      if (
        this.network === state.selectedNetwork &&
        this.networkStatus === 'connected'
      ) {
        return true
      }
      return false
    },
    isSelected() {
      const state = this.$store.state.Network
      if (this.network === state.selectedNetwork) {
        return true
      }
      return false
    }
  },
  methods: {
    edit() {
      console.log(this.$parent.$parent)
      this.$parent.$parent.$parent.onedit(this.network)
    },
    async select() {
      const net = this.network
      try {
        await this.$store.dispatch('Network/setNetwork', net)

        this.$store.dispatch(
          'Notifications/add',
          {
            title: 'Network Connected',
            message: 'Connected to ' + net.name,
            type: 'success'
          },
          { root: true }
        )
        this.$parent.$parent.isActive = false
      } catch (e) {
        // console.log(e);
        this.$store.state.Network.selectedNetwork = null
        this.$store.dispatch(
          'Notifications/add',
          {
            title: 'Connection Failed',
            message: `Failed to connect ${net.name}`,
            type: 'error'
          },
          { root: true }
        )
      }
    }
  }
}
</script>
<style scoped lang="scss">
@use '../../main';

.stat_col {
  font-size: 14px;
  color: #2960cd;
  text-align: right;
}

.network_row {
  position: relative;
  padding: 12px 0px;
  display: grid;
  grid-template-columns: 40px 1fr 80px;
  column-gap: 15px;
  border-bottom: 1px solid #eaedf4;

  > * {
    align-self: center;
  }
}
img {
  width: 100%;
  object-fit: contain;
}
.network_row[active] {
  .stat_col {
    color: #5ecb08 !important;
  }
}
.name_col {
  line-height: 1em;
  word-break: break-word;
  /*overflow: auto;*/
  /*text-overflow: ellipsis;*/
}

.editBut {
  color: #000;
  opacity: 0.4;
  font-size: 11px;
  /*position: absolute;*/
  /*top: 12px;*/
  /*right: 0px;*/
  margin-top: 6px;

  &:hover {
    opacity: 0.8;
  }
}

.connecting {
  animation-name: connecting;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.url {
  color: #909090;
  font-size: 12px;
}

@keyframes connecting {
  from {
    color: #2960cd;
  }
  to {
    color: #5ecb08;
  }
}

@media only screen and (max-width: main.$mobile_width) {
  img {
    display: none;
  }
  .network_row {
    grid-template-columns: 1fr max-content;
    /*grid-template-columns: none;*/
  }
}
</style>
