<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <!-- Account -->
   
    <div class="bg-white shadow rounded p-4">
      <div class="text-xs uppercase text-gray-500">Account</div>
      <div class="text-xl font-semibold">
        {{ root?.data?.vxCode || "-" }}
      </div>
  
    </div>

    <!-- Total Team Volume -->
    <div class="bg-white shadow rounded p-4">
      <div class="text-xs uppercase text-gray-500">Total Team Volume</div>
      <div class="text-xl font-semibold">
        ${{ format(root?.data?.totalTeamVolume ) }}
      </div>
          <div class="text-sm text-gray-600">
        LeftVolume: ${{ format(root?.data?.leftVolume) }} /
        RightVolume: ${{ format(root?.data?.rightVolume) }}
      </div>
      <!-- <div class="text-sm text-gray-600">
        {{ format(root?.data?.totalCount) }} members
      </div> -->
    </div>

    <!-- Account Capacity -->
    <div class="bg-white shadow rounded p-4">
      <div class="text-xs uppercase text-gray-500">
        Account Capacity (3x)
      </div>
      <div class="text-xl font-semibold">
        ${{ format(accountCapacity) }}
      </div>
      <div class="text-sm text-gray-600">
        Used: ${{ format(usedCapacity) }} /
        Remaining: ${{ format(accountCapacity - usedCapacity) }}
      </div>
    </div>

    <!-- Flush Out -->
    <div class="bg-white shadow rounded p-4">
      <div class="text-xs uppercase text-gray-500">
        Flush Out (Burned)
      </div>
      <div class="text-xl font-semibold text-red-500">
        ${{ format(flushOut) }}
      </div>
      <div class="text-sm text-gray-600">
        Cycles: {{ format(vxcCount) }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  root: {
    type: Object,
    required: true,
  },
  totalTeamVolume: {
    type: Number,
    required: true,
  },
  totalTeamCount: {
    type: Number,
    required: true,
  },
  accountCapacity: {
    type: Number,
    required: true,
  },
  usedCapacity: {
    type: Number,
    required: true,
  },
  flushOut: {
    type: Number,
    required: true,
  },
  vxcCount: {
    type: Number,
    required: true,
  },
});

/* helper */
const format = (v) =>
  Number(v || 0).toLocaleString("en-US");
</script>
