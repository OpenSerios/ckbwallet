<template>
  <v-app>
    <v-main>
      <transition name="fade">
        <loading-app v-if="!appReady" />
      </transition>
      <template>
        <navbar v-show="isNavbar" />
        <div class="main_cols" :wallet_view="!isNavbar">
          <transition name="fade" mode="out-in">
            <sidebar v-if="!isNavbar" class="panel" />
          </transition>
          <transition name="fade" mode="out-in">
            <router-view id="router_view" />
          </transition>
          <transition name="fade" mode="out-in">
            <main-panel v-if="!isNavbar" class="panel" />
          </transition>
        </div>
      </template>
    </v-main>
    <notifications />
  </v-app>
</template>
<script>
import Notifications from './components/Notifications'
import Navbar from './components/layout/Navbar'
import MainPanel from './components/SidePanels/MainPanel'
import Sidebar from './components/wallet/sidebar'
import LoadingApp from './components/layout/loading_app'

export default {
  components: {
    Sidebar,
    Navbar,
    Notifications,
    MainPanel,
    LoadingApp
  },
  computed: {
    appReady() {
      return this.$store.getters['appReady']
    },
    isNavbar() {
      if (this.$route.path.includes('/wallet')) {
        return false
      }
      return true
    }
  },
  async created() {
    const parent = this
    // this.$store.dispatch('Assets/getAllAssets');
    this.$store.dispatch('Network/init')
    // check session storage
    // if Remember Keys was enabled, get keys and access wallet
    this.$store.dispatch('autoAccess').then((res) => {
      if (res) {
        parent.$store.dispatch('Notifications/add', {
          title: 'Keys Remembered',
          message: 'Your stored keys are used to log you in.',
          type: 'success'
        })
      }
    })
  }
}
</script>

<style scoped lang="scss">
    @use "./main";

    .main_cols{
        display: grid;
        grid-template-columns: 1fr;

        &[wallet_view]{
            grid-template-columns:  240px 1fr 340px;
            height: 100vh;

            #router_view{
                overflow: auto;
                padding: 12px 16px;
                padding-bottom: 0px;
            }
        }

    }

    #router_view{
        min-height: calc(100vh - 80px);
        position: relative;
        padding: main.$container_padding_m;
    }

    .panel{
        background-color: #fff;
        /*padding: 8px 16px;*/
        overflow: auto;
        height: 100%;
    }
</style>

<style lang="scss">
    @use "./main";

    html{
        height: 100%;
    }

    body{
        height: 100%;
    }

    p{
        margin: 0px !important;
    }
    #app {
        min-height: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
        background-color: #F5F6FA;
        font-family: 'Rubik', sans-serif;
        transition-duration: 0.2s;
    }

    #nav {
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 2;
        background-color: transparent;
        padding: main.$container_padding_m;
    }

    @include main.mobile-device{
        #router_view{
            padding: main.$container_padding_mobile !important;
        }

        #nav{
            padding: main.$container_padding_mobile;
            display: flex !important;
        }

        .main_cols{
            grid-template-columns: 1fr !important;
            &[wallet_view] {
                height: auto !important;
            }
        }
        .panel{
            display: none !important;
        }
    }

    @include main.medium-device{
        .main_cols{

            &[wallet_view]{
                grid-template-columns:  180px 1fr 240px !important;
            }
        }
    }

    @media only screen and (max-width: main.$width_s) {
        #router_view{
            padding: main.$container_padding_s;
        }
        #nav{
            padding: main.$container_padding_s;
        }
    }

    @media only screen and (max-width: main.$mobile_width) {

    }

</style>
