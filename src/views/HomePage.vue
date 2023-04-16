<script>
  import { getAllNotes } from "../crossbell";

  export default defineComponent({
    async beforeMount() {
      const notes = await getAllNotes();
      this.items = notes.list;
      this.cursor = notes.cursor;
    },

    async mounted() {
      this.getNextPageData();
    },

    data() {
      const logo = import.meta.env.VITE_LOGO;
      return {
        items: [],
        logo,
        cursor: null,
        siteName: import.meta.env.VITE_APP_TITLE,
      };
    },

    methods: {
      formatDate(date) {
        // to local date time format
        return new Intl.DateTimeFormat(
          window.navigator.userLanguage || window.navigator.language,
          {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }
        ).format(new Date(date));
      },

      getNextPageData() {
        window.onscroll = async () => {
          // detect if the user has scrolled to the bottom of the page
          let bottomOfWindow =
            document.documentElement.scrollTop + window.innerHeight >=
            document.documentElement.offsetHeight;
          if (bottomOfWindow) {
            const notes = await getAllNotes(this.cursor);
            this.cursor = notes.cursor;

            this.items = this.items.concat(notes.list);
          }
        };
      },
    },
  });
</script>

<template>
  <div class="top-box">
    <div class="side-bar hidden md:block">
      <img :src="logo" alt="agora-logo" class="agora-logo" />

      <div class="navigation">
        <div class="item-logo hidden">
          <img src="/hemisphereEastGray.png" alt="home-icon" class="item-img" />
        </div>
        <div class="item-logo hidden">
          <img src="/ArchiveTray.png" alt="user-icon" class="item-img" />
        </div>
        <div class="item-logo hidden">
          <img src="/userCircle.png" alt="user-icon" class="item-img" />
        </div>
      </div>

      <div class="agora-logo"></div>
    </div>

    <div class="main-box my-5 ml-0 md:ml-36">
      <div class="top-nav">
        <div class="main-titile hidden md:block">Home</div>

        <img :src="logo" alt="agora-logo" class="agora-logo block md:hidden" />

        <div class="searchBox hidden lg:block">
          <form class="search-bar">
            <input type="text" :placeholder="`Search ${siteName}...`" />
          </form>
        </div>
        <div class="connect-button">Connect wallet</div>
      </div>

      <div class="cardBox overflow-hidden">
        <div class="card" v-for="(item, index) in items">
          <div class="card-top">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="collect-button">Collect</div>
          </div>

          <div class="author-info">
            <!-- <div class="avtor">
                                    <img src="" alt="">
                                </div> -->
            <div class="author-name">
              {{ item.author }}
            </div>
          </div>

          <div class="content break-words">
            {{ item.content }}
          </div>

          <div class="pulished-time">
            {{ formatDate(item.time) }}

            <a
              class="source"
              :href="item.source.url || '#'"
              target="_blank"
              :title="item.source.url || ''"
            >
              <img
                class="inline"
                v-if="item.source.type === 'discord'"
                src="/source-discord.svg"
              />
              <img class="inline" v-else src="/source-telegram.svg" /><span>{{
                item.source.server
              }}</span>
              <img
                class="inline"
                v-if="item.source.channel"
                src="/channel.svg"
              /><span v-if="item.source.channel">{{
                item.source.channel
              }}</span>
            </a>
          </div>

          <div class="tags">
            <Tag v-for="(tag, index) in item.tags" v-if="tag">#{{ tag }}</Tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .top-box {
    margin: 0;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(to right, #202020, green, #f3a34b, #202020);

    .side-bar {
      position: fixed;
      height: 100vh;
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;

      border: #998882 1px solid;
      border-radius: 0px 16px 16px 0px;
      background-color: rgba(26, 20, 20, 0.8);
      margin: 20px 20px 20px 0px;
      padding: 24px 24px;

      .agora-logo {
        width: 58px;
        height: 58px;
      }

      .item-img {
        width: 30px;
        height: 30px;
      }

      .navigation {
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        .item-logo {
          margin: 12px;
        }
      }
    }

    .main-box {
      min-height: 100vh;
      border: #998882 1px solid;
      border-radius: 16px 0px 0px 16px;
      background-color: rgba(26, 20, 20, 0.8);
      width: 100%;

      padding: 24px 38px;
      .top-nav {
        display: flex;
        justify-content: space-between;
        .main-titile {
          color: #ffffff;
          font-size: 40px;
          line-height: 48px;
        }

        .searchBox {
          padding: 12px 0;
          .search-bar {
            display: flex;
            justify-content: center;
            height: 32px;
            input {
              background-color: transparent;
              padding: 0 1em;
              width: 400px;
              border-radius: 20px;
              border: 1px solid #998882;
              transition: 0.3s linear;
              float: right;
            }
            input:focus {
              width: 300px;
            }
            button {
              background: none;
              top: -2px;
              right: 0;
            }
            button:before {
              content: "\f002";
              font-family: FontAwesome;
              color: #998882;
            }
          }
        }
        .connect-button {
          margin: 8px 0;
          display: none;
          // display: flex;
          align-items: center;
          border-radius: 8px;
          background-color: #f3a34b;
          border: none;
          color: #000000;
          padding: 8px 16px;
          text-align: center;
          font-size: 16px;
          cursor: pointer;
        }
      }

      .cardBox {
        color: #ffffff;
        margin: 72px 0px 0px 0px;
        .card {
          border: #998882 1px solid;
          border-radius: 16px;
          margin-bottom: 24px;
          padding: 16px;
          .card-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            .title {
              font-size: 22px;
            }
            .collect-button {
              display: none;
              background-color: #8ae064;
              color: #000000;
              text-align: center;
              padding: 8px 16px;
              border: none;
              border-radius: 8px;
            }
          }
          .author-info {
            margin-bottom: 16px;
            .author-name {
              color: #ccc4c4;
              font-size: 12px;
            }
          }
          .content {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 16px;
          }

          .pulished-time {
            font-size: 12px;
            color: #a4a4a4;
          }
          .source {
            color: #d6cd8d;
            margin-left: 8.5px;
            display: inline;
            img {
              vertical-align: text-bottom;
            }
            span {
              vertical-align: middel;
              margin: 0 8px 0 5px;
            }
          }
          .tags {
            display: flex;
            gap: 8px;
            margin-top: 8px;
          }
        }
      }
    }
  }
</style>
