<template>
  <div class="space-y-6 mx-auto">
    <h2 class="text-xl font-bold mb-6">Account Settings</h2>

    <!-- Profile & Avatar -->
    <Card class="shadow-md">
      <template #title>Profile Information</template>
      <template #content>
        <div class="flex flex-col md:flex-row items-center gap-6">
          <!-- Avatar Upload -->
          <div class="flex flex-col items-center">
            <img
              :src="profile.avatar"
              class="w-24 h-24 rounded-full object-cover border mb-2"
              alt="Avatar"
            />
            <FileUpload
              mode="basic"
              chooseLabel="Upload Avatar"
              accept="image/*"
              customUpload
              @select="onAvatarUpload"
              class="p-button-sm"
            />
          </div>

          <!-- User Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <div>
              <label class="text-sm font-medium text-gray-600">Username</label>
              <InputText
                v-model="profile.username"
                :placeholder="placeholders.username"
                class="w-full mt-1"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600"
                >First Name</label
              >
              <InputText
                v-model="profile.firstName"
                :placeholder="placeholders.firstName"
                class="w-full mt-1"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">Last Name</label>
              <InputText
                v-model="profile.lastName"
                :placeholder="placeholders.lastName"
                class="w-full mt-1"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">Phone</label>
              <InputText
                v-model="profile.phone"
                :placeholder="placeholders.phone"
                class="w-full mt-1"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">Email</label>
              <InputText
                v-model="profile.email"
                :placeholder="placeholders.email"
                class="w-full mt-1"
              />
            </div>

            <div class="md:col-span-2">
              <label class="text-sm font-medium text-gray-600"
                >Wallet Address</label
              >
              <InputText
                v-model="profile.wallet"
                :placeholder="placeholders.wallet"
                class="w-full mt-1"
              />
            </div>
            <div class="flex flex-row items-center justify-end md:col-span-2">
              <div class="mt-4">
                <Button
                  @click="saveProfile"
                  label="Save Profile"
                  icon="pi pi-check"
                  class="p-button-sm"
                />
              </div>
            </div>

            <div class="md:col-span-2 border p-4">
              <label class="text-sm font-medium text-gray-600">
                Leader / Referral Code
              </label>

              <div class="flex gap-2 mt-1">
                <InputText
                  v-model="profile.leaderCode"
                  placeholder="Enter leader VX code"
                  class="flex-1"
                />
              </div>

              <div class="mt-2">
                <label class="text-sm font-medium text-gray-600 mb-1 block">
                  Position
                </label>

                <div class="flex gap-6 green-600">
                  <!-- LEFT -->
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="position"
                      value="left"
                      v-model="profile.position"
                      class="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span>Left</span>
                  </label>

                  <!-- RIGHT -->
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="position"
                      value="right"
                      v-model="profile.position"
                      class="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span>Right</span>
                  </label>
                </div>
              </div>

              <small class="text-gray-500">
                Enter the VX code of your leader to connect your account.
              </small>
              <div class="flex flex-row items-center justify-end">
                <Button
                  label="Connect"
                  icon="mdi mdi-account-arrow-up-outline"
                  class="p-button-sm p-button-success custombtn"
                  @click="connectLeader"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- Security -->
    <Card class="shadow-md">
      <template #title>Security</template>
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600"
              >Current Password</label
            >
            <Password
              v-model="security.current"
              toggleMask
              class="w-full mt-1"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600"
              >New Password</label
            >
            <Password
              v-model="security.newPass"
              toggleMask
              class="w-full mt-1"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600"
              >Confirm Password</label
            >
            <Password
              v-model="security.confirm"
              toggleMask
              class="w-full mt-1"
            />
          </div>
          <!-- <div class="flex items-center justify-between md:col-span-2">
            <span class="text-sm font-medium text-gray-600"
              >Enable 2FA for withdrawals</span
            >
            <InputSwitch v-model="security.twoFA" />
          </div> -->
        </div>
        <div class="mt-4 text-right">
          <Button
            label="Update Security"
            icon="pi pi-lock"
            severity="warning"
            class="p-button-sm"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import InputSwitch from "primevue/inputswitch";
import FileUpload from "primevue/fileupload";
import { ref } from "vue";

import { useToast } from "primevue/usetoast";
import { useAuth } from "@/composables/useAuth";

const loadingLeader = ref(false);
const loadingSave = ref(false);
const loadingProfile = ref(false);

const toast = useToast();
const { authUser } = useAuth();

const profile = ref({
  username: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  leaderCode: "",
  wallet: "",
  position: "", // 👈 اضافه شد
});

const placeholders = ref({
  username: "Loading...",
  firstName: "Loading...",
  lastName: "Loading...",
  phone: "Loading...",
  email: "Loading...",
  wallet: "Loading...",
});

// 🟢 Load current user data from backend
onMounted(async () => {
  try {
    loadingProfile.value = true;

    const userId = authUser.value?.user?.id;
    if (!userId) {
      toast.add({
        severity: "warn",
        summary: "Not Logged In",
        detail: "Please log in to view your account.",
        life: 3000,
      });
      return;
    }

    const user = await $fetch("/api/account/find", {
      method: "POST",
      body: { id: userId },
    });

    console.log("user", user);

    if (user) {
      profile.value = {
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        email: user.email || "",
        wallet: user.wallet || "",
     
      };
    }

    placeholders.value = {
      username: user.username || "Enter username",
      firstName: user.firstName || "Enter first name",
      lastName: user.lastName || "Enter last name",
      phone: user.phone || "Enter phone number",
      email: user.email || "Enter email",
      wallet: user.wallet || "Enter wallet address",
    };
  } catch (err) {
    console.error("Profile load error:", err);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to load user data.",
      life: 4000,
    });
  } finally {
    loadingProfile.value = false;
  }
});

// 🟢 اتصال کاربر به لیدر
const connectLeader = async () => {
  if (!profile.value.leaderCode) {
    toast.add({
      severity: "warn",
      summary: "Missing Code",
      detail: "Please enter your leader code.",
      life: 3000,
    });
    return;
  }

  if (!profile.value.position) {
    toast.add({
      severity: "warn",
      summary: "Position Required",
      detail: "Please select Left or Right position.",
      life: 3000,
    });
    return;
  }

  try {
    loadingLeader.value = true;
    const userId = authUser.value?.user?.id;
    if (!userId) {
      toast.add({
        severity: "warn",
        summary: "Not Logged In",
        detail: "Please log in to continue.",
        life: 3000,
      });
      return;
    }

    const res = await $fetch("/api/referrals/register", {
      method: "POST",
      body: {
        referrerCode: profile.value.leaderCode,
        newUserId: userId,
        position: profile.value.position, // 👈 مهم
      },
    });

    if (!res.success && res.code === "POSITION_TAKEN") {
      toast.add({
        severity: "error",
        summary: "Position Unavailable",
        detail: res.message,
        life: 4000,
      });
      return;
    }

    toast.add({
      severity: res.success ? "success" : "warn",
      summary: res.success ? "Connected" : "Notice",
      detail: res.message || "Request processed successfully.",
      life: 4000,
    });
  } catch (err) {
    console.error("Referral error:", err);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: err?.data?.message || "Failed to connect with leader.",
      life: 4000,
    });
  } finally {
    loadingLeader.value = false;
  }
};

// 🟢 ذخیره پروفایل (API: /api/account/update)
const saveProfile = async () => {
  try {
    loadingSave.value = true;
    const userId = authUser.value?.user?.id;
    if (!userId) {
      toast.add({
        severity: "warn",
        summary: "Not Logged In",
        detail: "Please log in to continue.",
        life: 3000,
      });
      return;
    }

    const res = await $fetch("/api/account/update", {
      method: "POST",
      body: {
        userId,
        username: profile.value.username,
        firstName: profile.value.firstName,
        lastName: profile.value.lastName,
        phone: profile.value.phone,
        email: profile.value.email,
        wallet: profile.value.wallet,
      },
    });
    console.log("profile.value.firstName", profile.value.username);

    toast.add({
      severity: res.success ? "success" : "info",
      summary: "Profile Updated",
      detail: res.message || "Your profile has been saved successfully.",
      life: 4000,
    });
  } catch (err) {
    console.error("Profile update error:", err);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: err?.data?.message || "Failed to save your profile.",
      life: 4000,
    });
  } finally {
    loadingSave.value = false;
  }
};

const security = ref({
  current: "",
  newPass: "",
  confirm: "",
  twoFA: false,
});

const onAvatarUpload = (event) => {
  const file = event.files[0];
  if (file) {
    profile.value.avatar = URL.createObjectURL(file);
  }
};
</script>

<style></style>
