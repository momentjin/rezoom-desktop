<template>
  <nav class="view-container">
    <ul>
      <li
        v-for="menu in menuButtons"
        :key="menu.index"
        :title="menu.title"
        @click.stop="onChangeView"
      >
        <v-icon medium :disabled="menu.disabled" dark :title="menu.title">{{menu.icon}}</v-icon>
      </li>

      <div class="option">
        <notification-list />
        <li v-for="menu in functionButtons" :key="menu.index">
          <my-icon color="white" :clickAction="menu.callback" :title="menu.title" :iconType="menu.icon" />
        </li>
      </div>
    </ul>
  </nav>
</template>

<script>
import MyIcon from "@/components/common/MyIcon.vue";
import NotificationList from "@/components/notification/NotificationList.vue";
import { mapMutations } from "vuex";

export default {
  components: { NotificationList, MyIcon },
  created() {
    this.setActiveMenu(this.$route.path);
  },
  watch: {
    $route(to) {
      this.setActiveMenu(to.path);
    }
  },
  data() {
    return {
      menuButtons: [
        {
          title: "coverletters",
          routerNames: ["", "coverletters", "questions"],
          icon: "vertical_split",
          disabled: true
        },
        {
          title: "user",
          routerNames: ["user"],
          icon: "settings_applications",
          disabled: false
        }
      ],
      functionButtons: [
        { title: "logout", icon: "power_settings_new", callback: this.logout }
      ]
    };
  },
  methods: {
    ...mapMutations(["LOG_OUT"]),
    onChangeView(e) {
      const menuName = e.target.title;
      this.$router.push({
        path: `/${menuName}`
      });
    },
    setActiveMenu(changedMenuName) {
      const after = changedMenuName.replace("/", "");

      for (const menu of this.menuButtons) {
        for (const routerName of menu.routerNames) {
          if (routerName == after) {
            menu.disabled = false;
            break;
          }
          else {
            menu.disabled = true;
          }
        }
      }

    },
    logout() {
      if (!confirm("로그아웃 하시겠습니까?")) return;

      this.LOG_OUT();
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.view-container {
  display: flex;
  justify-content: center;
  min-width: 70px;
  background-color: black;
  overflow-x: hidden;
}

ul {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  padding: 0px;
  align-items: center;
  margin-top: 50px;
  width: 100%;
}

li {
  list-style: none;
  text-align: center;
  padding: 5px;
  margin-bottom: 15px;
}

li:hover {
  cursor: pointer;
}

.option {
  margin-top: auto;
  margin-bottom: 50px;
}
</style>
