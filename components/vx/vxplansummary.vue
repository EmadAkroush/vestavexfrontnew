<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <!-- Account -->
   
    <div class="bg-white shadow rounded p-4" style="background:#0F172A;color:#C7D2FE;">
      <div class="text-xs uppercase text-gray-500" style="color:#C7D2FE;">Account</div>
      <div class="text-xl font-semibold" style="color:#C7D2FE;">
        {{ root?.data?.vxCode || "-" }}
      </div>
  
    </div>

    <!-- Total Team Volume -->
    <div class="bg-white shadow rounded p-4" style="background:#0F172A;color:#C7D2FE;">
      <div class="text-xs uppercase text-gray-500" style="color:#C7D2FE;">Total Team Volume</div>
      <div class="text-xl font-semibold" style="color:#C7D2FE;">
        ${{ format(root?.data?.totalTeamVolume ) }}
      </div>
          <div class="text-sm text-gray-600" style="color:#C7D2FE;">
        LeftVolume: ${{ format(root?.data?.leftVolume) }} /
        RightVolume: ${{ format(root?.data?.rightVolume) }}
      </div>
      <!-- <div class="text-sm text-gray-600">
        {{ format(root?.data?.totalCount) }} members
      </div> -->
    </div>

    <!-- Account Capacity -->
    <div class="bg-white shadow rounded p-4" style="background:#0F172A;color:#C7D2FE;">
      <div class="text-xs uppercase text-gray-500" style="color:#C7D2FE;">
        Account Capacity (3x)
      </div>
      <div class="text-xl font-semibold" style="color:#C7D2FE;">
        ${{ format(accountCapacity) }}
      </div>
      <div class="text-sm text-gray-600" style="color:#C7D2FE;">
        Used: ${{ format(usedCapacity) }} /
        Remaining: ${{ format(accountCapacity - usedCapacity) }}
      </div>
    </div>

    <!-- Flush Out -->
    <div class="bg-white shadow rounded p-4" style="background:#0F172A;color:#C7D2FE;">
      <div class="text-xs uppercase text-gray-500" style="color:#C7D2FE;">
        Flush Out (Burned)
      </div>
      <div class="text-xl font-semibold text-red-500" style="color:#7C3AED;">
        ${{ format(flushOut) }}
      </div>
      <div class="text-sm text-gray-600" style="color:#C7D2FE;">
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
