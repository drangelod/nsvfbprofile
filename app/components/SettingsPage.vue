<template>
   <Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <StackLayout class="container">
            <GridLayout class="action-bar" rows="*" columns="50,2*,50">
                <Label col="0" row="0" class="fas" @tap="$navigateBack()" :text="'\uf060'"/>
                <Label col="1" row="0" class="header" text="Settings"/>               
            </GridLayout>            
            <Button  text="Logout" class="logout" @tap="logoutApp()" />
        </StackLayout>
    </Page>
</template>
<script>
import LoginPage from "./LoginPage.vue";
export default {
  name: "settings-page",
  components: {},
  computed: {},
  created() {},
  methods: {
    logoutApp() {
      this.$authService.logout()
    }
  }
};
</script>
<style scoped>
.logout {
  horizontal-align: stretch;
  text-align: center;
  color: white;
  background-color: #1b1c1d;
  height: 36;
}
</style>