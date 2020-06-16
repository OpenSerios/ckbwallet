<template>
  <div class="fungibles_view">
    <div class="headers">
      <p class="name_col">Name</p>
      <p />
      <p class="send_col">Send</p>
      <p class="balance_col">Balance</p>
    </div>
    <div v-if="assets.length === 0" class="empty">
      <p>You do not have any assets</p>
    </div>
    <div v-else class="scrollable">
      <fungible-row v-for="asset in assets" :key="asset.id" lass="asset" :asset="asset" />
    </div>

  </div>
</template>
<script lang="ts">
// import FaucetLink from "@/components/misc/FaucetLink.vue";
import FungibleRow from './FungibleRow.vue'

export default {
  components: {
    // FaucetLink,
    FungibleRow
  },
  computed: {
    assets() {
      const res = this.$store.state.Assets.assets

      //   // Sort by balance, then name
      //   res.sort((a, b) => {
      //     const symbolA = a.symbol.toUpperCase()
      //     const symbolB = b.symbol.toUpperCase()
      //     const amtA = a.getAmount()
      //     const amtB = b.getAmount()

      //     // AVA always on top
      //     if (symbolA === 'AVA') {
      //       return -1
      //     } else if (symbolB === 'AVA') {
      //       return 1
      //     }

      //     if (amtA.gt(amtB)) {
      //       return -1
      //     } else if (amtA.lt(amtB)) {
      //       return 1
      //     }

      //     if (symbolA < symbolB) {
      //       return -1
      //     } else if (symbolA > symbolB) {
      //       return 1
      //     }
      //     return 0
      //   })

      //   if (this.search) {
      //     res = res.filter(val => {
      //       const query = this.search.toUpperCase()

      //       const nameUp = val.name.toUpperCase()
      //       const symbolUp = val.symbol.toUpperCase()

      //       if (nameUp.includes(query) || symbolUp.includes(query)) {
      //         return true
      //       } else {
      //         return false
      //       }
      //     })
      //   }

      return res
    },

    isUpdateBalance() {
      return this.$store.state.Assets.isUpdateBalance
    }
  }
}

</script>
<style scoped lang="scss">
    @use '../../main';

    .fungibles_view{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .search{
        height: 20px;
        font-size: 15px;
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        img{
            height: 100%;
            object-fit: contain;
            margin-right: 15px;
            opacity: 0.4;
        }

        input{
            outline: none;
        }
    }

    .headers{
        border-bottom: 1px solid #E6E6E666;
        font-size: 12px;
        padding: 14px 0px;
        color: #909090;
        font-weight: bold;
    }

    .scrollable{
        overflow-y: scroll;
        height: 450px;
        flex-grow: 1;
    }

    .asset{
        border-bottom: 1px solid #E6E6E666;

    }

    .send_col{
        text-align: center;
    }

    .empty{
        padding: 30px;
        text-align: center;
    }

    .faucet{
        margin: 0px auto;
        margin-top: 60px;
    }

    .name_col{
        white-space: nowrap;
    }

    @media only screen and (max-width: main.$mobile_width) {
        .headers, .asset{
            grid-template-columns: 50px 1fr 1fr 50px;
        }

        .balance_col{
            span{
                display: none;
            }
        }
        .balance_col{
            grid-column: 3;
            grid-row: 1;
        }

        .send_col{
            grid-column: 4;
        }

        .headers{
            .send_col{
                display: none;
            }
        }
    }
</style>
<style lang="scss">
    @use '../../main';
    .fungibles_view{
        .balance_col{
            text-align: right;
            display: grid;
            grid-template-columns: 1fr 80px;

            span{
                padding-left: 15px;
                text-align: left;
            }
        }

        .headers, .asset{
            display: grid;
            grid-template-columns: 50px 1fr 100px 1fr;
        }
    }

    @include main.mobile-device{
        .fungibles_view{
            .headers, .asset{
                grid-template-columns: 50px 1fr 1fr 50px;
            }

            .balance_col{
                span{
                    display: none;
                }
                grid-template-columns: 1fr;
            }
            .balance_col{
                grid-column: 3;
                grid-row: 1;
            }

            .send_col{
                grid-column: 4;
            }

            .headers{
                .send_col{
                    display: none;
                }
            }
        }
    }
</style>
