<template>
    <StackLayout>
        <ActionBar text="MyApp" :back="false"/>
        <StackLayout class="form">            
            <Image class="logo" src="~/assets/images/NativeScript-Vue.png" />
            <Label class="header">Hello {{profile.name}}!</Label>            
            <Label class="header">Welcome to Global!</Label>            
        </StackLayout>
    </StackLayout>
</template>

<script>
import ActionBar from "./ActionBar";
import { mapState, mapGetters } from "vuex";
export default {
  name: "local-tab",
  components: {ActionBar},
  computed: {
    ...mapGetters(["profile"])    
  },
};
</script>
<style scoped>
.logo {
  margin-bottom: 12;
  height: 90;
  font-weight: bold;
  horizontal-align: center;
}
.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  margin-bottom: 70;
  text-align: center;
  color: #66a59a;
}
</style>