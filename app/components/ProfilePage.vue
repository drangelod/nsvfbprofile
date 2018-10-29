<template>
   <Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <StackLayout class="container">
            <GridLayout class="action-bar" rows="*" columns="50,2*,50">
                <Label col="0" row="0" class="fas" @tap="$navigateBack()" :text="'\uf060'"/>
                <Label col="1" row="0" class="header" text="Profile"/>               
            </GridLayout>        
            <GridLayout>
              <GridLayout class="form-content" rows="auto,*,auto,auto" >
                  <StackLayout class="top-border" row="0"/>
                  <ScrollView row="1" class="fields-section">
                      <StackLayout>
                          <!-- Username -->
                          <GridLayout  ios:columns="auto,*" android:rows="auto, auto" verticalAlignment="top">
                              <Label text="Username" class="field-title" />
                              <TextField v-bind:class="{ editable: editable }" id="username" :editable="editable" v-model="origprofile.name" class="field" ios:col="1" android:row="1" tap="onTextInputTapped" />
                          </GridLayout>
                          <StackLayout class="line"/>
                          <!-- Profile Pic -->
                          <GridLayout  ios:columns="auto,*" android:rows="auto, auto" verticalAlignment="top">
                              <Label text="Profile Pic" class="field-title" />
                              <TextField v-bind:class="{ editable: editable }" id="profile_pic" :editable="editable" v-model="origprofile.profile_pic" class="field" ios:col="1" android:row="1" tap="onTextInputTapped" />
                          </GridLayout>
                          <StackLayout class="line"/>
                          <!-- Bio -->
                          <StackLayout >
                              <Label text="Bio" class="field-title" />
                              <TextView v-bind:class="{ editable: editable }" id="bio" :editable="editable" v-model="origprofile.bio" android:hint="Add bio" ios:hint="Bio" class="field-multiline" tap="onTextInputTapped"/>
                          </StackLayout>
                          <StackLayout class="line"/>
                      </StackLayout>
                  </ScrollView>                  
                  <Button row="2" v-show="!editable" text="Update" class="update" @tap="toggleForm" col="0" colspan="2"/>
                  <GridLayout row="3" columns="*,*"  >
                    <Button v-show="editable" text="Save" class="save" @tap="saveProfile" col="0"/>
                   <Button v-show="editable" text="Cancel" class="cancel" @tap="saveCancel" col="1"/>            
                  </GridLayout>                  
             </GridLayout>
             <!-- Picture -->
             <Image id="image" :src="origprofile.profile_pic" class="profile-picture" v-bind:class="{'editable': editable }" @tap="onProfilePictureTapped"/>      
            </GridLayout>
        </StackLayout>
    </Page>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import firebase from "nativescript-plugin-firebase";
var LoadingIndicator = require("nativescript-loading-indicator")
  .LoadingIndicator;
var loader = new LoadingIndicator();
import ProfilePicture from "./ProfilePicture.vue";
export default {
  name: "profile-page",
  data() {
    return {
      editable: false,
      origprofile: {}
    };
  },
  components: {},
  computed: {
  },
  created() {
    this.origprofile = Object.assign({}, this.$store.state.profile);    
  },
  methods: {
    toggleForm() {
      this.editable = !this.editable;
    },
    onProfilePictureTapped() {
      if (this.editable) {
        this.$navigateTo(ProfilePicture);
      }
    },
    saveCancel() {
      this.origprofile = Object.assign({}, this.$store.state.profile);
      this.editable = false;
    },
    saveProfile() {
      //in case we updated profile pic and returned to this page from there      
      this.origprofile.profile_pic = this.$store.state.profile.profile_pic
      console.dir(this.origprofile);
      loader.show();
      const profDoc = firebase.firestore
        .collection("users")
        .doc(this.origprofile.id);
      profDoc
        .set(this.origprofile, { merge: true })
        .then(
          res => {
            this.$store.commit("setProfile", this.origprofile);
            this.editable = false;
            loader.hide();
            return res;
          },
          err => {
            console.error(err);
            loader.hide();
            alert("Unable to save profile, try again later!");
          }
        )
        .catch(function(error) {
          alert("Unable to save profile, try again later!");
          loader.hide();
          console.error("Error writing firestore document: ", error);
        });
    }
  }
};
</script>

<style scoped>
.profile-picture {
  width: 80;
  height: 80;
  border-radius: 40;
  margin-top: 16;
  vertical-align: top;
  horizontal-align: center;
}

@keyframes picture {
  from {
    opacity: 0;
    transform: scale(2, 2);
    animation-timing-function: ease-in;
  }
  to {
    opacity: 1;
    transform: scale(1, 1);
  }
}

.top-border {
  height: 2;
  background-color: #899bfe;
  margin-bottom: 40;
}

@keyframes play {
  from {
    opacity: 0.3;
    transform: scale(0.6, 0.6);
  }
  60% {
    opacity: 0.6;
    transform: scale(1.1, 1.1);
    animation-timing-function: ease-in;
  }
  to {
    opacity: 1;
    transform: scale(1, 1);
  }
}

.form-content {
  background-color: white;
  margin-top: 56;
  margin-left: 32;
  margin-right: 32;
  margin-bottom: 42;
  opacity: 0.6;
  transform: scale(0.8, 0.8);
  animation-name: play;
  animation-fill-mode: forwards;
  animation-duration: 0.6;
}

.fields-section {
  margin-left: 12;
  margin-right: 12;
}

.field-title,
.field-switch-title {
  horizontal-align: left;
  font-size: 14;
  color: #737373;
  padding: 10 0;
}

.field {
  horizontal-align: stretch;
  text-align: right;
  font-size: 14;
  color: #1e2d7e;
  padding: 10 0;
}

.field-multiline {
  min-height: 60;
  font-size: 14;
  color: #1e2d7e;
  margin: 10 0;
}

.field-switch {
  vertical-align: center;
  horizontal-align: right;
  margin: 10 0;
}
.editable {
  background-color: #eceaea;
}
.edit-picture {
  width: 80;
  height: 80;
  border-radius: 40;
  margin-top: 16;
  vertical-align: top;
  horizontal-align: center;
  background-color: #faf9f9;
}

.line {
  background-color: #f1f0f0;
  height: 1;
  margin: 0;
}

.checkbox {
  width: 18;
  height: 18;
  margin: 10 10 10 0;
}

.update {
  horizontal-align: stretch;
  text-align: center;
  color: white;
  background-color: #30bcff;
  height: 36;
}
.save {
  horizontal-align: stretch;
  text-align: center;
  color: white;
  background-color: #0011f8;
  height: 36;
}

.cancel {
  horizontal-align: stretch;
  text-align: center;
  color: white;
  background-color: #1b1c1d;
  height: 36;
}
</style>
