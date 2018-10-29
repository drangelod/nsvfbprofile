import firebase from "nativescript-plugin-firebase";
import store from "../store";

export default {
  getProfile() {
    firebase.getCurrentUser().then(function(currentuser) {
      firebase.firestore.getDocument("users", currentuser.uid).then(docdata => {
        var userdata = {};
        userdata.id = currentuser.uid;
        if (docdata.exists) {
          var fbdata = docdata.data();
          userdata.name = fbdata.name;
          userdata.bio = fbdata.bio;
          userdata.profile_pic = fbdata.profile_pic;
        } else {
          firebase.firestore.set("users", currentuser.uid, {});
        }
        store.commit("setProfile", userdata);
      });
    });
  }
};
