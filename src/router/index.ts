import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home/index.vue";
import Profile from "@/pages/Profile/index.vue";
import { isAuthenticated } from "@/common/utils";
import Planning from "@/pages/Planning/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { requiresAuth: false },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: "/plan",
      name: "Plan",
      component: Planning,
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authenticated = isAuthenticated();
  if (authenticated && to.path === "/") {
    next({ name: "Profile" });
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authenticated) {
      next({ name: "Home" }); // redirect to login page
    } else {
      next(); // allow navigation
    }
  } else {
    next(); // allow navigation for non-auth routes
  }
});

export default router;
