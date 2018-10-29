<template>
<StackLayout>
    <GridLayout class="action-bar" rows="*" columns="50,2*,50,50,50">
        <Label v-if="back" col="0" row="0" class="fas" @tap="$navigateBack()" :text="'\uf060'"/>
        <Label col="1" row="0" class="header" :text="text"/>
        <Label col="2" row="0" class="fas" @tap="toggleSearch()" :text="'\uf002'"/>
        <Label col="3" row="0" class="fas" @tap="goSettings()" :text="'\uf013'"/>       
        <Label col="4" row="0" class="fas" @tap="goProfile()" :text="'\uf007'"/>
    </GridLayout>
     <SearchBar v-if="searchbar"  hint="Search for.." [text]="searchPhrase" (textChange)="onTextChanged($event)" (submit)="onSubmit($event)" 
                color="grey" textFieldBackgroundColor="lightgrey" textFieldHintColor="darkgrey"></SearchBar>
</StackLayout>
</template>

<script>
import SettingsPage from "@/components/SettingsPage";
import ProfilePage from "@/components/ProfilePage";
export default {
  name: "actionbar-component",
  props: {
    text: {},
    back: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      searchbar: false
    };
  },
  methods: {
    goSettings() {
      this.$navigateTo(SettingsPage);
    },
    goProfile() {
      this.$navigateTo(ProfilePage);
    },
    toggleSearch() {
      this.searchbar = !this.searchbar;
    }
  }
};
</script>
<style>
.action-bar {
  background-color: #90D2C5;
  color: #131426;
  font-weight: bold;
  font-size: 20;
  font-family: "Quicksand";
  height: 30;
}
</style>
