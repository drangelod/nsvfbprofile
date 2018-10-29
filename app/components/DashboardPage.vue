<template>
    <Page class="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <TabView androidTabsPosition="bottom" selectedTabTextColor="blue" androidSelectedTabHighlightColor="blue" :selectedIndex="selectedIndex" class="fas tab-title">
          <TabViewItem :title="'\uf57d'">
              <tab-global></tab-global>
          </TabViewItem>
          <TabViewItem :title="'\uf14e'"  >
              <tab-local></tab-local>
          </TabViewItem>
          <TabViewItem :title="'\uf54f'">
              <tab-store></tab-store>
          </TabViewItem>
        </TabView>
	</Page>
</template>

<script>
import { mapState } from "vuex";
import LoginPage from "./LoginPage.vue";
import GlobalTab from "@/components/GlobalTab";
import LocalTab from "@/components/LocalTab";
import StoreTab from "@/components/StoreTab";
export default {
  name: "dashboard-page",
  components: {
    "tab-global": GlobalTab,
    "tab-local": LocalTab,
    "tab-store": StoreTab
  },
  computed: {
    ...mapState(["isLoggedIn"])    
  },
  methods: {
    init() {
    },
  },
  watch: {
    isLoggedIn(val) {
      if (!val) {
        this.$navigateTo(LoginPage, { clearHistory: true });
      }
    }
  }
};
</script>
<style scoped>
.tab-title {
  font-size: 24;
}
</style>